import { useState } from "react";
import { Select, Field, Icon } from "tensile";

const options = [
  { value: "personal", label: "Personal", icon: <Icon name="user" /> },
  { value: "team", label: "Team", icon: <Icon name="briefcase" /> },
];

export function SelectIconsDemo() {
  const [value, setValue] = useState<string | null>("personal");

  return (
    <Field label="Workspace" className="w-full max-w-sm">
      <Select options={options} value={value} onValueChange={setValue} />
    </Field>
  );
}
