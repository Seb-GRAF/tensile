import { useState } from "react";
import { TreeView, Card } from "tensile";

const items = [
  {
    value: "project",
    label: "Project",
    children: [
      { value: "brief", label: "Brief.md" },
      { value: "notes", label: "Notes.md" },
    ],
  },
  { value: "readme", label: "README.md" },
];

export function TreeViewCollapsedSelectionDemo() {
  const [value, setValue] = useState<string | null>("brief");
  const [expanded, setExpanded] = useState<string[]>([]);

  return (
    <div className="grid w-full max-w-sm gap-4">
      <Card className="p-2">
        <TreeView
          label="Project files"
          items={items}
          value={value}
          onValueChange={setValue}
          expanded={expanded}
          onExpandedChange={setExpanded}
        />
      </Card>
      <output className="text-label">Selected: {value}</output>
    </div>
  );
}
