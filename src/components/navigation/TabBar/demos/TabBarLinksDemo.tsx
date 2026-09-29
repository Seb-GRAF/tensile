import { useState } from "react";
import { TabBar, Icon, LinkProvider } from "tensile";

const navigation = [
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
