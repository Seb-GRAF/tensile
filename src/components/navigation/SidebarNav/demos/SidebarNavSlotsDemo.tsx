import { useState } from "react";
import { SidebarNav, Card, Icon, Avatar } from "tensile";

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

export function SidebarNavSlotsDemo() {
  const [value, setValue] = useState("home");

  return (
    <div className="grid w-full justify-items-center gap-4">
      <Card className="h-64 w-48 p-2">
        <SidebarNav
          label="Workspace"
          items={items}
          value={value}
          onValueChange={setValue}
          className="h-full"
          leading={
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="grid size-8 shrink-0 place-items-center font-semibold">
                S
              </span>
              <span>Studio</span>
            </div>
          }
          trailing={
            <div className="flex items-center gap-2 whitespace-nowrap">
              <Avatar name="Maya Chen" />
              <span className="text-label">Maya Chen</span>
            </div>
          }
        />
      </Card>
      <output aria-live="polite" className="text-label">
        {value}
      </output>
    </div>
  );
}
