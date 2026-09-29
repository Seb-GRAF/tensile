import { ColorPickerDemo } from "./demos/ColorPickerDemo";
import { ColorPickerDisabledDemo } from "./demos/ColorPickerDisabledDemo";
import { ColorPickerFormDemo } from "./demos/ColorPickerFormDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Button } from "../../actions/Button/Button";
import { ColorPicker, type ColorPickerProps } from "./ColorPicker";
import { Field } from "../Field/Field";

function StatefulColorPicker(props: ColorPickerProps) {
  const [value, setValue] = useState(props.value);
  return (
    <ColorPicker
      {...props}
      value={value}
      onValueChange={(value) => {
        setValue(value);
        props.onValueChange(value);
      }}
    />
  );
}

function ColorPickerForm(props: ColorPickerProps) {
  const [value, setValue] = useState(props.value);
  const [data, setData] = useState("");
  return (
    <form
      className="w-80 max-w-full space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        setData(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))));
      }}
      onReset={() => { setValue(props.value); setData(""); }}
    >
      <Field label="Brand color" description="Used for primary buttons, links and focus highlights across the workspace.">
        <ColorPicker {...props} name="brand" value={value} onValueChange={setValue} />
      </Field>
      <div className="flex gap-2">
        <Button type="submit">Save</Button>
        <Button type="reset" variant="secondary">Reset</Button>
      </div>
      <output className="block text-label text-ink">{data}</output>
    </form>
  );
}

const meta = {
  title: "Inputs/ColorPicker",
  id: "components-colorpicker",
  component: ColorPicker,
  args: { value: "#3a7bd5", onValueChange: fn() },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drag in the area or move its knob with the arrow keys, slide the hue, or type a hex and press Enter. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-80 max-w-full">
        <StatefulColorPicker {...args} onValueChange={(value) => { args.onValueChange(value); updateArgs({ value }); }} />
      </div>
    );
  },
};

export const InAForm: Story = {
  render: (args) => <ColorPickerForm {...args} />,
};

export const Usage: Story = {
  render: () => <ColorPickerDemo />,
};

export const DisabledUsage: Story = {
  render: () => <ColorPickerDisabledDemo />,
};

export const FormUsage: Story = {
  render: () => <ColorPickerFormDemo />,
};
