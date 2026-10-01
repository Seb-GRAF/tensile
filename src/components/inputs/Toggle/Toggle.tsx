import { motion } from "motion/react";
import { useControllable } from "../../../controllable";
import { useLiquid, useSprings } from "../../../springs";
import { useField } from "../Field/Field";

export type ToggleProps = Omit<React.ComponentProps<"input">, "type" | "checked" | "defaultChecked" | "onChange" | "children"> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  children?: React.ReactNode;
};

export function Toggle({
  checked: checkedProp,
  defaultChecked = false,
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
  const [checked, setChecked] = useControllable(checkedProp, defaultChecked, onCheckedChange);
  const field = useField();
  const { soft } = useSprings();
  const [left, right] = useLiquid(checked ? 23 : 3, checked ? 3 : 23);

  return (
    <motion.span
      initial={false}
      animate={{ backgroundColor: checked ? "var(--tn-color-accent)" : "var(--tn-color-paper)" }}
      transition={soft}
      className={`tn:relative tn:inline-block tn:h-8 tn:w-13 tn:rounded-control tn:shadow-control tn:outline-offset-2 tn:has-focus-visible:outline-2 tn:has-focus-visible:outline-focus tn:has-[:disabled]:opacity-40 ${className}`}
    >
      <input
        {...props}
        type="checkbox"
        role="switch"
        id={field?.id ?? id}
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
        required={field?.required || required}
        disabled={field?.disabled || disabled}
        aria-label={field?.labelId ? undefined : ariaLabel ?? label}
        aria-labelledby={field?.labelId ?? labelledBy}
        aria-describedby={[field?.describedBy, describedBy].filter(Boolean).join(" ") || undefined}
        aria-invalid={field?.invalid || invalid}
        className="tn:absolute tn:inset-0 tn:size-full tn:cursor-pointer tn:appearance-none tn:rounded-control tn:outline-none tn:disabled:cursor-default"
      />
      <motion.span
        aria-hidden
        style={{ left, right }}
        initial={false}
        animate={{ backgroundColor: checked ? "var(--tn-color-on-accent)" : "var(--tn-color-ink)" }}
        transition={soft}
        className="tn:pointer-events-none tn:absolute tn:inset-y-[3px] tn:grid tn:place-items-center tn:rounded-full tn:text-paper"
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
