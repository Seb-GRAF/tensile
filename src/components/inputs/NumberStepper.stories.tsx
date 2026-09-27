import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { NumberStepper } from "./NumberStepper";
import { Button } from "../actions/Button";
import { Field } from "./Field";

const meta = {
  title: "Inputs/NumberStepper",
  id: "components-numberstepper",
  component: NumberStepper,
  args: { value: 9, onValueChange: fn() },
} satisfies Meta<typeof NumberStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click − and +, or Tab in and press the arrow keys, Home and End: the digits roll, and a press past either end stretches the stepper, which springs back. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <NumberStepper
        {...args}
        onValueChange={(value) => {
          args.onValueChange(value);
          updateArgs({ value });
        }}
      />
    );
  },
};

export const InAForm: Story = {
  render: function Render() {
    const [value, setValue] = useState(2);
    const [data, setData] = useState("");
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setData(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))));
        }}
        onReset={() => { setValue(2); setData(""); }}
        className="grid w-80 max-w-[calc(100vw-2rem)] gap-4"
      >
        <Field label="Guests" description="Choose up to ten guests." required>
          <NumberStepper name="guests" value={value} onValueChange={setValue} />
        </Field>
        <Field label="Reserved seats" disabled>
          <NumberStepper name="reserved" value={4} onValueChange={setValue} />
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
