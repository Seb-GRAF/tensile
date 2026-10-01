import { useState } from "react";
import { DateField, Field } from "tensile";

export function DateFieldDemo() {
  const [value, setValue] = useState<string | null>("2026-10-14");

  return (
    <Field label="Due date" className="w-full max-w-sm">
      <DateField value={value} onValueChange={setValue} />
    </Field>
  );
}
