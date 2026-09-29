import { useState } from "react";
import { Slider, Field } from "tensile";

export function SliderDisabledDemo() {
  const [value, setValue] = useState<number>(40);

  return (
    <Field label="Volume" className="w-full max-w-sm">
      <Slider value={value} onValueChange={setValue} disabled />
    </Field>
  );
}
