import { SliderTrack } from "../../../SliderTrack";
import { useField } from "../Field/Field";

export type SliderProps = {
  value: number;
  onValueChange: (value: number) => void;
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
  value,
  onValueChange,
  min = 0,
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
  const field = useField();
  const isDisabled = field?.disabled || disabled;
  return (
    <>
      <SliderTrack
        value={[value]}
        onValueChange={(_, next) => onValueChange(next)}
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
