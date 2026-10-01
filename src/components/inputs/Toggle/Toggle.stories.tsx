import { ToggleDemo } from "./demos/ToggleDemo";
import { ToggleDisabledDemo } from "./demos/ToggleDisabledDemo";
import { ToggleFormDemo } from "./demos/ToggleFormDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Toggle } from "./Toggle";
import { Button } from "../../actions/Button/Button";
import { Field } from "../Field/Field";

const meta = {
  title: "Inputs/Toggle",
  id: "components-toggle",
  component: Toggle,
  args: { checked: false, onCheckedChange: fn() },
  argTypes: { disabled: { control: "boolean" } },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the switch or press Space to move its liquid knob. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Toggle
        {...args}
        onCheckedChange={(checked) => {
          args.onCheckedChange?.(checked);
          updateArgs({ checked });
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
        <Field label="Send product updates" description="A monthly email about new features.">
          <Toggle name="updates" value="yes" checked={checked} onCheckedChange={setChecked} />
        </Field>
        <div className="flex gap-2">
          <Button type="submit">Save</Button>
          <Button type="reset" variant="secondary">Reset</Button>
        </div>
        <output className="text-label text-muted">{data}</output>
      </form>
    );
  },
};

export const Usage: Story = {
  render: () => <ToggleDemo />,
};

export const DisabledUsage: Story = {
  render: () => <ToggleDisabledDemo />,
};

export const FormUsage: Story = {
  render: () => <ToggleFormDemo />,
};
