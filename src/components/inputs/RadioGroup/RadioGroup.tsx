import { AnimatePresence, motion } from "motion/react";
import { useId } from "react";
import { useLiquid, useSprings } from "../../../springs";
import { useField } from "../Field/Field";

export type RadioGroupProps = {
  options: { value: string; label: string; icon?: React.ReactNode; disabled?: boolean }[];
  value: string | null;
  onValueChange: (value: string) => void;
  label?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};

const ROW = 40;

function Dot({ index, count, disabled }: { index: number; count: number; disabled: boolean }) {
  const { shape, soft } = useSprings();
  const [top, bottom] = useLiquid(index * ROW + 15, (count - 1 - index) * ROW + 15);
  return (
    <motion.span
      aria-hidden
      initial={{ scale: 0 }}
      animate={{ scale: 1, opacity: disabled ? 0.4 : 1 }}
      exit={{ scale: 0 }}
      transition={{ scale: shape, opacity: soft }}
      style={{ top, bottom }}
      className="pointer-events-none absolute left-3.75 w-2.5 rounded-full bg-ink"
    />
  );
}

export function RadioGroup({
  options,
  value,
  onValueChange,
  label = "Options",
  id,
  name,
  disabled = false,
  required = false,
  className = "",
}: RadioGroupProps) {
  const field = useField();
  const groupName = useId();
  const index = options.findIndex((option) => option.value === value);

  return (
    <div
      role="radiogroup"
      id={field?.id ?? id}
      aria-label={field ? undefined : label}
      aria-labelledby={field?.labelId}
      aria-describedby={field?.describedBy}
      aria-invalid={field?.invalid}
      aria-required={field?.required || required}
      className={className}
    >
      <div className="relative -mx-2 grid">
        <AnimatePresence initial={false}>
          {index !== -1 && (
            <Dot
              key="dot"
              index={index}
              count={options.length}
              disabled={!!(field?.disabled || disabled || options[index].disabled)}
            />
          )}
        </AnimatePresence>
        {options.map((option) => (
          <label
            key={option.value}
            className="flex h-10 cursor-pointer items-center gap-2.5 rounded-control px-2 text-sm font-medium text-ink has-[:enabled]:hover:bg-hover has-[:disabled]:cursor-default has-[:disabled]:opacity-40"
          >
            <input
              type="radio"
              name={name ?? groupName}
              value={option.value}
              checked={option.value === value}
              onChange={() => onValueChange(option.value)}
              disabled={field?.disabled || disabled || option.disabled}
              required={field?.required || required}
              className="relative size-6 shrink-0 appearance-none rounded-full border-[1.5px] border-muted outline-offset-2 transition-colors duration-[calc(300ms*var(--motion-duration-scale))] checked:border-ink focus-visible:outline-2 focus-visible:outline-focus"
            />
            {option.icon}
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}
