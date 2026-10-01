import { useState } from "react";
import { SidebarNav, Card, Icon } from "tensile";

const items = [
  {
    label: "Workspace",
    items: [
      { value: "home", label: "Home", icon: <Icon name="home" size={16} /> },
      { value: "projects", label: "Projects", icon: <Icon name="briefcase" size={16} /> },
      { value: "notes", label: "Notes", icon: <Icon name="text" size={16} /> },
    ],
  },
  {
    label: "Account",
    items: [
      { value: "profile", label: "Profile", icon: <Icon name="user" size={16} /> },
      { value: "billing", label: "Billing", icon: <Icon name="creditCard" size={16} /> },
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
