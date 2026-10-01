import { useState } from "react";
import { MultiSelect, Field } from "tensile";

const options = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "research", label: "Research" },
];

export function MultiSelectSummaryDemo() {
  const [value, setValue] = useState(["design", "research"]);

  return (
    <Field label="Teams" className="w-full max-w-sm">
      <MultiSelect
        options={options}
        value={value}
        onValueChange={setValue}
        summary={(labels) => `${labels.length} teams selected`}
      />
    </Field>
  );
}
