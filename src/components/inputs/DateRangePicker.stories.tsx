import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { DateRangePicker } from "./DateRangePicker";
import { Button } from "../actions/Button";
import { Field } from "./Field";

const meta = {
  title: "Inputs/DateRangePicker",
  id: "components-daterangepicker",
  component: DateRangePicker,
  args: { value: { start: "2026-09-18", end: "2026-09-23" }, onValueChange: fn() },
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-68 max-w-full">
        <DateRangePicker {...args} onValueChange={(value) => { args.onValueChange(value); updateArgs({ value }); }} />
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
