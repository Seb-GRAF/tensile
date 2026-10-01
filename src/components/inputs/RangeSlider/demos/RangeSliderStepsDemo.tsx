import { useState } from "react";
import { RangeSlider, Field } from "tensile";

export function RangeSliderStepsDemo() {
  const [value, setValue] = useState<[number, number]>([20, 80]);

  return (
    <Field label="Price range" className="w-full max-w-sm">
      <RangeSlider
        value={value}
        onValueChange={setValue}
        min={0}
        max={100}
        step={5}
        lowerLabel="Minimum price"
        upperLabel="Maximum price"
        formatValue={(number) => `$${number}`}
      />
    </Field>
  );
}
