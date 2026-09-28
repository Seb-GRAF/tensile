import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../actions/Button";
import { IconButton } from "../actions/IconButton";
import { Icon } from "../data-display/Icon";
import { Card } from "../layout/Card";
import { Tooltip } from "./Tooltip";

const meta = {
  title: "Overlays/Tooltip",
  id: "components-tooltip",
  component: Tooltip,
  args: {
    label: "Bold",
    children: (trigger) => <IconButton {...trigger} label="Bold" variant="secondary" size="sm"><Icon size={16}><path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" /></Icon></IconButton>,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Hover the button or Tab to it: after 400 ms the tooltip fades in above it; leave, blur or press Escape to hide it. */
export const Default: Story = {};

export const NearTheEdges: Story = {
  parameters: { layout: "fullscreen" },
  args: { label: "A long description that stays inside the viewport, even when the trigger is at its edge.", children: (trigger) => <Button {...trigger} size="sm">Details</Button> },
  render: (args) => <div className="min-h-dvh"><div className="fixed top-2 right-2"><Tooltip {...args} /></div></div>,
};

export const InsideAClippingCard: Story = {
  render: (args) => <Card className="h-20 w-40 overflow-hidden p-4"><Tooltip {...args} /></Card>,
};
