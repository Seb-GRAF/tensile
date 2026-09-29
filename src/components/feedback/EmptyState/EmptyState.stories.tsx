import { EmptyStateDemo } from "./demos/EmptyStateDemo";
import { EmptyStateActionDemo } from "./demos/EmptyStateActionDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../actions/Button/Button";
import { Icon } from "../../data-display/Icon/Icon";
import { Card } from "../../layout/Card/Card";
import { EmptyState } from "./EmptyState";

const meta = {
  title: "Feedback/EmptyState",
  id: "components-emptystate",
  component: EmptyState,
  args: {
    title: "No playlists yet",
    description: "Create a playlist to keep your favorite tracks together.",
    icon: <Icon size={24}><path d="M9 18V5l12-2v13M9 9l12-2" /><ellipse cx="6" cy="18" rx="3" ry="2" /><ellipse cx="18" cy="16" rx="3" ry="2" /></Icon>,
    action: <Button>Create playlist</Button>,
  },
  render: (args) => <Card className="w-96 max-w-[calc(100vw-2rem)]"><EmptyState {...args} /></Card>,
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;
/** An empty view's title, description, icon and action; the action is an ordinary Button. */
export const Default: Story = {};

export const Usage: Story = {
  render: () => <EmptyStateDemo />,
};

export const ActionUsage: Story = {
  render: () => <EmptyStateActionDemo />,
};
