import { NumberInputDemo } from "./demos/NumberInputDemo";
import { NumberInputBoundsDemo } from "./demos/NumberInputBoundsDemo";
import { NumberInputFormatDemo } from "./demos/NumberInputFormatDemo";
import { NumberInputDisabledDemo } from "./demos/NumberInputDisabledDemo";
import { NumberInputReadOnlyDemo } from "./demos/NumberInputReadOnlyDemo";
import { NumberInputFormDemo } from "./demos/NumberInputFormDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Button } from "../../actions/Button/Button";
import { Field } from "../Field/Field";
import { NumberInput, type NumberInputProps } from "./NumberInput";

function StatefulNumberInput(props: NumberInputProps) {
  const [value, setValue] = useState(props.value);
  return <NumberInput {...props} value={value} onValueChange={(value) => { setValue(value); props.onValueChange?.(value); }} />;
}

const meta = {
  title: "Inputs/NumberInput",
  id: "components-numberinput",
  component: NumberInput,
  args: { value: 1250.5, onValueChange: fn(), "aria-label": "Amount" },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-80 max-w-[calc(100vw-2rem)]">
        <StatefulNumberInput {...args} onValueChange={(value) => { args.onValueChange?.(value); updateArgs({ value }); }} />
      </div>
    );
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Type a number, then Enter or leave the field to commit it; arrow keys step the value. */
export const Default: Story = {};

export const InAForm: Story = {
  render: function Render() {
    const [value, setValue] = useState<number | null>(1250.5);
    const [data, setData] = useState("");
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setData(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))));
        }}
        onReset={() => { setValue(1250.5); setData(""); }}
        className="grid w-80 max-w-[calc(100vw-2rem)] gap-4"
      >
        <Field label="Budget" description="Enter an amount from 0 to 5,000." required>
          <NumberInput name="budget" value={value} onValueChange={setValue} min={0} max={5000} step={0.5} />
        </Field>
        <Field label="Previous budget" disabled>
          <NumberInput name="previous" value={1000} onValueChange={setValue} />
        </Field>
        <Field label="Reference amount">
          <NumberInput name="reference" value={250} onValueChange={setValue} readOnly />
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
  render: () => <NumberInputDemo />,
};

export const BoundsUsage: Story = {
  render: () => <NumberInputBoundsDemo />,
};

export const FormatUsage: Story = {
  render: () => <NumberInputFormatDemo />,
};

export const DisabledUsage: Story = {
  render: () => <NumberInputDisabledDemo />,
};

export const ReadOnlyUsage: Story = {
  render: () => <NumberInputReadOnlyDemo />,
};

export const FormUsage: Story = {
  render: () => <NumberInputFormDemo />,
};
