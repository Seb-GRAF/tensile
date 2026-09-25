import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { SearchField, type SearchFieldProps } from "./SearchField";

function StatefulSearchField(props: SearchFieldProps) {
  const [value, setValue] = useState(props.value);
  return (
    <SearchField
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
  component: SearchField,
  args: { value: "", onValueChange: fn() },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the button (or press Enter or Space) and type; Escape clears the text, and Escape on an empty field or leaving it folds it back. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <StatefulSearchField
        {...args}
        onValueChange={(value) => {
          args.onValueChange(value);
          updateArgs({ value });
        }}
      />
    );
  },
};
