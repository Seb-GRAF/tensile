import { AnimatePresence, motion } from "motion/react";
import { useId, useRef, useState } from "react";
import { Expand } from "../../../Expand";
import { useOutsidePress } from "../../../overlay";
import { useSprings } from "../../../springs";
import { useSize } from "../../../useSize";
import { Icon } from "../../data-display/Icon/Icon";
import { ErrorRow, FloatingLabel, useField } from "../Field/Field";
import { Wheels } from "../TimeWheel/TimeWheel";

type Time = { hours: number; minutes: number };

export type TimePickerProps = {
  /** Hours 0–23, or null while no time is chosen. */
  value: Time | null;
  onValueChange: (value: Time) => void;
  placeholder?: string;
  label?: string;
  formatTime?: (value: Time) => string;
  /** Minutes between two rows of the minutes wheel. */
  minuteStep?: number;
  formatNumber?: (value: number) => string;
  amLabel?: string;
  pmLabel?: string;
  hoursLabel?: string;
  minutesLabel?: string;
  periodLabel?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};

export function TimePicker({
  value,
  onValueChange,
  placeholder = "Select time",
  label = "Time",
  formatTime = (value: Time) =>
    new Date(2000, 0, 1, value.hours, value.minutes).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
  minuteStep = 1,
  formatNumber = (value: number) => value.toLocaleString("en-US", { minimumIntegerDigits: 2 }),
  amLabel = "AM",
  pmLabel = "PM",
  hoursLabel = "Hours",
  minutesLabel = "Minutes",
  periodLabel = "AM/PM",
  id,
  name,
  disabled = false,
  required = false,
  className = "",
}: TimePickerProps) {
  const { shape, swap } = useSprings();
  const field = useField();
  const inside = field?.inside;
  const isDisabled = field?.disabled || disabled;
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const [size, measure] = useSize();
  const [errorSize, measureError] = useSize();
  const labelId = useId();
  const valueId = useId();
  useOutsidePress(root, open, () => setOpen(false));
  const text = value ? formatTime(value) : placeholder;
  const floated = focused || value !== null;
  const height = (inside ? 52 : 44) + (inside?.error && errorSize ? errorSize.height : 0);

  return (
    <motion.div
      ref={root}
      data-label-inside={inside ? true : undefined}
      initial={false}
      animate={{ height }}
      transition={shape}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={className}
    >
      {name && (
        <input
          type="hidden"
          name={name}
          value={value ? `${String(value.hours).padStart(2, "0")}:${String(value.minutes).padStart(2, "0")}` : ""}
          disabled={isDisabled}
        />
      )}
      {!field?.labelId && <span id={labelId} hidden>{label}</span>}
      <div ref={measure}>
        {size && (
          <Expand
            open={open}
            onOpenChange={setOpen}
            closed={{ width: size.width, height, radius: inside?.error ? "var(--radius-overlay)" : "var(--radius-control)" }}
            opened={{ width: size.width, height: 216, radius: "var(--radius-overlay)" }}
            anchor="bottom-left"
            id={field?.id ?? id}
            labelledBy={`${field?.labelId ?? labelId} ${valueId}`}
            describedBy={field?.describedBy}
            invalid={field?.invalid}
            disabled={isDisabled}
            panelLabel={label}
            trigger={
              <span className="flex h-full flex-col text-left">
                <span className={`flex items-center gap-2.5 ${inside ? "h-13 px-5 text-body" : "h-11 px-4 text-sm font-medium"}`}>
                  <span id={valueId} className="sr-only">{text}</span>
                  <span aria-hidden className={`grid min-w-0 grow grid-cols-1 ${inside ? "relative h-full pt-6 pb-2" : ""}`}>
                    {inside && <FloatingLabel floated={floated} className="left-0">{inside.label}</FloatingLabel>}
                    <AnimatePresence initial={false}>
                      {(!inside || floated) && <motion.span key={text} {...swap} className={`col-start-1 row-start-1 truncate ${value ? "text-ink" : "text-muted"}`}>{text}</motion.span>}
                    </AnimatePresence>
                  </span>
                  <Icon className="shrink-0 text-muted">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </Icon>
                </span>
                {inside && (
                  <span ref={measureError}>
                    <ErrorRow aria-hidden error={inside.error} />
                  </span>
                )}
              </span>
            }
            className="bg-paper text-ink"
          >
            <div
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  setOpen(false);
                }
              }}
              className="relative flex justify-center p-2 text-body font-medium tabular-nums"
            >
              <Wheels
                value={value ?? { hours: 0, minutes: 0 }}
                onValueChange={onValueChange}
                minuteStep={minuteStep}
                formatNumber={formatNumber}
                amLabel={amLabel}
                pmLabel={pmLabel}
                hoursLabel={hoursLabel}
                minutesLabel={minutesLabel}
                periodLabel={periodLabel}
                disabled={isDisabled}
                required={field?.required || required}
              />
            </div>
          </Expand>
        )}
      </div>
    </motion.div>
  );
}
