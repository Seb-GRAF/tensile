import { LoadingStateDemo } from "./demos/LoadingStateDemo";
import { LoadingStateDescriptionDemo } from "./demos/LoadingStateDescriptionDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "../../layout/Card/Card";
import { LoadingState } from "./LoadingState";

const meta = {
  title: "Feedback/LoadingState",
  id: "components-loadingstate",
  component: LoadingState,
  args: { description: "Your playlists will be ready shortly." },
  render: (args) => <Card className="w-96 max-w-[calc(100vw-2rem)]"><LoadingState {...args} /></Card>,
} satisfies Meta<typeof LoadingState>;

export default meta;
type Story = StoryObj<typeof meta>;
/** A named loading status with a spinner; there is nothing to interact with. */
export const Default: Story = {};

export const Usage: Story = {
  render: () => <LoadingStateDemo />,
};

export const DescriptionUsage: Story = {
  render: () => <LoadingStateDescriptionDemo />,
};
