import { useState } from "react";
import { MultiSelect, Field } from "tensile";

const options = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "research", label: "Research" },
];

export function MultiSelectDisabledDemo() {
  const [value, setValue] = useState<string[]>(["design"]);

  return (
    <Field label="Team" className="w-full max-w-sm">
      <MultiSelect
        options={options}
        value={value}
        onValueChange={setValue}
        disabled
      />
    </Field>
  );
}
