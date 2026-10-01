import { useState } from "react";
import { CheckboxGroup, Fieldset } from "tensile";

const options = [
  { value: "email", label: "Email" },
  { value: "push", label: "Push notifications" },
];

export function FieldsetErrorDemo() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Fieldset
      legend="Notifications"
      description="Choose how to receive updates."
      error={
        value.length === 0
          ? "Choose at least one notification channel."
          : undefined
      }
      className="w-full max-w-sm"
    >
      <CheckboxGroup
        label="Channels"
        options={options}
        value={value}
        onValueChange={setValue}
      />
    </Fieldset>
  );
}
