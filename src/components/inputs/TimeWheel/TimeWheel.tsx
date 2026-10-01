import { animate, clamp, motion, useMotionValue, useTransform, wrap } from "motion/react";
import { useEffect, useRef } from "react";
import { useControllable } from "../../../controllable";
import { dragHandlers, rubber } from "../../../drag";
import { useSprings } from "../../../springs";
import { useField } from "../Field/Field";

type Time = { hours: number; minutes: number };

export type TimeWheelProps = {
  /** Hours 0–23; the wheels show them as 12, 1–11 and AM or PM. */
  value?: Time;
  defaultValue?: Time;
  onValueChange?: (value: Time) => void;
  /** Minutes between two rows of the minutes wheel. */
  minuteStep?: number;
  formatNumber?: (value: number) => string;
  amLabel?: string;
  pmLabel?: string;
  label?: string;
  hoursLabel?: string;
  minutesLabel?: string;
  periodLabel?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};

const ROW = 40;
const THROW = 0.1;

function Wheel({
  items,
  index,
  onIndexChange,
  loop,
  label,
  disabled,
  required,
  invalid,
}: {
  items: string[];
  index: number;
  onIndexChange: (index: number) => void;
  loop: boolean;
  label: string;
  disabled: boolean;
  required: boolean;
  invalid?: boolean;
}) {
  const { snap } = useSprings();
  const count = items.length;
  const position = useMotionValue(index);
  const target = useRef(index);
  const anchor = useRef({ y: 0, position: 0 });
  const y = useTransform(position, (p) => -(loop ? count + wrap(0, count, p) : p) * ROW);
  const rows = (loop ? [...items, ...items, ...items] : items).map((item, i) => (
    <div key={i} className="tn:flex tn:h-10 tn:items-center tn:justify-center">
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
      tabIndex={disabled ? -1 : 0}
      aria-label={label}
      aria-disabled={disabled}
      aria-required={required}
      aria-invalid={invalid}
      aria-valuenow={index}
      aria-valuemin={0}
      aria-valuemax={count - 1}
      aria-valuetext={items[index]}
      {...(disabled ? {} : dragHandlers(drag, release))}
      onKeyDown={disabled ? undefined : onKeyDown}
      className={`tn:group tn:relative tn:h-50 tn:w-14 tn:touch-none tn:outline-none tn:select-none ${disabled ? "" : "tn:cursor-grab tn:active:cursor-grabbing"}`}
    >
      <div aria-hidden className="tn:absolute tn:inset-0 tn:overflow-hidden tn:mask-y-from-60%">
        <motion.div style={{ y }} className="tn:absolute tn:inset-x-0 tn:top-20 tn:text-muted">
          {rows}
        </motion.div>
      </div>
      <div aria-hidden className="tn:absolute tn:inset-x-0 tn:top-20 tn:h-10 tn:overflow-hidden tn:rounded-control tn:text-paper tn:-outline-offset-4 tn:[--tn-color-focus:var(--tn-color-paper)] tn:group-focus-visible:outline-2 tn:group-focus-visible:outline-focus">
        <motion.div style={{ y }}>{rows}</motion.div>
      </div>
    </div>
  );
}

export function Wheels({
  value,
  onValueChange,
  minuteStep,
  formatNumber,
  amLabel,
  pmLabel,
  hoursLabel,
  minutesLabel,
  periodLabel,
  disabled,
  required,
  invalid,
}: Required<Omit<TimeWheelProps, "defaultValue" | "label" | "id" | "name" | "className">> & { invalid?: boolean }) {
  const pm = value.hours >= 12;
  return (
    <>
      <div className="tn:absolute tn:inset-x-2 tn:top-1/2 tn:h-10 tn:-translate-y-1/2 tn:rounded-control tn:bg-ink" />
      <Wheel
        label={hoursLabel}
        disabled={disabled}
        required={required}
        invalid={invalid}
        items={Array.from({ length: 12 }, (_, i) => formatNumber(i === 0 ? 12 : i))}
        index={value.hours % 12}
        loop
        onIndexChange={(i) => onValueChange({ ...value, hours: (pm ? 12 : 0) + i })}
      />
      <Wheel
        label={minutesLabel}
        disabled={disabled}
        required={required}
        invalid={invalid}
        items={Array.from({ length: 60 / minuteStep }, (_, i) => formatNumber(i * minuteStep))}
        index={value.minutes / minuteStep}
        loop
        onIndexChange={(i) => onValueChange({ ...value, minutes: i * minuteStep })}
      />
      <Wheel
        label={periodLabel}
        disabled={disabled}
        required={required}
        invalid={invalid}
        items={[amLabel, pmLabel]}
        index={pm ? 1 : 0}
        loop={false}
        onIndexChange={(i) => onValueChange({ ...value, hours: (value.hours % 12) + i * 12 })}
      />
    </>
  );
}

export function TimeWheel({
  value: valueProp,
  defaultValue = { hours: 0, minutes: 0 },
  onValueChange,
  minuteStep = 1,
  formatNumber = (value: number) => value.toLocaleString("en-US", { minimumIntegerDigits: 2 }),
  amLabel = "AM",
  pmLabel = "PM",
  label = "Time",
  hoursLabel = "Hours",
  minutesLabel = "Minutes",
  periodLabel = "AM/PM",
  id,
  name,
  disabled = false,
  required = false,
  className = "",
}: TimeWheelProps) {
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  const field = useField();
  disabled = field?.disabled || disabled;
  required = field?.required || required;

  return (
    <div
      role="group"
      id={field?.id ?? id}
      aria-label={field?.labelId ? undefined : label}
      aria-labelledby={field?.labelId}
      aria-describedby={field?.describedBy}
      aria-disabled={disabled}
      className={`tn:relative tn:flex tn:w-fit tn:rounded-card tn:bg-paper tn:p-2 tn:text-body tn:font-medium tn:tabular-nums tn:shadow-control ${disabled ? "tn:opacity-40" : ""} ${className}`}
    >
      {name && <input type="hidden" name={name} value={`${String(value.hours).padStart(2, "0")}:${String(value.minutes).padStart(2, "0")}`} disabled={disabled} />}
      <Wheels
        value={value}
        onValueChange={setValue}
        minuteStep={minuteStep}
        formatNumber={formatNumber}
        amLabel={amLabel}
        pmLabel={pmLabel}
        hoursLabel={hoursLabel}
        minutesLabel={minutesLabel}
        periodLabel={periodLabel}
        disabled={disabled}
        required={required}
        invalid={field?.invalid}
      />
    </div>
  );
}
