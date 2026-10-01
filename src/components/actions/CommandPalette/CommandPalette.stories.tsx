import { CommandPaletteDemo } from "./demos/CommandPaletteDemo";
import { CommandPaletteEmptyDemo } from "./demos/CommandPaletteEmptyDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { CommandPalette } from "./CommandPalette";
import { Icon } from "../../data-display/Icon/Icon";

const meta = {
  title: "Actions/CommandPalette",
  id: "components-commandpalette",
  component: CommandPalette,
  args: {
    onSelect: fn(),
    commands: [
      { label: "Share listening stats", icon: <Icon name="share" /> },
      { label: "Shuffle library", icon: <Icon name="shuffle" /> },
      { label: "Sleep timer", icon: <Icon name="moon" /> },
      { label: "Search artists", icon: <Icon name="user" /> },
      { label: "Add to queue", icon: <Icon name="listPlus" /> },
    ],
  },
} satisfies Meta<typeof CommandPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the field or press ⌘K, type to filter ("sh", "sha"), then use the arrow keys and Enter. */
export const Default: Story = {
  render: (args) => <div className="w-90 max-w-full"><CommandPalette {...args} /></div>,
};

export const Usage: Story = {
  render: () => <CommandPaletteDemo />,
};

export const EmptyUsage: Story = {
  render: () => <CommandPaletteEmptyDemo />,
};
