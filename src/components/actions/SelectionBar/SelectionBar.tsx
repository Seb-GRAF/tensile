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
            className={`tn:inline-flex tn:h-11 tn:items-center tn:gap-1 tn:rounded-control dark tn:bg-paper tn:pr-1.5 tn:pl-4 tn:text-label tn:font-medium tn:text-ink tn:shadow-float tn:surface ${className}`}
          >
            <NumberTicker value={count} format={countLabel} className="tn:mr-2" />
            {children}
            <IconButton label={clearLabel} variant="ghost" size="sm" onClick={onClear} className="tn:text-muted">
              <Icon size={16}>{icons.close}</Icon>
            </IconButton>
          </motion.div>
        )}
      </AnimatePresence>
      <span role="status" className="tn:sr-only">
        {count > 0 && countLabel(count)}
      </span>
    </>
  );
}
