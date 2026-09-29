import { AnimatePresence, motion, useMotionTemplate } from "motion/react";
import { useState } from "react";
import { useLiquid, useSprings } from "../../../springs";
import { useWidth } from "../../../useWidth";
import { Card } from "../../layout/Card/Card";

type Bar = { label: string; value: number };

export type BarChartProps = {
  data: Bar[];
  formatValue?: (value: number) => string;
  /** Accessible summary of the chart. */
  label?: string;
  className?: string;
};

const HEIGHT = 120;
const TOP = 8;

function Highlight({ left, right }: { left: number; right: number }) {
  const { soft } = useSprings();
  const [l, r] = useLiquid(left, right);
  const insetLeft = useMotionTemplate`${l}%`;
  const insetRight = useMotionTemplate`${r}%`;
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={soft}
      style={{ left: insetLeft, right: insetRight }}
      className="absolute inset-y-0 rounded-overlay bg-ink-3"
    />
  );
}

function Bubble({ text, x }: { text: string; x: string }) {
  const { shape, swap } = useSprings();
  const [width, measure] = useWidth();
  return (
    <motion.div
      initial={false}
      animate={{ width, x }}
      transition={shape}
      className="grid h-6 -translate-y-[calc(100%+10px)] place-content-center place-items-center overflow-hidden rounded-control bg-paper text-label font-medium text-ink tabular-nums"
    >
      <AnimatePresence initial={false}>
        <motion.span key={text} ref={measure} {...swap} className="col-start-1 row-start-1 whitespace-nowrap px-2.5">
          {text}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}

export function BarChart({
  data,
  formatValue = (value: number) => value.toLocaleString("en-US"),
  label = "Bar chart",
  className = "",
}: BarChartProps) {
  const { shape, soft } = useSprings();
  const [active, setActive] = useState<number | null>(null);
  const max = Math.max(...data.map((bar) => bar.value));
  const heights = data.map((bar) => (bar.value / max) * (HEIGHT - TOP));
  const slot = 100 / data.length;
  const text = active === null ? "" : `${data[active].label} · ${formatValue(data[active].value)}`;

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    setActive(Math.floor(((event.clientX - box.left) / box.width) * data.length));
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const index = active ?? 0;
    const targets: Record<string, number> = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: data.length - 1 };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    setActive(Math.min(data.length - 1, Math.max(0, target)));
  }

  return (
    <Card
      tone="ink"
      role="group"
      tabIndex={0}
      aria-label={label}
      onKeyDown={onKeyDown}
      onFocus={() => setActive((index) => index ?? 0)}
      onBlur={() => setActive(null)}
      className={`p-5 outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus ${className}`}
    >
      <div onPointerMove={onPointerMove} onPointerLeave={() => setActive(null)} style={{ height: HEIGHT }} className="relative">
        {[TOP, (TOP + HEIGHT) / 2, HEIGHT].map((y) => (
          <span key={y} style={{ top: y }} className="absolute inset-x-0 h-px bg-ink-3" />
        ))}
        <AnimatePresence>
          {active !== null && <Highlight key="highlight" left={active * slot} right={100 - (active + 1) * slot} />}
        </AnimatePresence>
        <div className="absolute inset-0 grid auto-cols-fr grid-flow-col items-end justify-items-center">
          {data.map((bar, i) => (
            <motion.div
              key={bar.label}
              initial={{ height: 0 }}
              animate={{ height: heights[i] }}
              transition={shape}
              className="w-1/2 max-w-6 rounded-t-full bg-accent"
            />
          ))}
        </div>
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key="tooltip"
              aria-hidden
              initial={{ opacity: 0, left: `${(active + 0.5) * slot}%`, y: HEIGHT - heights[active] }}
              animate={{ opacity: 1, left: `${(active + 0.5) * slot}%`, y: HEIGHT - heights[active] }}
              exit={{ opacity: 0 }}
              transition={{ left: shape, y: shape, opacity: soft }}
              className="pointer-events-none absolute top-0 w-0"
            >
              <Bubble text={text} x={active === 0 ? "0%" : active === data.length - 1 ? "-100%" : "-50%"} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-3 grid h-3.5 auto-cols-fr grid-flow-col text-center text-caption leading-none text-paper/55">
        {data.map((bar) => (
          <span key={bar.label}>{bar.label}</span>
        ))}
      </div>
      <span role="status" className="sr-only">
        {text}
      </span>
    </Card>
  );
}
