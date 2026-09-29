import { useState } from "react";
import { CheckboxGroup } from "tensile";

const options = [
  { value: "email", label: "Email" },
  { value: "push", label: "Push notifications" },
  { value: "sms", label: "SMS", disabled: true },
];

export function CheckboxGroupDisabledDemo() {
  const [value, setValue] = useState<string[]>(["email"]);

  return (
    <CheckboxGroup
      label="Notification channels"
      options={options}
      value={value}
      onValueChange={setValue}
      disabled
    />
  );
}
