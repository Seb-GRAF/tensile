import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useState } from "react";
import { dragHandlers, rubber } from "../../drag";
import { clock } from "../../playback";
import { shape, snap } from "../../springs";

export type WaveformScrubberProps = {
  /** Bar heights from 0 to 1, one bar per peak. */
  peaks: number[];
  /** Position in seconds. */
  value: number;
  onValueChange: (value: number) => void;
  /** Length in seconds. */
  duration: number;
  label?: string;
  formatTime?: (seconds: number) => string;
};

const STEP = 5;

export function WaveformScrubber({
  peaks,
  value,
  onValueChange,
  duration,
  label = "Seek",
  formatTime = clock,
}: WaveformScrubberProps) {
  const [scrubbing, setScrubbing] = useState(false);
  const stretch = useMotionValue(0);
  const left = useTransform(stretch, (s) => Math.min(0, s));
  const right = useTransform(stretch, (s) => -Math.max(0, s));

  function drag(event: React.PointerEvent<HTMLDivElement>) {
    if (event.type === "pointerdown") {
      stretch.stop();
      setScrubbing(true);
    }
    const box = event.currentTarget.getBoundingClientRect();
    const px = event.clientX - box.left;
    onValueChange(duration * Math.min(1, Math.max(0, px / box.width)));
    stretch.set(rubber(px > box.width ? px - box.width : Math.min(0, px)));
  }

  function release() {
    setScrubbing(false);
    animate(stretch, 0, snap);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const targets: Record<string, number> = {
      ArrowLeft: value - STEP,
      ArrowDown: value - STEP,
      ArrowRight: value + STEP,
      ArrowUp: value + STEP,
      Home: 0,
      End: duration,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    onValueChange(Math.min(duration, Math.max(0, target)));
  }

  return (
    <div className="w-[360px] rounded-3xl bg-ink px-6 py-4 shadow-float">
      <div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={Math.round(duration)}
        aria-valuenow={Math.round(value)}
        aria-valuetext={formatTime(value)}
        {...dragHandlers(drag, release)}
        onKeyDown={onKeyDown}
        className="relative flex h-11 cursor-pointer touch-none items-center rounded-xl outline-offset-2 focus-visible:outline-2 focus-visible:outline-paper"
      >
        <motion.div
          initial={false}
          animate={{ height: scrubbing ? 44 : 32 }}
          transition={shape}
          style={{ left, right }}
          className="absolute"
        >
          <div className="absolute inset-0 flex items-center gap-0.5">
            {peaks.map((peak, i) => (
              <span key={i} style={{ height: `${peak * 100}%` }} className="flex-1 rounded-full bg-paper/25" />
            ))}
          </div>
          <div
            style={{ clipPath: `inset(0 ${(1 - value / duration) * 100}% 0 0)` }}
            className="absolute inset-0 flex items-center gap-0.5"
          >
            {peaks.map((peak, i) => (
              <span key={i} style={{ height: `${peak * 100}%` }} className="flex-1 rounded-full bg-paper" />
            ))}
          </div>
        </motion.div>
      </div>
      <div className="mt-1 flex justify-between text-[11px] tabular-nums text-paper/55">
        <span>{formatTime(value)}</span>
        <span>−{formatTime(duration - value)}</span>
      </div>
    </div>
  );
}
