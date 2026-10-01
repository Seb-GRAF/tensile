import { motion } from "motion/react";
import { useSprings } from "./springs";

/** A check in the current text color that draws itself when it mounts. The stroke follows `size`, so the line renders at 1.5 px. */
export function Check({ size }: { size: number }) {
  const { soft, scale } = useSprings();
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className="tn:block tn:fill-none tn:stroke-current"
      strokeWidth={36 / size}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M4 12.5l5 5L20 6.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ ...soft, delay: 0.15 * scale }}
      />
    </svg>
  );
}
