import { RadioGroupDemo } from "./demos/RadioGroupDemo";
import { RadioGroupDisabledDemo } from "./demos/RadioGroupDisabledDemo";
import { RadioGroupFormDemo } from "./demos/RadioGroupFormDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { RadioGroup } from "./RadioGroup";
import { Button } from "../../actions/Button/Button";
import { Card } from "../../layout/Card/Card";
import { Icon } from "../../data-display/Icon/Icon";
import { Field } from "../Field/Field";

const meta = {
  title: "Inputs/RadioGroup",
  id: "components-radiogroup",
  component: RadioGroup,
  args: {
    options: [
      { value: "computer", label: "This computer", icon: <Icon name="laptop" /> },
      { value: "headphones", label: "Headphones", icon: <Icon name="headphones" /> },
      { value: "speaker", label: "Kitchen speaker", icon: <Icon name="speaker" /> },
      { value: "tv", label: "Living room TV", icon: <Icon name="tv" /> },
    ],
    value: null,
    label: "Audio output",
    onValueChange: fn(),
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click an option or Tab in and use the arrow keys: the dot grows out of the first choice, then stretches as it slides. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Card className="w-56 p-4">
        <RadioGroup
          {...args}
          onValueChange={(value) => {
            args.onValueChange?.(value);
            updateArgs({ value });
          }}
        />
      </Card>
    );
  },
};

export const Disabled: Story = {
  ...Default,
  args: { value: "headphones", disabled: true },
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
        <Field label="Audio output" description="The kitchen speaker is offline." required>
          <RadioGroup
            {...args}
            options={args.options.map((option) => ({ ...option, disabled: option.value === "speaker" }))}
            name="output"
            value={value}
            onValueChange={setValue}
          />
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
  render: () => <RadioGroupDemo />,
};

export const DisabledUsage: Story = {
  render: () => <RadioGroupDisabledDemo />,
};

export const FormUsage: Story = {
  render: () => <RadioGroupFormDemo />,
};
