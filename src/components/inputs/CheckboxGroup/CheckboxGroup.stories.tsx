import { CheckboxGroupDemo } from "./demos/CheckboxGroupDemo";
import { CheckboxGroupDisabledDemo } from "./demos/CheckboxGroupDisabledDemo";
import { CheckboxGroupFormDemo } from "./demos/CheckboxGroupFormDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Button } from "../../actions/Button/Button";
import { Card } from "../../layout/Card/Card";
import { CheckboxGroup } from "./CheckboxGroup";
import { Fieldset } from "../Fieldset/Fieldset";

const meta = {
  title: "Inputs/CheckboxGroup",
  id: "components-checkboxgroup",
  component: CheckboxGroup,
  args: {
    options: [
      { value: "email", label: "Email updates about new releases" },
      { value: "push", label: "Push notifications" },
      { value: "sms", label: "Text messages (not available)", disabled: true },
    ],
    value: ["email"],
    onValueChange: fn(),
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click labels or Tab between the choices and press Space; disabled choices are skipped. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Card className="w-80 p-4">
        <CheckboxGroup
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

export const InAFieldsetInsideAForm: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    const [disabled, setDisabled] = useState(false);
    const [data, setData] = useState("");
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setData(JSON.stringify(new FormData(event.currentTarget).getAll("channels")));
        }}
        onReset={() => { setValue(args.value); setDisabled(false); setData(""); }}
        className="grid w-80 gap-4"
      >
        <Fieldset legend="Notification channels" description="Choose how we can contact you." disabled={disabled}>
          <CheckboxGroup {...args} name="channels" value={value} onValueChange={setValue} />
        </Fieldset>
        <Button variant="secondary" onClick={() => setDisabled(!disabled)}>
          {disabled ? "Enable choices" : "Disable choices"}
        </Button>
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
  render: () => <CheckboxGroupDemo />,
};

export const DisabledUsage: Story = {
  render: () => <CheckboxGroupDisabledDemo />,
};

export const FormUsage: Story = {
  render: () => <CheckboxGroupFormDemo />,
};
