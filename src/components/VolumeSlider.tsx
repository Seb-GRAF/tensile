import { animate, motion, useTransform } from "motion/react";
import { dragHandlers, rubber, useStretch } from "../drag";
import { snap, soft } from "../springs";

export type VolumeSliderProps = {
  /** 0..1 */
  value: number;
  onValueChange: (value: number) => void;
  label?: string;
};

const WIDTH = 240;
const HEIGHT = 44;
const INSET = 4;
const FILL_MIN = 36; // the fill never gets narrower than the circle around the speaker
const TRAVEL = WIDTH - 2 * INSET - FILL_MIN;
const steps: Record<string, number> = { ArrowRight: 0.05, ArrowUp: 0.05, ArrowLeft: -0.05, ArrowDown: -0.05 };

export function VolumeSlider({ value, onValueChange, label = "Volume" }: VolumeSliderProps) {
  const [stretch, style] = useStretch(WIDTH, HEIGHT);
  const fill = useTransform(stretch, (s) => FILL_MIN + value * TRAVEL + Math.max(0, s));

  function drag(event: React.PointerEvent<HTMLDivElement>) {
    const px = event.clientX - event.currentTarget.getBoundingClientRect().left;
    onValueChange(Math.min(1, Math.max(0, (px - INSET - FILL_MIN) / TRAVEL)));
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
    onValueChange(Math.min(1, Math.max(0, value + step)));
  }

  return (
    <div
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
      {...dragHandlers(drag, release)}
      onKeyDown={onKeyDown}
      className="relative h-11 w-60 cursor-pointer touch-none rounded-full outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
    >
      <motion.div
        style={style}
        className="absolute top-1/2 left-0 -translate-y-1/2 overflow-hidden rounded-full bg-paper shadow-float"
      >
        <motion.div style={{ width: fill }} className="absolute inset-y-1 left-1 rounded-full bg-ink">
          <svg
            viewBox="0 0 24 24"
            className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 fill-none stroke-paper"
            strokeWidth={2.25}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 5 6 9H2v6h4l5 4z" />
            <motion.path d="M15.54 8.46a5 5 0 0 1 0 7.07" initial={false} animate={{ opacity: value > 0 ? 1 : 0 }} transition={soft} />
            <motion.path
              d="M19.07 4.93a10 10 0 0 1 0 14.14"
              initial={false}
              animate={{ opacity: value > 0.5 ? 1 : 0 }}
              transition={soft}
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
