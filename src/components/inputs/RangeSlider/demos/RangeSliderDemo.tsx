import { useState } from "react";
import { RangeSlider, Field } from "tensile";

export function RangeSliderDemo() {
  const [value, setValue] = useState<[number, number]>([20, 80]);

  return (
    <Field label="Price range" className="w-full max-w-sm">
      <RangeSlider value={value} onValueChange={setValue} />
    </Field>
  );
}
