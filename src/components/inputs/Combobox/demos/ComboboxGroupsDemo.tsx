import { useState } from "react";
import { Combobox, Field } from "tensile";

const options = [
  {
    label: "Design",
    options: [
      { value: "ada", label: "Ada Moreau" },
      { value: "ben", label: "Ben Okafor, on leave", disabled: true },
      { value: "chloe", label: "Chloé Martin" },
    ],
  },
  {
    label: "Engineering",
    options: [
      { value: "daniel", label: "Daniel Kim" },
      { value: "elena", label: "Elena Rossi" },
      { value: "farid", label: "Farid Haddad" },
    ],
  },
  {
    label: "Research",
    options: [
      { value: "grace", label: "Grace Liu" },
      { value: "hugo", label: "Hugo Berg, on leave", disabled: true },
    ],
  },
];

export function ComboboxGroupsDemo() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Field label="Assignee" description="People on leave can't be assigned." className="w-full max-w-sm">
      <Combobox options={options} value={value} onValueChange={setValue} />
    </Field>
  );
}
