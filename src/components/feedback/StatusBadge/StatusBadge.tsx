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
  info: { backgroundColor: "var(--tn-color-ink)", color: "var(--tn-color-paper)" },
  success: { backgroundColor: "var(--tn-color-accent)", color: "var(--tn-color-on-accent)" },
  warning: { backgroundColor: "var(--tn-color-paper)", color: "var(--tn-color-ink)" },
  neutral: { backgroundColor: "var(--tn-color-hover)", color: "var(--tn-color-ink)" },
};

export function StatusBadge({ status, label, className = "" }: StatusBadgeProps) {
  const { shape, soft, swap } = useSprings();
  const [width, measure] = useWidth();

  return (
    <motion.span
      initial={false}
      animate={{ width, ...colors[status] }}
      transition={{ width: shape, backgroundColor: soft, color: soft }}
      className={`tn:relative tn:inline-grid tn:h-6 tn:place-content-center tn:place-items-center tn:overflow-hidden tn:rounded-control tn:text-label tn:font-medium ${className}`}
    >
      <motion.span
        initial={false}
        animate={{ opacity: status === "warning" || status === "neutral" ? 1 : 0 }}
        transition={soft}
        className="tn:absolute tn:inset-0 tn:rounded-control tn:border tn:border-line"
      />
      <AnimatePresence initial={false}>
        <motion.span
          key={`${status} ${label}`}
          ref={measure}
          {...swap}
          className={`tn:col-start-1 tn:row-start-1 tn:flex tn:items-center tn:gap-1 tn:whitespace-nowrap tn:pr-2.5 ${status === "warning" ? "tn:pl-1.5" : "tn:pl-2.5"}`}
        >
          {status === "warning" && <Icon size={14}>{icons.alert}</Icon>}
          {label}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
