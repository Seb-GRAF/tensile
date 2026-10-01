import { ToggleGroupDemo } from "./demos/ToggleGroupDemo";
import { ToggleGroupIconsDemo } from "./demos/ToggleGroupIconsDemo";
import { ToggleGroupDisabledDemo } from "./demos/ToggleGroupDisabledDemo";
import { ToggleGroupFormDemo } from "./demos/ToggleGroupFormDemo";
import { ToggleGroupSingleDemo } from "./demos/ToggleGroupSingleDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { ToggleGroup } from "./ToggleGroup";
import { Field } from "../Field/Field";
import { Button } from "../../actions/Button/Button";
import { Icon } from "../../data-display/Icon/Icon";

const meta = {
  title: "Inputs/ToggleGroup",
  id: "components-togglegroup",
  component: ToggleGroup,
  args: {
    options: [{ value: "photos", label: "Photos" }, { value: "video", label: "Video" }, { value: "audio", label: "Audio" }],
    value: ["photos"],
    onValueChange: fn(),
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click a chip, or Tab in, move with the arrow keys, Home and End, and press Space or Enter to toggle it. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <ToggleGroup {...args} onValueChange={(value: string | string[]) => { args.onValueChange?.(value as never); updateArgs({ value }); }} />;
  },
};

/** Click a choice, or Tab in and move with the arrow keys, Home and End: each move picks that choice, and the ink pill slides to it. */
export const Single: Story = {
  ...Default,
  args: {
    type: "single",
    value: "week",
    label: "Calendar view",
    options: [{ value: "day", label: "Day" }, { value: "week", label: "Week" }, { value: "month", label: "Month" }, { value: "quarter", label: "Fiscal quarter" }],
  },
};

export const Formatting: Story = {
  ...Default,
  args: {
    label: "Text formatting",
    value: [],
    options: [
      { value: "bold", label: "Bold", icon: <Icon name="bold" /> },
      { value: "italic", label: "Italic", icon: <Icon name="italic" /> },
      { value: "underline", label: "Underline", icon: <Icon name="underline" /> },
    ],
  },
};

export const InAFieldInsideAForm: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    const [disabled, setDisabled] = useState(false);
    const [data, setData] = useState("");
    return (
      <form className="grid w-80 max-w-full gap-4" onSubmit={(event) => {
        event.preventDefault();
        setData(JSON.stringify(new FormData(event.currentTarget).getAll("media")));
      }} onReset={() => { setValue(args.value); setData(""); }}>
        <Field label="Media types" description="Show any combination of media." disabled={disabled}>
          <ToggleGroup {...args} name="media" value={value as never} onValueChange={setValue as never} />
        </Field>
        <div className="flex gap-2"><Button type="submit">Save</Button><Button type="reset" variant="secondary">Reset</Button><Button variant="secondary" onClick={() => setDisabled(!disabled)}>{disabled ? "Enable" : "Disable"}</Button></div>
        <output className="text-label">{data}</output>
      </form>
    );
  },
};

export const Usage: Story = {
  render: () => <ToggleGroupDemo />,
};

export const IconsUsage: Story = {
  render: () => <ToggleGroupIconsDemo />,
};

export const DisabledUsage: Story = {
  render: () => <ToggleGroupDisabledDemo />,
};

export const FormUsage: Story = {
  render: () => <ToggleGroupFormDemo />,
};

export const SingleUsage: Story = {
  render: () => <ToggleGroupSingleDemo />,
};
