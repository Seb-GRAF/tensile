import { AnimatePresence, motion } from "motion/react";
import { useId } from "react";
import { useControllable } from "../../../controllable";
import { useLiquid, useSprings } from "../../../springs";
import { useField } from "../Field/Field";

export type RadioGroupProps = {
  options: { value: string; label: string; icon?: React.ReactNode; disabled?: boolean }[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string) => void;
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
      className="tn:pointer-events-none tn:absolute tn:left-3.75 tn:w-2.5 tn:rounded-full tn:bg-ink"
    />
  );
}

export function RadioGroup({
  options,
  value: valueProp,
  defaultValue = null,
  onValueChange,
  label = "Options",
  id,
  name,
  disabled = false,
  required = false,
  className = "",
}: RadioGroupProps) {
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
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
      <div className="tn:relative tn:-mx-2 tn:grid">
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
            className="tn:flex tn:h-10 tn:cursor-pointer tn:items-center tn:gap-2.5 tn:rounded-control tn:px-2 tn:text-sm tn:font-medium tn:text-ink tn:has-[:enabled]:hover:bg-hover tn:has-[:disabled]:cursor-default tn:has-[:disabled]:opacity-40"
          >
            <input
              type="radio"
              name={name ?? groupName}
              value={option.value}
              checked={option.value === value}
              onChange={() => setValue(option.value)}
              disabled={field?.disabled || disabled || option.disabled}
              required={field?.required || required}
              className="tn:relative tn:size-6 tn:shrink-0 tn:appearance-none tn:rounded-full tn:border-[1.5px] tn:border-muted tn:outline-offset-2 tn:transition-colors tn:duration-[calc(300ms*var(--tn-motion-duration-scale))] tn:checked:border-ink tn:focus-visible:outline-2 tn:focus-visible:outline-focus"
            />
            {option.icon}
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}
