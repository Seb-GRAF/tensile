import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useLiquid } from "../springs";

export type ProgressBarProps = {
  /** 0..1, or null while the length is unknown. */
  value: number | null;
  label?: string;
  formatValue?: (value: number) => string;
};

const WIDTH = 240;
const INSET = 4;
const FILL_MIN = 36;
const TRAVEL = WIDTH - 2 * INSET - FILL_MIN;
const SEGMENT = 80;
const SWEEP = WIDTH - 2 * INSET - SEGMENT;

export function ProgressBar({
  value,
  label = "Loading",
  formatValue = (value: number) => value.toLocaleString("en-US", { style: "percent" }),
}: ProgressBarProps) {
  const [side, setSide] = useState(0);
  const [left, right] = useLiquid(
    value === null ? INSET + side * SWEEP : INSET,
    value === null ? INSET + (1 - side) * SWEEP : INSET + (1 - value) * TRAVEL,
  );

  useEffect(() => {
    if (value !== null) return;
    setSide(1);
    const id = setInterval(() => setSide((side) => 1 - side), 420);
    return () => clearInterval(id);
  }, [value]);

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value === null ? undefined : Math.round(value * 100)}
      aria-valuetext={value === null ? undefined : formatValue(value)}
      className="relative h-11 w-60 rounded-full bg-paper shadow-float"
    >
      <motion.div style={{ left, right }} className="absolute inset-y-1 rounded-full bg-ink" />
    </div>
  );
}
