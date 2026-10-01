import { animate, motion, useTransform } from "motion/react";
import { useId, useRef } from "react";
import { dragHandlers, rubber, useStretch } from "./drag";
import { useSprings } from "./springs";
import { useSize } from "./useSize";

type SliderTrackProps = {
  value: [number] | [number, number];
  onValueChange: (index: number, value: number) => void;
  min: number;
  max: number;
  step: number;
  labels: string[];
  formatValue: (value: number) => string;
  id?: string;
  labelledBy?: string;
  describedBy?: string;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

const HEIGHT = 44;
const INSET = 4;
const END = HEIGHT / 2;
const GAP = 30;

function SliderKnobs({
  value, onValueChange, min, max, step, labels, formatValue,
  id, labelledBy, describedBy, invalid, required, disabled, width,
}: SliderTrackProps & { width: number }) {
  const { snap } = useSprings();
  const [stretch, style] = useStretch(width, HEIGHT);
  const grabbed = useRef(0);
  const knobs = useRef<HTMLDivElement[]>([]);
  const labelId = useId();
  const range = value.length === 2;
  const travel = width - 2 * END - (range ? GAP : 0);
  const fractions = value.map((v) => (v - min) / (max - min));
  const from = range ? fractions[0] : 0;
  const to = fractions[range ? 1 : 0];
  const right = useTransform(stretch, (s) => INSET + (1 - to) * travel + (range ? 0 : Math.max(0, -s)));
  const bounds = range ? [[min, value[1]], [value[0], max]] : [[min, max]];

  function moveTo(i: number, target: number) {
    const [lo, hi] = bounds[i];
    onValueChange(i, Math.min(hi, Math.max(lo, target)));
  }

  function drag(event: React.PointerEvent<HTMLDivElement>) {
    const px = event.clientX - event.currentTarget.getBoundingClientRect().left;
    if (event.type === "pointerdown") {
      stretch.stop();
      grabbed.current = range && Math.abs(px - END - from * travel) >= Math.abs(px - END - GAP - to * travel) ? 1 : 0;
      event.preventDefault();
      knobs.current[grabbed.current].focus({ focusVisible: false } as FocusOptions);
    }
    const i = grabbed.current;
    const fraction = (px - END - i * GAP) / travel;
    moveTo(i, min + Math.round((fraction * (max - min)) / step) * step);
    const over = range
      ? i === 0 ? Math.min(0, px - END) : Math.max(0, px - width + END)
      : px > width - END ? px - width + END : Math.min(0, px - END);
    stretch.set(rubber(over));
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
    <div {...(!disabled && dragHandlers(drag, release))} className={`tn:absolute tn:inset-0 ${disabled ? "" : "tn:cursor-pointer tn:touch-none"}`}>
      <motion.div style={style} className="tn:absolute tn:top-1/2 tn:left-0 tn:-translate-y-1/2 tn:overflow-hidden tn:rounded-control tn:bg-paper tn:shadow-control">
        <motion.div
          style={{ left: INSET + from * travel, right }}
          className="tn:absolute tn:inset-y-1 tn:rounded-control tn:bg-ink"
        >
          {value.map((v, i) => (
            <div
              key={i}
              ref={(element) => { if (element) knobs.current[i] = element; }}
              id={i === 0 ? id : undefined}
              role="slider"
              tabIndex={disabled ? -1 : 0}
              aria-label={labelledBy ? undefined : labels[i]}
              aria-labelledby={labelledBy ? `${labelledBy}${range ? ` ${labelId}-${i}` : ""}` : undefined}
              aria-describedby={describedBy}
              aria-invalid={invalid}
              aria-required={required}
              aria-disabled={disabled}
              aria-valuemin={bounds[i][0]}
              aria-valuemax={bounds[i][1]}
              aria-valuenow={v}
              aria-valuetext={formatValue(v)}
              onKeyDown={disabled ? undefined : (event) => onKeyDown(event, i)}
              className={`tn:absolute tn:top-1/2 ${range && i === 0 ? "tn:left-1.5" : "tn:right-1.5"} tn:size-6 tn:-translate-y-1/2 tn:rounded-full tn:bg-paper tn:-outline-offset-6 tn:focus-visible:outline-2 tn:focus-visible:outline-focus`}
            >
              {range && <span id={`${labelId}-${i}`} className="tn:sr-only">{labels[i]}</span>}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export function SliderTrack({ className = "", ...props }: SliderTrackProps) {
  const [size, measure] = useSize();
  return (
    <div ref={measure} className={`tn:relative tn:h-11 tn:w-full ${props.disabled ? "tn:opacity-40" : ""} ${className}`}>
      {size && <SliderKnobs {...props} width={size.width} />}
    </div>
  );
}
