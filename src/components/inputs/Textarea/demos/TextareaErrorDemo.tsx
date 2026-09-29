import { useState } from "react";
import { Textarea, Field } from "tensile";

export function TextareaErrorDemo() {
  const [value, setValue] = useState(
    "Please shorten this message to fewer than forty characters.",
  );

  return (
    <Field
      label="Message"
      error={
        value.length > 40 ? "Keep the message under 40 characters." : undefined
      }
      className="w-full max-w-sm"
    >
      <Textarea value={value} onValueChange={setValue} />
    </Field>
  );
}
