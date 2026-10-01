import { useState } from "react";
import { Field, Input } from "tensile";

export function FieldDisabledDemo() {
  const [value, setValue] = useState("Alex");

  return (
    <Field label="Display name" disabled className="w-full max-w-sm">
      <Input value={value} onValueChange={setValue} />
    </Field>
  );
}
