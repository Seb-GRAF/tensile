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
  const field = useField();
  return (
    <textarea
      {...props}
      rows={rows}
      style={{ minHeight: `calc(${rows}lh + 1.5rem)`, ...style }}
      id={field?.id ?? id}
      value={value}
      onChange={(event) => onValueChange(event.target.value)}
      required={field?.required || required}
      disabled={field?.disabled || disabled}
      aria-labelledby={field?.labelId ?? labelledBy}
      aria-invalid={field?.invalid || invalid}
      aria-describedby={[field?.describedBy, describedBy].filter(Boolean).join(" ") || undefined}
      className={`block w-full resize-none rounded-overlay bg-paper px-4 py-3 text-body text-ink shadow-float outline-offset-2 field-sizing-content placeholder:text-muted focus-visible:outline-2 focus-visible:outline-focus disabled:opacity-40 ${className}`}
    />
  );
}
