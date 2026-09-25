import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";
import { shape, soft, useLiquid } from "../springs";

export type ThemeToggleProps = {
  value: "light" | "dark";
  onValueChange: (value: "light" | "dark") => void;
  label?: string;
};

const s = Math.SQRT1_2;
const RAYS = [[1, 0], [s, s], [0, 1], [-s, s], [-1, 0], [-s, -s], [0, -1], [s, -s]];

function point(along: number, across: number) {
  return `${12 + (along + across) * s} ${12 - (along - across) * s}`;
}

function glyph(morph: number) {
  const r = 4 + 5 * morph;
  const bite = 7 + 10 * (1 - morph);
  const x = Math.min(r, (bite * bite + r * r - 7 * 7) / (2 * bite));
  const h = Math.sqrt(r * r - x * x);
  const disc = `M${point(x, -h)}A${r} ${r} 0 0 0 ${point(-r, 0)}A${r} ${r} 0 0 0 ${point(x, h)}A7 7 0 0 1 ${point(x, -h)}Z`;
  if (morph >= 0.4) return disc;
  const rest = 1 - morph / 0.4;
  const from = r + 4 * rest;
  const to = from + 2 * rest;
  return disc + RAYS.map(([a, b]) => `M${point(from * a, from * b)}L${point(to * a, to * b)}`).join("");
}

export function ThemeToggle({ value, onValueChange, label = "Dark mode" }: ThemeToggleProps) {
  const dark = value === "dark";
  const [left, right] = useLiquid(dark ? 23 : 3, dark ? 3 : 23);
  const morph = useMotionValue(dark ? 1 : 0);
  const d = useTransform(morph, glyph);

  useEffect(() => {
    animate(morph, dark ? 1 : 0, shape);
  }, [dark, morph]);

  return (
    <motion.button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={label}
      onClick={() => onValueChange(dark ? "light" : "dark")}
      initial={false}
      animate={{ backgroundColor: dark ? "var(--color-ink-3)" : "var(--color-paper)" }}
      transition={soft}
      className="relative h-8 w-13 rounded-full shadow-float outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
    >
      <motion.span style={{ left, right }} className="absolute inset-y-[3px] grid place-items-center rounded-full bg-ink">
        <svg
          viewBox="0 0 24 24"
          className="size-4 fill-none stroke-paper"
          strokeWidth={2.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path d={d} />
        </svg>
      </motion.span>
    </motion.button>
  );
}
