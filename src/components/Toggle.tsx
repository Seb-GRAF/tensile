import { motion } from "motion/react";
import { soft, useLiquid } from "../springs";

type Props = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
};

export function Toggle({ checked, onCheckedChange, label }: Props) {
  const [left, right] = useLiquid(checked ? 23 : 3, checked ? 3 : 23);

  return (
    <motion.button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onCheckedChange(!checked)}
      initial={false}
      animate={{ backgroundColor: checked ? "var(--color-accent)" : "var(--color-paper)" }}
      transition={soft}
      className="relative h-8 w-13 rounded-full shadow-float outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
    >
      <motion.span style={{ left, right }} className="absolute inset-y-[3px] rounded-full bg-ink" />
    </motion.button>
  );
}
