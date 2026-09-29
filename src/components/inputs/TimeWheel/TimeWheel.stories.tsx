import { TimeWheelDemo } from "./demos/TimeWheelDemo";
import { TimeWheelStepsDemo } from "./demos/TimeWheelStepsDemo";
import { TimeWheelDisabledDemo } from "./demos/TimeWheelDisabledDemo";
import { TimeWheelFormDemo } from "./demos/TimeWheelFormDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { TimeWheel, type TimeWheelProps } from "./TimeWheel";
import { Button } from "../../actions/Button/Button";
import { Field } from "../Field/Field";

function StatefulTimeWheel(props: TimeWheelProps) {
  const [value, setValue] = useState(props.value);
  return (
    <TimeWheel
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
  title: "Inputs/TimeWheel",
  id: "components-timewheel",
  component: TimeWheel,
  args: { value: { hours: 7, minutes: 30 }, onValueChange: fn() },
} satisfies Meta<typeof TimeWheel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drag or flick a wheel and it lands on the nearest value; hours and minutes loop, AM/PM stretches past its ends. Tab to a wheel and press the arrow keys. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <StatefulTimeWheel
        {...args}
        onValueChange={(value) => {
          args.onValueChange(value);
          updateArgs({ value });
        }}
      />
    );
  },
};

export const InAFieldInsideAForm: Story = {
  args: { value: { hours: 23, minutes: 55 }, minuteStep: 5 },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    const [disabled, setDisabled] = useState(false);
    const [data, setData] = useState("");
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setData(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))));
        }}
        onReset={() => { setValue(args.value); setData(""); }}
        className="grid w-80 max-w-full gap-4"
      >
        <Field label="Reminder time" description="Choose a time in five-minute steps." disabled={disabled} required>
          <TimeWheel {...args} name="time" value={value} onValueChange={setValue} />
        </Field>
        <div className="flex gap-2">
          <Button type="submit">Save</Button>
          <Button type="reset" variant="secondary">Reset</Button>
          <Button variant="secondary" onClick={() => setDisabled(!disabled)}>{disabled ? "Enable" : "Disable"}</Button>
        </div>
        <output className="text-label text-muted">{data}</output>
      </form>
    );
  },
};

export const Usage: Story = {
  render: () => <TimeWheelDemo />,
};

export const StepsUsage: Story = {
  render: () => <TimeWheelStepsDemo />,
};

export const DisabledUsage: Story = {
  render: () => <TimeWheelDisabledDemo />,
};

export const FormUsage: Story = {
  render: () => <TimeWheelFormDemo />,
};
