import { motion, useMotionTemplate } from "motion/react";
import { useState } from "react";
import { useControllable } from "../../../controllable";
import { useLiquid } from "../../../springs";
import { Icon } from "../../data-display/Icon/Icon";
import { useField } from "../Field/Field";

export type RatingProps = {
  /** Whole stars, from 0 to `count`. */
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  /** Number of stars. */
  count?: number;
  label?: string;
  /** Screen reader text for the value. */
  valueLabel?: (value: number, count: number) => string;
  readOnly?: boolean;
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

function Star({ className }: { className: string }) {
  return (
    <Icon size={24}>
      <path className={className} d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </Icon>
  );
}

export function Rating({
  value: valueProp,
  defaultValue = 0,
  onValueChange,
  count = 5,
  label = "Rating",
  valueLabel = (value: number, count: number) => `${value} of ${count} stars`,
  readOnly = false,
  id,
  name,
  required = false,
  disabled = false,
  className = "",
}: RatingProps) {
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  const field = useField();
  disabled = field?.disabled || disabled;
  const interactive = !readOnly && !disabled;
  const [hover, setHover] = useState<number | null>(null);
  const stars = Array.from({ length: count }, (_, i) => i + 1);
  const step = 100 / count;
  const [left, right] = useLiquid(0, (count - (interactive ? hover ?? value : value)) * step);
  const clip = useMotionTemplate`inset(0 ${right}% 0 ${left}%)`;

  function onKeyDown(event: React.KeyboardEvent) {
    const targets: Record<string, number> = {
      ArrowLeft: value - 1,
      ArrowDown: value - 1,
      ArrowRight: value + 1,
      ArrowUp: value + 1,
      Home: 0,
      End: count,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    setHover(null);
    setValue(Math.min(count, Math.max(0, target)));
  }

  return (
    <div
      id={field?.id ?? id}
      role={readOnly ? "img" : "slider"}
      tabIndex={readOnly ? undefined : disabled ? -1 : 0}
      aria-label={readOnly ? valueLabel(value, count) : field?.labelId ? undefined : label}
      aria-labelledby={readOnly ? undefined : field?.labelId}
      aria-describedby={field?.describedBy}
      aria-invalid={readOnly ? undefined : field?.invalid}
      aria-required={readOnly ? undefined : field?.required || required}
      aria-disabled={readOnly ? undefined : disabled}
      aria-valuemin={readOnly ? undefined : 0}
      aria-valuemax={readOnly ? undefined : count}
      aria-valuenow={readOnly ? undefined : value}
      aria-valuetext={readOnly ? undefined : valueLabel(value, count)}
      onKeyDown={interactive ? onKeyDown : undefined}
      onPointerLeave={interactive ? () => setHover(null) : undefined}
      className={`tn:inline-block tn:rounded-control tn:bg-paper tn:p-[3px] tn:shadow-control tn:outline-offset-2 tn:focus-visible:outline-2 tn:focus-visible:outline-focus ${interactive ? "tn:cursor-pointer" : ""} ${disabled ? "tn:opacity-40" : ""} ${className}`}
    >
      {name && <input type="hidden" name={name} value={value} disabled={disabled} />}
      <div className="tn:relative tn:grid tn:auto-cols-[32px] tn:grid-flow-col">
        <motion.span style={{ clipPath: clip }} className="tn:absolute tn:inset-0 tn:grid tn:auto-cols-[32px] tn:grid-flow-col">
          {stars.map((star) => (
            <span key={star} className="tn:grid tn:place-items-center">
              <Star className="tn:fill-accent tn:stroke-none" />
            </span>
          ))}
        </motion.span>
        {stars.map((star) => (
          <span
            key={star}
            onPointerMove={interactive ? () => setHover(star) : undefined}
            onClick={interactive ? () => setValue(star) : undefined}
            className="tn:relative tn:grid tn:h-8 tn:place-items-center"
          >
            <Star className="tn:fill-none tn:stroke-ink" />
          </span>
        ))}
      </div>
    </div>
  );
}
