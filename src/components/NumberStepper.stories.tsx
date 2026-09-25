import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { NumberStepper } from "./NumberStepper";

const meta = {
  component: NumberStepper,
  args: { value: 9, onValueChange: fn() },
} satisfies Meta<typeof NumberStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click − and +, or Tab in and press the arrow keys, Home and End: the digits roll, and a press past either end stretches the stepper, which springs back. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <NumberStepper
        {...args}
        onValueChange={(value) => {
          args.onValueChange(value);
          updateArgs({ value });
        }}
      />
    );
  },
};
