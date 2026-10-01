import { useState } from "react";
import { TabBar, Icon, LinkProvider } from "tensile";

const navigation = [
  { value: "home", label: "Home", icon: <Icon name="home" size={16} /> },
  { value: "projects", label: "Projects", icon: <Icon name="briefcase" size={16} /> },
  { value: "notes", label: "Notes", icon: <Icon name="text" size={16} /> },
];

const items = navigation.map((item) => ({ ...item, activeIcon: item.icon }));

const links = items.map((item) => ({ ...item, href: `/${item.value}` }));

export function TabBarLinksDemo() {
  const [value, setValue] = useState("home");

  return (
    <LinkProvider navigate={(href) => setValue(href.slice(1))}>
      <div className="grid w-full justify-items-center gap-4">
        <TabBar
          label="Workspace"
          items={links}
          value={value}
          onValueChange={setValue}
          className="w-full max-w-sm"
        />
        <output aria-live="polite" className="text-label">
          {value}
        </output>
      </div>
    </LinkProvider>
  );
}
