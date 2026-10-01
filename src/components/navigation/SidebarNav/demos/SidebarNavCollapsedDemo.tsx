import { useState } from "react";
import { SidebarNav, Card, Icon } from "tensile";

const items = [
  { value: "home", label: "Home", icon: <Icon name="home" size={16} /> },
  { value: "projects", label: "Projects", icon: <Icon name="briefcase" size={16} /> },
  { value: "notes", label: "Notes", icon: <Icon name="text" size={16} /> },
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
