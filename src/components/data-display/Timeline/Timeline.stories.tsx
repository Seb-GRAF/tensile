import { TimelineDemo } from "./demos/TimelineDemo";
import { TimelineIconsDemo } from "./demos/TimelineIconsDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { icons } from "../../../icons";
import { Card } from "../../layout/Card/Card";
import { Icon } from "../Icon/Icon";
import { Timeline } from "./Timeline";

const meta = {
  title: "Data display/Timeline",
  id: "components-timeline",
  component: Timeline,
  parameters: { layout: "padded" },
  args: {
    label: "Activity",
    items: [
      {
        id: "approved",
        title: "Maya Chen approved the homepage design",
        time: "2 min ago",
        icon: (
          <Icon size={14}>
            <path d="M20 6 9 17l-5-5" />
          </Icon>
        ),
      },
      {
        id: "commented",
        title: "Leo Park commented on Homepage hero.png",
        description: "“Can we try the darker background? The headline gets lost on white.”",
        time: "1 h ago",
        icon: (
          <Icon size={14}>
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </Icon>
        ),
      },
      {
        id: "uploaded",
        title: "Maya Chen uploaded 3 files",
        description: "Homepage hero.png, Pricing table.png, Footer.png",
        time: "Yesterday",
      },
      {
        id: "joined",
        title: "Leo Park joined the project",
        time: "Sep 24",
      },
      {
        id: "created",
        title: "Maya Chen created Brand refresh",
        description: "From the Website template",
        time: "Sep 22",
        icon: <Icon size={14}>{icons.plus}</Icon>,
      },
    ],
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

/** An activity log in a card; events with an icon show it in a circle on the line, the others a dot. */
export const Default: Story = {
  render: (args) => (
    <Card className="mx-auto max-w-lg p-5">
      <Timeline {...args} />
    </Card>
  ),
};

export const Usage: Story = {
  render: () => <TimelineDemo />,
};

export const IconsUsage: Story = {
  render: () => <TimelineIconsDemo />,
};
