import { useState } from "react";
import { NumberStepper, Field } from "tensile";

export function NumberStepperDemo() {
  const [value, setValue] = useState<number>(2);

  return (
    <Field label="Guests" className="w-full max-w-sm">
      <NumberStepper value={value} onValueChange={setValue} />
    </Field>
  );
}
