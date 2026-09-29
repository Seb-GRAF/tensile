import { EditableTextDemo } from "./demos/EditableTextDemo";
import { EditableTextEmptyDemo } from "./demos/EditableTextEmptyDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { EditableText, type EditableTextProps } from "./EditableText";

function StatefulEditableText(props: EditableTextProps) {
  const [value, setValue] = useState(props.value);
  return <EditableText {...props} value={value} onValueChange={(value) => { setValue(value); props.onValueChange(value); }} />;
}

const meta = {
  title: "Inputs/EditableText",
  id: "components-editabletext",
  component: EditableText,
  args: { value: "Project atlas", onValueChange: fn(), label: "Project name" },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="flex w-80 max-w-[calc(100vw-2rem)] justify-center">
        <StatefulEditableText {...args} onValueChange={(value) => { args.onValueChange(value); updateArgs({ value }); }} />
      </div>
    );
  },
} satisfies Meta<typeof EditableText>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click or press Enter to edit; Enter or blur saves, Escape cancels and returns focus to the display. */
export const Default: Story = {};

export const Empty: Story = { args: { value: "" } };

export const Usage: Story = {
  render: () => <EditableTextDemo />,
};

export const EmptyUsage: Story = {
  render: () => <EditableTextEmptyDemo />,
};
