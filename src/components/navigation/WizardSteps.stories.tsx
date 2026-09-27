import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { WizardSteps } from "./WizardSteps";

function Icon({ paths }: { paths: string[] }) {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

const steps = [
  { label: "Account", icon: <Icon paths={["M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0"]} /> },
  {
    label: "Shipping",
    icon: (
      <Icon
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
    icon: <Icon paths={["M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z", "M2 10h20"]} />,
  },
  {
    label: "Review",
    icon: (
      <Icon
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
      <div className="flex flex-col items-center gap-4">
        <WizardSteps {...args} />
        <div className="flex gap-2">
          <button
            type="button"
            disabled={args.value === 0}
            onClick={() => updateArgs({ value: args.value - 1 })}
            className="h-8 rounded-full bg-paper px-4 text-[13px] font-medium text-ink shadow-float outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink disabled:opacity-30"
          >
            Back
          </button>
          <button
            type="button"
            disabled={args.value === args.steps.length - 1}
            onClick={() => updateArgs({ value: args.value + 1 })}
            className="h-8 rounded-full bg-ink px-4 text-[13px] font-medium text-paper shadow-float outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink disabled:opacity-30"
          >
            Next
          </button>
        </div>
      </div>
    );
  },
};
