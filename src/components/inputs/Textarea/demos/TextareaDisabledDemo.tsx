import { useState } from "react";
import { Textarea, Field } from "tensile";

export function TextareaDisabledDemo() {
  const [value, setValue] = useState("Example value");

  return (
    <Field label="Message" className="w-full max-w-sm">
      <Textarea value={value} onValueChange={setValue} disabled />
    </Field>
  );
}
