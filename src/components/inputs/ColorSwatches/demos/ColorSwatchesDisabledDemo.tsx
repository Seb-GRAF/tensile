import { useState } from "react";
import { ColorSwatches, Field } from "tensile";

const colors = [
  { value: "sage", label: "Sage", color: "#8a9e86" },
  { value: "clay", label: "Clay", color: "#be8977" },
  { value: "slate", label: "Slate", color: "#778b9f" },
];

export function ColorSwatchesDisabledDemo() {
  const [value, setValue] = useState("sage");

  return (
    <Field label="Notebook color">
      <ColorSwatches
        options={colors}
        value={value}
        onValueChange={setValue}
        disabled
      />
    </Field>
  );
}
