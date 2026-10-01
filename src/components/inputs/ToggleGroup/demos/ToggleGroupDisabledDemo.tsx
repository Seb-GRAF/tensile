import { useState } from "react";
import { ToggleGroup } from "tensile";

const options = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "research", label: "Research" },
];

export function ToggleGroupDisabledDemo() {
  const [value, setValue] = useState(["design"]);

  return (
    <ToggleGroup
      label="Teams"
      options={options}
      value={value}
      onValueChange={setValue}
      disabled
    />
  );
}
