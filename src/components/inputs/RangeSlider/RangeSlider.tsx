import { SliderTrack } from "../../../SliderTrack";
import { useField } from "../Field/Field";

export type RangeSliderProps = {
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  formatValue?: (value: number) => string;
  lowerLabel?: string;
  upperLabel?: string;
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

export function RangeSlider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  formatValue = (value: number) => value.toLocaleString("en-US"),
  lowerLabel = "Minimum",
  upperLabel = "Maximum",
  id,
  name,
  required = false,
  disabled = false,
  className = "",
}: RangeSliderProps) {
  const field = useField();
  const isDisabled = field?.disabled || disabled;
  return (
    <>
      <SliderTrack
        value={value}
        onValueChange={(i, next) => onValueChange(i === 0 ? [next, value[1]] : [value[0], next])}
        min={min}
        max={max}
        step={step}
        formatValue={formatValue}
        labels={[lowerLabel, upperLabel]}
        id={field?.id ?? id}
        labelledBy={field?.labelId}
        describedBy={field?.describedBy}
        invalid={field?.invalid}
        required={field?.required || required}
        disabled={isDisabled}
        className={className}
      />
      {name && value.map((v, i) => <input key={i} type="hidden" name={name} value={v} disabled={isDisabled} />)}
    </>
  );
}
