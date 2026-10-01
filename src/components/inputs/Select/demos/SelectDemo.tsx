import { useState } from "react";
import { Select, Field } from "tensile";

const options = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "research", label: "Research" },
];

export function SelectDemo() {
  const [value, setValue] = useState<string | null>("design");

  return (
    <Field label="Team" className="w-full max-w-sm">
      <Select options={options} value={value} onValueChange={setValue} />
    </Field>
  );
}
