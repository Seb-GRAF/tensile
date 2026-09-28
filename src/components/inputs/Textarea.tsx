import { motion } from "motion/react";
import { useSprings } from "../../springs";
import { useSize } from "../../useSize";
import { useField } from "./Field";

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
  "aria-labelledby": labelledBy,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  className = "",
  style,
  ...props
}: TextareaProps) {
  const { shape } = useSprings();
  const field = useField();
  const [size, measure] = useSize();
  return (
    <motion.div
      initial={false}
      animate={{ height: size?.height }}
      transition={shape}
      style={style}
      className={`overflow-clip rounded-overlay bg-paper shadow-float outline-offset-2 has-[textarea:disabled]:opacity-40 has-[textarea:focus-visible]:outline-2 has-[textarea:focus-visible]:outline-focus ${className}`}
    >
      <div ref={measure}>
        <textarea
          {...props}
          rows={rows}
          style={{ minHeight: `calc(${rows}lh + 1.5rem)` }}
          id={field?.id ?? id}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          required={field?.required || required}
          disabled={field?.disabled || disabled}
          aria-labelledby={field?.labelId ?? labelledBy}
          aria-invalid={field?.invalid || invalid}
          aria-describedby={[field?.describedBy, describedBy].filter(Boolean).join(" ") || undefined}
          className="block w-full resize-none bg-transparent px-4 py-3 text-body text-ink outline-none field-sizing-content placeholder:text-muted"
        />
      </div>
    </motion.div>
  );
}
