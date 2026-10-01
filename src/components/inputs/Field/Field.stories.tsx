import { FieldDemo } from "./demos/FieldDemo";
import { FieldAboveDemo } from "./demos/FieldAboveDemo";
import { FieldErrorDemo } from "./demos/FieldErrorDemo";
import { FieldDisabledDemo } from "./demos/FieldDisabledDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { Button } from "../../actions/Button/Button";
import { Field } from "./Field";
import { Input } from "../Input/Input";
import { Textarea } from "../Textarea/Textarea";

function emailError(email: string) {
  if (email.includes(" ")) return "Email addresses can't contain spaces";
  if (email.split("@").length > 2) return "Email addresses have only one @";
}

function EmailInput({ onValueChange }: { onValueChange: (value: string) => void }) {
  const [value, setValue] = useState("");
  return (
    <Input
      type="email"
      autoComplete="email"
      placeholder="name@example.com"
      value={value}
      onValueChange={(value) => {
        setValue(value);
        onValueChange(value);
      }}
    />
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setData(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))));
      }}
      onReset={() => {
        setName("");
        setEmail("");
        setMessage("");
        setData("");
      }}
      className="grid w-full max-w-md gap-4"
    >
      <Field label="Full name">
        <Input name="name" autoComplete="name" value={name} onValueChange={setName} />
      </Field>
      <Field label="Email address" description="We only use it to answer this message and never share it." required>
        <Input type="email" name="email" autoComplete="email" value={email} onValueChange={setEmail} />
      </Field>
      <Field
        label="What can we help you with?"
        description="Include your order number if your question is about a delivery that hasn't arrived."
      >
        <Textarea name="message" value={message} onValueChange={setMessage} />
      </Field>
      <div className="flex gap-2">
        <Button type="submit">Send</Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
      <output className="text-label break-all text-muted">{data}</output>
    </form>
  );
}

const meta = {
  title: "Inputs/Field",
  id: "components-field",
  component: Field,
  args: { label: "Email", description: "We send the receipt to this address.", children: null },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the label and type an email: a space or a second @ shows an error until you delete it. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-80">
        <Field {...args}>
          <EmailInput onValueChange={(value) => updateArgs({ error: emailError(value) })} />
        </Field>
      </div>
    );
  },
};

/** Fill the fields and press Send: the output shows the submitted form data. Reset empties every field. */
export const InAForm: Story = {
  render: () => <ContactForm />,
};

export const Usage: Story = {
  render: () => <FieldDemo />,
};

export const AboveUsage: Story = {
  render: () => <FieldAboveDemo />,
};

export const ErrorUsage: Story = {
  render: () => <FieldErrorDemo />,
};

export const DisabledUsage: Story = {
  render: () => <FieldDisabledDemo />,
};
