import { ToggleGroupDemo } from "./demos/ToggleGroupDemo";
import { ToggleGroupIconsDemo } from "./demos/ToggleGroupIconsDemo";
import { ToggleGroupDisabledDemo } from "./demos/ToggleGroupDisabledDemo";
import { ToggleGroupFormDemo } from "./demos/ToggleGroupFormDemo";
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
    return <ToggleGroup {...args} onValueChange={(value) => { args.onValueChange(value); updateArgs({ value }); }} />;
  },
};

export const Formatting: Story = {
  ...Default,
  args: {
    label: "Text formatting",
    value: [],
    options: [
      { value: "bold", label: "Bold", icon: <Icon><path d="M6 4h7a4 4 0 0 1 0 8H6zm0 8h8a4 4 0 0 1 0 8H6z" /></Icon> },
      { value: "italic", label: "Italic", icon: <Icon><path d="M10 4h10M4 20h10M15 4 9 20" /></Icon> },
      { value: "underline", label: "Underline", icon: <Icon><path d="M6 3v7a6 6 0 0 0 12 0V3M4 21h16" /></Icon> },
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
          <ToggleGroup {...args} name="media" value={value} onValueChange={setValue} />
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
