import assert from "node:assert/strict";
import test from "node:test";
import { hexToRgb, hsvToRgb, parseHex, rgbToHex, rgbToHsv } from "./color.ts";

test("hex and RGB convert both ways with two lowercase digits per channel", () => {
  assert.deepEqual(hexToRgb("#3a7bd5"), { r: 58, g: 123, b: 213 });
  assert.equal(rgbToHex({ r: 10, g: 0, b: 255 }), "#0a00ff");
});

test("primaries and secondaries sit at their hue with full saturation and brightness", () => {
  const hues: Record<string, number> = { "#ff0000": 0, "#ffff00": 60, "#00ff00": 120, "#00ffff": 180, "#0000ff": 240, "#ff00ff": 300 };
  for (const [hex, h] of Object.entries(hues)) {
    assert.deepEqual(rgbToHsv(hexToRgb(hex)), { h, s: 1, v: 1 });
    assert.equal(rgbToHex(hsvToRgb({ h, s: 1, v: 1 })), hex);
  }
});

test("grays, black and white have no saturation, and any hue gives the same gray", () => {
  assert.deepEqual(rgbToHsv(hexToRgb("#000000")), { h: 0, s: 0, v: 0 });
  assert.deepEqual(rgbToHsv(hexToRgb("#ffffff")), { h: 0, s: 0, v: 1 });
  assert.deepEqual(rgbToHsv(hexToRgb("#808080")), { h: 0, s: 0, v: 128 / 255 });
  for (const h of [0, 90, 210, 360]) {
    assert.equal(rgbToHex(hsvToRgb({ h, s: 0, v: 128 / 255 })), "#808080");
    assert.equal(rgbToHex(hsvToRgb({ h, s: 0, v: 1 })), "#ffffff");
    assert.equal(rgbToHex(hsvToRgb({ h, s: 0.8, v: 0 })), "#000000");
  }
});

test("hue 360 is red again, and hues just below red stay under 360", () => {
  assert.deepEqual(hsvToRgb({ h: 360, s: 1, v: 1 }), { r: 255, g: 0, b: 0 });
  assert.deepEqual(hsvToRgb({ h: 0, s: 0.5, v: 0.5 }), hsvToRgb({ h: 360, s: 0.5, v: 0.5 }));
  const { h } = rgbToHsv(hexToRgb("#ff0001"));
  assert.ok(h > 359 && h < 360);
  assert.equal(rgbToHex(hsvToRgb(rgbToHsv(hexToRgb("#ff0001")))), "#ff0001");
});

test("colors survive hex to HSV and back", () => {
  for (let r = 0; r < 256; r += 15) {
    for (let g = 0; g < 256; g += 15) {
      for (let b = 0; b < 256; b += 15) {
        const hex = rgbToHex({ r, g, b });
        assert.equal(rgbToHex(hsvToRgb(rgbToHsv(hexToRgb(hex)))), hex);
      }
    }
  }
});

test("hex entry takes three or six digits, with or without #, in any case", () => {
  assert.equal(parseHex("#3A7BD5"), "#3a7bd5");
  assert.equal(parseHex("3a7bd5"), "#3a7bd5");
  assert.equal(parseHex("#FA0"), "#ffaa00");
  assert.equal(parseHex("fa0"), "#ffaa00");
});

test("hex entry rejects other lengths, alpha digits and non-hex text", () => {
  for (const text of ["", "#", "#12", "#1234", "#12345", "#1234567", "#3a7bd5ff", "#ggg", "##abc", "red"]) {
    assert.equal(parseHex(text), null);
  }
});
