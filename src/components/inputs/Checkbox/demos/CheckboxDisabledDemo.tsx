import { useState } from "react";
import { Checkbox } from "tensile";

export function CheckboxDisabledDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <Checkbox
      label="Managed by your workspace"
      checked={checked}
      onCheckedChange={setChecked}
      disabled
    />
  );
}
