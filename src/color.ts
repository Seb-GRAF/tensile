type Rgb = { r: number; g: number; b: number };
export type Hsv = { h: number; s: number; v: number };

export function hexToRgb(hex: string): Rgb {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

export function rgbToHex({ r, g, b }: Rgb) {
  return `#${[r, g, b].map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

export function rgbToHsv({ r, g, b }: Rgb): Hsv {
  const max = Math.max(r, g, b);
  const range = max - Math.min(r, g, b);
  const sector =
    range === 0 ? 0
    : max === r ? ((g - b) / range + 6) % 6
    : max === g ? (b - r) / range + 2
    : (r - g) / range + 4;
  return { h: sector * 60, s: max === 0 ? 0 : range / max, v: max / 255 };
}

export function hsvToRgb({ h, s, v }: Hsv): Rgb {
  const channel = (n: number) => {
    const k = (n + h / 60) % 6;
    return Math.round(255 * v * (1 - s * Math.max(0, Math.min(k, 4 - k, 1))));
  };
  return { r: channel(5), g: channel(3), b: channel(1) };
}

export function parseHex(text: string) {
  const match = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(text);
  if (!match) return null;
  const digits = match[1].toLowerCase();
  return `#${digits.length === 3 ? [...digits].map((digit) => digit + digit).join("") : digits}`;
}
