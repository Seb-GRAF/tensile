import { useState } from "react";
import { Accordion } from "tensile";

const items = [
  {
    value: "access",
    label: "Who can access a project?",
    content: "Only people you invite can view the project.",
  },
  {
    value: "archive",
    label: "Can I restore an archive?",
    content:
      "Yes. Open your archive and restore the project to the active list.",
  },
];

export function AccordionDemo() {
  const [value, setValue] = useState<string | null>("access");

  return (
    <Accordion
      items={items}
      value={value}
      onValueChange={setValue}
      className="w-full max-w-sm"
    />
  );
}
