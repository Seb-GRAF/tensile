import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { CommandPalette } from "./CommandPalette";
import { Icon } from "../data-display/Icon";

const meta = {
  title: "Actions/CommandPalette",
  id: "components-commandpalette",
  component: CommandPalette,
  args: {
    onSelect: fn(),
    commands: [
      { label: "Share listening stats", icon: <Icon><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="m16 6-4-4-4 4" /><path d="M12 2v13" /></Icon> },
      {
        label: "Shuffle library",
        icon: (
          <Icon><path d="m18 14 4 4-4 4" /><path d="m18 2 4 4-4 4" /><path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-7.6a4 4 0 0 1 3.3-1.7H22" /><path d="M2 6h1.972a4 4 0 0 1 3.6 2.2" /><path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" /></Icon>
        ),
      },
      { label: "Sleep timer", icon: <Icon><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></Icon> },
      { label: "Search artists", icon: <Icon><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0" /></Icon> },
      { label: "Add to queue", icon: <Icon><path d="M11 12H3" /><path d="M16 6H3" /><path d="M16 18H3" /><path d="M18 9v6" /><path d="M21 12h-6" /></Icon> },
    ],
  },
} satisfies Meta<typeof CommandPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the field or press ⌘K, type to filter ("sh", "sha"), then use the arrow keys and Enter. */
export const Default: Story = {
  render: (args) => <div className="w-90 max-w-full"><CommandPalette {...args} /></div>,
};
