import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Textarea, type TextareaProps } from "./Textarea";

function StatefulTextarea(props: TextareaProps) {
  const [value, setValue] = useState(props.value);
  return (
    <Textarea
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
  title: "Inputs/Textarea",
  id: "components-textarea",
  component: Textarea,
  args: { value: "", onValueChange: fn(), "aria-label": "Message", placeholder: "Write a message" },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Type past the third line: the field grows with its text. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-80">
        <StatefulTextarea
          {...args}
          onValueChange={(value) => {
            args.onValueChange(value);
            updateArgs({ value });
          }}
        />
      </div>
    );
  },
};
