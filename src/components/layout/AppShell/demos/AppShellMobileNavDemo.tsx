import { useState } from "react";
import {
  AppShell,
  SidebarNav,
  Header,
  PageHeader,
  Card,
  Icon,
  LinkProvider,
  TabBar,
} from "tensile";

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
      </Icon>
    ),
  },
];

export function AppShellMobileNavDemo() {
  const [section, setSection] = useState("home");

  return (
    <div className="relative h-120 w-full overflow-auto rounded-card [transform:translateZ(0)]">
      <LinkProvider navigate={(href) => setSection(href.slice(1))}>
        <AppShell
          sidebar={
            <Card className="h-full w-40 p-2">
              <SidebarNav
                items={items}
                value={section}
                onValueChange={setSection}
                label="Demo sidebar"
              />
            </Card>
          }
          header={
            <Header
              brand={<span className="font-semibold">Studio</span>}
              links={items.map((item) => ({
                label: item.label,
                href: `/${item.value}`,
              }))}
              value={`/${section}`}
              navLabel="Demo header"
              menuLabel="Demo menu"
            />
          }
          mobileNav={
            <TabBar
              items={items.map((item) => ({ ...item, activeIcon: item.icon }))}
              value={section}
              onValueChange={setSection}
              label="Demo mobile navigation"
            />
          }
        >
          <div className="grid gap-6">
            <PageHeader
              title={section === "home" ? "Home" : "Projects"}
              description="Your shared workspace."
            />
            <Card className="p-5">
              The selected section’s content appears here.
            </Card>
          </div>
        </AppShell>
      </LinkProvider>
    </div>
  );
}
