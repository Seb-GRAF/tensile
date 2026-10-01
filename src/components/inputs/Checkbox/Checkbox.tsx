import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useControllable } from "../../../controllable";
import { useSprings } from "../../../springs";
import { useField } from "../Field/Field";

export type CheckboxProps = Omit<React.ComponentProps<"input">, "type" | "checked" | "defaultChecked" | "onChange" | "children"> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  indeterminate?: boolean;
};

const DASH = "M5 12L12 12L19 12";
const CHECK = "M4 12.5L9 17.5L20 6.5";

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
  const { shape, soft, swap, scale } = useSprings();
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
            <motion.svg
              key="mark"
              aria-hidden
              {...swap}
              viewBox="0 0 24 24"
              width={20}
              height={20}
              strokeWidth={36 / 20}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="tn:pointer-events-none tn:relative tn:fill-none tn:stroke-current"
            >
              <motion.path
                initial={{ pathLength: 0, d: indeterminate ? DASH : CHECK }}
                animate={{ pathLength: 1, d: indeterminate ? DASH : CHECK }}
                transition={{ pathLength: { ...soft, delay: 0.15 * scale }, d: shape }}
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </span>
      {label}
    </label>
  );
}
