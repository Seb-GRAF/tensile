import { OTPInputDemo } from "./demos/OTPInputDemo";
import { OTPInputLengthDemo } from "./demos/OTPInputLengthDemo";
import { OTPInputFormDemo } from "./demos/OTPInputFormDemo";
import { OTPInputDisabledDemo } from "./demos/OTPInputDisabledDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { OTPInput, type OTPInputProps } from "./OTPInput";
import { Button } from "../../actions/Button/Button";
import { Field } from "../Field/Field";

function StatefulOTPInput(props: OTPInputProps) {
  const [value, setValue] = useState(props.value);
  return (
    <OTPInput
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
  title: "Inputs/OTPInput",
  id: "components-otpinput",
  component: OTPInput,
  args: { value: "", onValueChange: fn() },
} satisfies Meta<typeof OTPInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click a cell and type or paste a code; Backspace clears and moves back, the arrow keys move between cells. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <StatefulOTPInput
        {...args}
        onValueChange={(value) => {
          args.onValueChange?.(value);
          updateArgs({ value });
        }}
      />
    );
  },
};

export const InAFieldInsideAForm: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(args.value!);
    const [disabled, setDisabled] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [data, setData] = useState("");
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
          setData(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))));
        }}
        onReset={() => { setValue(args.value!); setSubmitted(false); setData(""); }}
        className="grid w-80 max-w-full gap-4"
      >
        <Field label="Verification code" description="Enter the six digits we sent." error={submitted && value.length !== 6 ? "Enter all six digits" : undefined} required disabled={disabled}>
          <OTPInput {...args} value={value} onValueChange={setValue} name="code" />
        </Field>
        <div className="flex gap-2">
          <Button type="submit">Verify</Button>
          <Button type="reset" variant="secondary">Reset</Button>
          <Button variant="secondary" onClick={() => setDisabled(!disabled)}>{disabled ? "Enable" : "Disable"}</Button>
        </div>
        <output className="text-label text-muted">{data}</output>
      </form>
    );
  },
};

export const Usage: Story = {
  render: () => <OTPInputDemo />,
};

export const LengthUsage: Story = {
  render: () => <OTPInputLengthDemo />,
};

export const FormUsage: Story = {
  render: () => <OTPInputFormDemo />,
};

export const DisabledUsage: Story = {
  render: () => <OTPInputDisabledDemo />,
};
