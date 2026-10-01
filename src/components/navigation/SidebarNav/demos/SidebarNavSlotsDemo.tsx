import { useState } from "react";
import { SidebarNav, Card, Icon, Avatar } from "tensile";

const items = [
  { value: "home", label: "Home", icon: <Icon name="home" size={16} /> },
  { value: "projects", label: "Projects", icon: <Icon name="briefcase" size={16} /> },
  { value: "notes", label: "Notes", icon: <Icon name="text" size={16} /> },
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
