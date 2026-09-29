import { useState } from "react";
import { DateRangePicker, Field } from "tensile";

export function DateRangePickerBoundsDemo() {
  const [value, setValue] = useState<{ start: string; end: string } | null>({
    start: "2026-09-18",
    end: "2026-09-23",
  });

  return (
    <Field label="Travel dates" className="w-full max-w-sm">
      <DateRangePicker
        value={value}
        onValueChange={setValue}
        min="2026-09-10"
        max="2026-10-05"
      />
    </Field>
  );
}
