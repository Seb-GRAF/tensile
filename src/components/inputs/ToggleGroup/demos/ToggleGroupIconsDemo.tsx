import { useState } from "react";
import { ToggleGroup, Icon } from "tensile";

const options = [
  { value: "bold", label: "Bold", icon: <Icon name="bold" /> },
  { value: "italic", label: "Italic", icon: <Icon name="italic" /> },
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
