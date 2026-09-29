import { useState } from "react";
import { CollapsibleSidebar, Icon } from "tensile";

const items = [
  {
    value: "home",
    label: "Home",
    icon: (
      <Icon size={16}>
        <path d="m3 10 9-7 9 7v10H3Z" />
      </Icon>
    ),
  },
  {
    value: "projects",
    label: "Projects",
    icon: (
      <Icon size={16}>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M9 5V3h6v2" />
      </Icon>
    ),
  },
  {
    value: "notes",
    label: "Notes",
    icon: (
      <Icon size={16}>
        <path d="M5 5h14M5 12h14M5 19h8" />
      </Icon>
    ),
  },
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
