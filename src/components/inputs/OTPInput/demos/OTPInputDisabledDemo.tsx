import { useState } from "react";
import { OTPInput } from "tensile";

export function OTPInputDisabledDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="w-full overflow-x-auto p-1">
      <OTPInput
        label="Verification code"
        value={value}
        onValueChange={setValue}
        disabled
      />
    </div>
  );
}
