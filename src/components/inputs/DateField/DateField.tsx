import { useRef, useState } from "react";
import { clampDay, formatUSDate, parseUSDate } from "../../../calendar";
import { useControllable } from "../../../controllable";
import { Expand } from "../../../Expand";
import { useOutsidePress } from "../../../overlay";
import { useSize } from "../../../useSize";
import { Icon } from "../../data-display/Icon/Icon";
import { DatePicker, type DatePickerProps } from "../DatePicker/DatePicker";
import { FieldContext, useField } from "../Field/Field";
import { Input, type InputProps } from "../Input/Input";

export type DateFieldProps = Omit<InputProps, "value" | "defaultValue" | "onValueChange" | "type" | "min" | "max" | "ref" | "trailing"> &
  Pick<DatePickerProps, "firstDayOfWeek" | "formatMonth" | "formatWeekday" | "formatDay" | "previousLabel" | "nextLabel" | "todayLabel"> & {
    /** The date as YYYY-MM-DD, or null when empty. */
    value?: string | null;
    defaultValue?: string | null;
    onValueChange?: (value: string | null) => void;
    min?: string;
    max?: string;
    /** Text shown for a YYYY-MM-DD date. */
    formatDate?: (day: string) => string;
    /** Reads typed text as YYYY-MM-DD, or null when it isn't a date. */
    parseDate?: (text: string) => string | null;
    calendarLabel?: string;
  };

export function DateField({
  value: valueProp,
  defaultValue = null,
  onValueChange,
  min,
  max,
  formatDate = formatUSDate,
  parseDate = parseUSDate,
  placeholder = "MM/DD/YYYY",
  calendarLabel = "Choose date",
  firstDayOfWeek,
  formatMonth,
  formatWeekday,
  formatDay,
  previousLabel,
  nextLabel,
  todayLabel,
  name,
  form,
  disabled = false,
  onFocus,
  onBlur,
  onKeyDown,
  ...props
}: DateFieldProps) {
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  const field = useField();
  const isDisabled = field?.disabled || disabled;
  const [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState("");
  const [open, setOpen] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const [size, measure] = useSize();
  useOutsidePress(root, open, () => setOpen(false));

  function readDraft() {
    if (draft.trim() === "") return null;
    const day = parseDate(draft);
    return day !== null && clampDay(day, min, max) === day ? day : value;
  }

  function commit(next: string | null) {
    setValue(next);
    setDraft(next === null ? "" : formatDate(next));
  }

  function close() {
    setOpen(false);
    input.current!.focus();
  }

  return (
    <>
      <Input
        {...props}
        ref={input}
        type="text"
        form={form}
        disabled={disabled}
        placeholder={placeholder}
        value={focused ? draft : value === null ? "" : formatDate(value)}
        onValueChange={setDraft}
        onFocus={(event) => {
          setDraft(value === null ? "" : formatDate(value));
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          commit(readDraft());
          setFocused(false);
          onBlur?.(event);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) return;
          if (event.key === "Enter") {
            event.preventDefault();
            commit(readDraft());
          } else if (event.altKey && event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        trailing={
          <div ref={root} className="tn:surface tn:-mr-2.5">
            <Expand
              open={open}
              onOpenChange={(next) => next ? setOpen(true) : close()}
              closed={{ width: 32, height: 32, radius: "var(--tn-radius-control)" }}
              opened={{ width: 320, height: size?.height ?? 32, radius: "var(--tn-radius-card)" }}
              anchor="bottom-right"
              label={calendarLabel}
              disabled={isDisabled}
              panelLabel={calendarLabel}
              trigger={
                <span className="tn:grid tn:h-full tn:place-items-center tn:text-muted">
                  <Icon name="calendar" />
                </span>
              }
              className="tn:bg-paper tn:text-ink"
            >
              <div ref={measure}>
                <FieldContext value={{ disabled: isDisabled }}>
                  <DatePicker
                    value={value}
                    onValueChange={(day) => {
                      close();
                      commit(day);
                    }}
                    min={min}
                    max={max}
                    firstDayOfWeek={firstDayOfWeek}
                    formatMonth={formatMonth}
                    formatWeekday={formatWeekday}
                    formatDay={formatDay}
                    previousLabel={previousLabel}
                    nextLabel={nextLabel}
                    todayLabel={todayLabel}
                  />
                </FieldContext>
              </div>
            </Expand>
          </div>
        }
      />
      {name && <input type="hidden" name={name} form={form} value={value ?? ""} disabled={isDisabled} />}
    </>
  );
}
