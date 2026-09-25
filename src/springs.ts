import { animate, useMotionValue, type MotionValue, type Transition } from "motion/react";
import { useEffect } from "react";

export const shape: Transition = { type: "spring", visualDuration: 0.38, bounce: 0.15 };
export const soft: Transition = { type: "spring", visualDuration: 0.3, bounce: 0 };
/** Release after a drag. Motion drops a moving value's speed for springs set by duration, so this one is set by stiffness and damping (the same feel as visualDuration 0.35, bounce 0.25). */
export const snap: Transition = { type: "spring", stiffness: 224, damping: 22.4 };
const quick: Transition = { type: "spring", visualDuration: 0.12, bounce: 0 };
const lead: Transition = { type: "spring", visualDuration: 0.2, bounce: 0.15 };
const trail: Transition = { type: "spring", visualDuration: 0.42, bounce: 0.1 };

/** Blur swap for content that changes inside a morphing shape: the old content is gone before the new one enters. */
export const swap = {
  initial: { opacity: 0, filter: "blur(4px)", scale: 0.96 },
  animate: { opacity: 1, filter: "blur(0px)", scale: 1, transition: { ...soft, delay: 0.1 } },
  exit: { opacity: 0, filter: "blur(4px)", scale: 0.96, transition: quick },
};

/**
 * Left and right insets of a pill that slides between positions. The edge on the side of travel
 * rides a quick spring and the other a slow one, so the pill stretches ahead and catches up.
 */
export function useLiquid(left: number, right: number): [MotionValue<number>, MotionValue<number>] {
  const l = useMotionValue(left);
  const r = useMotionValue(right);
  useEffect(() => {
    const forward = left - right > l.get() - r.get();
    animate(l, left, forward ? trail : lead);
    animate(r, right, forward ? lead : trail);
  }, [left, right, l, r]);
  return [l, r];
}
