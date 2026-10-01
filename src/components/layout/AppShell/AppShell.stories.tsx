import { AppShellDemo } from "./demos/AppShellDemo";
import { AppShellMobileNavDemo } from "./demos/AppShellMobileNavDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../../actions/Button/Button";
import { Avatar } from "../../data-display/Avatar/Avatar";
import { Icon } from "../../data-display/Icon/Icon";
import { CollapsibleSidebar } from "../../navigation/CollapsibleSidebar/CollapsibleSidebar";
import { TabBar } from "../../navigation/TabBar/TabBar";
import { AppShell } from "./AppShell";
import { Card } from "../Card/Card";
import { PageHeader } from "../PageHeader/PageHeader";

const sections = [
  { value: "home", label: "Home", icon: "home" },
  { value: "board", label: "Board", icon: "grid" },
  { value: "files", label: "Files", icon: "folder" },
  { value: "messages", label: "Messages", icon: "message" },
] as const;

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

/** Press Tab once to show the skip link, then Enter to move focus to the page. From 1024 px the sidebar stays in view while the page scrolls (its bottom button folds it into a rail); below, the brand moves into the header and the tab bar is fixed to the bottom. */
export const Default: Story = {
  render: function Render(args) {
    const [section, setSection] = useState("home");
    const [expanded, setExpanded] = useState(true);
    const brand = (
      <span className="flex h-10 items-center gap-2.5 overflow-hidden px-1.5 text-body font-semibold whitespace-nowrap text-ink">
        <Icon name="waves" size={20} className="shrink-0" />
        Harbor
      </span>
    );
    return (
      <AppShell
        {...args}
        header={
          <header className="flex h-16 items-center justify-between px-6 lg:hidden">
            {brand}
            <Avatar name="Maya Chen" />
          </header>
        }
        sidebar={
          <CollapsibleSidebar
            items={sections.map((item) => ({ value: item.value, label: item.label, icon: <Icon name={item.icon} /> }))}
            value={section}
            onValueChange={setSection}
            expanded={expanded}
            onExpandedChange={setExpanded}
            label="Project"
            leading={brand}
            trailing={
              <span className="flex items-center gap-2.5 overflow-hidden whitespace-nowrap">
                <Avatar name="Maya Chen" className="shrink-0" />
                <span className="min-w-0">
                  <span className="block truncate text-label font-medium text-ink">Maya Chen</span>
                  <span className="block truncate text-caption text-muted">Content lead</span>
                </span>
              </span>
            }
            className="h-full"
          />
        }
        mobileNav={
          <TabBar
            items={sections.map((item) => ({
              value: item.value,
              label: item.label,
              icon: <Icon name={item.icon} size={20} />,
              activeIcon: <Icon name={item.icon} size={20} className="*:fill-current" />,
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
            actions={
              <>
                <Button variant="secondary">Share</Button>
                <Button>New task</Button>
              </>
            }
          />
          {args.children}
        </div>
      </AppShell>
    );
  },
};

export const Usage: Story = {
  render: () => <AppShellDemo />,
};

export const MobileNavUsage: Story = {
  render: () => <AppShellMobileNavDemo />,
};
