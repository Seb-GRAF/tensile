import { DateFieldDemo } from "./demos/DateFieldDemo";
import { DateFieldBoundsDemo } from "./demos/DateFieldBoundsDemo";
import { DateFieldFormDemo } from "./demos/DateFieldFormDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Button } from "../../actions/Button/Button";
import { Field } from "../Field/Field";
import { DateField, type DateFieldProps } from "./DateField";

function StatefulDateField(props: DateFieldProps) {
  const [value, setValue] = useState(props.value);
  return <DateField {...props} value={value} onValueChange={(value) => { setValue(value); props.onValueChange?.(value); }} />;
}

const meta = {
  title: "Inputs/DateField",
  id: "components-datefield",
  component: DateField,
  args: { value: "2026-10-14", onValueChange: fn(), "aria-label": "Due date" },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-80 max-w-[calc(100vw-2rem)]">
        <StatefulDateField {...args} onValueChange={(value) => { args.onValueChange?.(value); updateArgs({ value }); }} />
      </div>
    );
  },
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Type a date, then Enter or leave the field to commit it; the calendar button or Alt+ArrowDown opens a calendar. */
export const Default: Story = {};

export const InAForm: Story = {
  render: function Render() {
    const [value, setValue] = useState<string | null>("2026-10-14");
    const [data, setData] = useState("");
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setData(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))));
        }}
        onReset={() => { setValue("2026-10-14"); setData(""); }}
        className="grid w-80 max-w-[calc(100vw-2rem)] gap-4"
      >
        <Field label="Due date" description="Type a date as MM/DD/YYYY or pick one." required>
          <DateField name="due" value={value} onValueChange={setValue} />
        </Field>
        <Field label="Created" disabled>
          <DateField name="created" value="2026-09-28" onValueChange={setValue} />
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

/** Days outside October 5–30, 2026 are disabled in the calendar, and typing one reverts to the previous date. */
export const Bounds: Story = {
  args: { min: "2026-10-05", max: "2026-10-30" },
};

export const Usage: Story = {
  render: () => <DateFieldDemo />,
};

export const BoundsUsage: Story = {
  render: () => <DateFieldBoundsDemo />,
};

export const FormUsage: Story = {
  render: () => <DateFieldFormDemo />,
};
