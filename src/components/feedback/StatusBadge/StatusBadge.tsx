import { AnimatePresence, motion } from "motion/react";
import { icons } from "../../../icons";
import { useSprings } from "../../../springs";
import { useWidth } from "../../../useWidth";
import { Icon } from "../../data-display/Icon/Icon";

export type StatusBadgeProps = {
  status: "info" | "success" | "warning" | "neutral";
  label: string;
  className?: string;
};

const colors = {
  info: { backgroundColor: "var(--color-ink)", color: "var(--color-paper)" },
  success: { backgroundColor: "var(--color-accent)", color: "var(--color-on-accent)" },
  warning: { backgroundColor: "var(--color-paper)", color: "var(--color-ink)" },
  neutral: { backgroundColor: "var(--color-hover)", color: "var(--color-ink)" },
};

export function StatusBadge({ status, label, className = "" }: StatusBadgeProps) {
  const { shape, soft, swap } = useSprings();
  const [width, measure] = useWidth();

  return (
    <motion.span
      initial={false}
      animate={{ width, ...colors[status] }}
      transition={{ width: shape, backgroundColor: soft, color: soft }}
      className={`relative inline-grid h-6 place-content-center place-items-center overflow-hidden rounded-control text-label font-medium ${className}`}
    >
      <motion.span
        initial={false}
        animate={{ opacity: status === "warning" || status === "neutral" ? 1 : 0 }}
        transition={soft}
        className="absolute inset-0 rounded-control border border-line"
      />
      <AnimatePresence initial={false}>
        <motion.span
          key={`${status} ${label}`}
          ref={measure}
          {...swap}
          className={`col-start-1 row-start-1 flex items-center gap-1 whitespace-nowrap pr-2.5 ${status === "warning" ? "pl-1.5" : "pl-2.5"}`}
        >
          {status === "warning" && <Icon size={14}>{icons.alert}</Icon>}
          {label}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
