import { AnimatePresence, motion } from "motion/react";
import { Check } from "../../../Check";
import { useSprings } from "../../../springs";

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
      animate={{ backgroundColor: done ? "var(--tn-color-accent)" : "var(--tn-color-ink)" }}
      transition={soft}
      className={`tn:grid tn:size-11 tn:place-items-center tn:rounded-full tn:shadow-control ${className}`}
    >
      <motion.svg
        viewBox="0 0 28 28"
        initial={false}
        animate={{ opacity: done ? 0 : 1 }}
        transition={soft}
        className="tn:col-start-1 tn:row-start-1 tn:size-7 tn:-rotate-90 tn:fill-none"
        strokeWidth={3}
        strokeLinecap="round"
      >
        <circle cx="14" cy="14" r="12" className="tn:stroke-ink-3" />
        <motion.circle
          cx="14"
          cy="14"
          r="12"
          initial={false}
          animate={{ pathLength: value, opacity: value > 0 ? 1 : 0 }}
          transition={soft}
          className="tn:stroke-paper"
        />
      </motion.svg>
      <AnimatePresence initial={false}>
        {done && (
          <motion.span key="done" {...swap} className="tn:col-start-1 tn:row-start-1 tn:text-on-accent">
            <Check size={20} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
