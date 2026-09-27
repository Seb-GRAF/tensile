import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { ColorSwatches } from "./ColorSwatches";
import { Button } from "../actions/Button";
import { Field } from "./Field";

const meta = {
  title: "Inputs/ColorSwatches",
  id: "components-colorswatches",
  component: ColorSwatches,
  args: {
    options: [
      { value: "black", label: "Black", color: "#161615" },
      { value: "sand", label: "Sand", color: "#d8ccb6" },
      { value: "sage", label: "Sage", color: "#95a98c" },
      { value: "ocean", label: "Ocean", color: "#2e5e8c" },
      { value: "coral", label: "Coral", color: "#e8715f" },
    ],
    value: "sand",
    onValueChange: fn(),
  },
} satisfies Meta<typeof ColorSwatches>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click a swatch or Tab in and use the arrow keys: the ring stretches toward the new swatch, then catches up. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <ColorSwatches
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
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    const [data, setData] = useState("");
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setData(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))));
        }}
        onReset={() => { setValue(args.value); setData(""); }}
        className="grid w-80 gap-4"
      >
        <Field label="Case color" description="Choose the finish for your headphones." required>
          <ColorSwatches {...args} name="color" value={value} onValueChange={setValue} />
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
