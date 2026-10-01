import { useState } from "react";
import { Field, Input } from "tensile";

export function FieldErrorDemo() {
  const [value, setValue] = useState("Al");

  return (
    <Field
      label="Display name"
      error={value.length < 3 ? "Use at least three characters." : undefined}
      className="w-full max-w-sm"
    >
      <Input value={value} onValueChange={setValue} />
    </Field>
  );
}
