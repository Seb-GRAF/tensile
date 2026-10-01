import { useState } from "react";
import { Select, Field } from "tensile";

const options = [
  {
    label: "Europe",
    options: [
      { value: "london", label: "London" },
      { value: "paris", label: "Paris" },
      { value: "zurich", label: "Zurich" },
    ],
  },
  {
    label: "Americas",
    options: [
      { value: "new-york", label: "New York" },
      { value: "chicago", label: "Chicago" },
      { value: "los-angeles", label: "Los Angeles" },
    ],
  },
  {
    label: "Asia Pacific",
    options: [
      { value: "singapore", label: "Singapore" },
      { value: "tokyo", label: "Tokyo" },
      { value: "sydney", label: "Sydney" },
    ],
  },
];

export function SelectGroupsDemo() {
  const [value, setValue] = useState<string | null>("zurich");

  return (
    <Field label="Time zone" className="w-full max-w-sm">
      <Select options={options} value={value} onValueChange={setValue} />
    </Field>
  );
}
