import { CollapsibleSidebarDemo } from "./demos/CollapsibleSidebarDemo";
import { CollapsibleSidebarSlotsDemo } from "./demos/CollapsibleSidebarSlotsDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../../data-display/Icon/Icon";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { CollapsibleSidebar } from "./CollapsibleSidebar";

const meta = {
  title: "Navigation/CollapsibleSidebar",
  id: "components-collapsiblesidebar",
  component: CollapsibleSidebar,
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
