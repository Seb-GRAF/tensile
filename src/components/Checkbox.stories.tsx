import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Checkbox } from "./Checkbox";

const meta = {
  component: Checkbox,
  args: { checked: false, onCheckedChange: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the box or its label, or focus the box and press Space, to check and uncheck it. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Checkbox
        {...args}
        onCheckedChange={(checked) => {
          args.onCheckedChange(checked);
          updateArgs({ checked });
        }}
      />
    );
  },
};
