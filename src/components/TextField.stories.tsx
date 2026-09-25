import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { TextField, type TextFieldProps } from "./TextField";

function StatefulTextField(props: TextFieldProps) {
  const [value, setValue] = useState(props.value);
  return (
    <TextField
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
  component: TextField,
  args: { value: "", onValueChange: fn() },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the field and type an email; a space shows an error until you delete it. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <StatefulTextField
        {...args}
        onValueChange={(value) => {
          args.onValueChange(value);
          updateArgs({ value, error: value.includes(" ") ? "Email addresses can't contain spaces" : undefined });
        }}
      />
    );
  },
};
