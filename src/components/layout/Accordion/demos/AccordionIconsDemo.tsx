import { useState } from "react";
import { Accordion, Icon } from "tensile";

const items = [
  {
    value: "access",
    label: "Who can access a project?",
    content: "Only people you invite can view the project.",
    icon: (
      <Icon size={16}>
        <circle cx="12" cy="8" r="3" />
        <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
      </Icon>
    ),
  },
  {
    value: "archive",
    label: "Can I restore an archive?",
    content:
      "Yes. Open your archive and restore the project to the active list.",
  },
];

export function AccordionIconsDemo() {
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
