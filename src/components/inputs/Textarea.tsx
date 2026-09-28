import { motion } from "motion/react";
import { useState } from "react";
import { useFocusSource } from "../../focus";
import { useSprings } from "../../springs";
import { useSize } from "../../useSize";
import { ErrorRow, FloatingLabel, useField } from "./Field";

export type TextareaProps = Omit<React.ComponentProps<"textarea">, "value" | "onChange"> & {
  value: string;
  onValueChange: (value: string) => void;
};

export function Textarea({
  value,
  onValueChange,
  rows = 3,
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
}: TextareaProps) {
  const { shape } = useSprings();
  const field = useField();
  useFocusSource();
  const [size, measure] = useSize();
  const [focused, setFocused] = useState(false);
  const inside = field?.inside;
  return (
    <div
      data-label-inside={inside ? true : undefined}
      style={style}
      className={`rounded-overlay bg-paper shadow-control outline-offset-2 has-[textarea:disabled]:opacity-40 has-keyboard-focus:outline-2 has-keyboard-focus:outline-focus ${className}`}
    >
      <div
        onMouseDown={(event) => {
          const textarea = event.currentTarget.querySelector("textarea")!;
          if (event.target === textarea) return;
          event.preventDefault();
          textarea.focus();
        }}
        className={`cursor-text ${inside ? "relative pt-6 pb-3" : "py-3"}`}
      >
        {inside && (
          <FloatingLabel aria-hidden floated={focused || value !== ""} className="left-5">
            {inside.label}
          </FloatingLabel>
        )}
        <motion.div initial={false} animate={{ height: size?.height }} transition={shape} className="overflow-clip">
          <div ref={measure}>
            <textarea
              {...props}
              rows={rows}
              style={{ minHeight: `${rows}lh` }}
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
              className={`block w-full resize-none bg-transparent text-body text-ink outline-none field-sizing-content ${inside ? "px-5 placeholder:text-transparent focus:placeholder:text-muted" : "px-4 placeholder:text-muted"}`}
            />
          </div>
        </motion.div>
      </div>
      {inside && (
        <motion.div initial={false} animate={{ height: inside.error ? "auto" : 0 }} transition={shape} className="overflow-hidden">
          <ErrorRow aria-hidden error={inside.error} />
        </motion.div>
      )}
    </div>
  );
}
