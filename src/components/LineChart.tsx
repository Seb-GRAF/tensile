import { AnimatePresence, motion, type Transition } from "motion/react";
import { useState } from "react";
import { shape, soft, swap } from "../springs";

type Point = { label: string; value: number };

type Props = {
  data: Point[];
  formatValue: (value: number) => string;
  /** Accessible summary of the chart. */
  label: string;
};

const WIDTH = 320;
const HEIGHT = 120;
const TOP = 8;
const draw: Transition = { type: "spring", visualDuration: 0.7, bounce: 0 };
const glide: Transition = { type: "spring", visualDuration: 0.25, bounce: 0.1 };

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

export function LineChart({ data, formatValue, label }: Props) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...data.map((point) => point.value));
  const points = data.map((point, i) => [(i * WIDTH) / (data.length - 1), HEIGHT - (point.value / max) * (HEIGHT - TOP)]);
  const path = curve(points);
  const [endX, endY] = points[points.length - 1];

  function onPointerMove(event: React.PointerEvent<SVGSVGElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    setHover(Math.round(((event.clientX - box.left) / box.width) * (data.length - 1)));
  }

  return (
    <div className="w-[360px] rounded-3xl bg-ink p-5 shadow-float">
      <div className="relative">
        <svg
          role="img"
          aria-label={label}
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
            transition={{ ...shape, delay: 0.55 }}
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
              initial={{ opacity: 0, x: points[hover][0], y: points[hover][1] }}
              animate={{ opacity: 1, x: points[hover][0], y: points[hover][1] }}
              exit={{ opacity: 0 }}
              transition={{ x: glide, y: glide, opacity: soft }}
              className="pointer-events-none absolute top-0 left-0"
            >
              <div className="grid h-6 -translate-x-1/2 -translate-y-[calc(100%+10px)] place-items-center rounded-full bg-paper px-2.5 text-xs font-medium whitespace-nowrap text-ink tabular-nums">
                <AnimatePresence initial={false}>
                  <motion.span key={hover} {...swap} className="col-start-1 row-start-1">
                    {data[hover].label} · {formatValue(data[hover].value)}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="relative mt-3 h-3.5">
        {data.map((point, i) => (
          <span
            key={point.label}
            className="absolute top-0 -translate-x-1/2 text-[11px] leading-none text-paper/55"
            style={{ left: points[i][0] }}
          >
            {point.label}
          </span>
        ))}
      </div>
    </div>
  );
}
