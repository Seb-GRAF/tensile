import { animate, motion } from "motion/react";
import { useRef } from "react";
import { dragHandlers, rubber, useStretch } from "../../drag";
import { snap } from "../../springs";

export type RangeSliderProps = {
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  formatValue?: (value: number) => string;
  lowerLabel?: string;
  upperLabel?: string;
};

const WIDTH = 240;
const HEIGHT = 44;
const INSET = 4;
const END = HEIGHT / 2;
const GAP = 30;
const TRAVEL = WIDTH - 2 * END - GAP;

export function RangeSlider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  formatValue = (value: number) => value.toLocaleString("en-US"),
  lowerLabel = "Minimum",
  upperLabel = "Maximum",
}: RangeSliderProps) {
  const [stretch, style] = useStretch(WIDTH, HEIGHT);
  const grabbed = useRef(0);
  const [from, to] = value.map((v) => (v - min) / (max - min));
  const bounds = [[min, value[1]], [value[0], max]];

  function moveTo(i: number, target: number) {
    const [lo, hi] = bounds[i];
    const next = Math.min(hi, Math.max(lo, target));
    onValueChange(i === 0 ? [next, value[1]] : [value[0], next]);
  }

  function drag(event: React.PointerEvent<HTMLDivElement>) {
    const px = event.clientX - event.currentTarget.getBoundingClientRect().left;
    if (event.type === "pointerdown") {
      stretch.stop();
      grabbed.current = Math.abs(px - END - from * TRAVEL) < Math.abs(px - END - GAP - to * TRAVEL) ? 0 : 1;
    }
    const i = grabbed.current;
    const fraction = (px - END - i * GAP) / TRAVEL;
    moveTo(i, min + Math.round((fraction * (max - min)) / step) * step);
    stretch.set(rubber(i === 0 ? Math.min(0, px - END) : Math.max(0, px - WIDTH + END)));
  }

  function release() {
    animate(stretch, 0, snap);
  }

  function onKeyDown(event: React.KeyboardEvent, i: number) {
    const targets: Record<string, number> = {
      ArrowRight: value[i] + step,
      ArrowUp: value[i] + step,
      ArrowLeft: value[i] - step,
      ArrowDown: value[i] - step,
      Home: bounds[i][0],
      End: bounds[i][1],
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    moveTo(i, target);
  }

  return (
    <div {...dragHandlers(drag, release)} className="relative h-11 w-60 cursor-pointer touch-none">
      <motion.div
        style={style}
        className="absolute top-1/2 left-0 -translate-y-1/2 overflow-hidden rounded-full bg-paper shadow-float"
      >
        <div
          style={{ left: INSET + from * TRAVEL, right: INSET + (1 - to) * TRAVEL }}
          className="absolute inset-y-1 rounded-full bg-ink"
        >
          {value.map((v, i) => (
            <div
              key={i}
              role="slider"
              tabIndex={0}
              aria-label={i === 0 ? lowerLabel : upperLabel}
              aria-valuemin={bounds[i][0]}
              aria-valuemax={bounds[i][1]}
              aria-valuenow={v}
              aria-valuetext={formatValue(v)}
              onKeyDown={(event) => onKeyDown(event, i)}
              className={`absolute top-1/2 ${i === 0 ? "left-1.5" : "right-1.5"} size-6 -translate-y-1/2 rounded-full bg-paper outline-offset-2 focus-visible:outline-2 focus-visible:outline-paper`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
