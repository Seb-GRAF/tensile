import { useState } from "react";
import { DatePicker, Field } from "tensile";

export function DatePickerBoundsDemo() {
  const [value, setValue] = useState<string | null>("2026-09-18");

  return (
    <Field label="Appointment date" className="w-full max-w-sm">
      <DatePicker
        value={value}
        onValueChange={setValue}
        min="2026-09-10"
        max="2026-10-05"
      />
    </Field>
  );
}
