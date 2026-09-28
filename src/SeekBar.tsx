import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useState } from "react";
import { dragHandlers, rubber } from "./drag";
import { useSprings } from "./springs";
import { clock } from "./playback";

export type SeekBarProps = {
  /** Position in seconds. */
  value: number;
  /** Length in seconds. */
  duration: number;
  onValueChange: (value: number) => void;
  /** Called with true when a drag starts and false when it ends, so playback can wait while scrubbing. */
  onScrubChange: (scrubbing: boolean) => void;
  label: string;
  /** The position as text for screen readers. */
  valueText: string;
  className?: string;
};

const steps: Record<string, number> = { ArrowRight: 5, ArrowLeft: -5 };

/** Media progress bar for dark surfaces: while held it follows the pointer, thickens, and stretches past either end; ArrowLeft and ArrowRight skip 5 s. */
export function SeekBar({ value, duration, onValueChange, onScrubChange, label, valueText, className = "" }: SeekBarProps) {
  const { shape, snap } = useSprings();
  const [scrubbing, setScrubbing] = useState(false);
  const stretch = useMotionValue(0);
  const left = useTransform(stretch, (s) => Math.min(0, s));
  const right = useTransform(stretch, (s) => -Math.max(0, s));

  function drag(event: React.PointerEvent<HTMLDivElement>) {
    if (event.type === "pointerdown") {
      stretch.stop();
      setScrubbing(true);
      onScrubChange(true);
    }
    const box = event.currentTarget.getBoundingClientRect();
    const px = event.clientX - box.left;
    onValueChange(duration * Math.min(1, Math.max(0, px / box.width)));
    stretch.set(rubber(px > box.width ? px - box.width : Math.min(0, px)));
  }

  function release() {
    setScrubbing(false);
    onScrubChange(false);
    animate(stretch, 0, snap);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const step = steps[event.key];
    if (step === undefined) return;
    event.preventDefault();
    onValueChange(Math.min(duration, Math.max(0, value + step)));
  }

  return (
    <div
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={Math.round(duration)}
      aria-valuenow={Math.round(value)}
      aria-valuetext={valueText}
      {...dragHandlers(drag, release)}
      onKeyDown={onKeyDown}
      className={`relative flex h-5 cursor-pointer touch-none items-center rounded-control outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus ${className}`}
    >
      <motion.div
        initial={false}
        animate={{ height: scrubbing ? 12 : 6 }}
        transition={shape}
        style={{ left, right }}
        className="absolute overflow-hidden rounded-control bg-ink-3"
      >
        <div className="h-full bg-paper" style={{ width: `${(value / duration) * 100}%` }} />
      </motion.div>
    </div>
  );
}

export function TimeReadout({ value, duration, formatTime = clock }: { value: number; duration: number; formatTime?: (seconds: number) => string }) {
  return (
    <div className="mt-1 flex justify-between text-caption tabular-nums text-paper/55">
      <span>{formatTime(value)}</span>
      <span>−{formatTime(duration - value)}</span>
    </div>
  );
}
