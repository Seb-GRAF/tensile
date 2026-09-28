import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Field } from "./Field";
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

/** The label rests inside the field and floats up while it's focused or filled. Past 160 characters an error grows the field into a card; shorten the text to clear it. */
export const InAField: Story = {
  args: {
    "aria-label": undefined,
    value: "The parcel with order CH-2048-7731 arrived yesterday, but the lid of the teapot was broken in the box. Could you send a new lid, or should I return the whole teapot?",
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return (
      <Field
        label="Message"
        description="Include your order number."
        error={value.length > 160 ? "Keep the message under 160 characters" : undefined}
        required
        className="w-80"
      >
        <Textarea {...args} value={value} onValueChange={setValue} />
      </Field>
    );
  },
};

/** With `labelPlacement="above"` on the Field, its label sits above the field and the field looks as it does on its own. */
export const LabelAbove: Story = {
  args: { "aria-label": undefined },
  render: (args) => (
    <Field label="Message" description="Include your order number." labelPlacement="above" className="w-80">
      <StatefulTextarea {...args} />
    </Field>
  ),
};
