import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { dragHandlers, rubber } from "../../../drag";
import { useControllable } from "../../../controllable";
import { useSprings, useLiquid } from "../../../springs";

export type PageDotsProps = {
  count: number;
  /** The current page, from 0. */
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  label?: string;
  /** Text for the current page; `page` counts from 1. */
  pageLabel?: (page: number, count: number) => string;
  className?: string;
};

const HEIGHT = 32;
const DOT = 8;
const PILL = 16;
const SLOT = 16;

export function PageDots({
  count,
  value: valueProp,
  defaultValue = 0,
  onValueChange,
  label = "Pages",
  pageLabel = (page: number, count: number) => `Page ${page} of ${count}`,
  className = "",
}: PageDotsProps) {
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  const { shape, snap } = useSprings();
  const width = HEIGHT - DOT + PILL + (count - 1) * SLOT;
  const stretch = useMotionValue(0);
  const start = (HEIGHT - DOT) / 2 + value * SLOT;
  const [left, right] = useLiquid(start, width - start - PILL);
  const indicatorLeft = useTransform(() => left.get() + Math.min(0, stretch.get()));
  const indicatorRight = useTransform(() => right.get() - Math.max(0, stretch.get()));

  function moveTo(page: number) {
    const next = Math.min(count - 1, Math.max(0, page));
    if (next !== value) setValue(next);
  }

  function drag(event: React.PointerEvent<HTMLDivElement>) {
    if (event.type === "pointerdown") stretch.stop();
    const px = event.clientX - event.currentTarget.getBoundingClientRect().left;
    moveTo(Math.round((px - (HEIGHT - DOT + PILL) / 2) / SLOT));
    const over = px > width ? px - width : Math.min(0, px);
    stretch.set(rubber(over));
  }

  function release() {
    animate(stretch, 0, snap);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const targets: Record<string, number> = {
      ArrowRight: value + 1,
      ArrowUp: value + 1,
      ArrowLeft: value - 1,
      ArrowDown: value - 1,
      Home: 0,
      End: count - 1,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    moveTo(target);
  }

  return (
    <div
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={1}
      aria-valuemax={count}
      aria-valuenow={value + 1}
      aria-valuetext={pageLabel(value + 1, count)}
      {...dragHandlers(drag, release)}
      onKeyDown={onKeyDown}
      style={{ width }}
      className={`tn:relative tn:flex tn:h-8 tn:cursor-pointer tn:touch-none tn:items-center tn:gap-2 tn:rounded-control tn:px-3 tn:outline-offset-2 tn:focus-visible:outline-2 tn:focus-visible:outline-focus ${className}`}
    >
      {Array.from({ length: count }, (_, i) => (
        <motion.span
          key={i}
          initial={false}
          animate={{ width: i === value ? PILL : DOT }}
          transition={shape}
          className="tn:h-2 tn:rounded-full tn:bg-muted/40"
        />
      ))}
      <motion.span style={{ left: indicatorLeft, right: indicatorRight }} className="tn:absolute tn:inset-y-3 tn:rounded-full tn:bg-ink" />
    </div>
  );
}
