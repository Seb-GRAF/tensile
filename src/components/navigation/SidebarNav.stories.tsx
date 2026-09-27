import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../data-display/Icon";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { SidebarNav } from "./SidebarNav";
import { useState } from "react";
import { LinkProvider } from "./Link";

function NavIcon({ paths }: { paths: string[] }) {
  return (
    <Icon size={16}>
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </Icon>
  );
}

const meta = {
  title: "Navigation/SidebarNav",
  id: "components-sidebarnav",
  component: SidebarNav,
  args: {
    items: [
      {
        value: "home",
        label: "Home",
        icon: (
          <NavIcon
            paths={[
              "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
              "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
            ]}
          />
        ),
      },
      { value: "search", label: "Search", icon: <NavIcon paths={["M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0", "m21 21-4.3-4.3"]} /> },
      { value: "library", label: "Library", icon: <NavIcon paths={["m16 6 4 14", "M12 6v14", "M8 8v12", "M4 4v16"]} /> },
      { value: "downloads", label: "Downloads", icon: <NavIcon paths={["M12 15V3", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "m7 10 5 5 5-5"]} /> },
      { value: "profile", label: "Profile", icon: <NavIcon paths={["M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0"]} /> },
    ],
    value: "home",
    onValueChange: fn(),
  },
} satisfies Meta<typeof SidebarNav>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click an item, or Tab in, move focus with ArrowUp and ArrowDown and open it with Enter or Space: the ink pill stretches as it slides. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <SidebarNav
        {...args}
        onValueChange={(value) => {
          args.onValueChange(value);
          updateArgs({ value });
        }}
      />
    );
  },
};

export const Collapsed: Story = {
  ...Default,
  args: { collapsed: true, className: "w-12" },
};

export const LongLabels: Story = {
  ...Default,
  args: {
    className: "w-48",
    items: meta.args.items.map((item) => ({ ...item, label: item.value === "library" ? "Recently viewed library collections" : item.label })),
  },
};

export const WithLinks: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    const [path, setPath] = useState("/");
    return (
      <LinkProvider navigate={setPath}>
        <div className="grid gap-4">
          <SidebarNav
            {...args}
            items={args.items.map((item, index) => ({ ...item, href: index < 4 ? `/${item.value}` : undefined }))}
            value={value}
            onValueChange={(next) => { args.onValueChange(next); setValue(next); }}
          />
          <output className="text-label text-muted">{value} {path}</output>
        </div>
      </LinkProvider>
    );
  },
};
