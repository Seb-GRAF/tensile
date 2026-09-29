import { useState } from "react";
import { ToggleGroup, Icon } from "tensile";

const options = [
  {
    value: "bold",
    label: "Bold",
    icon: (
      <Icon>
        <path d="M6 12h9a4 4 0 0 1 0 8H6V4h8a4 4 0 0 1 0 8" />
      </Icon>
    ),
  },
  {
    value: "italic",
    label: "Italic",
    icon: (
      <Icon>
        <path d="M19 4H9m6 0L9 20m-5 0h10" />
      </Icon>
    ),
  },
];

export function ToggleGroupIconsDemo() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <ToggleGroup
      label="Text style"
      options={options}
      value={value}
      onValueChange={setValue}
    />
  );
}
