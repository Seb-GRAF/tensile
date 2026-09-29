import { useState } from "react";
import { Textarea, Field } from "tensile";

export function TextareaAboveDemo() {
  const [value, setValue] = useState("");

  return (
    <Field label="Message" labelPlacement="above" className="w-full max-w-sm">
      <Textarea value={value} onValueChange={setValue} />
    </Field>
  );
}
