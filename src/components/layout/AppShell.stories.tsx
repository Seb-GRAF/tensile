import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../actions/Button";
import { Icon } from "../data-display/Icon";
import { CollapsibleSidebar } from "../navigation/CollapsibleSidebar";
import { LinkProvider } from "../navigation/Link";
import { TabBar } from "../navigation/TabBar";
import { AppShell } from "./AppShell";
import { Card } from "./Card";
import { Header } from "./Header";
import { PageHeader } from "./PageHeader";

function NavIcon({ paths, size, filled = false }: { paths: string[]; size: number; filled?: boolean }) {
  return (
    <Icon size={size}>
      {paths.map((d) => (
        <path key={d} d={d} className={filled ? "fill-current" : ""} />
      ))}
    </Icon>
  );
}

const sections = [
  { value: "home", label: "Home", paths: ["M3.5 10 12 3.5l8.5 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-4v-6h-6v6H5A1.5 1.5 0 0 1 3.5 19Z"] },
  {
    value: "board",
    label: "Board",
    paths: [
      "M3 4.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a1.5 1.5 0 0 1-1.5-1.5Z",
      "M14 4.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a1.5 1.5 0 0 1-1.5-1.5Z",
      "M3 15.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a1.5 1.5 0 0 1-1.5-1.5Z",
      "M14 15.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a1.5 1.5 0 0 1-1.5-1.5Z",
    ],
  },
  {
    value: "files",
    label: "Files",
    paths: ["M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"],
  },
  { value: "messages", label: "Messages", paths: ["M7.9 20A9 9 0 1 0 4 16.1L2 22Z"] },
];

const tasks = [
  { title: "Homepage copy", detail: "Review the new hero text with Maya before Friday's sign-off." },
  { title: "Navigation audit", detail: "Check every menu label against the new sitemap." },
  { title: "Launch checklist", detail: "Redirects, analytics and the status page are still open." },
  { title: "Image licensing", detail: "Confirm the rights for the twelve photos in the case studies." },
  { title: "Accessibility pass", detail: "Keyboard and screen reader checks on the pricing page." },
  { title: "Press kit", detail: "Logo files, product shots and the one-page fact sheet." },
];

const meta = {
  title: "Layout/AppShell",
  id: "components-appshell",
  component: AppShell,
  parameters: { layout: "fullscreen" },
  args: {
    children: (
      <div className="grid gap-4 sm:grid-cols-2">
        {tasks.map((task) => (
          <Card key={task.title} className="p-5">
            <h2 className="text-body font-semibold">{task.title}</h2>
            <p className="mt-1 text-label text-muted">{task.detail}</p>
          </Card>
        ))}
      </div>
    ),
  },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Press Tab once to show the skip link, then Enter to move focus to the page. From 1024 px the sidebar sits beside the page; below, the tab bar is fixed to the bottom and the header's links fold into a menu below 768 px. */
export const Default: Story = {
  render: function Render(args) {
    const [page, setPage] = useState("/projects");
    const [section, setSection] = useState("home");
    const [expanded, setExpanded] = useState(true);
    return (
      <LinkProvider navigate={setPage}>
        <AppShell
          {...args}
          header={
            <Header
              brand={
                <span className="flex items-center gap-2 text-body font-semibold text-ink">
                  <Icon size={20}>
                    <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                    <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                    <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                  </Icon>
                  Harbor
                </span>
              }
              links={[
                { label: "Projects", href: "/projects" },
                { label: "Calendar", href: "/calendar" },
                { label: "Reports", href: "/reports" },
                { label: "Team", href: "/team" },
              ]}
              value={page}
              actions={<Button size="sm">New project</Button>}
            />
          }
          sidebar={
            <CollapsibleSidebar
              items={sections.map((item) => ({ value: item.value, label: item.label, icon: <NavIcon paths={item.paths} size={16} /> }))}
              value={section}
              onValueChange={setSection}
              expanded={expanded}
              onExpandedChange={setExpanded}
              label="Project"
            />
          }
          mobileNav={
            <TabBar
              items={sections.map((item) => ({
                value: item.value,
                label: item.label,
                icon: <NavIcon paths={item.paths} size={20} />,
                activeIcon: <NavIcon paths={item.paths} size={20} filled />,
              }))}
              value={section}
              onValueChange={setSection}
              label="Project"
            />
          }
        >
          <div className="grid gap-6">
            <PageHeader
              title={sections.find((item) => item.value === section)!.label}
              description="Website relaunch, due November 14."
              actions={<Button variant="secondary">Share</Button>}
            />
            {args.children}
          </div>
        </AppShell>
      </LinkProvider>
    );
  },
};
