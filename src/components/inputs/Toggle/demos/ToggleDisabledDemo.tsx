import { useState } from "react";
import { Field, Toggle } from "tensile";

export function ToggleDisabledDemo() {
  const [value, setValue] = useState(false);

  return (
    <Field label="Product updates" description="Receive a monthly email.">
      <Toggle checked={value} onCheckedChange={setValue} disabled />
    </Field>
  );
}
