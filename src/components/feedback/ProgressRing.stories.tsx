import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { Button } from "../actions/Button";
import { ProgressRing } from "./ProgressRing";

const meta = {
  title: "Feedback/ProgressRing",
  id: "components-progressring",
  component: ProgressRing,
  args: { value: 0.25 },
  argTypes: { value: { control: { type: "range", min: 0, max: 1, step: 0.01 } } },
} satisfies Meta<typeof ProgressRing>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click Next, or press Enter or Space, to add 25%; at 100% the ring closes into a check, then starts over from 0. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="flex flex-col items-center gap-4">
        <ProgressRing {...args} />
        <Button
          variant="secondary"
          size="sm"
          onClick={() => updateArgs({ value: args.value === 1 ? 0 : Math.min(1, args.value + 0.25) })}
        >
          Next
        </Button>
      </div>
    );
  },
};
