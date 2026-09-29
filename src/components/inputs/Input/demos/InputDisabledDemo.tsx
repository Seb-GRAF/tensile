import { useState } from "react";
import { Input, Field } from "tensile";

export function InputDisabledDemo() {
  const [value, setValue] = useState("Example value");

  return (
    <Field label="Display name" className="w-full max-w-sm">
      <Input value={value} onValueChange={setValue} disabled />
    </Field>
  );
}
