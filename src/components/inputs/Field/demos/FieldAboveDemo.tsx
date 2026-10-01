import { useState } from "react";
import { Field, Input } from "tensile";

export function FieldAboveDemo() {
  const [value, setValue] = useState("");

  return (
    <Field
      label="Display name"
      labelPlacement="above"
      className="w-full max-w-sm"
    >
      <Input value={value} onValueChange={setValue} />
    </Field>
  );
}
