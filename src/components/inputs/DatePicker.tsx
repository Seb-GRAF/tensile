import { AnimatePresence, motion, useMotionTemplate, useTransform } from "motion/react";
import { CalendarView, type CalendarViewProps } from "../../CalendarView";
import { useLiquid, useSprings } from "../../springs";
import { useField } from "./Field";

export type DatePickerProps = Omit<CalendarViewProps, "isSelected" | "onDayHover" | "selection" | "multiple"> & {
  name?: string;
  className?: string;
};

function Selection({ index, children }: { index: number; children: React.ReactNode }) {
  const { shape } = useSprings();
  const row = Math.floor(index / 7);
  const column = index % 7;
  const [left, right] = useLiquid(column, 6 - column);
  const leftInset = useTransform(left, (value) => `calc(${value * 100 / 7}% + ${value * 4 / 7}px)`);
  const rightInset = useTransform(right, (value) => `calc(${value * 100 / 7}% + ${value * 4 / 7}px)`);
  const [top, bottom] = useLiquid(row * 36, (5 - row) * 36);
  const clip = useMotionTemplate`inset(${top}px ${rightInset} ${bottom}px ${leftInset} round var(--radius-control))`;

  return (
    <motion.span
      aria-hidden
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={shape}
      style={{ transformOrigin: `${(column + 0.5) * 100 / 7}% ${row * 36 + 16}px` }}
      className="pointer-events-none absolute inset-0"
    >
      <motion.span style={{ left: leftInset, right: rightInset, top, bottom }} className="absolute rounded-control bg-ink" />
      <motion.span style={{ clipPath: clip }} className="absolute inset-0 grid grid-cols-7 gap-1 text-label font-medium text-paper">
        {children}
      </motion.span>
    </motion.span>
  );
}

export function DatePicker({ value, onValueChange, name, disabled = false, className = "", ...props }: DatePickerProps) {
  const field = useField();
  return (
    <div className={className}>
      {name && <input type="hidden" name={name} value={value ?? ""} disabled={field?.disabled || disabled} />}
      <CalendarView
        {...props}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        isSelected={(day) => day === value}
        selection={(cells, labels) => {
          const selected = value === null ? -1 : cells.indexOf(value);
          return (
            <AnimatePresence initial={false}>
              {selected !== -1 && <Selection key="selection" index={selected}>{labels}</Selection>}
            </AnimatePresence>
          );
        }}
      />
    </div>
  );
}
