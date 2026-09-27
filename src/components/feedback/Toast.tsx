import { AnimatePresence, motion } from "motion/react";
import { shape, swap } from "../../springs";
import { useWidth } from "../../useWidth";

export type ToastProps = {
  status: "loading" | "success";
  children?: string;
};

export function Toast({ status, children = "Link copied" }: ToastProps) {
  const [width, measure] = useWidth();

  return (
    <motion.div
      role="status"
      initial={false}
      animate={{ width }}
      transition={shape}
      className="grid h-11 place-content-center place-items-center overflow-hidden rounded-full bg-ink text-sm font-medium text-paper shadow-float"
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={`${status} ${children}`}
          ref={measure}
          {...swap}
          className="col-start-1 row-start-1 flex items-center gap-2 whitespace-nowrap px-5"
        >
          {status === "loading" ? (
            <motion.svg
              viewBox="0 0 24 24"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="size-3.5 fill-none stroke-current"
              strokeWidth={2.6}
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="9" pathLength={1} strokeDasharray="0.28 1" />
            </motion.svg>
          ) : (
            <svg viewBox="0 0 16 16" className="size-4">
              <circle cx="8" cy="8" r="8" className="fill-accent" />
              <path
                d="M4.75 8.25 7 10.5l4.25-4.5"
                className="fill-none stroke-ink"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {children}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}
