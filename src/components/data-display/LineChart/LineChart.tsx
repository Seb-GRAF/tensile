import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useSprings } from "../../../springs";
import { Card } from "../../layout/Card/Card";

type Point = { label: string; value: number };

export type LineChartProps = {
  data: Point[];
  formatValue?: (value: number) => string;
  /** Accessible summary of the chart. */
  label?: string;
  className?: string;
};

const WIDTH = 320;
const HEIGHT = 120;
const TOP = 8;

/** Smooth curve through the points (Catmull-Rom as cubic Béziers). */
function curve(points: number[][]) {
  return points
    .map(([x, y], i) => {
      if (i === 0) return `M${x} ${y}`;
      const [x0, y0] = points[Math.max(0, i - 2)];
      const [x1, y1] = points[i - 1];
      const [x3, y3] = points[Math.min(points.length - 1, i + 1)];
      return `C${x1 + (x - x0) / 6} ${y1 + (y - y0) / 6} ${x - (x3 - x1) / 6} ${y - (y3 - y1) / 6} ${x} ${y}`;
    })
    .join("");
}

export function LineChart({
  data,
  formatValue = (value: number) => value.toLocaleString("en-US"),
  label = "Line chart",
  className = "",
}: LineChartProps) {
  const { shape, soft, swap, draw, spring, scale } = useSprings();
  const glide = spring(0.25, 0.1);
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...data.map((point) => point.value));
  const points = data.map((point, i) => [(i * WIDTH) / (data.length - 1), HEIGHT - (point.value / max) * (HEIGHT - TOP)]);
  const path = curve(points);
  const [endX, endY] = points[points.length - 1];
  const text = hover === null ? "" : `${data[hover].label} · ${formatValue(data[hover].value)}`;

  function onPointerMove(event: React.PointerEvent<SVGSVGElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    setHover(Math.round(((event.clientX - box.left) / box.width) * (data.length - 1)));
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const index = hover ?? 0;
    const targets: Record<string, number> = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: data.length - 1 };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    setHover(Math.min(data.length - 1, Math.max(0, target)));
  }

  return (
    <Card
      tone="ink"
      role="group"
      tabIndex={0}
      aria-label={label}
      onKeyDown={onKeyDown}
      onFocus={() => setHover((index) => index ?? 0)}
      onBlur={() => setHover(null)}
      className={`p-5 outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus ${className}`}
    >
      <div className="relative">
        <svg
          aria-hidden
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          onPointerMove={onPointerMove}
          onPointerLeave={() => setHover(null)}
          className="block w-full overflow-visible"
        >
          {[TOP, (TOP + HEIGHT) / 2, HEIGHT].map((y) => (
            <line key={y} x1={0} x2={WIDTH} y1={y} y2={y} className="stroke-ink-3" />
          ))}
          <AnimatePresence>
            {hover !== null && (
              <motion.line
                key="guide"
                y1={TOP}
                y2={HEIGHT}
                initial={{ opacity: 0, x: points[hover][0] }}
                animate={{ opacity: 1, x: points[hover][0] }}
                exit={{ opacity: 0 }}
                transition={{ x: glide, opacity: soft }}
                className="stroke-muted"
              />
            )}
          </AnimatePresence>
          <motion.path
            key={path}
            d={path}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={draw}
            className="fill-none stroke-accent"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <motion.circle
            key={`end ${path}`}
            cx={endX}
            cy={endY}
            r={4}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ ...shape, delay: 0.55 * scale }}
            className="fill-accent stroke-ink"
            strokeWidth={2}
          />
          <AnimatePresence>
            {hover !== null && (
              <motion.circle
                key="dot"
                r={4}
                initial={{ opacity: 0, cx: points[hover][0], cy: points[hover][1] }}
                animate={{ opacity: 1, cx: points[hover][0], cy: points[hover][1] }}
                exit={{ opacity: 0 }}
                transition={{ cx: glide, cy: glide, opacity: soft }}
                className="pointer-events-none fill-ink stroke-accent"
                strokeWidth={2}
              />
            )}
          </AnimatePresence>
        </svg>
        <AnimatePresence>
          {hover !== null && (
            <motion.div
              key="tooltip"
              aria-hidden
              initial={{ opacity: 0, left: `${(points[hover][0] / WIDTH) * 100}%`, top: `${(points[hover][1] / HEIGHT) * 100}%` }}
              animate={{ opacity: 1, left: `${(points[hover][0] / WIDTH) * 100}%`, top: `${(points[hover][1] / HEIGHT) * 100}%` }}
              exit={{ opacity: 0 }}
              transition={{ left: glide, top: glide, opacity: soft }}
              className="pointer-events-none absolute w-0"
            >
              <motion.div
                initial={false}
                animate={{ x: hover === 0 ? "0%" : hover === data.length - 1 ? "-100%" : "-50%" }}
                transition={glide}
                className="grid h-6 w-max -translate-y-[calc(100%+10px)] place-content-center place-items-center rounded-control bg-paper px-2.5 text-label font-medium whitespace-nowrap text-ink tabular-nums"
              >
                <AnimatePresence initial={false}>
                  <motion.span key={hover} {...swap} className="col-start-1 row-start-1">
                    {text}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="relative mt-3 h-3.5">
        {data.map((point, i) => (
          <span
            key={point.label}
            className="absolute top-0 -translate-x-1/2 text-caption leading-none text-paper/55"
            style={{ left: `${(i / (data.length - 1)) * 100}%` }}
          >
            {point.label}
          </span>
        ))}
      </div>
      <span role="status" className="sr-only">{text}</span>
    </Card>
  );
}
