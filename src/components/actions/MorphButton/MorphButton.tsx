import { AnimatePresence, motion } from "motion/react";
import { Check } from "../../../Check";
import { useSprings } from "../../../springs";
import { Spinner } from "../../feedback/Spinner/Spinner";

export type MorphButtonProps = Omit<React.ComponentProps<"button">, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> & {
  status: "idle" | "loading" | "success";
  loadingLabel?: string;
  successLabel?: string;
};

export function MorphButton({
  status,
  children = "Connect",
  loadingLabel = "Loading",
  successLabel = "Done",
  type = "button",
  disabled = false,
  className = "",
  "aria-label": label,
  ...props
}: MorphButtonProps) {
  const { shape, soft, swap } = useSprings();
  return (
    <motion.button
      {...props}
      type={type}
      disabled={disabled || status !== "idle"}
      aria-label={status === "idle" ? label : status === "loading" ? loadingLabel : successLabel}
      initial={false}
      animate={{
        width: status === "idle" ? "auto" : 44,
        backgroundColor: status === "success" ? "var(--color-accent)" : "var(--color-ink)",
      }}
      transition={{ width: shape, backgroundColor: soft }}
      className={`grid h-11 place-content-center place-items-center overflow-hidden rounded-control text-body font-medium text-paper shadow-control outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus enabled:press ${disabled ? "opacity-40" : ""} ${className}`}
    >
      <AnimatePresence initial={false}>
        {status === "idle" && (
          <motion.span key="idle" {...swap} className="col-start-1 row-start-1 whitespace-nowrap px-5">
            {children}
          </motion.span>
        )}
        {status === "loading" && (
          <motion.span key="loading" {...swap} className="col-start-1 row-start-1">
            <Spinner size={18} />
          </motion.span>
        )}
        {status === "success" && (
          <motion.span key="success" {...swap} className="col-start-1 row-start-1 text-on-accent">
            <Check size={20} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
