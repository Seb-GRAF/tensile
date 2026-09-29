import { useState } from "react";
import { Select, Field, Icon } from "tensile";

const options = [
  {
    value: "personal",
    label: "Personal",
    icon: (
      <Icon>
        <circle cx="12" cy="8" r="3" />
        <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
      </Icon>
    ),
  },
  {
    value: "team",
    label: "Team",
    icon: (
      <Icon>
        <rect x="4" y="7" width="16" height="14" rx="2" />
        <path d="M9 7V3h6v4" />
      </Icon>
    ),
  },
];

export function SelectIconsDemo() {
  const [value, setValue] = useState<string | null>("personal");

  return (
    <Field label="Workspace" className="w-full max-w-sm">
      <Select options={options} value={value} onValueChange={setValue} />
    </Field>
  );
}
