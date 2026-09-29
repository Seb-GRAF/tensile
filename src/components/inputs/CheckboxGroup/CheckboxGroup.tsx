import { Checkbox } from "../Checkbox/Checkbox";
import { useField } from "../Field/Field";

export type CheckboxGroupProps = {
  options: { value: string; label: string; disabled?: boolean }[];
  value: string[];
  onValueChange: (value: string[]) => void;
  label?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
};

export function CheckboxGroup({
  options,
  value,
  onValueChange,
  label = "Options",
  id,
  name,
  disabled = false,
  className = "",
}: CheckboxGroupProps) {
  const field = useField();

  return (
    <div
      role="group"
      id={field?.id ?? id}
      aria-label={field ? undefined : label}
      aria-labelledby={field?.labelId}
      aria-describedby={field?.describedBy}
      aria-invalid={field?.invalid}
      className={`grid ${className}`}
    >
      {options.map((option) => (
        <div key={option.value} className="-mx-2 flex h-10 rounded-control has-[:enabled]:hover:bg-hover">
          <Checkbox
            label={option.label}
            name={name}
            value={option.value}
            checked={value.includes(option.value)}
            onCheckedChange={(checked) =>
              onValueChange(checked ? [...value, option.value] : value.filter((item) => item !== option.value))
            }
            disabled={disabled || option.disabled}
            className="grow px-2"
          />
        </div>
      ))}
    </div>
  );
}
