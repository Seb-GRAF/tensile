import { SliderDemo } from "./demos/SliderDemo";
import { SliderStepsDemo } from "./demos/SliderStepsDemo";
import { SliderDisabledDemo } from "./demos/SliderDisabledDemo";
import { SliderFormDemo } from "./demos/SliderFormDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Button } from "../../actions/Button/Button";
import { Field } from "../Field/Field";
import { Fieldset } from "../Fieldset/Fieldset";
import { Slider, type SliderProps } from "./Slider";

function StatefulSlider(props: SliderProps) {
  const [value, setValue] = useState(props.value);
  return (
    <Slider
      {...props}
      value={value}
      onValueChange={(value) => {
        setValue(value);
        props.onValueChange(value);
      }}
    />
  );
}

function SliderForm(props: SliderProps) {
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
      <Field label="Temperature" description="Adjust in half-degree steps." error="Review this temperature." required>
        <Slider {...props} name="temperature" value={value} onValueChange={setValue} />
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
  title: "Inputs/Slider",
  id: "components-slider",
  component: Slider,
  args: { value: 40, onValueChange: fn() },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drag the knob or press the track; Tab to it and use the arrow keys, Home and End; past either end it stretches and springs back. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-60 max-w-full">
        <StatefulSlider {...args} onValueChange={(value) => { args.onValueChange(value); updateArgs({ value }); }} />
      </div>
    );
  },
};

export const InAForm: Story = {
  args: { value: 18, min: -20, max: 40, step: 0.5, formatValue: (value) => `${value.toLocaleString("en-US")}°C` },
  render: (args) => <SliderForm {...args} />,
};

export const Disabled: Story = {
  render: (args) => (
    <Fieldset legend="Temperature" disabled className="w-60 max-w-full">
      <Slider {...args} name="temperature" />
    </Fieldset>
  ),
};

export const Usage: Story = {
  render: () => <SliderDemo />,
};

export const StepsUsage: Story = {
  render: () => <SliderStepsDemo />,
};

export const DisabledUsage: Story = {
  render: () => <SliderDisabledDemo />,
};

export const FormUsage: Story = {
  render: () => <SliderFormDemo />,
};
