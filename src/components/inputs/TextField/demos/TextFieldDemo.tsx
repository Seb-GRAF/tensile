import { useState } from "react";
import { TextField } from "tensile";

export function TextFieldDemo() {
  const [value, setValue] = useState("");

  return (
    <TextField
      label="Display name"
      value={value}
      onValueChange={setValue}
      className="w-full max-w-sm"
    />
  );
}
