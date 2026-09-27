import { motion } from "motion/react";
import { useId } from "react";
import { useLiquid } from "../../springs";
import { useField } from "./Field";

export type ColorSwatchesProps = {
  options: { value: string; label: string; color: string }[];
  value: string;
  onValueChange: (value: string) => void;
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
  value,
  onValueChange,
  label = "Color",
  id,
  name,
  disabled = false,
  required = false,
  className = "",
}: ColorSwatchesProps) {
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
      className={`w-fit rounded-control bg-paper p-[3px] shadow-float has-[:disabled]:opacity-40 ${className}`}
    >
      <div className="relative grid auto-cols-[32px] grid-flow-col gap-1">
        {options.map((option) => (
          <label
            key={option.value}
            className="relative flex h-8 cursor-pointer items-center justify-center rounded-full outline-offset-2 has-focus-visible:outline-2 has-focus-visible:outline-focus has-[:disabled]:cursor-default"
          >
            <input
              type="radio"
              name={name ?? groupName}
              value={option.value}
              checked={option.value === value}
              onChange={() => onValueChange(option.value)}
              aria-label={option.label}
              disabled={field?.disabled || disabled}
              required={field?.required || required}
              className="absolute inset-0 size-full appearance-none rounded-full outline-none"
            />
            <span aria-hidden style={{ backgroundColor: option.color }} className="pointer-events-none size-6 rounded-full" />
          </label>
        ))}
        <motion.span
          aria-hidden
          style={{ left, right }}
          className="pointer-events-none absolute inset-y-0 rounded-full border-2 border-ink inset-ring-2 inset-ring-paper"
        />
      </div>
    </div>
  );
}
