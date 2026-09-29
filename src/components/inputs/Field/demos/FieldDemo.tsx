import { useState } from "react";
import { Field, Input } from "tensile";

export function FieldDemo() {
  const [value, setValue] = useState("");

  return (
    <Field
      label="Display name"
      description="Shown on your profile."
      className="w-full max-w-sm"
    >
      <Input value={value} onValueChange={setValue} />
    </Field>
  );
}
