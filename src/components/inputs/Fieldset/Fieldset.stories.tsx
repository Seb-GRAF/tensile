import { FieldsetDemo } from "./demos/FieldsetDemo";
import { FieldsetDisabledDemo } from "./demos/FieldsetDisabledDemo";
import { FieldsetErrorDemo } from "./demos/FieldsetErrorDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Field } from "../Field/Field";
import { Fieldset } from "./Fieldset";
import { Input } from "../Input/Input";

function Address() {
  const [street, setStreet] = useState("Bahnhofstrasse 12");
  const [code, setCode] = useState("8001");
  const [city, setCity] = useState("Zürich");
  return (
    <>
      <Field label="Street and number">
        <Input autoComplete="address-line1" value={street} onValueChange={setStreet} />
      </Field>
      <div className="grid grid-cols-3 gap-4">
        <Field label="Postal code">
          <Input autoComplete="postal-code" inputMode="numeric" value={code} onValueChange={setCode} />
        </Field>
        <Field label="City" className="col-span-2">
          <Input autoComplete="address-level2" value={city} onValueChange={setCity} />
        </Field>
      </div>
    </>
  );
}

const meta = {
  title: "Inputs/Fieldset",
  id: "components-fieldset",
  component: Fieldset,
  args: {
    legend: "Shipping address",
    description: "We deliver to addresses in Switzerland and Liechtenstein.",
    children: <Address />,
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Fieldset {...args} />
    </div>
  ),
} satisfies Meta<typeof Fieldset>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Tab through the address and edit it; the legend names the group. */
export const Default: Story = {};

/** The fieldset disables every field inside it. */
export const Disabled: Story = {
  args: { disabled: true, description: "Your order has shipped, so its address can't change anymore." },
};

export const Usage: Story = {
  render: () => <FieldsetDemo />,
};

export const DisabledUsage: Story = {
  render: () => <FieldsetDisabledDemo />,
};

export const ErrorUsage: Story = {
  render: () => <FieldsetErrorDemo />,
};
