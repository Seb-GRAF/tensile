import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";
import { useSprings } from "../../springs";
import { Icon } from "../data-display/Icon";
import { Toggle } from "./Toggle";

export type ThemeToggleProps = {
  value: "light" | "dark";
  onValueChange: (value: "light" | "dark") => void;
  label?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
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

export function ThemeToggle({
  value,
  onValueChange,
  label = "Dark mode",
  name,
  disabled = false,
  className = "",
}: ThemeToggleProps) {
  const { shape } = useSprings();
  const dark = value === "dark";
  const morph = useMotionValue(dark ? 1 : 0);
  const d = useTransform(morph, glyph);

  useEffect(() => {
    animate(morph, dark ? 1 : 0, shape);
  }, [dark, morph]);

  return (
    <Toggle
      checked={dark}
      onCheckedChange={(checked) => onValueChange(checked ? "dark" : "light")}
      label={label}
      name={name}
      disabled={disabled}
      className={`[--color-accent:var(--color-ink-3)] ${className}`}
    >
      <Icon>
        <motion.path d={d} />
      </Icon>
    </Toggle>
  );
}
