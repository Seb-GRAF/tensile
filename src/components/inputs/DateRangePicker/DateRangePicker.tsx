import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CalendarView, SelectedDay } from "../../../CalendarView";
import { isInRange, orderedRange, type DateRange } from "../../../calendar";
import { useControllable } from "../../../controllable";
import { useSprings } from "../../../springs";
import type { DatePickerProps } from "../DatePicker/DatePicker";
import { useField } from "../Field/Field";

export type DateRangePickerProps = Omit<DatePickerProps, "value" | "defaultValue" | "onValueChange" | "name"> & {
  value?: DateRange | null;
  defaultValue?: DateRange | null;
  onValueChange?: (value: DateRange) => void;
  startName?: string;
  endName?: string;
};

function RangeRow({ row, start, end, anchor }: { row: number; start: number; end: number; anchor: number }) {
  const { shape } = useSprings();
  return (
    <motion.span
      aria-hidden
      custom={anchor}
      variants={{
        open: { "--start": start, "--end": 6 - end },
        closed: (anchor: number) => row > Math.floor(anchor / 7)
          ? { "--start": 0, "--end": 7 }
          : row < Math.floor(anchor / 7) ? { "--start": 7, "--end": 0 } : { "--start": anchor % 7, "--end": 6 - anchor % 7 },
      }}
      initial="closed"
      animate="open"
      exit="closed"
      transition={shape}
      style={{ top: row * 36 }}
      className="tn:pointer-events-none tn:absolute tn:right-[calc(var(--end)*(100%+4px)/7)] tn:left-[calc(var(--start)*(100%+4px)/7)] tn:-z-10 tn:h-8 tn:rounded-control tn:bg-hover"
    />
  );
}

export function DateRangePicker({
  value: valueProp,
  defaultValue = null,
  onValueChange,
  firstDayOfWeek = 0,
  startName,
  endName,
  disabled = false,
  className = "",
  ...props
}: DateRangePickerProps) {
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  const field = useField();
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const range = start ? orderedRange(start, hovered ?? start) : value;

  useEffect(() => { setStart(null); setHovered(null); }, [value]);

  useEffect(() => {
    const form = ref.current!.closest("form");
    if (!form) return;
    function clear() { setStart(null); setHovered(null); }
    form.addEventListener("reset", clear);
    return () => form.removeEventListener("reset", clear);
  }, []);

  function pick(day: string) {
    if (start === null) {
      setStart(day);
      setHovered(day);
    } else {
      setValue(orderedRange(start, day));
      setStart(null);
      setHovered(null);
    }
  }

  return (
    <div ref={ref} className={className}>
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
        selection={(cells, labels) => {
          const anchor = start ?? value?.start;
          const first = cells.find((day) => day !== null)!;
          const anchorIndex = anchor === undefined || anchor < first ? -1 : cells.includes(anchor) ? cells.indexOf(anchor) : cells.length;
          const ends = start ? { start, end: start } : value;
          return (
            <>
              <AnimatePresence initial={false} custom={anchorIndex}>
                {range && Array.from({ length: cells.length / 7 }, (_, row) => {
                  const selected = cells.slice(row * 7, row * 7 + 7)
                    .map((day, column) => day && isInRange(day, range) ? column : -1)
                    .filter((column) => column !== -1);
                  return selected.length > 0 && <RangeRow key={row} row={row} start={selected[0]} end={selected[selected.length - 1]} anchor={anchorIndex} />;
                })}
              </AnimatePresence>
              <AnimatePresence initial={false}>
                {ends && (["start", "end"] as const).map((end) => {
                  const index = cells.indexOf(ends[end]);
                  return index !== -1 && <SelectedDay key={end} index={index} rows={cells.length / 7}>{labels}</SelectedDay>;
                })}
              </AnimatePresence>
            </>
          );
        }}
      />
    </div>
  );
}
