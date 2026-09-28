import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { MultiSelect } from "./MultiSelect";
import { Field } from "./Field";
import { Button } from "../actions/Button";
import { Card } from "../layout/Card";

const meta = {
  title: "Inputs/MultiSelect",
  id: "components-multiselect",
  component: MultiSelect,
  args: {
    options: [
      { value: "design", label: "Design" },
      { value: "engineering", label: "Engineering" },
      { value: "research", label: "Research" },
      { value: "writing", label: "Writing and content strategy" },
      { value: "support", label: "Customer support" },
    ],
    value: [],
    onValueChange: fn(),
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the pill, or focus it and press Enter, Space or an arrow key; toggle options with a click, Enter or Space while the menu stays open; Escape, Tab or a click outside closes. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <div className="w-80 max-w-full"><MultiSelect {...args} onValueChange={(value) => { args.onValueChange(value); updateArgs({ value }); }} /></div>;
  },
};

/** No options: the open menu shows the empty text. */
export const Empty: Story = { ...Default, args: { options: [] } };

export const InAFieldInsideAForm: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string[]>([]);
    const [disabled, setDisabled] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [data, setData] = useState("");
    return (
      <form noValidate className="grid w-80 max-w-full gap-4" onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
        setData(JSON.stringify(new FormData(event.currentTarget).getAll("teams")));
      }} onReset={() => { setValue([]); setSubmitted(false); setData(""); }}>
        <Field label="Teams" description="Choose all teams that should receive the update." required disabled={disabled} error={submitted && value.length === 0 ? "Choose a team" : undefined}>
          <MultiSelect {...args} name="teams" value={value} onValueChange={setValue} />
        </Field>
        <div className="flex gap-2"><Button type="submit">Save</Button><Button type="reset" variant="secondary">Reset</Button><Button variant="secondary" onClick={() => setDisabled(!disabled)}>{disabled ? "Enable" : "Disable"}</Button></div>
        <output className="text-label">{data}</output>
      </form>
    );
  },
};

export const LongListNearTheBottom: Story = {
  ...Default,
  args: { options: Array.from({ length: 30 }, (_, i) => ({ value: String(i + 1), label: `Collection ${String(i + 1).padStart(2, "0")} — recordings and interviews` })) },
  decorators: [(Story) => <div className="flex h-[calc(100vh-4rem)] items-end"><Story /></div>],
};

/** Near the bottom the menu opens upward and the pill stays in place; press Save first to see the list take the error row's place. */
export const InAFieldNearTheBottom: Story = { ...InAFieldInsideAForm, decorators: LongListNearTheBottom.decorators };

export const InsideAClippingCard: Story = {
  ...Default,
  decorators: [(Story) => <Card className="overflow-hidden p-4"><Story /></Card>],
};
