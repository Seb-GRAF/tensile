import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { icons } from "../../icons";
import { Icon } from "../data-display/Icon";
import { IconButton } from "./IconButton";

const meta = {
  title: "Actions/IconButton",
  id: "components-iconbutton",
  component: IconButton,
  args: { label: "Close", children: <Icon size={20}>{icons.close}</Icon>, onClick: fn() },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click it, or Tab to it and press Enter or Space: each calls onClick. The label is its accessible name; change it, the variant and the size in Controls. */
export const Default: Story = {};
