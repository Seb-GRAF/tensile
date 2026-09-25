import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { StatTile } from "./StatTile";

const readings = [
  { value: 12480, change: 0.12 },
  { value: 11960, change: -0.04 },
  { value: 9870, change: -0.18 },
  { value: 10240, change: 0.18 },
];

const meta = {
  component: StatTile,
  args: { value: 12480, change: 0.12, label: "Active users" },
  argTypes: { change: { control: { type: "number", step: 0.01 } } },
} satisfies Meta<typeof StatTile>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the tile to step through four readings; while the change is negative, the chip turns white and its arrow swings down. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <button
        type="button"
        onClick={() => updateArgs(readings[(readings.findIndex((reading) => reading.value === args.value) + 1) % readings.length])}
        className="rounded-3xl text-left outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
      >
        <StatTile {...args} />
      </button>
    );
  },
};
