import { useState } from "react";
import { TagInput, Field } from "tensile";

export function TagInputAboveDemo() {
  const [value, setValue] = useState(["Design", "Research"]);

  return (
    <Field
      label="Topics"
      description="Press Enter or comma to add a topic."
      labelPlacement="above"
      className="w-full max-w-sm"
    >
      <TagInput
        value={value}
        onValueChange={setValue}
        placeholder="Add a topic"
      />
    </Field>
  );
}
