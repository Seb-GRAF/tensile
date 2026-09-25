# /// script
# requires-python = ">=3.11"
# dependencies = ["playwright==1.63.0", "pillow"]
# ///
"""Render one story in its own Storybook, run interaction steps, save screenshots and a contact sheet.

    uv run check_story.py <story-id> '<steps as JSON>' --out <dir>

Exits with 1 if a step fails or the browser console shows an error.
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
VIEWPORT = {"width": 800, "height": 600}
THUMB = (400, 300)
LABEL = 28


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


def point(root, step, action):
    box = root.locator(step[action]).bounding_box()
    fx, fy = step.get("at", [0.5, 0.5])
    return box["x"] + box["width"] * fx, box["y"] + box["height"] * fy


def run(page, steps, out):
    root = page.locator("#storybook-root")
    shots = []
    for i, step in enumerate(steps, 1):
        try:
            if "click" in step:
                root.locator(step["click"]).click()
            elif "focus" in step:
                root.locator(step["focus"]).focus()
            elif "press" in step:
                page.keyboard.press(step["press"])
            elif "keydown" in step:
                page.keyboard.down(step["keydown"])
            elif "keyup" in step:
                page.keyboard.up(step["keyup"])
            elif "type" in step:
                page.keyboard.type(step["type"])
            elif "hover" in step:
                root.locator(step["hover"]).hover()
            elif "down" in step:
                page.mouse.move(*point(root, step, "down"))
                page.mouse.down()
            elif "move" in step:
                page.mouse.move(*point(root, step, "move"))
            elif "up" in step:
                page.mouse.move(*point(root, step, "up"))
                page.mouse.up()
            elif "wait" in step:
                page.wait_for_timeout(step["wait"])
            elif "shot" in step:
                path = out / f"{len(shots) + 1:02d}-{step['shot']}.png"
                page.screenshot(path=path)
                shots.append(path)
            elif "attr" in step:
                value = root.locator(step["attr"]).get_attribute(step["name"])
                print(f"step {i} attr {step['attr']} {step['name']} = {json.dumps(value)}")
            else:
                sys.exit(f"step {i}: unknown step {json.dumps(step)}")
        except Error as error:
            sys.exit(f"step {i} {json.dumps(step)} failed: {error.message}")
    return shots


def contact_sheet(shots, path):
    cols = min(4, len(shots))
    rows = math.ceil(len(shots) / cols)
    sheet = Image.new("RGB", (cols * THUMB[0], rows * (THUMB[1] + LABEL)), "white")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default(size=15)
    for i, shot in enumerate(shots):
        x, y = i % cols * THUMB[0], i // cols * (THUMB[1] + LABEL)
        draw.text((x + 8, y + 6), shot.stem, fill="black", font=font)
        sheet.paste(Image.open(shot).resize(THUMB, Image.LANCZOS), (x, y + LABEL))
    sheet.save(path)


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("story", help="story id, e.g. components-toggle--default")
    parser.add_argument("steps", help="JSON list of steps, see SKILL.md")
    parser.add_argument("--out", required=True, type=Path, help="directory for screenshots")
    args = parser.parse_args()
    steps = json.loads(args.steps)
    args.out.mkdir(parents=True, exist_ok=True)
    for old in args.out.glob("*.png"):
        old.unlink()

    signal.signal(signal.SIGTERM, lambda *_: sys.exit("stopped"))
    port = free_port()
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
                page = browser.new_page(
                    viewport=VIEWPORT, device_scale_factor=2, permissions=["clipboard-read", "clipboard-write"]
                )
                page.on("console", lambda message: message.type == "error" and errors.append(message.text))
                page.on("pageerror", lambda error: errors.append(str(error)))
                page.goto(f"http://localhost:{port}/iframe.html?id={args.story}&viewMode=story")
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
                    shots = run(page, steps, args.out)
                    if shots:
                        contact_sheet(shots, args.out / "contact.png")
                        print("\n".join(str(shot) for shot in [*shots, args.out / "contact.png"]))
                browser.close()
        finally:
            server.terminate()
            try:
                server.wait(10)
            except subprocess.TimeoutExpired:
                server.kill()

    if errors:
        print("Console errors:", *errors, sep="\n  ", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
