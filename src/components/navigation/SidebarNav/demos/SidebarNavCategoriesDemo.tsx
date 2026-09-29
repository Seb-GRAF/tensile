import { useState } from "react";
import { SidebarNav, Card, Icon } from "tensile";

const items = [
  {
    label: "Workspace",
    items: [
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
    ],
  },
  {
    label: "Account",
    items: [
      {
        value: "profile",
        label: "Profile",
        icon: (
          <Icon size={16}>
            <circle cx="12" cy="8" r="4" />
            <path d="M5 21v-1a7 7 0 0 1 14 0v1" />
          </Icon>
        ),
      },
      {
        value: "billing",
        label: "Billing",
        icon: (
          <Icon size={16}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 10h18" />
          </Icon>
        ),
      },
    ],
  },
];

export function SidebarNavCategoriesDemo() {
  const [value, setValue] = useState("home");

  return (
    <div className="grid w-full justify-items-center gap-4">
      <Card className="w-48 p-2">
        <SidebarNav
          label="Workspace"
          items={items}
          value={value}
          onValueChange={setValue}
        />
      </Card>
      <output aria-live="polite" className="text-label">
        {value}
      </output>
    </div>
  );
}
