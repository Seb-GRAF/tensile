import { motion } from "motion/react";
import { useId, useState } from "react";
import { useFocusSource } from "../../../focus";
import { useSprings } from "../../../springs";
import { ErrorRow, FloatingLabel } from "../Field/Field";

export type TextFieldProps = Omit<React.ComponentProps<"input">, "value" | "onChange" | "placeholder"> & {
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  error?: string;
};

export function TextField({
  value,
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
  useFocusSource();
  const [focused, setFocused] = useState(false);
  const errorId = useId();

  return (
    <motion.div
      initial={false}
      animate={{ height: error ? "auto" : 52, borderRadius: error ? "var(--radius-overlay)" : "var(--radius-control)" }}
      transition={shape}
      style={style}
      className={`overflow-hidden bg-paper shadow-control outline-offset-2 has-[input:disabled]:opacity-40 has-keyboard-focus:outline-2 has-keyboard-focus:outline-focus ${className}`}
    >
      <label className="relative block">
        <FloatingLabel floated={focused || value !== ""} className="left-5">
          {label}
        </FloatingLabel>
        <input
          {...props}
          value={value}
          aria-invalid={!!error || invalid}
          aria-describedby={[error && errorId, describedBy].filter(Boolean).join(" ") || undefined}
          onFocus={(event) => { setFocused(true); onFocus?.(event); }}
          onBlur={(event) => { setFocused(false); onBlur?.(event); }}
          onChange={(event) => onValueChange(event.target.value)}
          className="block h-13 w-full bg-transparent px-5 pt-6 pb-2 text-body text-ink outline-none"
        />
      </label>
      <ErrorRow id={errorId} error={error} />
    </motion.div>
  );
}
