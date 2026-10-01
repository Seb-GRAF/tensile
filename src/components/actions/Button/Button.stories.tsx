import { ButtonDemo } from "./demos/ButtonDemo";
import { ButtonSecondaryDemo } from "./demos/ButtonSecondaryDemo";
import { ButtonGhostDemo } from "./demos/ButtonGhostDemo";
import { ButtonSizesDemo } from "./demos/ButtonSizesDemo";
import { ButtonDisabledDemo } from "./demos/ButtonDisabledDemo";
import { ButtonIconDemo } from "./demos/ButtonIconDemo";
import { ButtonFormDemo } from "./demos/ButtonFormDemo";
import { ButtonLinkDemo } from "./demos/ButtonLinkDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import { Field } from "../../inputs/Field/Field";
import { Input } from "../../inputs/Input/Input";
import { Button } from "./Button";

const meta = {
  title: "Actions/Button",
  id: "components-button",
  component: Button,
  args: { children: "Save changes", onClick: fn() },
  argTypes: { children: { control: "text" } },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click it, or Tab to it and press Enter or Space: each calls onClick. Change the variant, size and label in Controls. */
export const Default: Story = {};

/** Faded to 40 %: no hover, no press, a click doesn't call onClick, and Tab skips it. */
export const Disabled: Story = { args: { disabled: true } };

/** Type a name and press Enter, or click Save: the output shows the submitted data, with the Save button's name and value. Reset empties the field. */
export const InAForm: Story = {
  name: "In a form",
  render: function Render() {
    const [name, setName] = useState("");
    const [data, setData] = useState("");
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setData(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget, event.submitter))));
        }}
        onReset={() => {
          setName("");
          setData("");
        }}
        className="grid w-80 gap-3"
      >
        <Field label="Display name">
          <Input name="name" value={name} onValueChange={setName} />
        </Field>
        <div className="flex gap-2">
          <Button type="submit" name="intent" value="save">
            Save
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
        <output className="min-h-5 text-label text-muted">{data}</output>
      </form>
    );
  },
};

/** With `href` it renders a link that looks the same: Tab to it and press Enter, or click it, to follow it. Inside a LinkProvider a same-origin link goes to the router. */
export const AsLink: Story = {
  name: "As a link",
  render: () => <ButtonLinkDemo />,
};

export const Usage: Story = {
  render: () => <ButtonDemo />,
};

export const SecondaryUsage: Story = {
  render: () => <ButtonSecondaryDemo />,
};

export const GhostUsage: Story = {
  render: () => <ButtonGhostDemo />,
};

export const SizesUsage: Story = {
  render: () => <ButtonSizesDemo />,
};

export const DisabledUsage: Story = {
  render: () => <ButtonDisabledDemo />,
};

export const IconUsage: Story = {
  render: () => <ButtonIconDemo />,
};

export const FormUsage: Story = {
  render: () => <ButtonFormDemo />,
};
