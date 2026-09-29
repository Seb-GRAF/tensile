import { useState } from "react";
import { NumberInput, Field } from "tensile";

export function NumberInputBoundsDemo() {
  const [value, setValue] = useState<number | null>(50);

  return (
    <Field label="Budget" className="w-full max-w-sm">
      <NumberInput
        value={value}
        onValueChange={setValue}
        min={0}
        max={100}
        step={0.5}
      />
    </Field>
  );
}
