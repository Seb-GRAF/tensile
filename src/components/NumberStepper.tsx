import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { snap } from "../springs";
import { NumberTicker } from "./NumberTicker";

export type NumberStepperProps = {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  formatValue?: (value: number) => string;
  label?: string;
  decreaseLabel?: string;
  increaseLabel?: string;
};

const WIDTH = 128;
const HEIGHT = 44;
const KICK = 480;

export function NumberStepper({
  value,
  onValueChange,
  min = 0,
  max = 10,
  step = 1,
  formatValue = (value: number) => value.toLocaleString("en-US"),
  label = "Quantity",
  decreaseLabel = "Decrease",
  increaseLabel = "Increase",
}: NumberStepperProps) {
  const stretch = useMotionValue(0);
  const width = useTransform(stretch, (s) => WIDTH + Math.abs(s));
  const height = useTransform(stretch, (s) => HEIGHT * Math.sqrt(WIDTH / (WIDTH + Math.abs(s))));
  const x = useTransform(stretch, (s) => Math.min(0, s));

  function stepTo(target: number) {
    const next = Math.min(max, Math.max(min, target));
    if (next !== value) onValueChange(next);
    else if (target !== value) animate(stretch, 0, { ...snap, velocity: target > value ? KICK : -KICK });
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const targets: Record<string, number> = { ArrowUp: value + step, ArrowDown: value - step, Home: min, End: max };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    stepTo(target);
  }

  return (
    <div role="group" aria-label={label} onKeyDown={onKeyDown} className="relative h-11 w-32">
      <motion.div
        style={{ width, height, x }}
        className="absolute top-1/2 left-0 flex -translate-y-1/2 items-center justify-between rounded-full bg-paper px-1 text-[15px] font-medium text-ink shadow-float outline-offset-2 has-focus-visible:outline-2 has-focus-visible:outline-ink"
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label={decreaseLabel}
          onClick={() => stepTo(value - step)}
          className="grid size-9 place-items-center rounded-full outline-none"
        >
          <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current" strokeWidth={2.25} strokeLinecap="round">
            <path d="M5 12h14" />
          </svg>
        </button>
        <span
          role="spinbutton"
          tabIndex={0}
          aria-label={label}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuetext={formatValue(value)}
          className="outline-none"
        >
          <NumberTicker value={value} format={formatValue} />
        </span>
        <button
          type="button"
          tabIndex={-1}
          aria-label={increaseLabel}
          onClick={() => stepTo(value + step)}
          className="grid size-9 place-items-center rounded-full outline-none"
        >
          <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current" strokeWidth={2.25} strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </motion.div>
    </div>
  );
}
