import { useControllable } from "../../../controllable";
import { SliderTrack } from "../../../SliderTrack";
import { useField } from "../Field/Field";

export type SliderProps = {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  formatValue?: (value: number) => string;
  label?: string;
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

export function Slider({
  value: valueProp,
  onValueChange,
  min = 0,
  defaultValue = min,
  max = 100,
  step = 1,
  formatValue = (value: number) => value.toLocaleString("en-US"),
  label = "Value",
  id,
  name,
  required = false,
  disabled = false,
  className = "",
}: SliderProps) {
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  const field = useField();
  const isDisabled = field?.disabled || disabled;
  return (
    <>
      <SliderTrack
        value={[value]}
        onValueChange={(_, next) => setValue(next)}
        min={min}
        max={max}
        step={step}
        formatValue={formatValue}
        labels={[label]}
        id={field?.id ?? id}
        labelledBy={field?.labelId}
        describedBy={field?.describedBy}
        invalid={field?.invalid}
        required={field?.required || required}
        disabled={isDisabled}
        className={className}
      />
      {name && <input type="hidden" name={name} value={value} disabled={isDisabled} />}
    </>
  );
}
