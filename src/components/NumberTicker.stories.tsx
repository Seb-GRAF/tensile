import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { NumberTicker } from "./NumberTicker";

const values = [99, 100, 19, 20, 9, 1000, 999];

const meta = {
  component: NumberTicker,
  args: { value: 99 },
} satisfies Meta<typeof NumberTicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the number to step through 99, 100, 19, 20, 9, 1,000 and 999, shown at 48 px and 12 px. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={() => updateArgs({ value: values[(values.indexOf(args.value) + 1) % values.length] })}
          className="rounded-xl text-5xl font-semibold text-ink outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
        >
          <NumberTicker {...args} />
        </button>
        <span className="text-xs font-medium text-muted">
          <NumberTicker {...args} />
        </span>
      </div>
    );
  },
};
