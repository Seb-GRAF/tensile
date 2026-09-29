import { useState } from "react";
import { SidebarNav, Card, Icon } from "tensile";

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

export function SidebarNavCollapsedDemo() {
  const [value, setValue] = useState("home");

  return (
    <div className="grid w-full justify-items-center gap-4">
      <Card className="p-2">
        <SidebarNav
          label="Workspace"
          items={items}
          value={value}
          onValueChange={setValue}
          collapsed
          className="w-8"
        />
      </Card>
      <output aria-live="polite" className="text-label">
        {value}
      </output>
    </div>
  );
}
