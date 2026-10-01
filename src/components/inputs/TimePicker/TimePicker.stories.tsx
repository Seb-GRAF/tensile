import { TimePickerDemo } from "./demos/TimePickerDemo";
import { TimePickerStepsDemo } from "./demos/TimePickerStepsDemo";
import { TimePickerDisabledDemo } from "./demos/TimePickerDisabledDemo";
import { TimePickerFormDemo } from "./demos/TimePickerFormDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Button } from "../../actions/Button/Button";
import { Field } from "../Field/Field";
import { TimePicker, type TimePickerProps } from "./TimePicker";

function StatefulTimePicker(props: TimePickerProps) {
  const [value, setValue] = useState(props.value);
  return (
    <TimePicker
      {...props}
      value={value}
      onValueChange={(value) => {
        setValue(value);
        props.onValueChange?.(value);
      }}
    />
  );
}

function TimePickerForm(props: TimePickerProps) {
  const [value, setValue] = useState(props.value);
  const [error, setError] = useState<string>();
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState("");
  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (!value) {
          setError("Choose a time for the reminder.");
          return;
        }
        setData(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))));
      }}
      onReset={() => { setValue(null); setError(undefined); setData(""); }}
      className="grid w-80 max-w-full gap-4"
    >
      <Field label="Reminder time" description="We send the reminder at this time on the morning of each event." error={error} disabled={disabled} required>
        <TimePicker {...props} name="time" value={value} onValueChange={(value) => { setValue(value); setError(undefined); }} />
      </Field>
      <div className="flex gap-2">
        <Button type="submit">Save</Button>
        <Button type="reset" variant="secondary">Reset</Button>
        <Button variant="secondary" onClick={() => setDisabled(!disabled)}>{disabled ? "Enable" : "Disable"}</Button>
      </div>
      <output className="text-label text-muted">{data}</output>
    </form>
  );
}

const meta = {
  title: "Inputs/TimePicker",
  id: "components-timepicker",
  component: TimePicker,
  args: { value: null, onValueChange: fn() },
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the field or press Enter or Space to open it, then drag, flick or arrow a wheel; Enter, Escape or a click outside closes it. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-80 max-w-full">
        <StatefulTimePicker
          {...args}
          onValueChange={(value) => {
            args.onValueChange?.(value);
            updateArgs({ value });
          }}
        />
      </div>
    );
  },
};

export const InAFieldInsideAForm: Story = {
  args: { minuteStep: 5 },
  render: (args) => <TimePickerForm {...args} />,
};

export const Usage: Story = {
  render: () => <TimePickerDemo />,
};

export const StepsUsage: Story = {
  render: () => <TimePickerStepsDemo />,
};

export const DisabledUsage: Story = {
  render: () => <TimePickerDisabledDemo />,
};

export const FormUsage: Story = {
  render: () => <TimePickerFormDemo />,
};
