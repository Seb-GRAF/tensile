import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { IconButton } from "../actions/IconButton";
import { Icon } from "../data-display/Icon";
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
          onClick={() => updateArgs({ count: counts[(counts.indexOf(args.count) + 1) % counts.length] })}
        >
          <Icon size={20}>
            <path d="M10.27 21a2 2 0 0 0 3.46 0" />
            <path d="M3.26 15.33A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.67C19.41 13.96 18 12.5 18 8A6 6 0 0 0 6 8c0 4.5-1.41 5.96-2.74 7.33" />
          </Icon>
        </IconButton>
        <span className="absolute top-1.5 right-1.5 flex translate-x-1/2 -translate-y-1/2">
          <Badge {...args} />
        </span>
      </div>
    );
  },
};
