# /// script
# requires-python = ">=3.11"
# dependencies = ["playwright==1.63.0", "pillow"]
# ///
"""Render one story in its own Storybook, run interaction steps and checks, save screenshots and a contact sheet.

    uv run check_story.py <story-id> '<steps as JSON>' --out <dir> [--viewport 390x844] [--reduced-motion] [--video]
                          [--args 'scale:3'] [--globals 'theme:alternate']

Exits with 1 if a step fails, a check fails, or the browser console shows an error.
"""

import argparse
import json
import math
import os
import signal
import socket
import subprocess
import sys
import tempfile
import time
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from playwright.sync_api import Error, sync_playwright

ROOT = Path(__file__).resolve().parents[4]
LABEL = 28
OUTSIDE_STORYBOOK = ":not(.sb-wrapper, .sb-wrapper *)"


def free_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def wait_until_up(url, server):
    deadline = time.time() + 90
    while time.time() < deadline:
        if server.poll() is not None:
            sys.exit("Storybook exited during startup, see storybook.log")
        try:
            urllib.request.urlopen(url)
            return
        except OSError:
            time.sleep(0.5)
    sys.exit("Storybook did not start within 90 s, see storybook.log")


def viewport(value):
    width, height = value.split("x")
    return {"width": int(width), "height": int(height)}


def find(page, selector):
    selector, _, nth = selector.partition(" >> nth=")
    found = page.locator(selector).and_(page.locator(OUTSIDE_STORYBOOK))
    return found.nth(int(nth)) if nth else found


def point(page, step, action):
    box = find(page, step[action]).bounding_box()
    fx, fy = step.get("at", [0.5, 0.5])
    return box["x"] + box["width"] * fx, box["y"] + box["height"] * fy


def read(page, step):
    if "attr" in step:
        return find(page, step["attr"]).get_attribute(step["name"]), f"attr {step['attr']} {step['name']}"
    if "prop" in step:
        value = find(page, step["prop"]).evaluate("(el, path) => path.split('.').reduce((v, key) => v[key], el)", step["name"])
        return value, f"prop {step['prop']} {step['name']}"
    if "text" in step:
        return find(page, step["text"]).inner_text(), f"text {step['text']}"
    if "visible" in step:
        return find(page, step["visible"]).is_visible(), f"visible {step['visible']}"
    return find(page, step["hidden"]).is_hidden(), f"hidden {step['hidden']}"


def check(i, what, value, expected):
    if value == expected:
        print(f"step {i} PASS {what} = {json.dumps(value)}")
        return []
    print(f"step {i} FAIL {what} = {json.dumps(value)}, expected {json.dumps(expected)}")
    return [i]


def run(page, steps, out):
    shots = []
    failures = []
    for i, step in enumerate(steps, 1):
        try:
            if "click" in step and "at" in step:
                page.mouse.click(*point(page, step, "click"))
            elif "click" in step:
                find(page, step["click"]).click()
            elif "focus" in step:
                find(page, step["focus"]).focus()
            elif "press" in step:
                page.keyboard.press(step["press"])
            elif "keydown" in step:
                page.keyboard.down(step["keydown"])
            elif "keyup" in step:
                page.keyboard.up(step["keyup"])
            elif "type" in step:
                page.keyboard.type(step["type"])
            elif "upload" in step:
                files = [{"name": name, "mimeType": "application/octet-stream", "buffer": b"test"} for name in step["files"]]
                find(page, step["upload"]).set_input_files(files)
            elif "hover" in step:
                find(page, step["hover"]).hover()
            elif "down" in step:
                page.mouse.move(*point(page, step, "down"))
                page.mouse.down()
            elif "move" in step:
                page.mouse.move(*point(page, step, "move"))
            elif "up" in step:
                page.mouse.move(*point(page, step, "up"))
                page.mouse.up()
            elif "wait" in step:
                page.wait_for_timeout(step["wait"])
            elif "shot" in step:
                path = out / f"{len(shots) + 1:02d}-{step['shot']}.png"
                page.screenshot(path=path)
                shots.append(path)
            elif any(key in step for key in ("attr", "prop", "text")):
                value, what = read(page, step)
                if "equals" in step:
                    failures += check(i, what, value, step["equals"])
                else:
                    print(f"step {i} {what} = {json.dumps(value)}")
            elif "visible" in step or "hidden" in step:
                value, what = read(page, step)
                failures += check(i, what, value, True)
            else:
                sys.exit(f"step {i}: unknown step {json.dumps(step)}")
        except Error as error:
            sys.exit(f"step {i} {json.dumps(step)} failed: {error.message}")
    return shots, failures


def contact_sheet(shots, path, size):
    thumb = (size["width"] // 2, size["height"] // 2)
    cols = min(4, len(shots))
    rows = math.ceil(len(shots) / cols)
    sheet = Image.new("RGB", (cols * thumb[0], rows * (thumb[1] + LABEL)), "white")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default(size=15)
    for i, shot in enumerate(shots):
        x, y = i % cols * thumb[0], i // cols * (thumb[1] + LABEL)
        draw.text((x + 8, y + 6), shot.stem, fill="black", font=font)
        sheet.paste(Image.open(shot).resize(thumb, Image.LANCZOS), (x, y + LABEL))
    sheet.save(path)


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("story", help="story id, e.g. components-toggle--default")
    parser.add_argument("steps", help="JSON list of steps, see SKILL.md")
    parser.add_argument("--out", required=True, type=Path, help="directory for screenshots")
    parser.add_argument("--viewport", type=viewport, default="800x600", help="page size in CSS px, e.g. 390x844")
    parser.add_argument("--reduced-motion", action="store_true", help="emulate prefers-reduced-motion: reduce")
    parser.add_argument("--video", action="store_true", help="record the run to video.webm in the out directory")
    parser.add_argument("--args", help="story args as in the Storybook URL, e.g. 'scale:3;open:!true'")
    parser.add_argument("--globals", help="globals as in the Storybook URL, e.g. 'theme:alternate'")
    args = parser.parse_args()
    steps = json.loads(args.steps)
    args.out.mkdir(parents=True, exist_ok=True)
    for old in [*args.out.glob("*.png"), *args.out.glob("*.webm")]:
        old.unlink()

    query = f"id={args.story}&viewMode=story"
    if args.args:
        query += f"&args={args.args}"
    if args.globals:
        query += f"&globals={args.globals}"

    signal.signal(signal.SIGTERM, lambda *_: sys.exit("stopped"))
    port = free_port()
    failures = []
    with tempfile.TemporaryDirectory(prefix="check-story-") as cache, open(args.out / "storybook.log", "w") as log:
        server = subprocess.Popen(
            [ROOT / "node_modules/.bin/storybook", "dev", "-p", str(port), "--exact-port", "--ci", "--preview-only"],
            cwd=ROOT,
            env={**os.environ, "CACHE_DIR": cache},
            stdout=log,
            stderr=subprocess.STDOUT,
        )
        try:
            wait_until_up(f"http://localhost:{port}/iframe.html", server)
            errors = []
            with sync_playwright() as p:
                browser = p.chromium.launch()
                context = browser.new_context(
                    viewport=args.viewport,
                    device_scale_factor=2,
                    permissions=["clipboard-read", "clipboard-write"],
                    reduced_motion="reduce" if args.reduced_motion else "no-preference",
                    record_video_dir=cache if args.video else None,
                    record_video_size=args.viewport if args.video else None,
                )
                page = context.new_page()
                page.on("console", lambda message: message.type == "error" and errors.append(message.text))
                page.on("pageerror", lambda error: errors.append(str(error)))
                page.goto(f"http://localhost:{port}/iframe.html?{query}")
                page.wait_for_function(
                    "window.__STORYBOOK_PREVIEW__?.currentRender?.phase === 'finished'"
                    " || document.body.classList.contains('sb-show-errordisplay')",
                    timeout=60000,
                )
                if page.locator("body.sb-show-errordisplay").count():
                    errors.append(f"story did not render: {page.locator('#error-message').inner_text()}")
                else:
                    page.evaluate("async () => { await document.fonts.ready; }")
                    page.set_default_timeout(5000)
                    shots, failures = run(page, steps, args.out)
                    if shots:
                        contact_sheet(shots, args.out / "contact.png", args.viewport)
                        print("\n".join(str(shot) for shot in [*shots, args.out / "contact.png"]))
                context.close()
                if args.video:
                    page.video.save_as(args.out / "video.webm")
                    print(args.out / "video.webm")
                browser.close()
        finally:
            server.terminate()
            try:
                server.wait(10)
            except subprocess.TimeoutExpired:
                server.kill()

    if errors:
        print("Console errors:", *errors, sep="\n  ", file=sys.stderr)
    if failures:
        print(f"Failed checks: steps {', '.join(map(str, failures))}", file=sys.stderr)
    if errors or failures:
        sys.exit(1)


if __name__ == "__main__":
    main()
