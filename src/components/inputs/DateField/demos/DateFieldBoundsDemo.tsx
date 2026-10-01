import { useState } from "react";
import { DateField, Field } from "tensile";

export function DateFieldBoundsDemo() {
  const [value, setValue] = useState<string | null>("2026-10-14");

  return (
    <Field label="Delivery date" description="Between October 5 and October 30, 2026." className="w-full max-w-sm">
      <DateField value={value} onValueChange={setValue} min="2026-10-05" max="2026-10-30" />
    </Field>
  );
}
