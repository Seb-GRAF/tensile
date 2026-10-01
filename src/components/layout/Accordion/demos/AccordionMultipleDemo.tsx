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
  {
    value: "export",
    label: "Can I export my data?",
    content: "Download every project as a ZIP file from Settings.",
  },
];

export function AccordionMultipleDemo() {
  const [value, setValue] = useState<string[]>(["access", "archive"]);

  return (
    <Accordion
      type="multiple"
      items={items}
      value={value}
      onValueChange={setValue}
      className="w-full max-w-sm"
    />
  );
}
