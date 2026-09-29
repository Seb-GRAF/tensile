import { useState } from "react";
import { MultiSelect, Field } from "tensile";

export function MultiSelectEmptyDemo() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Field label="Team" className="w-full max-w-sm">
      <MultiSelect
        options={[]}
        value={value}
        onValueChange={setValue}
        emptyText="No teams found"
      />
    </Field>
  );
}
