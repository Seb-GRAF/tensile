import { TooltipDemo } from "./demos/TooltipDemo";
import { TooltipGroupDemo } from "./demos/TooltipGroupDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../actions/Button/Button";
import { IconButton } from "../../actions/IconButton/IconButton";
import { Card } from "../../layout/Card/Card";
import { Tooltip } from "./Tooltip";

const meta = {
  title: "Overlays/Tooltip",
  id: "components-tooltip",
  component: Tooltip,
  args: {
    label: "Bold",
    children: (trigger) => <IconButton {...trigger} label="Bold" variant="secondary" size="sm" icon="bold" />,
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

export const Usage: Story = {
  render: () => <TooltipDemo />,
};

export const GroupUsage: Story = {
  render: () => <TooltipGroupDemo />,
};
