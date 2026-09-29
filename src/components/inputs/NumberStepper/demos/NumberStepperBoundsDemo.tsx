import { useState } from "react";
import { NumberStepper, Field } from "tensile";

export function NumberStepperBoundsDemo() {
  const [value, setValue] = useState<number>(2);

  return (
    <Field label="Guests" className="w-full max-w-sm">
      <NumberStepper
        value={value}
        onValueChange={setValue}
        min={2}
        max={20}
        step={2}
      />
    </Field>
  );
}
