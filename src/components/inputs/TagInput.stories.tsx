import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { TagInput, type TagInputProps } from "./TagInput";
import { Button } from "../actions/Button";
import { Field } from "./Field";

function StatefulTagInput(props: TagInputProps) {
  const [value, setValue] = useState(props.value);
  return (
    <TagInput
      {...props}
      value={value}
      onValueChange={(value) => {
        setValue(value);
        props.onValueChange(value);
      }}
    />
  );
}

const meta = {
  title: "Inputs/TagInput",
  id: "components-taginput",
  component: TagInput,
  args: { value: ["jazz", "soul", "funk"], onValueChange: fn() },
} satisfies Meta<typeof TagInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Type a tag and press Enter or a comma; Backspace in the empty field removes the last chip, × removes its chip. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-90 max-w-[calc(100vw-2rem)]">
        <StatefulTagInput
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
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    const [disabled, setDisabled] = useState(false);
    const [data, setData] = useState("");
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setData(JSON.stringify(new FormData(event.currentTarget).getAll("genres")));
        }}
        onReset={() => { setValue(args.value); setData(""); }}
        className="grid w-90 max-w-[calc(100vw-2rem)] gap-4"
      >
        <Field label="Genres" description="Press Enter to add a genre." error={value.length === 0 ? "Add at least one genre" : undefined} required disabled={disabled}>
          <TagInput {...args} value={value} onValueChange={setValue} name="genres" />
        </Field>
        <div className="flex flex-wrap gap-2">
          <Button type="submit">Save</Button>
          <Button type="reset" variant="secondary">Reset</Button>
          <Button variant="secondary" onClick={() => setDisabled(!disabled)}>{disabled ? "Enable" : "Disable"}</Button>
        </div>
        <output className="text-label text-muted">{data}</output>
      </form>
    );
  },
};
