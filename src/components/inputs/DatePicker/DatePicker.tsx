import { AnimatePresence } from "motion/react";
import { CalendarView, SelectedDay, type CalendarViewProps } from "../../../CalendarView";
import { useControllable } from "../../../controllable";
import { useField } from "../Field/Field";

export type DatePickerProps = Omit<CalendarViewProps, "value" | "onValueChange" | "isSelected" | "onDayHover" | "selection" | "multiple"> & {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string) => void;
  name?: string;
  className?: string;
};

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
              {selected !== -1 && <SelectedDay key="selection" index={selected} rows={cells.length / 7}>{labels}</SelectedDay>}
            </AnimatePresence>
          );
        }}
      />
    </div>
  );
}
