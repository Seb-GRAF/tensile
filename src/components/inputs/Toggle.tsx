import { motion } from "motion/react";
import { useLiquid, useSprings } from "../../springs";
import { useField } from "./Field";

export type ToggleProps = Omit<React.ComponentProps<"input">, "type" | "checked" | "onChange" | "children"> & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  children?: React.ReactNode;
};

export function Toggle({
  checked,
  onCheckedChange,
  label = "Spatial audio",
  children,
  id,
  required,
  disabled,
  "aria-label": ariaLabel,
  "aria-labelledby": labelledBy,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  className = "",
  ...props
}: ToggleProps) {
  const field = useField();
  const { soft } = useSprings();
  const [left, right] = useLiquid(checked ? 23 : 3, checked ? 3 : 23);

  return (
    <motion.span
      initial={false}
      animate={{ backgroundColor: checked ? "var(--color-accent)" : "var(--color-paper)" }}
      transition={soft}
      className={`relative inline-block h-8 w-13 rounded-control shadow-control outline-offset-2 has-focus-visible:outline-2 has-focus-visible:outline-focus has-[:disabled]:opacity-40 ${className}`}
    >
      <input
        {...props}
        type="checkbox"
        role="switch"
        id={field?.id ?? id}
        checked={checked}
        onChange={(event) => onCheckedChange(event.target.checked)}
        required={field?.required || required}
        disabled={field?.disabled || disabled}
        aria-label={field?.labelId ? undefined : ariaLabel ?? label}
        aria-labelledby={field?.labelId ?? labelledBy}
        aria-describedby={[field?.describedBy, describedBy].filter(Boolean).join(" ") || undefined}
        aria-invalid={field?.invalid || invalid}
        className="absolute inset-0 size-full cursor-pointer appearance-none rounded-control outline-none disabled:cursor-default"
      />
      <motion.span
        aria-hidden
        style={{ left, right }}
        className="pointer-events-none absolute inset-y-[3px] grid place-items-center rounded-full bg-ink text-paper"
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
