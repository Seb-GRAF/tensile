import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./Spinner";

const meta = {
  title: "Feedback/Spinner",
  id: "components-spinner",
  component: Spinner,
  args: { className: "text-ink" },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Turns once every 0.8 s; with reduced motion it holds still. */
export const Default: Story = {};
