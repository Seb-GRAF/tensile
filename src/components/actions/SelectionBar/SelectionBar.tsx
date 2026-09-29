import { AnimatePresence, motion } from "motion/react";
import { icons } from "../../../icons";
import { useSprings } from "../../../springs";
import { Icon } from "../../data-display/Icon/Icon";
import { NumberTicker } from "../../data-display/NumberTicker/NumberTicker";
import { IconButton } from "../IconButton/IconButton";

export type SelectionBarProps = {
  /** The number of selected items; 0 hides the bar. */
  count: number;
  onClear: () => void;
  /** The actions, e.g. ghost Buttons. */
  children: React.ReactNode;
  label?: string;
  countLabel?: (count: number) => string;
  clearLabel?: string;
  className?: string;
};

export function SelectionBar({
  count,
  onClear,
  children,
  label = "Selection",
  countLabel = (count: number) => `${count} selected`,
  clearLabel = "Clear selection",
  className = "",
}: SelectionBarProps) {
  const { scale, shape, swap } = useSprings();

  return (
    <>
      <AnimatePresence initial={false}>
        {count > 0 && (
          <motion.div
            key="bar"
            role="group"
            aria-label={label}
            initial={{ ...swap.initial, y: 16 }}
            animate={{ ...swap.animate, y: 0, transition: { ...swap.animate.transition, y: { ...shape, delay: 0.1 * scale } } }}
            exit={{ ...swap.exit, y: 16 }}
            className={`inline-flex h-11 items-center gap-1 rounded-control bg-ink pr-1.5 pl-4 text-label font-medium text-paper shadow-float surface [--color-focus:var(--color-paper)] [--ghost-hover:var(--color-ink-3)] [--color-line:var(--color-ink-3)] ${className}`}
          >
            <NumberTicker value={count} format={countLabel} className="mr-2" />
            {children}
            <IconButton label={clearLabel} variant="ghost" size="sm" onClick={onClear} className="text-paper/55">
              <Icon size={16}>{icons.close}</Icon>
            </IconButton>
          </motion.div>
        )}
      </AnimatePresence>
      <span role="status" className="sr-only">
        {count > 0 && countLabel(count)}
      </span>
    </>
  );
}
