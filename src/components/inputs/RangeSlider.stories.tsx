import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { RangeSlider, type RangeSliderProps } from "./RangeSlider";

function StatefulRangeSlider(props: RangeSliderProps) {
  const [value, setValue] = useState(props.value);
  return (
    <RangeSlider
      {...props}
      value={value}
      onValueChange={(value) => {
        setValue(value);
        props.onValueChange(value);
      }}
    />
  );
}

const meta = {
  title: "Inputs/RangeSlider",
  id: "components-rangeslider",
  component: RangeSlider,
  args: { value: [20, 80], onValueChange: fn() },
} satisfies Meta<typeof RangeSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drag a handle or press the track to grab the nearer one; past either end the slider stretches and springs back. Tab to a handle for the arrow keys, Home and End. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <StatefulRangeSlider {...args} onValueChange={(value) => updateArgs({ value })} />;
  },
};
