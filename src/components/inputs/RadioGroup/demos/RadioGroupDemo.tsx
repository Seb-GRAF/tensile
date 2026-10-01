import { useState } from "react";
import { RadioGroup } from "tensile";

const options = [
  { value: "compact", label: "Compact" },
  { value: "comfortable", label: "Comfortable" },
  { value: "spacious", label: "Spacious" },
];

export function RadioGroupDemo() {
  const [density, setDensity] = useState("comfortable");

  return (
    <RadioGroup
      label="Display density"
      options={options}
      value={density}
      onValueChange={setDensity}
    />
  );
}
