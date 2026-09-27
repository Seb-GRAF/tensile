import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { MorphButton } from "./MorphButton";

const meta = {
  title: "Actions/MorphButton",
  id: "components-morphbutton",
  component: MorphButton,
  args: { status: "idle", onClick: fn() },
} satisfies Meta<typeof MorphButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click to run a fake request: loading for 1.2 s, done for 1.5 s, then back to idle. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onClick() {
      args.onClick();
      updateArgs({ status: "loading" });
      setTimeout(() => updateArgs({ status: "success" }), 1200);
      setTimeout(() => updateArgs({ status: "idle" }), 2700);
    }

    return <MorphButton {...args} onClick={onClick} />;
  },
};
