import { useState } from "react";
import { TextField } from "tensile";

export function TextFieldDisabledDemo() {
  const [value, setValue] = useState("Example value");

  return (
    <TextField
      label="Display name"
      value={value}
      onValueChange={setValue}
      disabled
      className="w-full max-w-sm"
    />
  );
}
