import { useState } from "react";
import { TimeWheel, Field } from "tensile";

export function TimeWheelDemo() {
  const [value, setValue] = useState<{ hours: number; minutes: number }>({
    hours: 9,
    minutes: 30,
  });

  return (
    <Field label="Reminder time" className="w-full max-w-sm">
      <TimeWheel value={value} onValueChange={setValue} />
    </Field>
  );
}
