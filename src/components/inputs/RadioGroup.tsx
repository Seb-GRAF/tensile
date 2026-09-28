import { AnimatePresence, motion } from "motion/react";
import { useId } from "react";
import { useLiquid, useSprings } from "../../springs";
import { useField } from "./Field";

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

const ROW = 32;

function Dot({ index, count, disabled }: { index: number; count: number; disabled: boolean }) {
  const { shape, soft } = useSprings();
  const [top, bottom] = useLiquid(index * ROW + 12, (count - 1 - index) * ROW + 12);
  return (
    <motion.span
      aria-hidden
      initial={{ scale: 0 }}
      animate={{ scale: 1, opacity: disabled ? 0.4 : 1 }}
      exit={{ scale: 0 }}
      transition={{ scale: shape, opacity: soft }}
      style={{ top, bottom }}
      className="pointer-events-none absolute left-3 w-2 rounded-full bg-ink"
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
      className={`rounded-card bg-paper p-2 shadow-control ${className}`}
    >
      <div className="relative grid">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex h-8 cursor-pointer items-center gap-2.5 rounded-control pr-4 pl-2 text-label font-medium text-ink outline-offset-2 has-focus-visible:outline-2 has-focus-visible:outline-focus has-[:disabled]:cursor-default has-[:disabled]:opacity-40"
          >
            <input
              type="radio"
              name={name ?? groupName}
              value={option.value}
              checked={option.value === value}
              onChange={() => onValueChange(option.value)}
              disabled={field?.disabled || disabled || option.disabled}
              required={field?.required || required}
              className="size-4 shrink-0 appearance-none rounded-full border-[1.5px] border-muted outline-none"
            />
            {option.icon}
            {option.label}
          </label>
        ))}
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
      </div>
    </div>
  );
}
