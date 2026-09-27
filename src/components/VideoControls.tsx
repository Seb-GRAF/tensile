import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";
import { dragHandlers, rubber, useStretch } from "../drag";
import { clock, playPausePath } from "../playback";
import { SeekBar } from "../SeekBar";
import { snap, soft } from "../springs";

export type VideoControlsProps = {
  /** Video length in seconds. */
  duration: number;
  playing: boolean;
  onPlayingChange: (playing: boolean) => void;
  /** Position in seconds. */
  currentTime: number;
  onCurrentTimeChange: (currentTime: number) => void;
  /** 0..1 */
  volume: number;
  onVolumeChange: (volume: number) => void;
  /** Called with true when a seek drag starts and false when it ends, so playback can wait while scrubbing. */
  onScrubChange?: (scrubbing: boolean) => void;
  playLabel?: string;
  pauseLabel?: string;
  seekLabel?: string;
  volumeLabel?: string;
  formatTime?: (seconds: number) => string;
};

const WIDTH = 120;
const HEIGHT = 44;
const INSET = 4;
const FILL_MIN = 36;
const TRAVEL = WIDTH - 2 * INSET - FILL_MIN;
const steps: Record<string, number> = { ArrowRight: 0.05, ArrowUp: 0.05, ArrowLeft: -0.05, ArrowDown: -0.05 };

export function VideoControls({
  duration,
  playing,
  onPlayingChange,
  currentTime,
  onCurrentTimeChange,
  volume,
  onVolumeChange,
  onScrubChange = () => {},
  playLabel = "Play",
  pauseLabel = "Pause",
  seekLabel = "Seek",
  volumeLabel = "Volume",
  formatTime = clock,
}: VideoControlsProps) {
  const morph = useMotionValue(playing ? 1 : 0);
  const d = useTransform(morph, playPausePath);
  const [stretch, style] = useStretch(WIDTH, HEIGHT);
  const fill = useTransform(stretch, (s) => FILL_MIN + volume * TRAVEL + Math.max(0, s));

  useEffect(() => {
    animate(morph, playing ? 1 : 0, soft);
  }, [playing, morph]);

  function drag(event: React.PointerEvent<HTMLDivElement>) {
    if (event.type === "pointerdown") stretch.stop();
    const px = event.clientX - event.currentTarget.getBoundingClientRect().left;
    onVolumeChange(Math.min(1, Math.max(0, (px - INSET - FILL_MIN) / TRAVEL)));
    const over = px > WIDTH ? px - WIDTH : Math.min(0, px);
    stretch.set(rubber(over));
  }

  function release() {
    animate(stretch, 0, snap);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const step = steps[event.key];
    if (step === undefined) return;
    event.preventDefault();
    onVolumeChange(Math.min(1, Math.max(0, volume + step)));
  }

  return (
    <div className="flex h-13 items-center overflow-hidden rounded-full bg-ink p-1 shadow-float">
      <motion.button
        type="button"
        aria-label={playing ? pauseLabel : playLabel}
        onClick={() => onPlayingChange(!playing)}
        whileTap={{ scale: 0.85 }}
        className="grid size-11 shrink-0 place-items-center rounded-full outline-offset-2 focus-visible:outline-2 focus-visible:outline-paper"
      >
        <svg viewBox="0 0 24 24" className="size-6 fill-paper stroke-paper" strokeWidth={2} strokeLinejoin="round">
          <motion.path d={d} />
        </svg>
      </motion.button>
      <div className="mr-6 ml-3 grow">
        <SeekBar
          value={currentTime}
          duration={duration}
          onValueChange={onCurrentTimeChange}
          onScrubChange={onScrubChange}
          label={seekLabel}
          valueText={formatTime(currentTime)}
        />
        <div className="mt-1 flex justify-between text-[11px] tabular-nums text-paper/55">
          <span>{formatTime(currentTime)}</span>
          <span>−{formatTime(duration - currentTime)}</span>
        </div>
      </div>
      <div
        role="slider"
        tabIndex={0}
        aria-label={volumeLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(volume * 100)}
        {...dragHandlers(drag, release)}
        onKeyDown={onKeyDown}
        className="relative h-11 w-30 shrink-0 cursor-pointer touch-none rounded-full outline-offset-2 focus-visible:outline-2 focus-visible:outline-paper"
      >
        <motion.div
          style={style}
          className="absolute top-1/2 left-0 -translate-y-1/2 overflow-hidden rounded-full bg-ink-3"
        >
          <motion.div style={{ width: fill }} className="absolute inset-y-1 left-1 rounded-full bg-paper">
            <svg
              viewBox="0 0 24 24"
              className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 fill-none stroke-ink"
              strokeWidth={2.25}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 5 6 9H2v6h4l5 4z" />
              <motion.path d="M15.54 8.46a5 5 0 0 1 0 7.07" initial={false} animate={{ opacity: volume > 0 ? 1 : 0 }} transition={soft} />
              <motion.path
                d="M19.07 4.93a10 10 0 0 1 0 14.14"
                initial={false}
                animate={{ opacity: volume > 0.5 ? 1 : 0 }}
                transition={soft}
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
