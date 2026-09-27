import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { DatePicker } from "./DatePicker";
import { Button } from "../actions/Button";
import { Field } from "./Field";

const meta = {
  title: "Inputs/DatePicker",
  id: "components-datepicker",
  component: DatePicker,
  args: { value: "2026-09-18", onValueChange: fn() },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click a day, or Tab in, move with the arrow keys, Page Up/Down and Home/End, and press Enter or Space: the pill slides to the picked day, and months blur-swap in the direction you move. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-68 max-w-full">
        <DatePicker
          {...args}
          onValueChange={(value) => {
            args.onValueChange(value);
            updateArgs({ value });
          }}
        />
      </div>
    );
  },
};

export const InAFieldInsideAForm: Story = {
  args: { value: null, min: "2026-09-10", max: "2026-10-05", firstDayOfWeek: 1 },
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
        <Field label="Appointment date" description="Choose a date between September 10 and October 5." required disabled={disabled} error={submitted && value === null ? "Choose a date" : undefined}>
          <DatePicker {...args} name="date" value={value} onValueChange={setValue} />
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
