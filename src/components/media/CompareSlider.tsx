import { animate, motion, useMotionTemplate, useMotionValue, useTransform } from "motion/react";
import { dragHandlers, rubber } from "../../drag";
import { snap } from "../../springs";

export type CompareSliderProps = {
  /** Left of the divider: any node that fills the frame, e.g. an img with size-full object-cover. */
  before: React.ReactNode;
  after: React.ReactNode;
  /** Divider position from the left, 0..1 */
  value: number;
  onValueChange: (value: number) => void;
  beforeLabel?: string;
  afterLabel?: string;
  /** The handle's accessible name. */
  label?: string;
};

const WIDTH = 480;
const STEP = 0.05;

export function CompareSlider({
  before,
  after,
  value,
  onValueChange,
  beforeLabel = "Before",
  afterLabel = "After",
  label = "Divider position",
}: CompareSliderProps) {
  const stretch = useMotionValue(0);
  const x = useTransform(stretch, (s) => value * WIDTH + s);
  const clip = useMotionTemplate`inset(0 0 0 ${x}px)`;

  function drag(event: React.PointerEvent<HTMLDivElement>) {
    if (event.type === "pointerdown") stretch.stop();
    const px = event.clientX - event.currentTarget.getBoundingClientRect().left;
    onValueChange(Math.min(1, Math.max(0, px / WIDTH)));
    const over = px > WIDTH ? px - WIDTH : Math.min(0, px);
    stretch.set(rubber(over));
  }

  function release() {
    animate(stretch, 0, snap);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const targets: Record<string, number> = {
      ArrowLeft: value - STEP,
      ArrowDown: value - STEP,
      ArrowRight: value + STEP,
      ArrowUp: value + STEP,
      Home: 0,
      End: 1,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    onValueChange(Math.min(1, Math.max(0, target)));
  }

  return (
    <div
      {...dragHandlers(drag, release)}
      className="relative h-80 w-120 cursor-ew-resize touch-none rounded-3xl outline-offset-2 has-focus-visible:outline-2 has-focus-visible:outline-ink"
    >
      <div className="absolute inset-0 overflow-hidden rounded-3xl bg-paper shadow-float">
        <div className="absolute inset-0">
          {before}
          <span className="absolute top-3 left-3 rounded-full bg-paper px-3 py-1 text-[13px] font-medium text-ink">
            {beforeLabel}
          </span>
        </div>
        <motion.div style={{ clipPath: clip }} className="absolute inset-0">
          {after}
          <span className="absolute top-3 right-3 rounded-full bg-paper px-3 py-1 text-[13px] font-medium text-ink">
            {afterLabel}
          </span>
        </motion.div>
        <motion.div style={{ x }} className="absolute inset-y-0 left-0 w-0.5 -translate-x-1/2 bg-paper" />
      </div>
      <motion.div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value * 100)}
        onKeyDown={onKeyDown}
        style={{ x }}
        className="absolute top-1/2 left-0 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink shadow-float outline-none"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-4 fill-none stroke-current"
          strokeWidth={2.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 7-5 5 5 5" />
          <path d="m15 7 5 5-5 5" />
        </svg>
      </motion.div>
    </div>
  );
}
