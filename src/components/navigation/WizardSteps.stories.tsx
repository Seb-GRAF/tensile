import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../data-display/Icon";
import { useArgs } from "storybook/preview-api";
import { Button } from "../actions/Button";
import { WizardSteps } from "./WizardSteps";

function NavIcon({ paths }: { paths: string[] }) {
  return (
    <Icon size={16}>
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </Icon>
  );
}

const steps = [
  { label: "Account", icon: <NavIcon paths={["M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0"]} /> },
  {
    label: "Shipping",
    icon: (
      <NavIcon
        paths={[
          "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",
          "M15 18H9",
          "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14",
          "M19 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0",
          "M9 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0",
        ]}
      />
    ),
  },
  {
    label: "Payment",
    icon: <NavIcon paths={["M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z", "M2 10h20"]} />,
  },
  {
    label: "Review",
    icon: (
      <NavIcon
        paths={[
          "M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0",
          "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
        ]}
      />
    ),
  },
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
        <WizardSteps {...args} className="w-full" />
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
