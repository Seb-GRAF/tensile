import { useState } from "react";
import { Input, Field } from "tensile";

export function InputReadOnlyDemo() {
  const [value, setValue] = useState("This value cannot be edited.");

  return (
    <Field label="Display name" className="w-full max-w-sm">
      <Input value={value} onValueChange={setValue} readOnly />
    </Field>
  );
}
