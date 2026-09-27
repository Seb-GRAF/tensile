import { AnimatePresence, motion, useMotionTemplate } from "motion/react";
import { useId, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { shape, swap, useLiquid } from "../springs";

export type DatePickerProps = {
  /** The picked day as "YYYY-MM-DD". */
  value: string;
  onValueChange: (value: string) => void;
  /** 0 is Sunday, as in `Date.getDay()`. */
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  formatMonth?: (month: Date) => string;
  formatWeekday?: (day: Date) => string;
  formatDay?: (day: Date) => string;
  previousLabel?: string;
  nextLabel?: string;
};

const STEP = 36;

const monthSwap = {
  enter: (direction: number) => ({ ...swap.initial, x: direction * 12 }),
  center: { ...swap.animate, x: 0 },
  exit: (direction: number) => ({ ...swap.exit, x: direction * -12 }),
};

function toDate(day: string) {
  const [year, month, date] = day.split("-").map(Number);
  return new Date(year, month - 1, date);
}

function toDay(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function addMonths(date: Date, months: number) {
  const last = new Date(date.getFullYear(), date.getMonth() + months + 1, 0).getDate();
  return new Date(date.getFullYear(), date.getMonth() + months, Math.min(date.getDate(), last));
}

function Selection({ index, children }: { index: number; children: React.ReactNode }) {
  const row = Math.floor(index / 7);
  const column = index % 7;
  const [left, right] = useLiquid(column * STEP, (6 - column) * STEP);
  const [top, bottom] = useLiquid(row * STEP, (5 - row) * STEP);
  const clip = useMotionTemplate`inset(${top}px ${right}px ${bottom}px ${left}px round 999px)`;

  return (
    <motion.span
      aria-hidden
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={shape}
      style={{ transformOrigin: `${column * STEP + 16}px ${row * STEP + 16}px` }}
      className="pointer-events-none absolute inset-0"
    >
      <motion.span style={{ left, right, top, bottom }} className="absolute rounded-full bg-ink" />
      <motion.span
        style={{ clipPath: clip }}
        className="absolute inset-0 grid grid-cols-[repeat(7,32px)] gap-1 text-[13px] font-medium text-paper"
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

export function DatePicker({
  value,
  onValueChange,
  firstDayOfWeek = 0,
  formatMonth = (month: Date) => month.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
  formatWeekday = (day: Date) => day.toLocaleDateString("en-US", { weekday: "short" }),
  formatDay = (day: Date) => day.toLocaleDateString("en-US", { day: "numeric" }),
  previousLabel = "Previous month",
  nextLabel = "Next month",
}: DatePickerProps) {
  const [focused, setFocused] = useState(value);
  const [direction, setDirection] = useState(1);
  const days = useRef<Record<string, HTMLButtonElement | null>>({});
  const titleId = useId();
  const current = toDate(focused);
  const year = current.getFullYear();
  const month = current.getMonth();
  const offset = (new Date(year, month, 1).getDay() - firstDayOfWeek + 7) % 7;
  const cells = Array.from({ length: 42 }, (_, i) => {
    const date = new Date(year, month, i + 1 - offset);
    return date.getMonth() === month ? toDay(date) : null;
  });
  const selected = cells.indexOf(value);
  const today = toDay(new Date());

  function goTo(day: string) {
    setDirection(day > focused ? 1 : -1);
    setFocused(day);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const date = current.getDate();
    const column = cells.indexOf(focused) % 7;
    const targets: Record<string, Date> = {
      ArrowLeft: new Date(year, month, date - 1),
      ArrowRight: new Date(year, month, date + 1),
      ArrowUp: new Date(year, month, date - 7),
      ArrowDown: new Date(year, month, date + 7),
      Home: new Date(year, month, date - column),
      End: new Date(year, month, date + 6 - column),
      PageUp: addMonths(current, -1),
      PageDown: addMonths(current, 1),
    };
    const target = targets[event.key];
    if (!target) return;
    event.preventDefault();
    const day = toDay(target);
    flushSync(() => goTo(day));
    days.current[day]!.focus();
  }

  return (
    <div className="rounded-3xl bg-paper p-3 shadow-float">
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label={previousLabel}
          onClick={() => goTo(toDay(addMonths(current, -1)))}
          className="grid size-8 place-items-center rounded-full text-ink outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4 fill-none stroke-current"
            strokeWidth={2.25}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m14.5 7-5 5 5 5" />
          </svg>
        </button>
        <div
          id={titleId}
          aria-live="polite"
          className="grid place-content-center place-items-center text-[15px] font-semibold text-ink"
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.span
              key={focused.slice(0, 7)}
              custom={direction}
              variants={monthSwap}
              initial="enter"
              animate="center"
              exit="exit"
              className="col-start-1 row-start-1"
            >
              {formatMonth(new Date(year, month, 1))}
            </motion.span>
          </AnimatePresence>
        </div>
        <button
          type="button"
          aria-label={nextLabel}
          onClick={() => goTo(toDay(addMonths(current, 1)))}
          className="grid size-8 place-items-center rounded-full text-ink outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4 fill-none stroke-current"
            strokeWidth={2.25}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9.5 7 5 5-5 5" />
          </svg>
        </button>
      </div>
      <div role="grid" aria-labelledby={titleId} onKeyDown={onKeyDown} className="mt-2 grid gap-1">
        <div role="row" className="grid grid-cols-[repeat(7,32px)] gap-1">
          {Array.from({ length: 7 }, (_, i) => (
            <span
              key={i}
              role="columnheader"
              className="flex h-6 items-center justify-center text-[11px] font-medium text-muted"
            >
              {formatWeekday(new Date(year, month, i + 1 - offset))}
            </span>
          ))}
        </div>
        <div className="grid">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={focused.slice(0, 7)}
              role="rowgroup"
              custom={direction}
              variants={monthSwap}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative col-start-1 row-start-1 grid gap-1"
            >
              {Array.from({ length: 6 }, (_, row) => (
                <div key={row} role="row" className="grid h-8 grid-cols-[repeat(7,32px)] gap-1">
                  {cells.slice(row * 7, row * 7 + 7).map((day, column) =>
                    day ? (
                      <button
                        key={day}
                        ref={(el) => {
                          days.current[day] = el;
                        }}
                        type="button"
                        role="gridcell"
                        aria-selected={day === value}
                        aria-current={day === today ? "date" : undefined}
                        tabIndex={day === focused ? 0 : -1}
                        onClick={() => {
                          setFocused(day);
                          onValueChange(day);
                        }}
                        className="relative flex size-8 items-center justify-center rounded-full text-[13px] font-medium text-ink outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
                      >
                        {formatDay(toDate(day))}
                        {day === today && (
                          <span className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-current" />
                        )}
                      </button>
                    ) : (
                      <span key={column} role="gridcell" />
                    ),
                  )}
                </div>
              ))}
              <AnimatePresence initial={false}>
                {selected !== -1 && (
                  <Selection key="selection" index={selected}>
                    {cells.map((day, i) => (
                      <span key={i} className="relative flex h-8 items-center justify-center">
                        {day && formatDay(toDate(day))}
                        {day === today && (
                          <span className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-current" />
                        )}
                      </span>
                    ))}
                  </Selection>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
