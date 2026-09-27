import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { shape, soft, swap } from "../../springs";

export type AlertProps = {
  status: "info" | "warning" | "success";
  title?: string;
  description?: string;
};

const glyphs = {
  info: "M12 8L12.01 8M12 16L12 12",
  warning: "M12 8L12 12M12 16L12.01 16",
  success: "M9 12L11 14M11 14L15 10",
};

export function Alert({
  status,
  title = "Heads up",
  description = "Check the details before you continue.",
}: AlertProps) {
  const [height, setHeight] = useState<number>();
  const row = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver(() => setHeight(row.current!.offsetHeight));
    observer.observe(row.current!);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      role={status === "warning" ? "alert" : "status"}
      initial={false}
      animate={{
        height,
        backgroundColor: { info: "var(--color-ink)", warning: "var(--color-paper)", success: "var(--color-accent)" }[status],
        color: status === "info" ? "var(--color-paper)" : "var(--color-ink)",
      }}
      transition={{ height: shape, backgroundColor: soft, color: soft }}
      className="w-[360px] overflow-hidden rounded-[20px] shadow-float"
    >
      <div ref={row} className="flex gap-3 p-4">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="size-5 shrink-0 fill-none stroke-current"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <motion.path initial={false} animate={{ d: glyphs[status] }} transition={shape} />
        </svg>
        <div className="relative flex-1">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div key={`${status} ${title} ${description}`} {...swap} className="origin-left">
              <p className="text-sm font-medium">{title}</p>
              <p className="text-[13px] leading-5 opacity-65">{description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
