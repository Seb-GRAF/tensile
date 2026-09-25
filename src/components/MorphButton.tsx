import { AnimatePresence, motion } from "motion/react";
import { shape, soft, swap } from "../springs";

type Props = {
  status: "idle" | "loading" | "success";
  onClick: () => void;
  children: string;
};

export function MorphButton({ status, onClick, children }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={status !== "idle"}
      aria-label={{ idle: children, loading: "Loading", success: "Done" }[status]}
      initial={false}
      animate={{
        width: status === "idle" ? "auto" : 44,
        backgroundColor: status === "success" ? "var(--color-accent)" : "var(--color-ink)",
      }}
      transition={{ width: shape, backgroundColor: soft }}
      whileTap={{ scale: 0.96 }}
      className="grid h-11 place-items-center overflow-hidden rounded-full text-[15px] font-medium text-paper shadow-float outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
    >
      <AnimatePresence initial={false}>
        {status === "idle" && (
          <motion.span key="idle" {...swap} className="col-start-1 row-start-1 whitespace-nowrap px-5">
            {children}
          </motion.span>
        )}
        {status === "loading" && (
          <motion.span key="loading" {...swap} className="col-start-1 row-start-1">
            <motion.svg
              viewBox="0 0 24 24"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="size-[18px] fill-none stroke-current"
              strokeWidth={2}
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="9" pathLength={1} strokeDasharray="0.28 1" />
            </motion.svg>
          </motion.span>
        )}
        {status === "success" && (
          <motion.svg
            key="success"
            {...swap}
            viewBox="0 0 24 24"
            className="col-start-1 row-start-1 size-5 fill-none stroke-ink"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M4 12.5l5 5L20 6.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ ...soft, delay: 0.15 }}
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
