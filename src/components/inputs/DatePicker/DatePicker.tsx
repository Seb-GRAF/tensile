import { AnimatePresence, motion, useMotionTemplate, useTransform } from "motion/react";
import { CalendarView, type CalendarViewProps } from "../../../CalendarView";
import { useControllable } from "../../../controllable";
import { useLiquid, useSprings } from "../../../springs";
import { useField } from "../Field/Field";

export type DatePickerProps = Omit<CalendarViewProps, "value" | "onValueChange" | "isSelected" | "onDayHover" | "selection" | "multiple"> & {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string) => void;
  name?: string;
  className?: string;
};

function Selection({ index, rows, children }: { index: number; rows: number; children: React.ReactNode }) {
  const { shape } = useSprings();
  const row = Math.floor(index / 7);
  const column = index % 7;
  const [left, right] = useLiquid(column, 6 - column);
  const leftInset = useTransform(left, (value) => `calc(${value * 100 / 7}% + ${value * 4 / 7}px)`);
  const rightInset = useTransform(right, (value) => `calc(${value * 100 / 7}% + ${value * 4 / 7}px)`);
  const [top, bottom] = useLiquid(row * 36, (rows - 1 - row) * 36);
  const clip = useMotionTemplate`inset(${top}px ${rightInset} ${bottom}px ${leftInset} round var(--tn-radius-control))`;

  return (
    <motion.span
      aria-hidden
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={shape}
      style={{ transformOrigin: `${(column + 0.5) * 100 / 7}% ${row * 36 + 16}px` }}
      className="tn:pointer-events-none tn:absolute tn:inset-0"
    >
      <motion.span style={{ left: leftInset, right: rightInset, top, bottom }} className="tn:absolute tn:rounded-control tn:bg-ink" />
      <motion.span style={{ clipPath: clip }} className="tn:absolute tn:inset-0 tn:grid tn:grid-cols-7 tn:gap-1 tn:text-label tn:font-medium tn:text-paper">
        {children}
      </motion.span>
    </motion.span>
  );
}

export function DatePicker({
  value: valueProp,
  defaultValue = null,
  onValueChange,
  name,
  disabled = false,
  className = "",
  ...props
}: DatePickerProps) {
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  const field = useField();
  return (
    <div className={className}>
      {name && <input type="hidden" name={name} value={value ?? ""} disabled={field?.disabled || disabled} />}
      <CalendarView
        {...props}
        value={value}
        onValueChange={setValue}
        disabled={disabled}
        isSelected={(day) => day === value}
        selection={(cells, labels) => {
          const selected = value === null ? -1 : cells.indexOf(value);
          return (
            <AnimatePresence initial={false}>
              {selected !== -1 && <Selection key="selection" index={selected} rows={cells.length / 7}>{labels}</Selection>}
            </AnimatePresence>
          );
        }}
      />
    </div>
  );
}
