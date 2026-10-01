import { useState } from "react";
import { NumberStepper, Field } from "tensile";

export function NumberStepperDisabledDemo() {
  const [value, setValue] = useState<number>(2);

  return (
    <Field label="Guests" className="w-full max-w-sm">
      <NumberStepper value={value} onValueChange={setValue} disabled />
    </Field>
  );
}
