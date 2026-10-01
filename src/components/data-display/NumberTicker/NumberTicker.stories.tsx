import { NumberTickerDemo } from "./demos/NumberTickerDemo";
import { NumberTickerFormatDemo } from "./demos/NumberTickerFormatDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { Button } from "../../actions/Button/Button";
import { NumberTicker } from "./NumberTicker";

const values = [99, 100, 19, 20, 9, 1000, 999];

const meta = {
  title: "Data display/NumberTicker",
  id: "components-numberticker",
  component: NumberTicker,
  args: { value: 99 },
} satisfies Meta<typeof NumberTicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the number to step through 99, 100, 19, 20, 9, 1,000 and 999, shown at 48 px and 13 px. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="flex flex-col items-center gap-3">
        <Button
          variant="ghost"
          onClick={() => updateArgs({ value: values[(values.indexOf(args.value) + 1) % values.length] })}
        >
          <span className="text-5xl font-semibold text-ink"><NumberTicker {...args} /></span>
        </Button>
        <span className="text-label font-medium text-muted">
          <NumberTicker {...args} />
        </span>
      </div>
    );
  },
};

export const Usage: Story = {
  render: () => <NumberTickerDemo />,
};

export const FormatUsage: Story = {
  render: () => <NumberTickerFormatDemo />,
};
