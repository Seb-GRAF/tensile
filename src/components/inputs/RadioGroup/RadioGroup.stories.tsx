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
      {
        value: "computer",
        label: "This computer",
        icon: <Icon><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" /></Icon>,
      },
      {
        value: "headphones",
        label: "Headphones",
        icon: <Icon><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" /></Icon>,
      },
      {
        value: "speaker",
        label: "Kitchen speaker",
        icon: (
          <Icon>
            <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" />
            <path d="M12 6h.01" />
            <path d="M16 14a4 4 0 1 1-8 0 4 4 0 0 1 8 0" />
            <path d="M12 14h.01" />
          </Icon>
        ),
      },
      {
        value: "tv",
        label: "Living room TV",
        icon: <Icon><path d="M4 7h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" /><path d="m17 2-5 5-5-5" /></Icon>,
      },
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
            args.onValueChange(value);
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
