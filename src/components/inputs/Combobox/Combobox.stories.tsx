import { ComboboxDemo } from "./demos/ComboboxDemo";
import { ComboboxEmptyDemo } from "./demos/ComboboxEmptyDemo";
import { ComboboxDisabledDemo } from "./demos/ComboboxDisabledDemo";
import { ComboboxFormDemo } from "./demos/ComboboxFormDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../../actions/Button/Button";
import { Field } from "../Field/Field";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Combobox } from "./Combobox";
import { Icon } from "../../data-display/Icon/Icon";

const meta = {
  title: "Inputs/Combobox",
  id: "components-combobox",
  component: Combobox,
  args: {
    options: [
      {
        value: "added",
        label: "Date added",
        icon: <Icon><path d="M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /></Icon>,
      },
      { value: "title", label: "Title", icon: <Icon><path d="M4 7V4h16v3" /><path d="M9 20h6" /><path d="M12 4v16" /></Icon> },
      { value: "artist", label: "Artist", icon: <Icon><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0" /></Icon> },
      { value: "album", label: "Album", icon: <Icon><path d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0" /><path d="M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0" /></Icon> },
      { value: "duration", label: "Duration", icon: <Icon><path d="M10 2h4" /><path d="m12 14 3-3" /><path d="M20 14a8 8 0 1 1-16 0 8 8 0 0 1 16 0" /></Icon> },
    ],
    value: null,
    onValueChange: fn(),
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the field or press ArrowDown to open, or type to filter ("a", then "al"); the arrows move, Enter or a click picks, Escape closes. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-60">
        <Combobox
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

/** Press Save without a sort order: the error shows inside the field until you pick one. Reset clears it. */
export const InAForm: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [data, setData] = useState("");
    return (
      <form className="grid w-80 gap-4" noValidate onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
        setData(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))));
      }} onReset={() => { setValue(null); setSubmitted(false); setData(""); }}>
        <Field label="Sort order" description="Search the available library orders." required error={submitted && value === null ? "Choose a sort order" : undefined}>
          <Combobox {...args} name="sort" value={value} onValueChange={setValue} />
        </Field>
        <div className="flex gap-2"><Button type="submit">Save</Button><Button type="reset" variant="secondary">Reset</Button></div>
        <output className="text-label text-ink">{data}</output>
      </form>
    );
  },
};

/** Near the bottom the menu opens upward and the pill stays in place; press Save first to see the list take the error row's place. */
export const InAFieldNearTheBottom: Story = {
  ...InAForm,
  decorators: [(Story) => <div className="flex h-[calc(100vh-4rem)] items-end"><Story /></div>],
};

export const Usage: Story = {
  render: () => <ComboboxDemo />,
};

export const EmptyUsage: Story = {
  render: () => <ComboboxEmptyDemo />,
};

export const DisabledUsage: Story = {
  render: () => <ComboboxDisabledDemo />,
};

export const FormUsage: Story = {
  render: () => <ComboboxFormDemo />,
};
