import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Card } from "../layout/Card";
import { NotificationList } from "./NotificationList";

const meta = {
  title: "Feedback/NotificationList",
  id: "components-notificationlist",
  component: NotificationList,
  parameters: { layout: "padded" },
  args: {
    notifications: [
      { id: "review", title: "Review ready", description: "The team has finished reviewing your latest draft.", time: "2 minutes ago", avatar: { name: "Alex Morgan" } },
      { id: "export", title: "Export complete", description: "Your files are ready to download.", time: "10 minutes ago" },
      { id: "welcome", title: "Welcome to your workspace", time: "Yesterday", read: true, avatar: { name: "Taylor Reed" } },
    ],
    onRead: fn(),
    onDismiss: fn(),
  },
} satisfies Meta<typeof NotificationList>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Mark a notification as read or dismiss it: dismissed rows blur out, the rest spring up, and focus moves to a remaining action. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Card className="mx-auto w-96 max-w-full p-5">
        <NotificationList
          {...args}
          onRead={(id) => {
            args.onRead(id);
            updateArgs({ notifications: args.notifications.map((item) => item.id === id ? { ...item, read: true } : item) });
          }}
          onDismiss={(id) => {
            args.onDismiss(id);
            updateArgs({ notifications: args.notifications.filter((item) => item.id !== id) });
          }}
        />
      </Card>
    );
  },
};

export const Empty: Story = {
  args: { notifications: [] },
  render: (args) => <Card className="mx-auto w-96 max-w-full p-5"><NotificationList {...args} /></Card>,
};
