import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "./Icon";

const meta = {
  title: "Data display/Icon",
  id: "components-icon",
  component: Icon,
  args: {
    children: (
      <>
        <path d="M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h18" />
      </>
    ),
    className: "text-ink",
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Change the size in Controls: the icon grows and its lines stay 1.5 px. */
export const Default: Story = {};
