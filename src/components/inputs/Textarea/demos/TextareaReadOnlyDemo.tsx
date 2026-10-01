import { useState } from "react";
import { Textarea, Field } from "tensile";

export function TextareaReadOnlyDemo() {
  const [value, setValue] = useState("This value cannot be edited.");

  return (
    <Field label="Message" className="w-full max-w-sm">
      <Textarea value={value} onValueChange={setValue} readOnly />
    </Field>
  );
}
