import { AnimatePresence, motion } from "motion/react";
import { Check } from "../Check";
import { soft, swap } from "../springs";

export type CheckboxProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
};

export function Checkbox({ checked, onCheckedChange, label = "Remember me" }: CheckboxProps) {
  return (
    <label className="flex h-8 w-fit cursor-pointer items-center gap-2.5 text-sm font-medium text-ink">
      <motion.button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        initial={false}
        animate={{ backgroundColor: checked ? "var(--color-accent)" : "var(--color-paper)" }}
        transition={soft}
        className="grid size-6 place-items-center rounded-md shadow-float outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
      >
        <AnimatePresence initial={false}>
          {checked && (
            <motion.span key="check" {...swap}>
              <Check size={20} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
      {label}
    </label>
  );
}
