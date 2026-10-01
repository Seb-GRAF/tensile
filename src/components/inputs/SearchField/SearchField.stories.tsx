import { SearchFieldDemo } from "./demos/SearchFieldDemo";
import { SearchFieldFormDemo } from "./demos/SearchFieldFormDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { SearchField, type SearchFieldProps } from "./SearchField";
import { Button } from "../../actions/Button/Button";

function StatefulSearchField(props: SearchFieldProps) {
  const [value, setValue] = useState(props.value);
  return (
    <SearchField
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
  title: "Inputs/SearchField",
  id: "components-searchfield",
  component: SearchField,
  args: { value: "", onValueChange: fn() },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the button (or press Enter or Space) and type; Escape clears the text, and Escape on an empty field or leaving it folds it back. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-70 max-w-full">
        <StatefulSearchField
          {...args}
          className="flex justify-center"
          onValueChange={(value) => {
            args.onValueChange?.(value);
            updateArgs({ value });
          }}
        />
      </div>
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
        className="grid w-80 max-w-full gap-4"
      >
        <SearchField {...args} value={value} onValueChange={setValue} name="query" />
        <div className="flex gap-2">
          <Button type="submit">Search</Button>
          <Button type="reset" variant="secondary">Reset</Button>
        </div>
        <output className="text-label text-muted">{data}</output>
      </form>
    );
  },
};

export const Usage: Story = {
  render: () => <SearchFieldDemo />,
};

export const FormUsage: Story = {
  render: () => <SearchFieldFormDemo />,
};
