import { motion } from "motion/react";
import { useState } from "react";
import { useControllable } from "../../../controllable";
import { useFocusSource } from "../../../focus";
import { useSprings } from "../../../springs";
import { useSize } from "../../../useSize";
import { ErrorRow, FloatingLabel, useField } from "../Field/Field";

export type TextareaProps = Omit<React.ComponentProps<"textarea">, "value" | "defaultValue" | "onChange"> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export function Textarea({
  value: valueProp,
  defaultValue = "",
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
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  const field = useField();
  useFocusSource();
  const [size, measure] = useSize();
  const [focused, setFocused] = useState(false);
  const inside = field?.inside;
  return (
    <div
      data-label-inside={inside ? true : undefined}
      style={style}
      className={`tn:rounded-overlay tn:bg-paper tn:shadow-control tn:outline-offset-2 tn:has-[textarea:disabled]:opacity-40 tn:has-keyboard-focus:outline-2 tn:has-keyboard-focus:outline-focus ${className}`}
    >
      <div
        onMouseDown={(event) => {
          const textarea = event.currentTarget.querySelector("textarea")!;
          if (event.target === textarea) return;
          event.preventDefault();
          textarea.focus();
        }}
        className={`tn:cursor-text ${inside ? "tn:relative tn:pt-5.5 tn:pb-3" : "tn:py-3.5"}`}
      >
        {inside && (
          <FloatingLabel aria-hidden floated={focused || value !== ""} className="tn:left-5">
            {inside.label}
          </FloatingLabel>
        )}
        <motion.div initial={false} animate={{ height: size?.height }} transition={shape} className="tn:overflow-clip">
          <div ref={measure}>
            <textarea
              {...props}
              rows={rows}
              style={{ minHeight: `${rows}lh` }}
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
              className={`tn:block tn:w-full tn:resize-none tn:bg-transparent tn:px-5 tn:text-body tn:text-ink tn:outline-none tn:field-sizing-content ${inside ? "tn:placeholder:text-transparent tn:focus:placeholder:text-muted" : "tn:placeholder:text-muted"}`}
            />
          </div>
        </motion.div>
      </div>
      {inside && (
        <motion.div initial={false} animate={{ height: inside.error ? "auto" : 0 }} transition={shape} className="tn:overflow-hidden">
          <ErrorRow aria-hidden error={inside.error} />
        </motion.div>
      )}
    </div>
  );
}
