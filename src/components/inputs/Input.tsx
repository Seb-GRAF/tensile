import { useField } from "./Field";

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
  "aria-labelledby": labelledBy,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  className = "",
  style,
  ...props
}: InputProps) {
  const field = useField();
  return (
    <div
      style={style}
      className={`flex h-11 items-center gap-2.5 rounded-control bg-paper px-4 text-muted shadow-float outline-offset-2 has-[input:disabled]:opacity-40 has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-focus ${className}`}
    >
      {leading}
      <input
        {...props}
        id={field?.id ?? id}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        required={field?.required || required}
        disabled={field?.disabled || disabled}
        aria-labelledby={field?.labelId ?? labelledBy}
        aria-invalid={field?.invalid || invalid}
        aria-describedby={[field?.describedBy, describedBy].filter(Boolean).join(" ") || undefined}
        className="h-full min-w-0 grow bg-transparent text-body text-ink outline-none placeholder:text-muted"
      />
      {trailing}
    </div>
  );
}
