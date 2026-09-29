import { useState } from "react";
import { Checkbox } from "tensile";

export function CheckboxDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      label="Receive product updates"
      checked={checked}
      onCheckedChange={setChecked}
    />
  );
}
