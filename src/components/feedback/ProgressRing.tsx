import { AnimatePresence, motion } from "motion/react";
import { Check } from "../../Check";
import { useSprings } from "../../springs";

export type ProgressRingProps = {
  /** 0..1 */
  value: number;
  label?: string;
  formatValue?: (value: number) => string;
  /** Read out instead of the value once it reaches 1. */
  doneLabel?: string;
  className?: string;
};

export function ProgressRing({
  value,
  label = "Progress",
  formatValue = (value: number) => value.toLocaleString("en-US", { style: "percent" }),
  doneLabel = "Done",
  className = "",
}: ProgressRingProps) {
  const { soft, swap } = useSprings();
  const done = value === 1;

  return (
    <motion.div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
      aria-valuetext={done ? doneLabel : formatValue(value)}
      initial={false}
      animate={{ backgroundColor: done ? "var(--color-accent)" : "var(--color-ink)" }}
      transition={soft}
      className={`grid size-11 place-items-center rounded-full shadow-control ${className}`}
    >
      <motion.svg
        viewBox="0 0 28 28"
        initial={false}
        animate={{ opacity: done ? 0 : 1 }}
        transition={soft}
        className="col-start-1 row-start-1 size-7 -rotate-90 fill-none"
        strokeWidth={3}
        strokeLinecap="round"
      >
        <circle cx="14" cy="14" r="12" className="stroke-ink-3" />
        <motion.circle
          cx="14"
          cy="14"
          r="12"
          initial={false}
          animate={{ pathLength: value, opacity: value > 0 ? 1 : 0 }}
          transition={soft}
          className="stroke-paper"
        />
      </motion.svg>
      <AnimatePresence initial={false}>
        {done && (
          <motion.span key="done" {...swap} className="col-start-1 row-start-1 text-on-accent">
            <Check size={20} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
