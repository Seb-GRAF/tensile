import { VolumeSliderDemo } from "./demos/VolumeSliderDemo";
import { VolumeSliderInkDemo } from "./demos/VolumeSliderInkDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Card } from "../../layout/Card/Card";
import { VolumeSlider, type VolumeSliderProps } from "./VolumeSlider";

function StatefulVolumeSlider(props: VolumeSliderProps) {
  const [value, setValue] = useState(props.value);
  return (
    <VolumeSlider
      {...props}
      value={value}
      onValueChange={(value) => {
        setValue(value);
        props.onValueChange?.(value);
      }}
    />
  );
}

const meta = {
  title: "Media/VolumeSlider",
  id: "components-volumeslider",
  component: VolumeSlider,
  args: { value: 0.45, onValueChange: fn() },
  argTypes: { value: { control: { type: "range", min: 0, max: 1, step: 0.01 } } },
} satisfies Meta<typeof VolumeSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drag past either end: the slider stretches and springs back when you let go. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-60 max-w-full">
        <StatefulVolumeSlider {...args} onValueChange={(value) => { args.onValueChange?.(value); updateArgs({ value }); }} />
      </div>
    );
  },
};

export const OnInk: Story = {
  args: { tone: "ink", formatValue: (value) => `${Math.round(value * 100)} percent volume` },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Card tone="ink" className="w-80 max-w-full p-6">
        <StatefulVolumeSlider {...args} onValueChange={(value) => { args.onValueChange?.(value); updateArgs({ value }); }} />
      </Card>
    );
  },
};

export const Usage: Story = {
  render: () => <VolumeSliderDemo />,
};

export const InkUsage: Story = {
  render: () => <VolumeSliderInkDemo />,
};
