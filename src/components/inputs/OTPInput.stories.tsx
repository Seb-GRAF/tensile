import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { OTPInput, type OTPInputProps } from "./OTPInput";

function StatefulOTPInput(props: OTPInputProps) {
  const [value, setValue] = useState(props.value);
  return (
    <OTPInput
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
  title: "Inputs/OTPInput",
  id: "components-otpinput",
  component: OTPInput,
  args: { value: "", onValueChange: fn() },
} satisfies Meta<typeof OTPInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click a cell and type or paste a code; Backspace clears and moves back, the arrow keys move between cells. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <StatefulOTPInput
        {...args}
        onValueChange={(value) => {
          args.onValueChange(value);
          updateArgs({ value });
        }}
      />
    );
  },
};
