import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useLiquid, useSprings } from "../../../springs";
import { useSize } from "../../../useSize";

export type ProgressBarProps = {
  /** 0..1, or null while the length is unknown. */
  value: number | null;
  label?: string;
  formatValue?: (value: number) => string;
  className?: string;
};

const SEGMENT = 80;

function ProgressFill({ value, width }: { value: number | null; width: number }) {
  const { scale } = useSprings();
  const [side, setSide] = useState(0);
  const sweep = width - SEGMENT;
  const position = scale === 0 ? 0.5 : side;
  const [left, right] = useLiquid(
    value === null ? position * sweep : (value - 1) * width,
    value === null ? (1 - position) * sweep : (1 - value) * width,
  );

  useEffect(() => {
    if (value !== null || scale === 0) return;
    setSide(1);
    const id = setInterval(() => setSide((side) => 1 - side), 420 * scale);
    return () => clearInterval(id);
  }, [value, scale]);

  return <motion.div style={{ left, right }} className="tn:absolute tn:inset-y-0 tn:rounded-control tn:bg-ink" />;
}

export function ProgressBar({
  value,
  label = "Loading",
  formatValue = (value: number) => value.toLocaleString("en-US", { style: "percent" }),
  className = "",
}: ProgressBarProps) {
  const [size, measure] = useSize();

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value === null ? undefined : Math.round(value * 100)}
      aria-valuetext={value === null ? undefined : formatValue(value)}
      className={`tn:relative tn:h-11 tn:w-full tn:rounded-control tn:bg-paper tn:shadow-control ${className}`}
    >
      <div ref={measure} className="tn:absolute tn:inset-1 tn:overflow-hidden tn:rounded-control">
        {size && <ProgressFill value={value} width={size.width} />}
      </div>
    </div>
  );
}
