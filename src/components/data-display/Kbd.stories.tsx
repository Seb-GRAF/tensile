import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "../layout/Card";
import { Kbd } from "./Kbd";

const meta = {
  title: "Data display/Kbd",
  id: "components-kbd",
  component: Kbd,
  args: { children: "⌘K" },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A shortcut in running text; change the keys in `children`. */
export const Default: Story = {
  render: (args) => (
    <Card className="px-4 py-3 text-label text-muted">
      Press <Kbd {...args} /> to search commands
    </Card>
  ),
};
