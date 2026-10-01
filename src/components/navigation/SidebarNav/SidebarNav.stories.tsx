import { SidebarNavDemo } from "./demos/SidebarNavDemo";
import { SidebarNavLinksDemo } from "./demos/SidebarNavLinksDemo";
import { SidebarNavCollapsedDemo } from "./demos/SidebarNavCollapsedDemo";
import { SidebarNavSlotsDemo } from "./demos/SidebarNavSlotsDemo";
import { SidebarNavCategoriesDemo } from "./demos/SidebarNavCategoriesDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../../data-display/Icon/Icon";
import { Card } from "../../layout/Card/Card";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { SidebarNav } from "./SidebarNav";
import { useState } from "react";
import { LinkProvider } from "../Link/Link";

const meta = {
  title: "Navigation/SidebarNav",
  id: "components-sidebarnav",
  component: SidebarNav,
  args: {
    items: [
      { value: "home", label: "Home", icon: <Icon name="home" /> },
      { value: "search", label: "Search", icon: <Icon name="search" /> },
      { value: "library", label: "Library", icon: <Icon name="library" /> },
      { value: "downloads", label: "Downloads", icon: <Icon name="download" /> },
      { value: "profile", label: "Profile", icon: <Icon name="user" /> },
    ],
    value: "home",
    onValueChange: fn(),
  },
} satisfies Meta<typeof SidebarNav>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click an item, or Tab in, move focus with ArrowUp and ArrowDown and open it with Enter or Space: the ink pill springs to the new row. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Card className="p-2">
        <SidebarNav
          {...args}
          onValueChange={(value) => {
            args.onValueChange?.(value);
            updateArgs({ value });
          }}
        />
      </Card>
    );
  },
};

export const Collapsed: Story = {
  ...Default,
  args: { collapsed: true, className: "w-8" },
};

export const LongLabels: Story = {
  ...Default,
  args: {
    className: "w-44",
    items: meta.args.items.map((item) => ({ ...item, label: item.value === "library" ? "Recently viewed library collections" : item.label })),
  },
};

export const Categories: Story = {
  ...Default,
  args: {
    items: [
      { label: "Browse", items: meta.args.items.slice(0, 3) },
      { label: "Your music", items: meta.args.items.slice(3) },
    ],
  },
};

export const WithLinks: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    const [path, setPath] = useState("/");
    return (
      <LinkProvider navigate={setPath}>
        <div className="grid gap-4">
          <Card className="p-2">
            <SidebarNav
              {...args}
              items={meta.args.items.map((item, index) => ({ ...item, href: index < 4 ? `/${item.value}` : undefined }))}
              value={value}
              onValueChange={(next) => { args.onValueChange?.(next); setValue(next); }}
            />
          </Card>
          <output className="text-label text-muted">{value} {path}</output>
        </div>
      </LinkProvider>
    );
  },
};

export const Usage: Story = {
  render: () => <SidebarNavDemo />,
};

export const LinksUsage: Story = {
  render: () => <SidebarNavLinksDemo />,
};

export const CollapsedUsage: Story = {
  render: () => <SidebarNavCollapsedDemo />,
};

export const SlotsUsage: Story = {
  render: () => <SidebarNavSlotsDemo />,
};

export const CategoriesUsage: Story = {
  render: () => <SidebarNavCategoriesDemo />,
};
