import { useState } from "react";
import { Select, Field } from "tensile";

export function SelectEmptyDemo() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Field label="Team" className="w-full max-w-sm">
      <Select
        options={[]}
        value={value}
        onValueChange={setValue}
        emptyText="No teams found"
      />
    </Field>
  );
}
