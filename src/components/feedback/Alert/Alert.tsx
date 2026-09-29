import { AnimatePresence, motion } from "motion/react";
import { useSprings } from "../../../springs";
import { useSize } from "../../../useSize";
import { Icon } from "../../data-display/Icon/Icon";

export type AlertProps = {
  status: "info" | "warning" | "success";
  title?: string;
  description?: string;
  className?: string;
};

const glyphs = {
  info: "M12 8L12.01 8M12 16L12 12",
  warning: "M12 8L12 12M12 16L12.01 16",
  success: "M9 12L11 14M11 14L15 10",
};

const secondary = {
  info: "text-paper/55",
  warning: "text-muted",
  success: "text-on-accent",
};

export function Alert({
  status,
  title = "Heads up",
  description = "Check the details before you continue.",
  className = "",
}: AlertProps) {
  const { shape, soft, swap } = useSprings();
  const [size, row] = useSize();

  return (
    <motion.div
      role={status === "warning" ? "alert" : "status"}
      initial={false}
      animate={{
        height: size?.height,
        backgroundColor: { info: "var(--color-ink)", warning: "var(--color-paper)", success: "var(--color-accent)" }[status],
        color: { info: "var(--color-paper)", warning: "var(--color-ink)", success: "var(--color-on-accent)" }[status],
      }}
      transition={{ height: shape, backgroundColor: soft, color: soft }}
      className={`w-full overflow-hidden rounded-overlay shadow-float ${className}`}
    >
      <div ref={row} className="flex gap-3 p-4">
        <Icon size={20}>
          <circle cx="12" cy="12" r="10" />
          <motion.path initial={false} animate={{ d: glyphs[status] }} transition={shape} />
        </Icon>
        <div className="relative flex-1">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div key={`${status} ${title} ${description}`} {...swap} className="origin-left">
              <p className="text-sm font-medium">{title}</p>
              <p className={`text-label ${secondary[status]}`}>{description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
