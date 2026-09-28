import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Button } from "../actions/Button";
import { Field } from "./Field";
import { Fieldset } from "./Fieldset";
import { RangeSlider, type RangeSliderProps } from "./RangeSlider";

function StatefulRangeSlider(props: RangeSliderProps) {
  const [value, setValue] = useState(props.value);
  return (
    <RangeSlider
      {...props}
      value={value}
      onValueChange={(value) => {
        setValue(value);
        props.onValueChange(value);
      }}
    />
  );
}

function RangeForm(props: RangeSliderProps) {
  const [value, setValue] = useState(props.value);
  const [data, setData] = useState("");
  return (
    <form
      className="w-80 max-w-full space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        setData(JSON.stringify(new FormData(event.currentTarget).getAll("budget")));
      }}
      onReset={() => { setValue(props.value); setData(""); }}
    >
      <Field label="Budget" description="Choose a minimum and maximum." error="Review this range." required>
        <RangeSlider {...props} name="budget" value={value} onValueChange={setValue} />
      </Field>
      <div className="flex gap-2">
        <Button type="submit">Submit</Button>
        <Button type="reset" variant="secondary">Reset</Button>
      </div>
      <output className="block text-label text-ink">{data}</output>
    </form>
  );
}

const meta = {
  title: "Inputs/RangeSlider",
  id: "components-rangeslider",
  component: RangeSlider,
  args: { value: [20, 80], onValueChange: fn() },
} satisfies Meta<typeof RangeSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drag either knob or press the track to move the nearer one; Tab to a knob and use the arrow keys, Home and End. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-60 max-w-full">
        <StatefulRangeSlider {...args} onValueChange={(value) => { args.onValueChange(value); updateArgs({ value }); }} />
      </div>
    );
  },
};

export const InAForm: Story = {
  args: { min: 10, step: 5, formatValue: (value) => `$${value.toLocaleString("en-US")}` },
  render: (args) => <RangeForm {...args} />,
};

export const Disabled: Story = {
  render: (args) => (
    <Fieldset legend="Budget" disabled className="w-60 max-w-full">
      <RangeSlider {...args} name="budget" />
    </Fieldset>
  ),
};
