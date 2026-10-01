import { useState } from "react";
import { PasswordInput, Field } from "tensile";

export function PasswordInputDemo() {
  const [value, setValue] = useState("");

  return (
    <Field label="Password" className="w-full max-w-sm">
      <PasswordInput value={value} onValueChange={setValue} />
    </Field>
  );
}
