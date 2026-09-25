import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { VolumeSlider } from "./VolumeSlider";

const meta = {
  component: VolumeSlider,
  args: { value: 0.45, label: "Volume", onValueChange: fn() },
  argTypes: { value: { control: { type: "range", min: 0, max: 1, step: 0.01 } } },
} satisfies Meta<typeof VolumeSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drag past either end: the slider stretches and springs back when you let go. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <VolumeSlider {...args} onValueChange={(value) => updateArgs({ value })} />;
  },
};
