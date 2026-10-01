import { useState } from "react";
import { SidebarNav, Card, Icon, LinkProvider } from "tensile";

const items = [
  { value: "home", label: "Home", icon: <Icon name="home" size={16} /> },
  { value: "projects", label: "Projects", icon: <Icon name="briefcase" size={16} /> },
  { value: "notes", label: "Notes", icon: <Icon name="text" size={16} /> },
];

const links = items.map((item) => ({ ...item, href: `/${item.value}` }));

export function SidebarNavLinksDemo() {
  const [value, setValue] = useState("home");

  return (
    <LinkProvider navigate={(href) => setValue(href.slice(1))}>
      <div className="grid w-full justify-items-center gap-4">
        <Card className="h-64 w-48 p-2">
          <SidebarNav
            label="Workspace"
            items={links}
            value={value}
            onValueChange={setValue}
          />
        </Card>
        <output aria-live="polite" className="text-label">
          {value}
        </output>
      </div>
    </LinkProvider>
  );
}
