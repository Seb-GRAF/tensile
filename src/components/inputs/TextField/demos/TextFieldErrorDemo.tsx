import { useState } from "react";
import { TextField } from "tensile";

export function TextFieldErrorDemo() {
  const [value, setValue] = useState("Al");

  return (
    <TextField
      label="Display name"
      value={value}
      onValueChange={setValue}
      error={value.length < 3 ? "Use at least three characters." : undefined}
      className="w-full max-w-sm"
    />
  );
}
