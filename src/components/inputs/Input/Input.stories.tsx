import { InputDemo } from "./demos/InputDemo";
import { InputSlotsDemo } from "./demos/InputSlotsDemo";
import { InputDisabledDemo } from "./demos/InputDisabledDemo";
import { InputReadOnlyDemo } from "./demos/InputReadOnlyDemo";
import { InputFormDemo } from "./demos/InputFormDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Icon } from "../../data-display/Icon/Icon";
import { Input, type InputProps } from "./Input";

function StatefulInput(props: InputProps) {
  const [value, setValue] = useState(props.value);
  return (
    <Input
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
  title: "Inputs/Input",
  id: "components-input",
  component: Input,
  args: { value: "", onValueChange: fn(), "aria-label": "Email", placeholder: "name@example.com" },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-80">
        <StatefulInput
          {...args}
          onValueChange={(value) => {
            args.onValueChange?.(value);
            updateArgs({ value });
          }}
        />
      </div>
    );
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the field and type; the focus ring sits on the pill. */
export const Default: Story = {};

/** A search icon leads the text inside the pill. */
export const WithIcons: Story = {
  args: {
    "aria-label": "Search",
    placeholder: "Search songs, artists and albums",
    leading: <Icon name="search" />,
  },
};

/** The first field is disabled. The second is read-only: Tab reaches it and you can select its text, but not change it. */
export const DisabledAndReadOnly: Story = {
  render: (args) => (
    <div className="grid w-80 gap-4">
      <Input {...args} aria-label="Email" value="ada@example.com" disabled />
      <Input {...args} aria-label="Customer number" value="CH-2048-7731" readOnly />
    </div>
  ),
};

export const Usage: Story = {
  render: () => <InputDemo />,
};

export const SlotsUsage: Story = {
  render: () => <InputSlotsDemo />,
};

export const DisabledUsage: Story = {
  render: () => <InputDisabledDemo />,
};

export const ReadOnlyUsage: Story = {
  render: () => <InputReadOnlyDemo />,
};

export const FormUsage: Story = {
  render: () => <InputFormDemo />,
};
