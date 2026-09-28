import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";
import { Check } from "../../Check";
import { useSprings } from "../../springs";

export type HoldButtonProps = {
  done: boolean;
  /** Called when the fill reaches the end; set `done` to show the check. */
  onDone: () => void;
  children?: string;
  doneLabel?: string;
  /** How long to hold, in ms. */
  duration?: number;
  className?: string;
};

const holdKeys = [" ", "Enter"];

export function HoldButton({
  done,
  onDone,
  children = "Hold to delete",
  doneLabel = "Deleted",
  duration = 1500,
  className = "",
}: HoldButtonProps) {
  const { shape, snap, soft, swap } = useSprings();
  const progress = useMotionValue(0);
  const clip = useTransform(progress, (p) => `inset(0 ${(1 - p) * 100}% 0 -100% round var(--radius-control))`);

  useEffect(() => {
    if (!done) progress.set(0);
  }, [done, progress]);

  function hold() {
    if (done) return;
    animate(progress, 1, { duration: ((1 - progress.get()) * duration) / 1000, ease: "linear", onComplete: onDone });
  }

  function release() {
    if (!done) animate(progress, 0, snap);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (holdKeys.includes(event.key) && !event.repeat) hold();
  }

  function onKeyUp(event: React.KeyboardEvent) {
    if (holdKeys.includes(event.key)) release();
  }

  return (
    <>
      <motion.button
        type="button"
        aria-label={done ? doneLabel : children}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          hold();
        }}
        onPointerUp={release}
        onPointerCancel={release}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        initial={false}
        animate={{
          width: done ? 44 : "auto",
          backgroundColor: done ? "var(--color-accent)" : "var(--color-ink)",
        }}
        transition={{ width: shape, backgroundColor: soft }}
        className={`relative grid h-11 place-content-center place-items-center overflow-hidden rounded-control text-body font-medium text-paper shadow-control outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus ${className}`}
      >
        <AnimatePresence initial={false}>
          {!done && (
            <motion.span key="idle" {...swap} className="col-start-1 row-start-1 whitespace-nowrap px-5">
              {children}
            </motion.span>
          )}
        </AnimatePresence>
        <motion.span style={{ clipPath: clip }} className="absolute inset-0 bg-accent" />
        <AnimatePresence initial={false}>
          {done ? (
            <motion.span key="done" {...swap} className="relative col-start-1 row-start-1 text-on-accent">
              <Check size={20} />
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              aria-hidden
              {...swap}
              style={{ clipPath: clip }}
              className="absolute inset-0 grid place-content-center whitespace-nowrap text-on-accent"
            >
              {children}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
      <span role="status" className="sr-only">
        {done && doneLabel}
      </span>
    </>
  );
}
