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
  onClick,
  className = "",
  "aria-label": label,
  ...props
}: MorphButtonProps) {
  const { shape, soft, swap } = useSprings();
  const busy = status !== "idle";
  return (
    <motion.button
      {...props}
      type={type}
      disabled={disabled}
      aria-disabled={busy || undefined}
      onClick={(event) => {
        if (busy) event.preventDefault();
        else onClick?.(event);
      }}
      aria-label={status === "idle" ? label : status === "loading" ? loadingLabel : successLabel}
      initial={false}
      animate={{
        width: status === "idle" ? "auto" : 44,
        backgroundColor: status === "success" ? "var(--tn-color-accent)" : "var(--tn-color-ink)",
      }}
      transition={{ width: shape, backgroundColor: soft }}
      className={`tn:grid tn:h-11 tn:place-content-center tn:place-items-center tn:overflow-hidden tn:rounded-control tn:text-body tn:font-medium tn:text-paper tn:shadow-control tn:outline-offset-2 tn:focus-visible:outline-2 tn:focus-visible:outline-focus ${busy ? "" : "tn:enabled:press"} ${disabled ? "tn:opacity-40" : ""} ${className}`}
    >
      <AnimatePresence initial={false}>
        {status === "idle" && (
          <motion.span key="idle" {...swap} className="tn:col-start-1 tn:row-start-1 tn:whitespace-nowrap tn:px-5">
            {children}
          </motion.span>
        )}
        {status === "loading" && (
          <motion.span key="loading" {...swap} className="tn:col-start-1 tn:row-start-1">
            <Spinner size={18} />
          </motion.span>
        )}
        {status === "success" && (
          <motion.span key="success" {...swap} className="tn:col-start-1 tn:row-start-1 tn:text-on-accent">
            <Check size={20} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
