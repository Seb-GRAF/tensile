import { animate, motion, useTransform } from "motion/react";
import { dragHandlers, rubber, useStretch } from "../../drag";
import { useSprings } from "../../springs";
import { useSize } from "../../useSize";
import { Icon } from "../data-display/Icon";

export type VolumeSliderProps = {
  /** 0..1 */
  value: number;
  onValueChange: (value: number) => void;
  label?: string;
  tone?: "paper" | "ink";
  formatValue?: (value: number) => string;
  className?: string;
};

const HEIGHT = 44;
const INSET = 4;
const FILL_MIN = 36;
const steps: Record<string, number> = { ArrowRight: 0.05, ArrowUp: 0.05, ArrowLeft: -0.05, ArrowDown: -0.05 };

function VolumeTrack({ value, onValueChange, label, tone, formatValue, width }: Required<Omit<VolumeSliderProps, "className">> & { width: number }) {
  const { snap, soft } = useSprings();
  const travel = width - 2 * INSET - FILL_MIN;
  const [stretch, style] = useStretch(width, HEIGHT);
  const fill = useTransform(stretch, (s) => FILL_MIN + value * travel + Math.max(0, s));

  function drag(event: React.PointerEvent<HTMLDivElement>) {
    if (event.type === "pointerdown") stretch.stop();
    const px = event.clientX - event.currentTarget.getBoundingClientRect().left;
    onValueChange(Math.min(1, Math.max(0, (px - INSET - FILL_MIN) / travel)));
    const over = px > width ? px - width : Math.min(0, px);
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
      aria-valuetext={formatValue(value)}
      {...dragHandlers(drag, release)}
      onKeyDown={onKeyDown}
      className={`absolute inset-0 cursor-pointer touch-none rounded-control outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus ${tone === "ink" ? "[--color-focus:var(--color-paper)] [--color-line:var(--color-ink-3)]" : ""}`}
    >
      <motion.div
        style={style}
        className={`absolute top-1/2 left-0 -translate-y-1/2 overflow-hidden rounded-control shadow-float ${tone === "ink" ? "bg-ink-3" : "bg-paper"}`}
      >
        <motion.div style={{ width: fill }} className={`absolute inset-y-1 left-1 rounded-control ${tone === "ink" ? "bg-paper text-ink" : "bg-ink text-paper"}`}>
          <Icon size={16} className="absolute top-1/2 left-2.5 -translate-y-1/2">
            <path d="M11 5 6 9H2v6h4l5 4z" />
            <motion.path d="M15.54 8.46a5 5 0 0 1 0 7.07" initial={false} animate={{ opacity: value > 0 ? 1 : 0 }} transition={soft} />
            <motion.path
              d="M19.07 4.93a10 10 0 0 1 0 14.14"
              initial={false}
              animate={{ opacity: value > 0.5 ? 1 : 0 }}
              transition={soft}
            />
          </Icon>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function VolumeSlider({
  value,
  onValueChange,
  label = "Volume",
  tone = "paper",
  formatValue = (value: number) => `${Math.round(value * 100).toLocaleString("en-US")}%`,
  className = "",
}: VolumeSliderProps) {
  const [size, measure] = useSize();
  return (
    <div ref={measure} className={`relative h-11 w-full ${className}`}>
      {size && <VolumeTrack width={size.width} value={value} onValueChange={onValueChange} label={label} tone={tone} formatValue={formatValue} />}
    </div>
  );
}
