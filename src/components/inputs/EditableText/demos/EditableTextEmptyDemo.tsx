import { useState } from "react";
import { EditableText } from "tensile";

export function EditableTextEmptyDemo() {
  const [value, setValue] = useState("");

  return (
    <EditableText
      label="Project name"
      placeholder="Name your project"
      value={value}
      onValueChange={setValue}
    />
  );
}
