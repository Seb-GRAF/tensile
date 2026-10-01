import { useState } from "react";
import { DatePicker, Field } from "tensile";

export function DatePickerWeekStartDemo() {
  const [value, setValue] = useState<string | null>("2026-09-18");

  return (
    <Field label="Appointment date" className="w-full max-w-sm">
      <DatePicker value={value} onValueChange={setValue} firstDayOfWeek={1} />
    </Field>
  );
}
