import { useState } from "react";
import { TimePicker, Field } from "tensile";

export function TimePickerDemo() {
  const [value, setValue] = useState<{ hours: number; minutes: number } | null>(
    null,
  );

  return (
    <Field label="Reminder time" className="w-full max-w-sm">
      <TimePicker value={value} onValueChange={setValue} />
    </Field>
  );
}
