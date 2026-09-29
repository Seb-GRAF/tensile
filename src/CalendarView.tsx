import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { useId, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { addMonths, clampDay, keyboardDay, monthDays, toDate, toDay } from "./calendar";
import { icons } from "./icons";
import { useSprings } from "./springs";
import { IconButton } from "./components/actions/IconButton/IconButton";
import { Icon } from "./components/data-display/Icon/Icon";
import { useField } from "./components/inputs/Field/Field";

export type CalendarViewProps = {
  value: string | null;
  onValueChange: (day: string) => void;
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  formatMonth?: (month: Date) => string;
  formatWeekday?: (day: Date) => string;
  formatDay?: (day: Date) => string;
  previousLabel?: string;
  nextLabel?: string;
  min?: string;
  max?: string;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  multiple?: boolean;
  isSelected: (day: string) => boolean;
  onDayHover?: (day: string | null) => void;
  selection: (cells: (string | null)[], labels: React.ReactNode[]) => React.ReactNode;
};

function CalendarMonth({ direction, children }: { direction: number; children: React.ReactNode }) {
  const { swap } = useSprings();
  const present = useIsPresent();
  return (
    <motion.div
      role="rowgroup"
      inert={!present}
      aria-hidden={!present}
      custom={direction}
      variants={{
        enter: (direction: number) => ({ ...swap.initial, x: direction * 12 }),
        center: { ...swap.animate, x: 0 },
        exit: (direction: number) => ({ ...swap.exit, x: direction * -12 }),
      }}
      initial="enter"
      animate="center"
      exit="exit"
      className="relative col-start-1 row-start-1 grid gap-1"
    >
      {children}
    </motion.div>
  );
}

export function CalendarView({
  value,
  onValueChange,
  firstDayOfWeek = 0,
  formatMonth = (month: Date) => month.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
  formatWeekday = (day: Date) => day.toLocaleDateString("en-US", { weekday: "short" }),
  formatDay = (day: Date) => day.toLocaleDateString("en-US", { day: "numeric" }),
  previousLabel = "Previous month",
  nextLabel = "Next month",
  min,
  max,
  id,
  disabled = false,
  required = false,
  multiple = false,
  isSelected,
  onDayHover,
  selection,
}: CalendarViewProps) {
  const { shape, swap } = useSprings();
  const field = useField();
  disabled = field?.disabled || disabled;
  const [focused, setFocused] = useState(() => clampDay(value ?? toDay(new Date()), min, max));
  const [direction, setDirection] = useState(1);
  const days = useRef<Record<string, HTMLButtonElement | null>>({});
  const titleId = useId();
  const day = clampDay(focused, min, max);
  const current = toDate(day);
  const month = day.slice(0, 7);
  const grid = monthDays(current, firstDayOfWeek);
  const rows = grid.filter((day, i) => i % 7 === 0 && day.slice(0, 7) <= month).length;
  const cells = grid.slice(0, rows * 7).map((day) => day.slice(0, 7) === month ? day : null);
  const today = toDay(new Date());
  const title = formatMonth(toDate(`${month}-01`));
  const labels = cells.map((day, i) => (
    <span key={i} className="relative flex h-8 items-center justify-center">
      {day && formatDay(toDate(day))}
      {day === today && <span className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-current" />}
    </span>
  ));
  const monthSwap = {
    enter: (direction: number) => ({ ...swap.initial, x: direction * 12 }),
    center: { ...swap.animate, x: 0 },
    exit: (direction: number) => ({ ...swap.exit, x: direction * -12 }),
  };

  function goTo(target: string) {
    const next = clampDay(target, min, max);
    setDirection(next > day ? 1 : -1);
    setFocused(next);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const target = keyboardDay(day, event.key, firstDayOfWeek);
    if (!target) return;
    event.preventDefault();
    const next = clampDay(target, min, max);
    flushSync(() => goTo(next));
    days.current[next]!.focus({ preventScroll: true });
  }

  return (
    <div className={`rounded-card bg-paper p-3 shadow-control ${disabled ? "opacity-40" : ""}`}>
      <div className="flex items-center justify-between">
        <IconButton
          label={previousLabel}
          variant="ghost"
          size="sm"
          disabled={disabled || (min !== undefined && month <= min.slice(0, 7))}
          onClick={() => goTo(toDay(addMonths(current, -1)))}
        >
          <Icon>{icons.chevronLeft}</Icon>
        </IconButton>
        <div id={titleId} aria-live="polite" className="grid place-content-center place-items-center text-body font-semibold text-ink">
          <span className="sr-only">{title}</span>
          <AnimatePresence initial={false} custom={direction}>
            <motion.span
              key={month}
              aria-hidden
              custom={direction}
              variants={monthSwap}
              initial="enter"
              animate="center"
              exit="exit"
              className="col-start-1 row-start-1"
            >
              {title}
            </motion.span>
          </AnimatePresence>
        </div>
        <IconButton
          label={nextLabel}
          variant="ghost"
          size="sm"
          disabled={disabled || (max !== undefined && month >= max.slice(0, 7))}
          onClick={() => goTo(toDay(addMonths(current, 1)))}
        >
          <Icon>{icons.chevronRight}</Icon>
        </IconButton>
      </div>
      <div
        id={field?.id ?? id}
        role="grid"
        aria-labelledby={[field?.labelId, titleId].filter(Boolean).join(" ")}
        aria-describedby={field?.describedBy}
        aria-invalid={field?.invalid}
        aria-required={field?.required || required}
        aria-disabled={disabled}
        aria-multiselectable={multiple || undefined}
        onKeyDown={disabled ? undefined : onKeyDown}
        onMouseLeave={disabled ? undefined : () => onDayHover?.(null)}
        className="mt-2 grid gap-1"
      >
        <div role="row" className="grid grid-cols-7 gap-1">
          {grid.slice(0, 7).map((day) => (
            <span key={day} role="columnheader" className="flex h-6 items-center justify-center text-caption font-medium text-muted">
              {formatWeekday(toDate(day))}
            </span>
          ))}
        </div>
        <motion.div initial={false} animate={{ height: rows * 36 - 4 }} transition={shape} className="grid items-start">
          <AnimatePresence initial={false} custom={direction}>
            <CalendarMonth key={month} direction={direction}>
              {Array.from({ length: rows }, (_, row) => (
                <div key={row} role="row" className="grid h-8 grid-cols-7 gap-1">
                  {cells.slice(row * 7, row * 7 + 7).map((cell, column) => cell ? (
                    <button
                      key={cell}
                      ref={(el) => { days.current[cell] = el; }}
                      type="button"
                      role="gridcell"
                      aria-selected={isSelected(cell)}
                      aria-current={cell === today ? "date" : undefined}
                      disabled={disabled || clampDay(cell, min, max) !== cell}
                      tabIndex={cell === day ? 0 : -1}
                      onFocus={() => { setFocused(cell); onDayHover?.(cell); }}
                      onMouseMove={disabled || clampDay(cell, min, max) !== cell ? undefined : () => onDayHover?.(cell)}
                      onClick={() => { setFocused(cell); onValueChange(cell); }}
                      className="relative flex h-8 min-w-0 items-center justify-center rounded-control text-label font-medium text-ink outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus enabled:hover:bg-hover disabled:opacity-40"
                    >
                      {formatDay(toDate(cell))}
                      {cell === today && <span className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-current" />}
                    </button>
                  ) : <span key={column} role="gridcell" />)}
                </div>
              ))}
              {selection(cells, labels)}
            </CalendarMonth>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
