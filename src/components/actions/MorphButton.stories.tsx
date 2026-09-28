import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Field } from "../inputs/Field";
import { Input } from "../inputs/Input";
import { MorphButton, type MorphButtonProps } from "./MorphButton";
import { MorphButtonExample } from "../../../docs/examples/MorphButtonExample";
import exampleSource from "../../../docs/examples/MorphButtonExample.tsx?raw";

const meta = {
  title: "Actions/MorphButton",
  id: "components-morphbutton",
  component: MorphButton,
  tags: ["!autodocs"],
  args: { status: "idle", onClick: fn() },
} satisfies Meta<typeof MorphButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click to run a fake request: loading for 1.2 s, done for 1.5 s, then back to idle. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onClick(event: React.MouseEvent<HTMLButtonElement>) {
      args.onClick?.(event);
      updateArgs({ status: "loading" });
      setTimeout(() => updateArgs({ status: "success" }), 1200);
      setTimeout(() => updateArgs({ status: "idle" }), 2700);
    }

    return <MorphButton {...args} onClick={onClick} />;
  },
};

function MorphForm({ onStatusChange, ...args }: MorphButtonProps & { onStatusChange: (status: MorphButtonProps["status"]) => void }) {
  const [name, setName] = useState("");
  const [data, setData] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setData(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget, event.submitter))));
        onStatusChange("loading");
        setTimeout(() => onStatusChange("success"), 1200);
        setTimeout(() => onStatusChange("idle"), 2700);
      }}
      className="grid w-80 max-w-full gap-3"
    >
      <Field label="Display name">
        <Input name="name" value={name} onValueChange={setName} />
      </Field>
      <MorphButton {...args} type="submit" name="intent" value="save" className="justify-self-start">
        <span>Save</span>
      </MorphButton>
      <output className="min-h-5 text-label text-muted">{data}</output>
    </form>
  );
}

/** Submit by clicking Save or pressing Enter in the field; the button loads, succeeds, then returns to idle. */
export const InAForm: Story = {
  name: "In a form",
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <MorphForm {...args} onStatusChange={(status) => updateArgs({ status })} />;
  },
};

/** Disabled while idle: pointer and keyboard presses do not start the request. */
export const Disabled: Story = { args: { disabled: true } };

export const Usage: Story = {
  render: () => <MorphButtonExample />,
  parameters: { docs: { source: { code: exampleSource, language: "tsx" } } },
};
