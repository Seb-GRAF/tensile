import { animate, useMotionValue, type MotionValue, type TargetAndTransition, type Transition } from "motion/react";
import { useEffect, useState } from "react";

type Swap = { initial: TargetAndTransition; animate: TargetAndTransition; exit: TargetAndTransition };

const instant: Transition = { duration: 0 };

/** `--motion-duration-scale` on the root element: 1 is the designed speed, 2 twice as slow, 0 no animation (the library CSS sets 0 under prefers-reduced-motion). The server renders with 1. */
function readScale() {
  if (typeof document === "undefined") return 1;
  return Number(getComputedStyle(document.documentElement).getPropertyValue("--motion-duration-scale"));
}

/** The library's transitions at the speed `--motion-duration-scale` sets, read when the component mounts. Every Motion animation uses one of them; multiply delays and timed effects by `scale`. */
export function useSprings() {
  const [scale] = useState(readScale);

  /** A spring that settles in about `visualDuration` seconds at scale 1. At 0 it's instant: Motion ignores a visualDuration of 0 and would fall back to its bouncy default. */
  function spring(visualDuration: number, bounce = 0): Transition {
    return scale === 0 ? instant : { type: "spring", visualDuration: visualDuration * scale, bounce };
  }

  const soft = spring(0.3);
  const snap: Transition = scale === 0 ? instant : { type: "spring", stiffness: 224 / scale ** 2, damping: 22.4 / scale };
  const swap: Swap = {
    initial: { opacity: 0, filter: "blur(4px)", scale: 0.96 },
    animate: { opacity: 1, filter: "blur(0px)", scale: 1, transition: { ...soft, delay: 0.1 * scale } },
    exit: { opacity: 0, filter: "blur(4px)", scale: 0.96, transition: spring(0.12) },
  };

  return {
    scale,
    spring,
    /** Size and position. */
    shape: spring(0.38, 0.15),
    /** Color and opacity. */
    soft,
    /** Release after a drag: set by stiffness and damping, so it keeps a moving value's speed (Motion starts springs set by duration from rest). */
    snap,
    /** A line or an arc drawing itself. */
    draw: spring(0.7),
    /** Blur swap for content that changes inside a morphing shape: the old content is gone before the new one enters. */
    swap,
  };
}

/**
 * Left and right insets of a pill that slides between positions. The edge on the side of travel
 * rides a quick spring and the other a slow one, so the pill stretches ahead and catches up.
 */
export function useLiquid(left: number, right: number): [MotionValue<number>, MotionValue<number>] {
  const { spring } = useSprings();
  const l = useMotionValue(left);
  const r = useMotionValue(right);
  useEffect(() => {
    const forward = left - right > l.get() - r.get();
    const lead = spring(0.2, 0.15);
    const trail = spring(0.42, 0.1);
    animate(l, left, forward ? trail : lead);
    animate(r, right, forward ? lead : trail);
  }, [left, right, l, r]);
  return [l, r];
}
