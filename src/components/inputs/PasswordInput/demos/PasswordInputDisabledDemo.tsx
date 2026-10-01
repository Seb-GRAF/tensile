import { useState } from "react";
import { PasswordInput, Field } from "tensile";

export function PasswordInputDisabledDemo() {
  const [value, setValue] = useState("Example value");

  return (
    <Field label="Password" className="w-full max-w-sm">
      <PasswordInput value={value} onValueChange={setValue} disabled />
    </Field>
  );
}
