import { animate, clamp, motion, useMotionValue, useTransform, wrap } from "motion/react";
import { useEffect, useRef } from "react";
import { dragHandlers, rubber } from "../../drag";
import { snap } from "../../springs";

type Time = { hours: number; minutes: number };

export type TimeWheelProps = {
  /** Hours 0–23; the wheels show them as 12, 1–11 and AM or PM. */
  value: Time;
  onValueChange: (value: Time) => void;
  /** Minutes between two rows of the minutes wheel. */
  minuteStep?: number;
  formatNumber?: (value: number) => string;
  amLabel?: string;
  pmLabel?: string;
  label?: string;
  hoursLabel?: string;
  minutesLabel?: string;
  periodLabel?: string;
};

const ROW = 40;
const THROW = 0.1;

function Wheel({
  items,
  index,
  onIndexChange,
  loop,
  label,
}: {
  items: string[];
  index: number;
  onIndexChange: (index: number) => void;
  loop: boolean;
  label: string;
}) {
  const count = items.length;
  const position = useMotionValue(index);
  const target = useRef(index);
  const anchor = useRef({ y: 0, position: 0 });
  const y = useTransform(position, (p) => -(loop ? count + wrap(0, count, p) : p) * ROW);
  const rows = (loop ? [...items, ...items, ...items] : items).map((item, i) => (
    <div key={i} className="flex h-10 items-center justify-center">
      {item}
    </div>
  ));

  useEffect(() => {
    const next = loop ? target.current + wrap(-count / 2, count / 2, index - target.current) : index;
    if (next === target.current) return;
    target.current = next;
    animate(position, next, snap);
  }, [index, loop, count, position]);

  function drag(event: React.PointerEvent<HTMLDivElement>) {
    if (event.type === "pointerdown") {
      position.stop();
      anchor.current = { y: event.clientY, position: position.get() };
    }
    const next = anchor.current.position + (anchor.current.y - event.clientY) / ROW;
    const end = clamp(0, count - 1, next);
    position.set(loop ? next : end + rubber((next - end) * ROW) / ROW);
  }

  function release() {
    const projected = Math.round(position.get() + position.getVelocity() * THROW);
    target.current = loop ? projected : clamp(0, count - 1, projected);
    animate(position, target.current, snap);
    const next = wrap(0, count, target.current);
    if (next !== index) onIndexChange(next);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const targets: Record<string, number> = { ArrowUp: index + 1, ArrowDown: index - 1, Home: 0, End: count - 1 };
    const next = targets[event.key];
    if (next === undefined) return;
    event.preventDefault();
    const landed = loop ? wrap(0, count, next) : clamp(0, count - 1, next);
    if (landed !== index) onIndexChange(landed);
  }

  return (
    <div
      role="spinbutton"
      tabIndex={0}
      aria-label={label}
      aria-valuenow={index}
      aria-valuemin={0}
      aria-valuemax={count - 1}
      aria-valuetext={items[index]}
      {...dragHandlers(drag, release)}
      onKeyDown={onKeyDown}
      className="relative h-50 w-14 cursor-grab touch-none rounded-2xl outline-offset-2 select-none focus-visible:outline-2 focus-visible:outline-ink active:cursor-grabbing"
    >
      <div aria-hidden className="absolute inset-0 overflow-hidden mask-y-from-60%">
        <motion.div style={{ y }} className="absolute inset-x-0 top-20 text-muted">
          {rows}
        </motion.div>
      </div>
      <div aria-hidden className="absolute inset-x-0 top-20 h-10 overflow-hidden text-paper">
        <motion.div style={{ y }}>{rows}</motion.div>
      </div>
    </div>
  );
}

export function TimeWheel({
  value,
  onValueChange,
  minuteStep = 1,
  formatNumber = (value: number) => value.toLocaleString("en-US", { minimumIntegerDigits: 2 }),
  amLabel = "AM",
  pmLabel = "PM",
  label = "Time",
  hoursLabel = "Hours",
  minutesLabel = "Minutes",
  periodLabel = "AM/PM",
}: TimeWheelProps) {
  const pm = value.hours >= 12;

  return (
    <div
      role="group"
      aria-label={label}
      className="relative flex rounded-3xl bg-paper p-2 text-[15px] font-medium tabular-nums shadow-float"
    >
      <div className="absolute inset-x-2 top-1/2 h-10 -translate-y-1/2 rounded-full bg-ink" />
      <Wheel
        label={hoursLabel}
        items={Array.from({ length: 12 }, (_, i) => formatNumber(i === 0 ? 12 : i))}
        index={value.hours % 12}
        loop
        onIndexChange={(i) => onValueChange({ ...value, hours: (pm ? 12 : 0) + i })}
      />
      <Wheel
        label={minutesLabel}
        items={Array.from({ length: 60 / minuteStep }, (_, i) => formatNumber(i * minuteStep))}
        index={value.minutes / minuteStep}
        loop
        onIndexChange={(i) => onValueChange({ ...value, minutes: i * minuteStep })}
      />
      <Wheel
        label={periodLabel}
        items={[amLabel, pmLabel]}
        index={pm ? 1 : 0}
        loop={false}
        onIndexChange={(i) => onValueChange({ ...value, hours: (value.hours % 12) + i * 12 })}
      />
    </div>
  );
}
