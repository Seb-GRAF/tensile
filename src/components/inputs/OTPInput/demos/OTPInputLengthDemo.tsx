import { useState } from "react";
import { OTPInput } from "tensile";

export function OTPInputLengthDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="w-full overflow-x-auto p-1">
      <OTPInput
        label="Verification code"
        value={value}
        onValueChange={setValue}
        length={4}
      />
    </div>
  );
}
