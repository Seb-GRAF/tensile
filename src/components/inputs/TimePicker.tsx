import { useId, useState } from "react";
import { Popover } from "../overlays/Popover";
import { FieldContext, useField } from "./Field";
import { TimeWheel } from "./TimeWheel";

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
  const field = useField();
  const isDisabled = field?.disabled || disabled;
  const [open, setOpen] = useState(false);
  const labelId = useId();
  const valueId = useId();

  return (
    <>
      {name && (
        <input
          type="hidden"
          name={name}
          value={value ? `${String(value.hours).padStart(2, "0")}:${String(value.minutes).padStart(2, "0")}` : ""}
          disabled={isDisabled}
        />
      )}
      {!field?.labelId && <span id={labelId} hidden>{label}</span>}
      <Popover
        open={open}
        onOpenChange={setOpen}
        trigger={<span id={valueId} className={value ? undefined : "text-muted"}>{value ? formatTime(value) : placeholder}</span>}
        panelLabel={label}
        panelWidth={184}
        id={field?.id ?? id}
        disabled={isDisabled}
        aria-labelledby={`${field?.labelId ?? labelId} ${valueId}`}
        aria-describedby={field?.describedBy}
        aria-invalid={field?.invalid}
        className={className}
      >
        <FieldContext value={{ disabled: isDisabled }}>
          <div
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                setOpen(false);
              }
            }}
          >
            <TimeWheel
              value={value ?? { hours: 0, minutes: 0 }}
              onValueChange={onValueChange}
              minuteStep={minuteStep}
              formatNumber={formatNumber}
              amLabel={amLabel}
              pmLabel={pmLabel}
              label={label}
              hoursLabel={hoursLabel}
              minutesLabel={minutesLabel}
              periodLabel={periodLabel}
              required={field?.required || required}
            />
          </div>
        </FieldContext>
      </Popover>
    </>
  );
}
