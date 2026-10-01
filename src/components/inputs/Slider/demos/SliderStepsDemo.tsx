import { useState } from "react";
import { Slider, Field } from "tensile";

export function SliderStepsDemo() {
  const [value, setValue] = useState<number>(40);

  return (
    <Field label="Volume" className="w-full max-w-sm">
      <Slider
        value={value}
        onValueChange={setValue}
        min={0}
        max={100}
        step={10}
        formatValue={(number) => `${number}%`}
      />
    </Field>
  );
}
