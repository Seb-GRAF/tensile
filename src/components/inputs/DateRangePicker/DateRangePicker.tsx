import { AnimatePresence, motion, useMotionTemplate, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { CalendarView } from "../../../CalendarView";
import { isInRange, orderedRange, type DateRange } from "../../../calendar";
import { useLiquid, useSprings } from "../../../springs";
import type { DatePickerProps } from "../DatePicker/DatePicker";
import { useField } from "../Field/Field";

export type DateRangePickerProps = Omit<DatePickerProps, "value" | "onValueChange" | "name"> & {
  value: DateRange | null;
  onValueChange: (value: DateRange) => void;
  startName?: string;
  endName?: string;
};

function RangeRow({ row, start, end, preview, children }: { row: number; start: number; end: number; preview: boolean; children: React.ReactNode }) {
  const { shape, soft } = useSprings();
  const [left, right] = useLiquid(start, 6 - end);
  const leftInset = useTransform(left, (value) => `calc(${value * 100 / 7}% + ${value * 4 / 7}px)`);
  const rightInset = useTransform(right, (value) => `calc(${value * 100 / 7}% + ${value * 4 / 7}px)`);
  const clip = useMotionTemplate`inset(0px ${rightInset} 0px ${leftInset} round var(--radius-control))`;
  return (
    <motion.span
      aria-hidden
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ opacity: 0, transition: soft }}
      transition={shape}
      style={{ top: row * 36 }}
      className="pointer-events-none absolute inset-x-0 h-8"
    >
      <motion.span
        style={{ left: leftInset, right: rightInset }}
        initial={false}
        animate={{ opacity: preview ? 0.1 : 1 }}
        transition={soft}
        className="absolute inset-y-0 rounded-control bg-ink"
      />
      <motion.span
        style={{ clipPath: clip }}
        initial={false}
        animate={{ opacity: preview ? 0 : 1 }}
        transition={soft}
        className="absolute inset-0 grid grid-cols-7 gap-1 text-label font-medium text-paper"
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

function RangeEnd({ index, children }: { index: number; children: React.ReactNode }) {
  const { shape } = useSprings();
  const column = index % 7;
  return (
    <motion.span
      aria-hidden
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={shape}
      style={{ top: Math.floor(index / 7) * 36, left: `calc(${column * 100 / 7}% + ${column * 4 / 7}px)` }}
      className="pointer-events-none absolute h-8 w-[calc((100%-24px)/7)] rounded-control bg-accent text-label font-medium text-on-accent"
    >
      {children}
    </motion.span>
  );
}

export function DateRangePicker({
  value,
  onValueChange,
  firstDayOfWeek = 0,
  startName,
  endName,
  disabled = false,
  className = "",
  ...props
}: DateRangePickerProps) {
  const field = useField();
  const [start, setStart] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const range = start ? orderedRange(start, hovered ?? start) : value;

  useEffect(() => { setStart(null); setHovered(null); }, [value]);

  function pick(day: string) {
    if (start === null) {
      setStart(day);
      setHovered(day);
    } else {
      onValueChange(orderedRange(start, day));
      setStart(null);
      setHovered(null);
    }
  }

  return (
    <div className={className}>
      {startName && <input type="hidden" name={startName} value={value?.start ?? ""} disabled={field?.disabled || disabled} />}
      {endName && <input type="hidden" name={endName} value={value?.end ?? ""} disabled={field?.disabled || disabled} />}
      <CalendarView
        {...props}
        value={value?.start ?? null}
        onValueChange={pick}
        firstDayOfWeek={firstDayOfWeek}
        disabled={disabled}
        multiple
        onDayHover={setHovered}
        isSelected={(day) => range !== null && isInRange(day, range)}
        selection={(cells, labels) => (
          <AnimatePresence initial={false}>
            {range && Array.from({ length: cells.length / 7 }, (_, row) => {
              const selected = cells.slice(row * 7, row * 7 + 7)
                .map((day, column) => day && isInRange(day, range) ? column : -1)
                .filter((column) => column !== -1);
              return selected.length > 0 && (
                <RangeRow key={row} row={row} start={selected[0]} end={selected[selected.length - 1]} preview={start !== null}>
                  {labels.slice(row * 7, row * 7 + 7)}
                </RangeRow>
              );
            })}
            {start === null && value && (["start", "end"] as const).map((end) => {
              const index = cells.indexOf(value[end]);
              return index !== -1 && <RangeEnd key={`${end}-${value[end]}`} index={index}>{labels[index]}</RangeEnd>;
            })}
          </AnimatePresence>
        )}
      />
    </div>
  );
}
