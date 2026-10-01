import { useState } from "react";
import { CollapsibleSidebar, Icon, Avatar } from "tensile";

const items = [
  { value: "home", label: "Home", icon: <Icon name="home" size={16} /> },
  { value: "projects", label: "Projects", icon: <Icon name="briefcase" size={16} /> },
  { value: "notes", label: "Notes", icon: <Icon name="text" size={16} /> },
];

export function CollapsibleSidebarSlotsDemo() {
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
      <p className="min-w-0 pt-3 text-label">{value}</p>
    </div>
  );
}
