import { AnimatePresence, motion } from "motion/react";
import { useSprings } from "../../../springs";
import { useSize } from "../../../useSize";

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
  info: "tn:text-paper/60",
  warning: "tn:text-muted",
  success: "tn:text-on-accent",
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
        backgroundColor: { info: "var(--tn-color-ink)", warning: "var(--tn-color-paper)", success: "var(--tn-color-accent)" }[status],
        color: { info: "var(--tn-color-paper)", warning: "var(--tn-color-ink)", success: "var(--tn-color-on-accent)" }[status],
      }}
      transition={{ height: shape, backgroundColor: soft, color: soft }}
      className={`tn:w-full tn:overflow-hidden tn:rounded-overlay tn:shadow-float ${className}`}
    >
      <div ref={row} className="tn:flex tn:gap-3 tn:p-4">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          width={20}
          height={20}
          strokeWidth={36 / 20}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="tn:block tn:shrink-0 tn:fill-none tn:stroke-current"
        >
          <circle cx="12" cy="12" r="10" />
          <motion.path initial={false} animate={{ d: glyphs[status] }} transition={shape} />
        </svg>
        <div className="tn:relative tn:flex-1">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div key={`${status} ${title} ${description}`} {...swap} className="tn:origin-left">
              <p className="tn:text-sm tn:font-medium">{title}</p>
              <p className={`tn:text-label ${secondary[status]}`}>{description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
