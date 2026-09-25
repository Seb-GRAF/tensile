import type { Meta, StoryObj } from "@storybook/react-vite";
import { CopyButton } from "./CopyButton";

const meta = {
  component: CopyButton,
  args: { value: "npm install motion" },
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click, or press Enter or Space, to copy the value: "Copied" shows for 1.5 s, then the icon returns. */
export const Default: Story = {};
