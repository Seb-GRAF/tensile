import { useState } from "react";
import { NumberInput, Field } from "tensile";

export function NumberInputDisabledDemo() {
  const [value, setValue] = useState<number | null>(1250.5);

  return (
    <Field label="Budget" className="w-full max-w-sm">
      <NumberInput value={value} onValueChange={setValue} disabled />
    </Field>
  );
}
