import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { TagInput, type TagInputProps } from "./TagInput";

function StatefulTagInput(props: TagInputProps) {
  const [value, setValue] = useState(props.value);
  return (
    <TagInput
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
  title: "Inputs/TagInput",
  id: "components-taginput",
  component: TagInput,
  args: { value: ["jazz", "soul", "funk"], onValueChange: fn() },
} satisfies Meta<typeof TagInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Type a tag and press Enter or a comma; Backspace in the empty field removes the last chip, × removes its chip. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <StatefulTagInput
        {...args}
        onValueChange={(value) => {
          args.onValueChange(value);
          updateArgs({ value });
        }}
      />
    );
  },
};
