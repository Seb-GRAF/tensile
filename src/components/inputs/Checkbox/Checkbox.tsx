import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { Check } from "../../../Check";
import { useControllable } from "../../../controllable";
import { icons } from "../../../icons";
import { useSprings } from "../../../springs";
import { Icon } from "../../data-display/Icon/Icon";
import { useField } from "../Field/Field";

export type CheckboxProps = Omit<React.ComponentProps<"input">, "type" | "checked" | "defaultChecked" | "onChange" | "children"> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  indeterminate?: boolean;
};

export function Checkbox({
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  label = "Remember me",
  indeterminate = false,
  disabled,
  className = "",
  ...props
}: CheckboxProps) {
  const [checked, setChecked] = useControllable(checkedProp, defaultChecked, onCheckedChange);
  const { soft, swap } = useSprings();
  const field = useField();
  const box = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    box.current!.querySelector("input")!.indeterminate = indeterminate;
  }, [indeterminate, checked]);

  return (
    <label
      ref={box}
      className={`tn:group/checkbox tn:flex tn:min-h-8 tn:w-fit tn:cursor-pointer tn:items-center tn:gap-2.5 tn:text-sm tn:font-medium tn:text-ink tn:has-[:disabled]:cursor-default tn:has-[:disabled]:opacity-40 ${className}`}
    >
      <span className="tn:relative tn:grid tn:size-6 tn:shrink-0 tn:place-items-center tn:rounded-[calc(var(--tn-radius-control)/4)] tn:bg-paper tn:text-on-accent tn:shadow-control tn:outline-offset-2 tn:group-hover/checkbox:has-[:enabled]:bg-hover tn:has-focus-visible:outline-2 tn:has-focus-visible:outline-focus">
        <motion.span
          aria-hidden
          initial={false}
          animate={{ opacity: checked || indeterminate ? 1 : 0 }}
          transition={soft}
          className="tn:absolute tn:inset-0 tn:rounded-[inherit] tn:bg-accent"
        />
        <input
          {...props}
          type="checkbox"
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
          disabled={field?.disabled || disabled}
          className="tn:absolute tn:inset-0 tn:size-full tn:cursor-pointer tn:appearance-none tn:rounded-[inherit] tn:outline-none tn:disabled:cursor-default"
        />
        <AnimatePresence initial={false}>
          {(checked || indeterminate) && (
            <motion.span aria-hidden key={indeterminate ? "mixed" : "check"} {...swap} className="tn:pointer-events-none tn:relative">
              {indeterminate ? <Icon size={20}>{icons.minus}</Icon> : <Check size={20} />}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      {label}
    </label>
  );
}
