import { useState } from "react";
import { Combobox, Field } from "tensile";

const options = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "research", label: "Research" },
];

export function ComboboxEmptyDemo() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Field label="Team" className="w-full max-w-sm">
      <Combobox
        options={options}
        value={value}
        onValueChange={setValue}
        emptyText="No teams found"
      />
    </Field>
  );
}
