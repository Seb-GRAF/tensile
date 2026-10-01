import { motion } from "motion/react";
import { useState } from "react";
import { useControllable } from "../../../controllable";
import { useFocusSource } from "../../../focus";
import { useSprings } from "../../../springs";
import { ErrorRow, FloatingLabel, useField } from "../Field/Field";

export type InputProps = Omit<React.ComponentProps<"input">, "value" | "defaultValue" | "onChange"> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
};

export function Input({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  leading,
  trailing,
  id,
  required,
  disabled,
  onFocus,
  onBlur,
  "aria-labelledby": labelledBy,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  className = "",
  style,
  ...props
}: InputProps) {
  const { shape } = useSprings();
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  const field = useField();
  useFocusSource();
  const [focused, setFocused] = useState(false);
  const inside = field?.inside;
  const input = (
    <input
      {...props}
      id={field?.id ?? id}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onFocus={(event) => { setFocused(true); onFocus?.(event); }}
      onBlur={(event) => { setFocused(false); onBlur?.(event); }}
      required={field?.required || required}
      disabled={field?.disabled || disabled}
      aria-labelledby={field?.labelId ?? labelledBy}
      aria-invalid={field?.invalid || invalid}
      aria-describedby={[field?.describedBy, describedBy].filter(Boolean).join(" ") || undefined}
      className={`tn:h-full tn:min-w-0 tn:grow tn:bg-transparent tn:text-body tn:text-ink tn:outline-none ${inside ? "tn:pt-5 tn:pb-1 tn:placeholder:text-transparent tn:focus:placeholder:text-muted" : "tn:placeholder:text-muted"}`}
    />
  );

  if (!inside) {
    return (
      <div
        style={style}
        className={`tn:flex tn:h-11 tn:items-center tn:gap-2.5 tn:rounded-control tn:bg-paper tn:px-4 tn:text-muted tn:shadow-control tn:outline-offset-2 tn:has-[input:disabled]:opacity-40 tn:has-keyboard-focus:outline-2 tn:has-keyboard-focus:outline-focus ${className}`}
      >
        {leading}
        {input}
        {trailing}
      </div>
    );
  }

  return (
    <motion.div
      data-label-inside
      initial={false}
      animate={{ height: inside.error ? "auto" : 48, borderRadius: inside.error ? "var(--tn-radius-overlay)" : "var(--tn-radius-control)" }}
      transition={shape}
      style={style}
      className={`tn:overflow-hidden tn:bg-paper tn:shadow-control tn:outline-offset-2 tn:has-[input:disabled]:opacity-40 tn:has-keyboard-focus:outline-2 tn:has-keyboard-focus:outline-focus ${className}`}
    >
      <div className="tn:flex tn:h-12 tn:items-center tn:gap-2.5 tn:px-5 tn:text-muted">
        {leading}
        <div className="tn:relative tn:flex tn:h-full tn:min-w-0 tn:grow">
          <FloatingLabel aria-hidden floated={focused || value !== ""} className="tn:left-0">
            {inside.label}
          </FloatingLabel>
          {input}
        </div>
        {trailing}
      </div>
      <ErrorRow aria-hidden error={inside.error} />
    </motion.div>
  );
}
