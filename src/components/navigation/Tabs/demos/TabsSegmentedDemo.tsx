import { useState } from "react";
import { Tabs, Card } from "tensile";

const items = [
  {
    value: "overview",
    label: "Overview",
    content: "A shared workspace for the new collection.",
  },
  {
    value: "notes",
    label: "Notes",
    content: "Review the draft with the team on Friday.",
  },
];

export function TabsSegmentedDemo() {
  const [value, setValue] = useState("overview");

  return (
    <Card className="w-full max-w-sm overflow-clip p-5">
      <Tabs
        label="Project sections"
        variant="segmented"
        value={value}
        onValueChange={setValue}
        items={items}
      />
    </Card>
  );
}
