import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Button } from "../actions/Button";
import { Field } from "./Field";
import { PasswordInput, type PasswordInputProps } from "./PasswordInput";

function StatefulPasswordInput(props: PasswordInputProps) {
  const [value, setValue] = useState(props.value);
  return (
    <PasswordInput
      {...props}
      value={value}
      onValueChange={(value) => { setValue(value); props.onValueChange(value); }}
    />
  );
}

const meta = {
  title: "Inputs/PasswordInput",
  id: "components-passwordinput",
  component: PasswordInput,
  args: { value: "", onValueChange: fn(), "aria-label": "Password" },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Type a password, then press the eye button (or Tab to it and press Enter) to show or hide it. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-80 max-w-full">
        <StatefulPasswordInput {...args} onValueChange={(value) => { args.onValueChange(value); updateArgs({ value }); }} />
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
          setData(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))));
        }}
        onReset={() => { setValue(args.value); setData(""); }}
        className="grid w-80 max-w-full gap-4"
      >
        <Field label="Password" description="Your account password." required disabled={disabled}>
          <PasswordInput {...args} value={value} onValueChange={setValue} name="password" />
        </Field>
        <div className="flex flex-wrap gap-2">
          <Button type="submit">Sign in</Button>
          <Button type="reset" variant="secondary">Reset</Button>
          <Button variant="secondary" onClick={() => setDisabled(!disabled)}>{disabled ? "Enable" : "Disable"}</Button>
        </div>
        <output className="text-label text-muted">{data}</output>
      </form>
    );
  },
};
