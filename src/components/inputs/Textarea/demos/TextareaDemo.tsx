import { useState } from "react";
import { Textarea, Field } from "tensile";

export function TextareaDemo() {
  const [value, setValue] = useState("");

  return (
    <Field label="Message" className="w-full max-w-sm">
      <Textarea value={value} onValueChange={setValue} />
    </Field>
  );
}
