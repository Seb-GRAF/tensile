import { useState } from "react";
import { Input, Field } from "tensile";

export function InputDemo() {
  const [value, setValue] = useState("");

  return (
    <Field label="Display name" className="w-full max-w-sm">
      <Input value={value} onValueChange={setValue} />
    </Field>
  );
}
