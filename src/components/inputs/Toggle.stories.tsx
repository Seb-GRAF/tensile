import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Toggle } from "./Toggle";

const meta = {
  title: "Inputs/Toggle",
  id: "components-toggle",
  component: Toggle,
  args: { checked: false, onCheckedChange: fn() },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Toggle
        {...args}
        onCheckedChange={(checked) => {
          args.onCheckedChange(checked);
          updateArgs({ checked });
        }}
      />
    );
  },
};
