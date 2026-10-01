# /// script
# requires-python = ">=3.11"
# dependencies = ["playwright==1.63.0"]
# ///
"""Render the 1200 x 630 Open Graph image into site/public/og.png.

    uv run scripts/og-image.py
"""

import base64
from pathlib import Path

from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parent.parent
font = base64.b64encode((root / "node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2").read_bytes()).decode()

html = f"""<!doctype html>
<style>
  @font-face {{ font-family: Geist; src: url(data:font/woff2;base64,{font}) format("woff2"); font-weight: 100 900; }}
  body {{ margin: 0; width: 1200px; height: 630px; box-sizing: border-box; padding: 72px 80px; display: flex; flex-direction: column; justify-content: space-between;
    background: #f3f1ec; color: #111110; font-family: Geist; font-weight: 600; -webkit-font-smoothing: antialiased; }}
  header {{ display: flex; justify-content: space-between; align-items: baseline; }}
  .logo {{ font-size: 48px; letter-spacing: -0.025em; }}
  .logo svg {{ height: 1em; width: 0.2688em; overflow: visible; vertical-align: baseline; margin-right: -0.025em; }}
  .site {{ font-size: 24px; font-weight: 500; color: #6b6964; }}
  h1 {{ margin: 0; font-size: 136px; line-height: 0.98; letter-spacing: -0.05em; }}
  h1 span {{ display: flex; align-items: center; gap: 0.22em; }}
  .verb {{ display: inline-grid; place-items: center; height: 1.12em; padding: 0 0.28em 0.06em; border-radius: 999px; background: #b8f23e; }}
</style>
<header>
  <span class="logo">tens<svg viewBox="0 -100 26.88 100" fill="currentColor"><path d="M7 -53.4L19.8 -53.4L19.8 0L7 0Z" /><circle cx="13.4" cy="-66.2" r="6.4" /></svg>le</span>
  <span class="site">React components in motion</span>
</header>
<h1>Components<span>that <span class="verb">stretch</span></span></h1>
"""

with sync_playwright() as playwright:
    browser = playwright.chromium.launch()
    page = browser.new_page(viewport={"width": 1200, "height": 630})
    page.set_content(html)
    page.evaluate("document.fonts.ready")
    page.screenshot(path=root / "site/public/og.png")
    browser.close()
