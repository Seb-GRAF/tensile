import { animate, motion, useMotionValue } from "motion/react";
import { useState } from "react";
import { useControllable } from "../../../controllable";
import { dragHandlers, rubber } from "../../../drag";
import { useSprings } from "../../../springs";
import { Icon } from "../../data-display/Icon/Icon";

export type CompareSliderProps = {
  /** Left of the divider: any node that fills the frame, e.g. an img with size-full object-cover. */
  before: React.ReactNode;
  after: React.ReactNode;
  /** Divider position from the left, 0..1 */
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
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
  value: valueProp,
  defaultValue = 0.5,
  onValueChange,
  beforeLabel = "Before",
  afterLabel = "After",
  label = "Divider position",
  className = "",
}: CompareSliderProps) {
  const { shape, snap } = useSprings();
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  const [held, setHeld] = useState(false);
  const stretch = useMotionValue(0);

  function drag(event: React.PointerEvent<HTMLDivElement>) {
    if (event.type === "pointerdown") {
      stretch.stop();
      setHeld(true);
    }
    const box = event.currentTarget.getBoundingClientRect();
    const px = event.clientX - box.left;
    setValue(Math.min(1, Math.max(0, px / box.width)));
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
    setValue(Math.min(1, Math.max(0, target)));
  }

  return (
    <div
      {...dragHandlers(drag, release)}
      className={`tn:relative tn:cursor-ew-resize tn:touch-none tn:rounded-card tn:outline-offset-2 tn:has-focus-visible:outline-2 tn:has-focus-visible:outline-focus ${className}`}
    >
      <div className="tn:absolute tn:inset-0 tn:overflow-hidden tn:rounded-card tn:bg-paper tn:shadow-float">
        <div className="tn:absolute tn:inset-0">
          {before}
          <span className="tn:absolute tn:top-3 tn:left-3 tn:rounded-control tn:bg-paper tn:px-3 tn:py-1 tn:text-label tn:font-medium tn:text-ink">
            {beforeLabel}
          </span>
        </div>
        <div style={{ clipPath: `inset(0 0 0 ${value * 100}%)` }} className="tn:absolute tn:inset-0">
          {after}
          <span className="tn:absolute tn:top-3 tn:right-3 tn:rounded-control tn:bg-paper tn:px-3 tn:py-1 tn:text-label tn:font-medium tn:text-ink">
            {afterLabel}
          </span>
        </div>
        <motion.div style={{ left: `${value * 100}%`, x: stretch }} className="tn:absolute tn:inset-y-0 tn:w-0.5 tn:-translate-x-1/2 tn:bg-paper" />
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
        className="tn:absolute tn:top-1/2 tn:grid tn:-translate-x-1/2 tn:-translate-y-1/2 tn:place-items-center tn:rounded-full tn:bg-paper tn:text-ink tn:shadow-control tn:outline-none"
      >
        <Icon name="chevronsLeftRight" size={16} />
      </motion.div>
    </div>
  );
}
