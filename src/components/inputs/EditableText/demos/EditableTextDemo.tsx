import { useState } from "react";
import { EditableText } from "tensile";

export function EditableTextDemo() {
  const [value, setValue] = useState("Project Atlas");

  return (
    <EditableText
      label="Project name"
      placeholder="Name your project"
      value={value}
      onValueChange={setValue}
    />
  );
}
