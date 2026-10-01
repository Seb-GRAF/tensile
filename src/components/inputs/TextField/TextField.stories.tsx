import { TextFieldDemo } from "./demos/TextFieldDemo";
import { TextFieldErrorDemo } from "./demos/TextFieldErrorDemo";
import { TextFieldDisabledDemo } from "./demos/TextFieldDisabledDemo";
import { TextFieldFormDemo } from "./demos/TextFieldFormDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { TextField, type TextFieldProps } from "./TextField";
import { Button } from "../../actions/Button/Button";

function StatefulTextField(props: TextFieldProps) {
  const [value, setValue] = useState(props.value);
  return (
    <TextField
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
  title: "Inputs/TextField",
  id: "components-textfield",
  component: TextField,
  argTypes: { disabled: { control: "boolean" } },
  args: { value: "", onValueChange: fn() },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the field and type an email; a space shows an error until you delete it. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-90 max-w-[calc(100vw-2rem)]">
        <StatefulTextField
          {...args}
          onValueChange={(value) => {
            args.onValueChange?.(value);
            updateArgs({ value, error: value.includes(" ") ? "Email addresses can't contain spaces" : undefined });
          }}
        />
      </div>
    );
  },
};

export const InAForm: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    const [data, setData] = useState("");
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setData(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))));
        }}
        onReset={() => { setValue(args.value); setData(""); }}
        className="grid w-90 max-w-[calc(100vw-2rem)] gap-4"
      >
        <TextField {...args} value={value} onValueChange={setValue} type="email" name="email" autoComplete="email" required />
        <div className="flex gap-2">
          <Button type="submit">Save</Button>
          <Button type="reset" variant="secondary">Reset</Button>
        </div>
        <output className="text-label text-muted">{data}</output>
      </form>
    );
  },
};

export const Disabled: Story = { ...Default, args: { disabled: true } };

export const Usage: Story = {
  render: () => <TextFieldDemo />,
};

export const ErrorUsage: Story = {
  render: () => <TextFieldErrorDemo />,
};

export const DisabledUsage: Story = {
  render: () => <TextFieldDisabledDemo />,
};

export const FormUsage: Story = {
  render: () => <TextFieldFormDemo />,
};
