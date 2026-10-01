import { useState } from "react";
import { DatePicker, Field } from "tensile";

export function DatePickerDemo() {
  const [value, setValue] = useState<string | null>("2026-09-18");

  return (
    <Field label="Appointment date" className="w-full max-w-sm">
      <DatePicker value={value} onValueChange={setValue} />
    </Field>
  );
}
