import { useState } from "react";
import { useControllable } from "../../../controllable";
import { useField } from "../Field/Field";
import { Input, type InputProps } from "../Input/Input";

export type NumberInputProps = Omit<InputProps, "value" | "defaultValue" | "onValueChange" | "type" | "min" | "max" | "step"> & {
  value?: number | null;
  defaultValue?: number | null;
  onValueChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  formatValue?: (value: number) => string;
  parseValue?: (text: string) => number | null;
};

export function NumberInput({
  value: valueProp,
  defaultValue = null,
  onValueChange,
  min,
  max,
  step = 1,
  formatValue = (value: number) => value.toLocaleString("en-US"),
  parseValue = (text: string) => text.trim() === "" ? null : Number(text.replaceAll(",", "")),
  inputMode = "decimal",
  name,
  form,
  disabled,
  readOnly,
  onFocus,
  onBlur,
  onKeyDown,
  ...props
}: NumberInputProps) {
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  const field = useField();
  const [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState("");

  function readDraft() {
    const parsed = parseValue(draft);
    return parsed !== null && Number.isNaN(parsed) ? value : parsed;
  }

  function commit(next: number | null) {
    const clamped = next === null ? null : Math.min(max ?? Infinity, Math.max(min ?? -Infinity, next));
    setValue(clamped);
    setDraft(clamped === null ? "" : String(clamped));
  }

  return (
    <>
      <Input
        {...props}
        type="text"
        role="spinbutton"
        inputMode={inputMode}
        form={form}
        disabled={disabled}
        readOnly={readOnly}
        aria-valuenow={value ?? undefined}
        aria-valuemin={min}
        aria-valuemax={max}
        value={focused ? draft : value === null ? "" : formatValue(value)}
        onValueChange={setDraft}
        onFocus={(event) => {
          setDraft(value === null ? "" : String(value));
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          if (!readOnly) commit(readDraft());
          setFocused(false);
          onBlur?.(event);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (readOnly || event.defaultPrevented) return;
          if (event.key === "Enter") {
            event.preventDefault();
            commit(readDraft());
          } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
            commit((readDraft() ?? 0) + (event.key === "ArrowUp" ? step : -step));
          }
        }}
      />
      {name && <input type="hidden" name={name} form={form} value={value ?? ""} disabled={field?.disabled || disabled} />}
    </>
  );
}
