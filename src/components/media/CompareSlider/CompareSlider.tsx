import { animate, motion, useMotionValue } from "motion/react";
import { useState } from "react";
import { dragHandlers, rubber } from "../../../drag";
import { useSprings } from "../../../springs";
import { Icon } from "../../data-display/Icon/Icon";

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
  className?: string;
};

const STEP = 0.05;

export function CompareSlider({
  before,
  after,
  value,
  onValueChange,
  beforeLabel = "Before",
  afterLabel = "After",
  label = "Divider position",
  className = "",
}: CompareSliderProps) {
  const { shape, snap } = useSprings();
  const [held, setHeld] = useState(false);
  const stretch = useMotionValue(0);

  function drag(event: React.PointerEvent<HTMLDivElement>) {
    if (event.type === "pointerdown") {
      stretch.stop();
      setHeld(true);
    }
    const box = event.currentTarget.getBoundingClientRect();
    const px = event.clientX - box.left;
    onValueChange(Math.min(1, Math.max(0, px / box.width)));
    const over = px > box.width ? px - box.width : Math.min(0, px);
    stretch.set(rubber(over));
  }

  function release() {
    setHeld(false);
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
      className={`relative cursor-ew-resize touch-none rounded-card outline-offset-2 has-focus-visible:outline-2 has-focus-visible:outline-focus ${className}`}
    >
      <div className="absolute inset-0 overflow-hidden rounded-card bg-paper shadow-float">
        <div className="absolute inset-0">
          {before}
          <span className="absolute top-3 left-3 rounded-control bg-paper px-3 py-1 text-label font-medium text-ink">
            {beforeLabel}
          </span>
        </div>
        <div style={{ clipPath: `inset(0 0 0 ${value * 100}%)` }} className="absolute inset-0">
          {after}
          <span className="absolute top-3 right-3 rounded-control bg-paper px-3 py-1 text-label font-medium text-ink">
            {afterLabel}
          </span>
        </div>
        <motion.div style={{ left: `${value * 100}%`, x: stretch }} className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-paper" />
      </div>
      <motion.div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value * 100)}
        onKeyDown={onKeyDown}
        initial={false}
        animate={{ width: held ? 52 : 44, height: held ? 52 : 44 }}
        transition={shape}
        style={{ left: `${value * 100}%`, x: stretch }}
        className="absolute top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink shadow-control outline-none"
      >
        <Icon size={16}>
          <path d="m9 7-5 5 5 5" />
          <path d="m15 7 5 5-5 5" />
        </Icon>
      </motion.div>
    </div>
  );
}
