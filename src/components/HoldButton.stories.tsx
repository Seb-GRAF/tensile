import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { HoldButton } from "./HoldButton";

const meta = {
  component: HoldButton,
  args: { done: false, onDone: fn() },
} satisfies Meta<typeof HoldButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Press and hold, or hold Space or Enter: let go early and the fill springs back; hold until it is full and it turns into a check for 1.5 s. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onDone() {
      args.onDone();
      updateArgs({ done: true });
      setTimeout(() => updateArgs({ done: false }), 1500);
    }

    return <HoldButton {...args} onDone={onDone} />;
  },
};
