import { BreadcrumbsDemo } from "./demos/BreadcrumbsDemo";
import { BreadcrumbsLinksDemo } from "./demos/BreadcrumbsLinksDemo";
import { BreadcrumbsCollapsedDemo } from "./demos/BreadcrumbsCollapsedDemo";
import { BreadcrumbsSiblingsDemo } from "./demos/BreadcrumbsSiblingsDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Icon } from "../../data-display/Icon/Icon";
import { LinkProvider } from "../Link/Link";
import { fn } from "storybook/test";
import { Breadcrumbs } from "./Breadcrumbs";

const meta = {
  title: "Navigation/Breadcrumbs",
  id: "components-breadcrumbs",
  component: Breadcrumbs,
  parameters: { layout: "padded" },
  args: {
    onNavigate: fn(),
    items: [
      { label: "Home", icon: <Icon name="home" size={14} /> },
      { label: "Projects" },
      { label: "Harbor Coffee" },
      { label: "Brand refresh" },
      { label: "Assets" },
      { label: "Logo concepts" },
    ],
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the … pill, or focus it and press Enter or Space, to show the hidden pages; click a page to navigate to it. */
export const Default: Story = {};

export const WithLinks: Story = {
  render: function Render(args) {
    const [selected, setSelected] = useState("Home");
    const [path, setPath] = useState("/");
    return (
      <LinkProvider navigate={setPath}>
        <div className="grid gap-4">
          <Breadcrumbs
            {...args}
            items={args.items.map((item, index) => ({ ...item, href: `/page/${index}` }))}
            onNavigate={(item) => { args.onNavigate(item); setSelected(item.label); }}
          />
          <output className="text-label text-muted">{selected} {path}</output>
        </div>
      </LinkProvider>
    );
  },
};

/** Click the chevron after Harbor Coffee or Brand refresh, or focus it and press Enter or ArrowDown, to list the pages next to it; pick one to navigate. */
export const WithSiblings: Story = {
  render: function Render(args) {
    const [path, setPath] = useState("/");
    const items = [
      args.items[0],
      { ...args.items[1], href: "/projects" },
      {
        ...args.items[2],
        href: "/projects/harbor-coffee",
        siblings: [
          { label: "Northwind Rail", href: "/projects/northwind-rail" },
          { label: "Fieldnote Journal", href: "/projects/fieldnote-journal" },
          { label: "Atlas Climbing Gym and Bouldering Hall", href: "/projects/atlas" },
        ],
      },
      ...args.items.slice(3, -1),
      { ...args.items.at(-1)!, siblings: [{ label: "Typography" }, { label: "Color palettes" }, { label: "Photography" }] },
    ];
    return (
      <LinkProvider navigate={setPath}>
        <div className="grid gap-4">
          <Breadcrumbs {...args} items={items} itemsAfterCollapse={4} />
          <output className="text-label text-muted">{path}</output>
        </div>
      </LinkProvider>
    );
  },
};

export const Usage: Story = {
  render: () => <BreadcrumbsDemo />,
};

export const LinksUsage: Story = {
  render: () => <BreadcrumbsLinksDemo />,
};

export const CollapsedUsage: Story = {
  render: () => <BreadcrumbsCollapsedDemo />,
};

export const SiblingsUsage: Story = {
  render: () => <BreadcrumbsSiblingsDemo />,
};
