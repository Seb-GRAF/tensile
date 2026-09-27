import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { useSprings } from "../../springs";
import { Card } from "../layout/Card";

type Segment = { label: string; value: number };

export type DonutChartProps = {
  data: Segment[];
  formatValue?: (value: number) => string;
  /** Accessible summary of the chart. */
  label?: string;
  /** Shown in the center above the total. */
  totalLabel?: string;
  /** Read out for a segment, given its label and formatted value. */
  segmentLabel?: (label: string, value: string) => string;
  className?: string;
};

const SIZE = 200;
const RADIUS = 80;
const STROKE = 20;
const LIFT = 6;
const GAP = 3 / (2 * Math.PI * RADIUS);
const colors = ["stroke-accent", "stroke-paper", "stroke-muted", "stroke-ink-3"];
const moves: Record<string, number> = { ArrowUp: -1, ArrowLeft: -1, ArrowDown: 1, ArrowRight: 1 };

export function DonutChart({
  data,
  formatValue = (value: number) => value.toLocaleString("en-US"),
  label = "Donut chart",
  totalLabel = "Total",
  segmentLabel = (label: string, value: string) => `${label}, ${value}`,
  className = "",
}: DonutChartProps) {
  const { shape, swap, draw } = useSprings();
  const [active, setActive] = useState<number | null>(null);
  const [focused, setFocused] = useState(0);
  const segments = useRef<(SVGCircleElement | null)[]>([]);
  const total = data.reduce((sum, segment) => sum + segment.value, 0);
  const caption = active === null ? totalLabel : data[active].label;
  const text = formatValue(active === null ? total : data[active].value);
  let start = 0;

  function onKeyDown(event: React.KeyboardEvent) {
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    segments.current[(focused + move + data.length) % data.length]!.focus();
  }

  return (
    <Card
      tone="ink"
      role="group"
      aria-label={label}
      onKeyDown={onKeyDown}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setActive(null);
      }}
      className={`p-5 outline-offset-2 has-focus-visible:outline-2 has-focus-visible:outline-focus ${className}`}
    >
      <div className="relative">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} onPointerLeave={() => setActive(null)} className="block w-full -rotate-90">
          {data.map((segment, i) => {
            const share = segment.value / total;
            const offset = start;
            start += share;
            const lifted = i === active;
            return (
              <motion.circle
                key={segment.label}
                ref={(el) => {
                  segments.current[i] = el;
                }}
                role="img"
                aria-label={segmentLabel(segment.label, formatValue(segment.value))}
                tabIndex={i === focused ? 0 : -1}
                cx={SIZE / 2}
                cy={SIZE / 2}
                initial={{ pathLength: 0, pathOffset: 0, r: RADIUS, strokeWidth: STROKE }}
                animate={{
                  pathLength: Math.max(0, share - GAP),
                  pathOffset: offset + GAP / 2,
                  r: lifted ? RADIUS + LIFT / 2 : RADIUS,
                  strokeWidth: lifted ? STROKE + LIFT : STROKE,
                }}
                transition={{ pathLength: draw, pathOffset: draw, r: shape, strokeWidth: shape }}
                onPointerMove={() => setActive(i)}
                onFocus={() => {
                  setFocused(i);
                  setActive(i);
                }}
                className={`fill-none outline-none ${colors[i % colors.length]}`}
              />
            );
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 grid place-content-center place-items-center">
          <AnimatePresence initial={false}>
            <motion.div
              key={`${caption} ${text}`}
              {...swap}
              className="col-start-1 row-start-1 flex flex-col items-center"
            >
              <span className="text-label font-medium text-paper/55">{caption}</span>
              <span className="text-2xl font-semibold text-paper tabular-nums">{text}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
}
