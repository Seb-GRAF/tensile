import { NavigationMenuDemo } from "./demos/NavigationMenuDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import { LinkProvider } from "../Link/Link";
import { NavigationMenu } from "./NavigationMenu";

const meta = {
  title: "Navigation/NavigationMenu",
  id: "components-navigationmenu",
  component: NavigationMenu,
  parameters: { layout: "fullscreen" },
  args: {
    items: [
      {
        label: "Products",
        links: [
          { label: "Analytics", href: "/products/analytics", description: "Dashboards and reports that update as your data does." },
          { label: "Automations", href: "/products/automations", description: "Run recurring work on a schedule or a trigger." },
          { label: "Integrations", href: "/products/integrations", description: "Connect the tools your team already uses." },
          { label: "Security", href: "/products/security", description: "Single sign-on, audit logs and data residency." },
        ],
      },
      {
        label: "Solutions",
        links: [
          { label: "Startups", href: "/solutions/startups", description: "Ship fast with a free first year." },
          { label: "Enterprise", href: "/solutions/enterprise", description: "Dedicated support and custom contracts." },
          { label: "Nonprofits and education", href: "/solutions/nonprofits", description: "Discounted plans for schools and charities." },
        ],
      },
      { label: "Pricing", href: "/pricing" },
      {
        label: "Docs",
        links: [
          { label: "Getting started", href: "/docs/getting-started" },
          { label: "Guides", href: "/docs/guides" },
          { label: "API reference", href: "/docs/api" },
          { label: "Changelog", href: "/docs/changelog" },
        ],
      },
    ],
    onValueChange: fn(),
  },
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Rest the pointer on Products, then move to Solutions: the panel springs to it. Or Tab to a trigger, press Enter, Tab into the panel, and Escape back. */
export const Default: Story = {
  render: function Render(args) {
    const [path, setPath] = useState("/");
    return (
      <LinkProvider navigate={setPath}>
        <div className="grid justify-items-center gap-4 p-6">
          <div className="rounded-control bg-paper p-1 shadow-float surface">
            <NavigationMenu {...args} />
          </div>
          <output className="text-label text-muted">Current page: {path}</output>
        </div>
      </LinkProvider>
    );
  },
};

export const Usage: Story = {
  render: () => <NavigationMenuDemo />,
};
