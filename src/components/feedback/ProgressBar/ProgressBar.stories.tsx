import { ProgressBarDemo } from "./demos/ProgressBarDemo";
import { ProgressBarIndeterminateDemo } from "./demos/ProgressBarIndeterminateDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { Button } from "../../actions/Button/Button";
import { ProgressBar } from "./ProgressBar";

const values = [0.1, 0.4, 0.7, 1, null];

const meta = {
  title: "Feedback/ProgressBar",
  id: "components-progressbar",
  component: ProgressBar,
  args: { value: 0.4 },
  argTypes: { value: { control: { type: "number", min: 0, max: 1, step: 0.01 } } },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click Next, or press Enter or Space, to step through 10 %, 40 %, 70 %, 100 % and unknown length. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="flex w-60 max-w-full flex-col items-center gap-4">
        <ProgressBar {...args} />
        <Button
          variant="secondary"
          size="sm"
          onClick={() => updateArgs({ value: values[(values.indexOf(args.value) + 1) % values.length] })}
        >
          Next
        </Button>
      </div>
    );
  },
};

/** Unknown progress sweeps across the track; with reduced motion its segment stays in the center. */
export const Indeterminate: Story = {
  args: { value: null },
  render: (args) => (
    <div className="w-60 max-w-full">
      <ProgressBar {...args} />
    </div>
  ),
};

export const Usage: Story = {
  render: () => <ProgressBarDemo />,
};

export const IndeterminateUsage: Story = {
  render: () => <ProgressBarIndeterminateDemo />,
};
