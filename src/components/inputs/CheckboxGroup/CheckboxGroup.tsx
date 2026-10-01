import { useControllable } from "../../../controllable";
import { Checkbox } from "../Checkbox/Checkbox";
import { useField } from "../Field/Field";

export type CheckboxGroupProps = {
  options: { value: string; label: string; disabled?: boolean }[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  label?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
};

export function CheckboxGroup({
  options,
  value: valueProp,
  defaultValue = [],
  onValueChange,
  label = "Options",
  id,
  name,
  disabled = false,
  className = "",
}: CheckboxGroupProps) {
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  const field = useField();

  return (
    <div
      role="group"
      id={field?.id ?? id}
      aria-label={field ? undefined : label}
      aria-labelledby={field?.labelId}
      aria-describedby={field?.describedBy}
      aria-invalid={field?.invalid}
      className={`tn:grid ${className}`}
    >
      {options.map((option) => (
        <div key={option.value} className="tn:-mx-2 tn:flex tn:h-10 tn:rounded-control tn:has-[:enabled]:hover:bg-hover">
          <Checkbox
            label={option.label}
            name={name}
            value={option.value}
            checked={value.includes(option.value)}
            onCheckedChange={(checked) =>
              setValue(checked ? [...value, option.value] : value.filter((item) => item !== option.value))
            }
            disabled={disabled || option.disabled}
            className="tn:grow tn:px-2"
          />
        </div>
      ))}
    </div>
  );
}
