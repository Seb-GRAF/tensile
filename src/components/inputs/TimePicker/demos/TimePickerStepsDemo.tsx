import { useState } from "react";
import { TimePicker, Field } from "tensile";

export function TimePickerStepsDemo() {
  const [value, setValue] = useState<{ hours: number; minutes: number } | null>(
    { hours: 9, minutes: 30 },
  );

  return (
    <Field label="Reminder time" className="w-full max-w-sm">
      <TimePicker value={value} onValueChange={setValue} minuteStep={15} />
    </Field>
  );
}
