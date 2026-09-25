import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { ProgressBar } from "./ProgressBar";

const values = [0.1, 0.4, 0.7, 1, null];

const meta = {
  component: ProgressBar,
  args: { value: 0.4 },
  argTypes: { value: { control: { type: "number", min: 0, max: 1, step: 0.01 } } },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the bar to step through 10 %, 40 %, 70 %, 100 % and unknown length. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div onClick={() => updateArgs({ value: values[(values.indexOf(args.value) + 1) % values.length] })} className="cursor-pointer">
        <ProgressBar {...args} />
      </div>
    );
  },
};
