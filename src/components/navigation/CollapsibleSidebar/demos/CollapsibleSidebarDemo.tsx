import { useState } from "react";
import { CollapsibleSidebar, Icon } from "tensile";

const items = [
  { value: "home", label: "Home", icon: <Icon name="home" size={16} /> },
  { value: "projects", label: "Projects", icon: <Icon name="briefcase" size={16} /> },
  { value: "notes", label: "Notes", icon: <Icon name="text" size={16} /> },
];

export function CollapsibleSidebarDemo() {
  const [value, setValue] = useState("home");
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex w-full items-start gap-4">
      <CollapsibleSidebar
        label="Workspace"
        items={items}
        value={value}
        onValueChange={setValue}
        expanded={expanded}
        onExpandedChange={setExpanded}
        className="h-64"
      />
      <p className="min-w-0 pt-3 text-label">{value}</p>
    </div>
  );
}
