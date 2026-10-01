import { motion } from "motion/react";
import { useId } from "react";
import { useControllable } from "../../../controllable";
import { useLiquid } from "../../../springs";
import { useField } from "../Field/Field";

export type ColorSwatchesProps = {
  options: { value: string; label: string; color: string }[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};

const SLOT = 36;

export function ColorSwatches({
  options,
  value: valueProp,
  defaultValue = options[0].value,
  onValueChange,
  label = "Color",
  id,
  name,
  disabled = false,
  required = false,
  className = "",
}: ColorSwatchesProps) {
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  const field = useField();
  const groupName = useId();
  const index = options.findIndex((option) => option.value === value);
  const [left, right] = useLiquid(index * SLOT, (options.length - 1 - index) * SLOT);

  return (
    <div
      role="radiogroup"
      id={field?.id ?? id}
      aria-label={field ? undefined : label}
      aria-labelledby={field?.labelId}
      aria-describedby={field?.describedBy}
      aria-invalid={field?.invalid}
      aria-required={field?.required || required}
      className={`tn:w-fit tn:rounded-control tn:bg-paper tn:p-[3px] tn:shadow-control tn:has-[:disabled]:opacity-40 ${className}`}
    >
      <div className="tn:relative tn:grid tn:auto-cols-[32px] tn:grid-flow-col tn:gap-1">
        {options.map((option) => (
          <label
            key={option.value}
            className="tn:relative tn:flex tn:h-8 tn:cursor-pointer tn:items-center tn:justify-center tn:rounded-full tn:outline-offset-2 tn:has-[:enabled]:hover:bg-hover tn:has-focus-visible:outline-2 tn:has-focus-visible:outline-focus tn:has-[:disabled]:cursor-default"
          >
            <input
              type="radio"
              name={name ?? groupName}
              value={option.value}
              checked={option.value === value}
              onChange={() => setValue(option.value)}
              aria-label={option.label}
              disabled={field?.disabled || disabled}
              required={field?.required || required}
              className="tn:absolute tn:inset-0 tn:size-full tn:appearance-none tn:rounded-full tn:outline-none"
            />
            <span aria-hidden style={{ backgroundColor: option.color }} className="tn:pointer-events-none tn:size-6 tn:rounded-full" />
          </label>
        ))}
        <motion.span
          aria-hidden
          style={{ left, right }}
          className="tn:pointer-events-none tn:absolute tn:inset-y-0 tn:rounded-full tn:border-2 tn:border-ink tn:inset-ring-2 tn:inset-ring-paper"
        />
      </div>
    </div>
  );
}
