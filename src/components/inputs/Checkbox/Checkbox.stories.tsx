import { CheckboxDemo } from "./demos/CheckboxDemo";
import { CheckboxDisabledDemo } from "./demos/CheckboxDisabledDemo";
import { CheckboxIndeterminateDemo } from "./demos/CheckboxIndeterminateDemo";
import { CheckboxFormDemo } from "./demos/CheckboxFormDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Checkbox } from "./Checkbox";
import { Button } from "../../actions/Button/Button";

const meta = {
  title: "Inputs/Checkbox",
  id: "components-checkbox",
  component: Checkbox,
  args: { checked: false, onCheckedChange: fn() },
  argTypes: { disabled: { control: "boolean" } },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the box or its label, or focus the box and press Space, to check and uncheck it. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Checkbox
        {...args}
        onCheckedChange={(checked) => {
          args.onCheckedChange?.(checked);
          updateArgs({ checked });
        }}
      />
    );
  },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: "Select all messages" },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Checkbox
        {...args}
        onCheckedChange={(checked) => {
          args.onCheckedChange?.(checked);
          updateArgs({ checked, indeterminate: false });
        }}
      />
    );
  },
};

export const InAForm: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(false);
    const [data, setData] = useState("");
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setData(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))));
        }}
        onReset={() => { setChecked(false); setData(""); }}
        className="grid w-80 gap-4"
      >
        <Checkbox name="terms" value="accepted" label="I agree to the terms of service" required checked={checked} onCheckedChange={setChecked} />
        <div className="flex gap-2">
          <Button type="submit">Continue</Button>
          <Button type="reset" variant="secondary">Reset</Button>
        </div>
        <output className="text-label text-muted">{data}</output>
      </form>
    );
  },
};

export const Usage: Story = {
  render: () => <CheckboxDemo />,
};

export const DisabledUsage: Story = {
  render: () => <CheckboxDisabledDemo />,
};

export const IndeterminateUsage: Story = {
  render: () => <CheckboxIndeterminateDemo />,
};

export const FormUsage: Story = {
  render: () => <CheckboxFormDemo />,
};
