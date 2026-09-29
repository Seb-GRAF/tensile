import { motion } from "motion/react";
import { useState } from "react";
import { useFocusSource } from "../../../focus";
import { useSprings } from "../../../springs";
import { ErrorRow, FloatingLabel, useField } from "../Field/Field";

export type InputProps = Omit<React.ComponentProps<"input">, "value" | "onChange"> & {
  value: string;
  onValueChange: (value: string) => void;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
};

export function Input({
  value,
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
  const field = useField();
  useFocusSource();
  const [focused, setFocused] = useState(false);
  const inside = field?.inside;
  const input = (
    <input
      {...props}
      id={field?.id ?? id}
      value={value}
      onChange={(event) => onValueChange(event.target.value)}
      onFocus={(event) => { setFocused(true); onFocus?.(event); }}
      onBlur={(event) => { setFocused(false); onBlur?.(event); }}
      required={field?.required || required}
      disabled={field?.disabled || disabled}
      aria-labelledby={field?.labelId ?? labelledBy}
      aria-invalid={field?.invalid || invalid}
      aria-describedby={[field?.describedBy, describedBy].filter(Boolean).join(" ") || undefined}
      className={`h-full min-w-0 grow bg-transparent text-body text-ink outline-none ${inside ? "pt-6 pb-2 placeholder:text-transparent focus:placeholder:text-muted" : "placeholder:text-muted"}`}
    />
  );

  if (!inside) {
    return (
      <div
        style={style}
        className={`flex h-11 items-center gap-2.5 rounded-control bg-paper px-4 text-muted shadow-control outline-offset-2 has-[input:disabled]:opacity-40 has-keyboard-focus:outline-2 has-keyboard-focus:outline-focus ${className}`}
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
      animate={{ height: inside.error ? "auto" : 52, borderRadius: inside.error ? "var(--radius-overlay)" : "var(--radius-control)" }}
      transition={shape}
      style={style}
      className={`overflow-hidden bg-paper shadow-control outline-offset-2 has-[input:disabled]:opacity-40 has-keyboard-focus:outline-2 has-keyboard-focus:outline-focus ${className}`}
    >
      <div className="flex h-13 items-center gap-2.5 px-5 text-muted">
        {leading}
        <div className="relative flex h-full min-w-0 grow">
          <FloatingLabel aria-hidden floated={focused || value !== ""} className="left-0">
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
