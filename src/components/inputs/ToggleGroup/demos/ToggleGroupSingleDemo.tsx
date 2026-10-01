import { useState } from "react";
import { ToggleGroup } from "tensile";

const options = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

export function ToggleGroupSingleDemo() {
  const [value, setValue] = useState("monthly");

  return (
    <ToggleGroup
      type="single"
      label="Billing period"
      options={options}
      value={value}
      onValueChange={setValue}
    />
  );
}
