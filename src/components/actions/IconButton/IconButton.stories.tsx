import { IconButtonDemo } from "./demos/IconButtonDemo";
import { IconButtonSecondaryDemo } from "./demos/IconButtonSecondaryDemo";
import { IconButtonGhostDemo } from "./demos/IconButtonGhostDemo";
import { IconButtonSizesDemo } from "./demos/IconButtonSizesDemo";
import { IconButtonDisabledDemo } from "./demos/IconButtonDisabledDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { icons } from "../../../icons";
import { IconButton } from "./IconButton";

const meta = {
  title: "Actions/IconButton",
  id: "components-iconbutton",
  component: IconButton,
  args: { label: "Close", icon: "close", onClick: fn() },
  argTypes: { icon: { control: "select", options: Object.keys(icons) } },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click it, or Tab to it and press Enter or Space: each calls onClick. The label is its accessible name; change it, the variant and the size in Controls. */
export const Default: Story = {};

export const Usage: Story = {
  render: () => <IconButtonDemo />,
};

export const SecondaryUsage: Story = {
  render: () => <IconButtonSecondaryDemo />,
};

export const GhostUsage: Story = {
  render: () => <IconButtonGhostDemo />,
};

export const SizesUsage: Story = {
  render: () => <IconButtonSizesDemo />,
};

export const DisabledUsage: Story = {
  render: () => <IconButtonDisabledDemo />,
};
