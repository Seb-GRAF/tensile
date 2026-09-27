import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { Check } from "../../Check";
import { icons } from "../../icons";
import { useSprings } from "../../springs";
import { Icon } from "../data-display/Icon";
import { useField } from "./Field";

export type CheckboxProps = Omit<React.ComponentProps<"input">, "type" | "checked" | "onChange" | "children"> & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  indeterminate?: boolean;
};

export function Checkbox({
  checked,
  onCheckedChange,
  label = "Remember me",
  indeterminate = false,
  disabled,
  className = "",
  ...props
}: CheckboxProps) {
  const { soft, swap } = useSprings();
  const field = useField();
  const box = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    box.current!.querySelector("input")!.indeterminate = indeterminate;
  }, [indeterminate, checked]);

  return (
    <label
      ref={box}
      className={`flex min-h-8 w-fit cursor-pointer items-center gap-2.5 text-sm font-medium text-ink has-[:disabled]:cursor-default has-[:disabled]:opacity-40 ${className}`}
    >
      <motion.span
        initial={false}
        animate={{ backgroundColor: checked || indeterminate ? "var(--color-accent)" : "var(--color-paper)" }}
        transition={soft}
        className="relative grid size-6 shrink-0 place-items-center rounded-md text-on-accent shadow-float outline-offset-2 has-focus-visible:outline-2 has-focus-visible:outline-focus"
      >
        <input
          {...props}
          type="checkbox"
          checked={checked}
          onChange={(event) => onCheckedChange(event.target.checked)}
          disabled={field?.disabled || disabled}
          className="absolute inset-0 size-full cursor-pointer appearance-none rounded-md outline-none disabled:cursor-default"
        />
        <AnimatePresence initial={false}>
          {(checked || indeterminate) && (
            <motion.span aria-hidden key={indeterminate ? "mixed" : "check"} {...swap} className="pointer-events-none">
              {indeterminate ? <Icon size={20}>{icons.minus}</Icon> : <Check size={20} />}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
      {label}
    </label>
  );
}
