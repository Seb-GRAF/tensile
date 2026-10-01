import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useState } from "react";
import { dragHandlers, rubber } from "../../../drag";
import { clock } from "../../../playback";
import { useSprings } from "../../../springs";
import { TimeReadout } from "../../../SeekBar";
import { Card } from "../../layout/Card/Card";

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
  className?: string;
};

const STEP = 5;

export function WaveformScrubber({
  peaks,
  value,
  onValueChange,
  duration,
  label = "Seek",
  formatTime = clock,
  className = "",
}: WaveformScrubberProps) {
  const { shape, snap } = useSprings();
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
    <Card tone="ink" className={`tn:px-8 tn:py-4 ${className}`}>
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
        className="tn:relative tn:flex tn:h-11 tn:cursor-pointer tn:touch-none tn:items-center tn:rounded-control tn:outline-offset-2 tn:focus-visible:outline-2 tn:focus-visible:outline-focus"
      >
        <motion.div
          initial={false}
          animate={{ height: scrubbing ? 44 : 32 }}
          transition={shape}
          style={{ left, right }}
          className="tn:absolute"
        >
          <div className="tn:absolute tn:inset-0 tn:flex tn:items-center tn:gap-0.5">
            {peaks.map((peak, i) => (
              <span key={i} style={{ height: `${peak * 100}%` }} className="tn:flex-1 tn:rounded-full tn:bg-ink/25" />
            ))}
          </div>
          <div
            style={{ clipPath: `inset(0 ${(1 - value / duration) * 100}% 0 0)` }}
            className="tn:absolute tn:inset-0 tn:flex tn:items-center tn:gap-0.5"
          >
            {peaks.map((peak, i) => (
              <span key={i} style={{ height: `${peak * 100}%` }} className="tn:flex-1 tn:rounded-full tn:bg-ink" />
            ))}
          </div>
        </motion.div>
      </div>
      <TimeReadout value={value} duration={duration} formatTime={formatTime} />
    </Card>
  );
}
