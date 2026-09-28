import { animate, motion } from "motion/react";
import { useStretch } from "../../drag";
import { icons } from "../../icons";
import { useSprings } from "../../springs";
import { IconButton } from "../actions/IconButton";
import { Icon } from "../data-display/Icon";
import { NumberTicker } from "../data-display/NumberTicker";
import { useField } from "./Field";

export type NumberStepperProps = {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  formatValue?: (value: number) => string;
  label?: string;
  decreaseLabel?: string;
  increaseLabel?: string;
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

const WIDTH = 128;
const HEIGHT = 44;
const KICK = 480;

export function NumberStepper({
  value,
  onValueChange,
  min = 0,
  max = 10,
  step = 1,
  formatValue = (value: number) => value.toLocaleString("en-US"),
  label = "Quantity",
  decreaseLabel = "Decrease",
  increaseLabel = "Increase",
  id,
  name,
  required = false,
  disabled = false,
  className = "",
}: NumberStepperProps) {
  const { snap, scale } = useSprings();
  const field = useField();
  disabled = field?.disabled || disabled;
  const [stretch, style] = useStretch(WIDTH, HEIGHT);

  function stepTo(target: number) {
    const next = Math.min(max, Math.max(min, target));
    if (next !== value) onValueChange(next);
    else if (target !== value && scale > 0) animate(stretch, 0, { ...snap, velocity: (target > value ? KICK : -KICK) / scale });
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const targets: Record<string, number> = { ArrowUp: value + step, ArrowDown: value - step, Home: min, End: max };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    stepTo(target);
  }

  return (
    <div role="group" aria-label={field?.labelId ? undefined : label} onKeyDown={disabled ? undefined : onKeyDown} className={`relative h-11 w-32 ${disabled ? "opacity-40" : ""} ${className}`}>
      {name && <input type="hidden" name={name} value={value} disabled={disabled} />}
      <motion.div
        style={style}
        className="absolute top-1/2 left-0 flex -translate-y-1/2 items-center justify-between rounded-control bg-paper px-1 text-body font-medium text-ink shadow-control outline-offset-2 has-focus-visible:outline-2 has-focus-visible:outline-focus"
      >
        <IconButton
          variant="ghost"
          size="sm"
          tabIndex={-1}
          label={decreaseLabel}
          disabled={disabled}
          onClick={() => stepTo(value - step)}
        >
          <Icon size={16}>{icons.minus}</Icon>
        </IconButton>
        <span
          id={field?.id ?? id}
          role="spinbutton"
          tabIndex={disabled ? -1 : 0}
          aria-label={field?.labelId ? undefined : label}
          aria-labelledby={field?.labelId}
          aria-describedby={field?.describedBy}
          aria-invalid={field?.invalid}
          aria-required={field?.required || required}
          aria-disabled={disabled}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuetext={formatValue(value)}
          className="outline-none"
        >
          <NumberTicker value={value} format={formatValue} />
        </span>
        <IconButton
          variant="ghost"
          size="sm"
          tabIndex={-1}
          label={increaseLabel}
          disabled={disabled}
          onClick={() => stepTo(value + step)}
        >
          <Icon size={16}>{icons.plus}</Icon>
        </IconButton>
      </motion.div>
    </div>
  );
}
