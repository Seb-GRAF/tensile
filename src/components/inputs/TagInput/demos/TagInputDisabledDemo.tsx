import { useState } from "react";
import { TagInput, Field } from "tensile";

export function TagInputDisabledDemo() {
  const [value, setValue] = useState(["Design", "Research"]);

  return (
    <Field
      label="Topics"
      description="Press Enter or comma to add a topic."
      className="w-full max-w-sm"
    >
      <TagInput
        value={value}
        onValueChange={setValue}
        disabled
        placeholder="Add a topic"
      />
    </Field>
  );
}
