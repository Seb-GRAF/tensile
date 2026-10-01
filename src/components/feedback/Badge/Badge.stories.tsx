import { BadgeDemo } from "./demos/BadgeDemo";
import { BadgeDotDemo } from "./demos/BadgeDotDemo";
import { BadgeFormatDemo } from "./demos/BadgeFormatDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { IconButton } from "../../actions/IconButton/IconButton";
import { Badge } from "./Badge";

const counts = [null, 9, 10, 100, 8, 0, 3];

const meta = {
  title: "Feedback/Badge",
  id: "components-badge",
  component: Badge,
  args: { count: null },
  argTypes: { count: { control: { type: "number", min: 0 } } },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the bell, or press Enter, to step through a dot, 9, 10, 100, 8, 0 and 3; 0 hides the badge. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="relative">
        <IconButton
          label="Notifications"
          icon="bell"
          onClick={() => updateArgs({ count: counts[(counts.indexOf(args.count) + 1) % counts.length] })}
        />
        <span className="absolute top-1.5 right-1.5 flex translate-x-1/2 -translate-y-1/2">
          <Badge {...args} />
        </span>
      </div>
    );
  },
};

export const Usage: Story = {
  render: () => <BadgeDemo />,
};

export const DotUsage: Story = {
  render: () => <BadgeDotDemo />,
};

export const FormatUsage: Story = {
  render: () => <BadgeFormatDemo />,
};
