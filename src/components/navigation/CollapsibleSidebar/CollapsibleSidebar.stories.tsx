import { CollapsibleSidebarDemo } from "./demos/CollapsibleSidebarDemo";
import { CollapsibleSidebarSlotsDemo } from "./demos/CollapsibleSidebarSlotsDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../../data-display/Icon/Icon";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { CollapsibleSidebar } from "./CollapsibleSidebar";

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
  title: "Navigation/CollapsibleSidebar",
  id: "components-collapsiblesidebar",
  component: CollapsibleSidebar,
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
    expanded: false,
    onExpandedChange: fn(),
  },
} satisfies Meta<typeof CollapsibleSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the panel button (or Tab to it and press Enter) to widen the rail into the sidebar and back; click an item, or move focus with ArrowUp and ArrowDown and open it with Enter or Space. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="flex h-[420px] w-[560px] max-w-[calc(100vw-32px)] gap-5 bg-paper p-3">
        <CollapsibleSidebar
          {...args}
          onValueChange={(value) => {
            args.onValueChange?.(value);
            updateArgs({ value });
          }}
          onExpandedChange={(expanded) => {
            args.onExpandedChange?.(expanded);
            updateArgs({ expanded });
          }}
        />
        <p className="min-w-0 pt-3 text-body font-semibold text-ink">{args.items.find((item) => item.value === args.value)!.label}</p>
      </div>
    );
  },
};

export const LongLabels: Story = {
  ...Default,
  args: {
    items: meta.args.items.map((item) => ({ ...item, label: item.value === "library" ? "Recently viewed library collections" : item.label })),
  },
};

export const Usage: Story = {
  render: () => <CollapsibleSidebarDemo />,
};

export const SlotsUsage: Story = {
  render: () => <CollapsibleSidebarSlotsDemo />,
};
