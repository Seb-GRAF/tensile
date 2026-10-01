# /// script
# requires-python = ">=3.11"
# dependencies = ["playwright==1.63.0"]
# ///
"""Open the Next.js check app: fail on console errors or hydration warnings, and check that the library CSS and the client components work."""

import sys
import time
import urllib.request

from playwright.sync_api import expect, sync_playwright

url = sys.argv[1]
for _ in range(120):
    try:
        urllib.request.urlopen(url)
        break
    except OSError:
        time.sleep(0.5)
else:
    sys.exit("next start did not answer")

failures = []
with sync_playwright() as playwright:
    browser = playwright.chromium.launch()
    page = browser.new_page()
    messages = []
    page.on("console", lambda message: message.type in ("error", "warning") and messages.append(message.text))
    page.on("pageerror", lambda error: messages.append(str(error)))
    page.goto(url)
    page.wait_for_load_state("networkidle")

    radius = page.get_by_role("button", name="Save").evaluate("element => getComputedStyle(element).borderRadius")
    if radius != "26px":
        failures.append(f"Save button radius is {radius}, not the library's 26px")

    page.get_by_role("switch", name="Weekly digest").click()
    if not page.get_by_role("switch", name="Weekly digest").is_checked():
        failures.append("the Toggle didn't respond to a click, so the page didn't hydrate")
    page.get_by_role("button", name="Reset digest").click()
    expect(page.get_by_role("switch", name="Weekly digest")).not_to_be_checked()

    page.get_by_role("combobox", name="Team").click()
    page.get_by_role("option", name="Engineering").click()
    team = page.locator("input[name=team]").input_value()
    if team != "engineering":
        failures.append(f"the uncontrolled Select submitted {team!r}")

    page.get_by_role("tab", name="Activity").click()
    page.get_by_text("Switched on the client.").wait_for()

    page.emulate_media(reduced_motion="reduce")
    page.reload()
    page.get_by_role("button", name="Save").wait_for()
    spinner = page.get_by_role("status", name="Loading preview").locator("svg")
    expect(spinner).to_have_css("animation-duration", "0s")
    transform = spinner.evaluate("element => getComputedStyle(element).transform")
    page.wait_for_timeout(200)
    expect(spinner).to_have_css("transform", transform)
    page.get_by_role("combobox", name="Team").click()
    page.get_by_role("option", name="Engineering").click()
    expect(page.locator("input[name=team]")).to_have_value("engineering")
    page.get_by_role("tab", name="Activity").click()
    expect(page.get_by_role("tabpanel")).to_have_text("Switched on the client.")

    browser.close()

failures += [f"console: {message}" for message in messages]
for failure in failures:
    print("FAIL", failure)
if failures:
    sys.exit(1)
print("The Next.js app hydrates without warnings and the components work.")
