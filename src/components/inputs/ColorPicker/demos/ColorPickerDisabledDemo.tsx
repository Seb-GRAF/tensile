import { useState } from "react";
import { ColorPicker, Field } from "tensile";

export function ColorPickerDisabledDemo() {
  const [value, setValue] = useState<string>("#3a7bd5");

  return (
    <Field label="Brand color" className="w-full max-w-sm">
      <ColorPicker value={value} onValueChange={setValue} disabled />
    </Field>
  );
}
