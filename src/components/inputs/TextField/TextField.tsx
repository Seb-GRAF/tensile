import { motion } from "motion/react";
import { useId, useState } from "react";
import { useControllable } from "../../../controllable";
import { useFocusSource } from "../../../focus";
import { useSprings } from "../../../springs";
import { ErrorRow, FloatingLabel } from "../Field/Field";

export type TextFieldProps = Omit<React.ComponentProps<"input">, "value" | "defaultValue" | "onChange" | "placeholder"> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  error?: string;
};

export function TextField({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  label = "Email",
  error,
  onFocus,
  onBlur,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  className = "",
  style,
  ...props
}: TextFieldProps) {
  const { shape } = useSprings();
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  useFocusSource();
  const [focused, setFocused] = useState(false);
  const errorId = useId();

  return (
    <motion.div
      initial={false}
      animate={{ height: error ? "auto" : 48, borderRadius: error ? "var(--tn-radius-overlay)" : "var(--tn-radius-control)" }}
      transition={shape}
      style={style}
      className={`tn:overflow-hidden tn:bg-paper tn:shadow-control tn:outline-offset-2 tn:has-[input:disabled]:opacity-40 tn:has-keyboard-focus:outline-2 tn:has-keyboard-focus:outline-focus ${className}`}
    >
      <label className="tn:relative tn:block">
        <FloatingLabel floated={focused || value !== ""} className="tn:left-5">
          {label}
        </FloatingLabel>
        <input
          {...props}
          value={value}
          aria-invalid={!!error || invalid}
          aria-describedby={[error && errorId, describedBy].filter(Boolean).join(" ") || undefined}
          onFocus={(event) => { setFocused(true); onFocus?.(event); }}
          onBlur={(event) => { setFocused(false); onBlur?.(event); }}
          onChange={(event) => setValue(event.target.value)}
          className="tn:block tn:h-12 tn:w-full tn:bg-transparent tn:px-5 tn:pt-5 tn:pb-1 tn:text-body tn:text-ink tn:outline-none"
        />
      </label>
      <ErrorRow id={errorId} error={error} />
    </motion.div>
  );
}
