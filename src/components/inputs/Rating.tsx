import { motion, useMotionTemplate } from "motion/react";
import { useState } from "react";
import { useLiquid } from "../../springs";

export type RatingProps = {
  /** Whole stars, from 0 to `count`. */
  value: number;
  onValueChange: (value: number) => void;
  /** Number of stars. */
  count?: number;
  label?: string;
  /** Screen reader text for the value. */
  valueLabel?: (value: number, count: number) => string;
};

function Star({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`size-6 ${className}`} strokeWidth={1.5} strokeLinejoin="round">
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );
}

export function Rating({
  value,
  onValueChange,
  count = 5,
  label = "Rating",
  valueLabel = (value: number, count: number) => `${value} of ${count} stars`,
}: RatingProps) {
  const [hover, setHover] = useState<number | null>(null);
  const stars = Array.from({ length: count }, (_, i) => i + 1);
  const step = 100 / count;
  const [left, right] = useLiquid(0, (count - (hover ?? value)) * step);
  const clip = useMotionTemplate`inset(0 ${right}% 0 ${left}%)`;

  function onKeyDown(event: React.KeyboardEvent) {
    const targets: Record<string, number> = {
      ArrowLeft: value - 1,
      ArrowDown: value - 1,
      ArrowRight: value + 1,
      ArrowUp: value + 1,
      Home: 0,
      End: count,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    setHover(null);
    onValueChange(Math.min(count, Math.max(0, target)));
  }

  return (
    <div
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={count}
      aria-valuenow={value}
      aria-valuetext={valueLabel(value, count)}
      onKeyDown={onKeyDown}
      onPointerLeave={() => setHover(null)}
      className="cursor-pointer rounded-full bg-paper p-[3px] shadow-float outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
    >
      <div className="relative grid auto-cols-[32px] grid-flow-col">
        <motion.span style={{ clipPath: clip }} className="absolute inset-0 grid auto-cols-[32px] grid-flow-col">
          {stars.map((star) => (
            <span key={star} className="grid place-items-center">
              <Star className="fill-accent" />
            </span>
          ))}
        </motion.span>
        {stars.map((star) => (
          <span
            key={star}
            onPointerMove={() => setHover(star)}
            onClick={() => onValueChange(star)}
            className="relative grid h-8 place-items-center"
          >
            <Star className="fill-none stroke-ink" />
          </span>
        ))}
      </div>
    </div>
  );
}
