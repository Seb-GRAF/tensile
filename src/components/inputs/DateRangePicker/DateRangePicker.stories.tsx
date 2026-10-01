import { DateRangePickerDemo } from "./demos/DateRangePickerDemo";
import { DateRangePickerBoundsDemo } from "./demos/DateRangePickerBoundsDemo";
import { DateRangePickerDisabledDemo } from "./demos/DateRangePickerDisabledDemo";
import { DateRangePickerFormDemo } from "./demos/DateRangePickerFormDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { DateRangePicker, type DateRangePickerProps } from "./DateRangePicker";
import { Button } from "../../actions/Button/Button";
import { Field } from "../Field/Field";

function StatefulDateRangePicker(props: DateRangePickerProps) {
  const [value, setValue] = useState(props.value);
  return (
    <DateRangePicker
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
  title: "Inputs/DateRangePicker",
  id: "components-daterangepicker",
  component: DateRangePicker,
  args: { value: { start: "2026-09-18", end: "2026-09-23" }, onValueChange: fn() },
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Pick a start and an end day by click, or with the arrow keys and Enter; the band grows from the first pick toward the day you hover or focus, and the end pills move to the picked days; PageUp and PageDown change the month. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-72 max-w-full">
        <StatefulDateRangePicker {...args} onValueChange={(value) => { args.onValueChange?.(value); updateArgs({ value }); }} />
      </div>
    );
  },
};

export const InAFieldInsideAForm: Story = {
  args: { value: null, firstDayOfWeek: 1, min: "2026-09-10", max: "2026-10-05" },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    const [disabled, setDisabled] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [data, setData] = useState("");
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
          setData(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))));
        }}
        onReset={() => { setValue(args.value); setSubmitted(false); setData(""); }}
        className="grid w-80 max-w-full gap-4"
      >
        <Field label="Travel dates" description="Choose a start and end date." required disabled={disabled} error={submitted && value === null ? "Choose both dates" : undefined}>
          <DateRangePicker {...args} startName="start" endName="end" value={value} onValueChange={setValue} />
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
  render: () => <DateRangePickerDemo />,
};

export const BoundsUsage: Story = {
  render: () => <DateRangePickerBoundsDemo />,
};

export const DisabledUsage: Story = {
  render: () => <DateRangePickerDisabledDemo />,
};

export const FormUsage: Story = {
  render: () => <DateRangePickerFormDemo />,
};
