import { useState } from "react";
import { Select, Field } from "tensile";

const options = [
  { value: "standard", label: "Standard, 3–5 business days" },
  { value: "express", label: "Express, 1–2 business days" },
  { value: "overnight", label: "Overnight", disabled: true },
  { value: "pickup", label: "Pick up in store" },
];

export function SelectDisabledOptionsDemo() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Field label="Shipping" description="Overnight isn't available for this address." className="w-full max-w-sm">
      <Select options={options} value={value} onValueChange={setValue} />
    </Field>
  );
}
