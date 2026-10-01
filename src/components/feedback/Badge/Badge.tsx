import { AnimatePresence, motion } from "motion/react";
import { useSprings } from "../../../springs";
import { NumberTicker } from "../../data-display/NumberTicker/NumberTicker";

export type BadgeProps = {
  /** A count, or null for something new without a number. 0 hides the badge. */
  count: number | null;
  format?: (value: number) => string;
  /** Text for screen readers. */
  label?: (count: number | null) => string;
  className?: string;
};

export function Badge({
  count,
  format = (value: number) => value.toLocaleString("en-US"),
  label = (count: number | null) => (count === null ? "New" : `${format(count)} new`),
  className = "",
}: BadgeProps) {
  const { shape, soft, swap } = useSprings();
  return (
    <motion.span
      initial={false}
      animate={
        count === null
          ? { width: 10, height: 10, opacity: 1, backgroundColor: "var(--tn-color-paper)" }
          : count === 0
            ? { width: 0, height: 0, opacity: 0, backgroundColor: "var(--tn-color-accent)" }
            : { width: "auto", height: 20, opacity: 1, backgroundColor: "var(--tn-color-accent)" }
      }
      transition={{ width: shape, height: shape, opacity: soft, backgroundColor: soft }}
      className={`tn:inline-grid tn:place-content-center tn:place-items-center tn:overflow-hidden tn:rounded-control tn:text-caption tn:leading-5 tn:font-semibold tn:text-on-accent ${className}`}
    >
      {count !== 0 && <span className="tn:sr-only">{label(count)}</span>}
      <AnimatePresence initial={false}>
        {count !== null && count !== 0 && (
          <motion.span key="count" aria-hidden {...swap} className="tn:col-start-1 tn:row-start-1 tn:flex tn:min-w-5 tn:justify-center tn:px-1.5">
            <NumberTicker value={count} format={format} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.span>
  );
}
