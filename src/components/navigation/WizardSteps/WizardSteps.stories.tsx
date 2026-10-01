import { WizardStepsDemo } from "./demos/WizardStepsDemo";
import { WizardStepsIconsDemo } from "./demos/WizardStepsIconsDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../../data-display/Icon/Icon";
import { useArgs } from "storybook/preview-api";
import { Button } from "../../actions/Button/Button";
import { Card } from "../../layout/Card/Card";
import { WizardSteps } from "./WizardSteps";

const steps = [
  { label: "Account", icon: <Icon name="user" /> },
  { label: "Shipping", icon: <Icon name="truck" /> },
  { label: "Payment", icon: <Icon name="creditCard" /> },
  { label: "Review", icon: <Icon name="eye" /> },
];

const meta = {
  title: "Navigation/WizardSteps",
  id: "components-wizardsteps",
  component: WizardSteps,
  args: { steps, value: 1 },
  argTypes: { value: { control: { type: "number", min: 0, max: steps.length - 1 } } },
} satisfies Meta<typeof WizardSteps>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click Next: the line draws to the next step and the finished dot turns into a check; Back reverses it. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="flex w-96 max-w-[calc(100vw-32px)] flex-col items-center gap-4">
        <Card className="w-full py-5">
          <WizardSteps {...args} />
        </Card>
        <div className="flex gap-2">
          <Button
            size="sm"
            disabled={args.value === 0}
            onClick={() => updateArgs({ value: args.value - 1 })}
            variant="secondary"
          >
            Back
          </Button>
          <Button
            size="sm"
            disabled={args.value === args.steps.length - 1}
            onClick={() => updateArgs({ value: args.value + 1 })}
          >
            Next
          </Button>
        </div>
      </div>
    );
  },
};

export const LongLabels: Story = {
  ...Default,
  args: {
    steps: steps.map((step, index) => ({ ...step, label: index === 1 ? "Delivery and international shipping" : index === 2 ? "Payment authorization details" : step.label })),
  },
};

export const Usage: Story = {
  render: () => <WizardStepsDemo />,
};

export const IconsUsage: Story = {
  render: () => <WizardStepsIconsDemo />,
};
