import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { TimeWheel, type TimeWheelProps } from "./TimeWheel";

function StatefulTimeWheel(props: TimeWheelProps) {
  const [value, setValue] = useState(props.value);
  return (
    <TimeWheel
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
  component: TimeWheel,
  args: { value: { hours: 7, minutes: 30 }, onValueChange: fn() },
} satisfies Meta<typeof TimeWheel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drag or flick a wheel and it lands on the nearest value; hours and minutes loop, AM/PM stretches past its ends. Tab to a wheel and press the arrow keys. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <StatefulTimeWheel
        {...args}
        onValueChange={(value) => {
          args.onValueChange(value);
          updateArgs({ value });
        }}
      />
    );
  },
};
