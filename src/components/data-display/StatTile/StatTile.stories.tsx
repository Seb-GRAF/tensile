import { StatTileDemo } from "./demos/StatTileDemo";
import { StatTileNegativeDemo } from "./demos/StatTileNegativeDemo";
import { StatTileFormatDemo } from "./demos/StatTileFormatDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { Button } from "../../actions/Button/Button";
import { StatTile } from "./StatTile";

const readings = [
  { value: 12480, change: 0.12 },
  { value: 11960, change: -0.04 },
  { value: 9870, change: -0.18 },
  { value: 10240, change: 0.18 },
];

const meta = {
  title: "Data display/StatTile",
  id: "components-stattile",
  component: StatTile,
  args: { value: 12480, change: 0.12, label: "Active users" },
  argTypes: { change: { control: { type: "number", step: 0.01 } } },
} satisfies Meta<typeof StatTile>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Change the reading; while the change is negative, the chip turns white and its arrow swings down. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-64 max-w-[calc(100vw-2rem)]">
        <StatTile {...args} />
        <div className="mt-4 text-center">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => updateArgs(readings[(readings.findIndex((reading) => reading.value === args.value) + 1) % readings.length])}
          >
            Change reading
          </Button>
        </div>
      </div>
    );
  },
};

export const Usage: Story = {
  render: () => <StatTileDemo />,
};

export const NegativeUsage: Story = {
  render: () => <StatTileNegativeDemo />,
};

export const FormatUsage: Story = {
  render: () => <StatTileFormatDemo />,
};
