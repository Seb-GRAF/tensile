import { RatingDemo } from "./demos/RatingDemo";
import { RatingReadOnlyDemo } from "./demos/RatingReadOnlyDemo";
import { RatingCountDemo } from "./demos/RatingCountDemo";
import { RatingDisabledDemo } from "./demos/RatingDisabledDemo";
import { RatingFormDemo } from "./demos/RatingFormDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Rating } from "./Rating";
import { Button } from "../../actions/Button/Button";
import { Field } from "../Field/Field";

const meta = {
  title: "Inputs/Rating",
  id: "components-rating",
  component: Rating,
  args: { value: 3, onValueChange: fn() },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Hover the stars to preview and click one to rate, or Tab in and press the arrow keys, Home and End: the lime fill slides under the outlines. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Rating
        {...args}
        onValueChange={(value) => {
          args.onValueChange(value);
          updateArgs({ value });
        }}
      />
    );
  },
};

export const ReadOnly: Story = {
  args: { readOnly: true },
};

export const InAForm: Story = {
  render: function Render() {
    const [value, setValue] = useState(3);
    const [data, setData] = useState("");
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setData(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))));
        }}
        onReset={() => { setValue(3); setData(""); }}
        className="grid w-80 max-w-[calc(100vw-2rem)] gap-4"
      >
        <Field label="Your rating" description="Choose from zero to five stars." required>
          <Rating name="rating" value={value} onValueChange={setValue} />
        </Field>
        <Field label="Previous rating" disabled>
          <Rating name="previous" value={2} onValueChange={setValue} />
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

export const Usage: Story = {
  render: () => <RatingDemo />,
};

export const ReadOnlyUsage: Story = {
  render: () => <RatingReadOnlyDemo />,
};

export const CountUsage: Story = {
  render: () => <RatingCountDemo />,
};

export const DisabledUsage: Story = {
  render: () => <RatingDisabledDemo />,
};

export const FormUsage: Story = {
  render: () => <RatingFormDemo />,
};
