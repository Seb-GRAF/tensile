import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { BarChart } from "./BarChart";

const weeks = [
  {
    label: "Minutes listened per day this week",
    data: [
      { label: "Mon", value: 58 },
      { label: "Tue", value: 104 },
      { label: "Wed", value: 80 },
      { label: "Thu", value: 134 },
      { label: "Fri", value: 92 },
      { label: "Sat", value: 168 },
      { label: "Sun", value: 124 },
    ],
  },
  {
    label: "Minutes listened per day last week",
    data: [
      { label: "Mon", value: 96 },
      { label: "Tue", value: 72 },
      { label: "Wed", value: 140 },
      { label: "Thu", value: 60 },
      { label: "Fri", value: 118 },
      { label: "Sat", value: 84 },
      { label: "Sun", value: 150 },
    ],
  },
  {
    label: "Minutes listened per day two weeks ago",
    data: [
      { label: "Mon", value: 42 },
      { label: "Tue", value: 66 },
      { label: "Wed", value: 38 },
      { label: "Thu", value: 90 },
      { label: "Fri", value: 54 },
      { label: "Sat", value: 120 },
      { label: "Sun", value: 76 },
    ],
  },
];

const meta = {
  component: BarChart,
  args: {
    ...weeks[0],
    formatValue: (minutes) => `${Math.floor(minutes / 60)}h ${minutes % 60}m`,
  },
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Hover the bars, or tab to the chart and use the arrow keys; click it to switch weeks. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div
        onClick={() => updateArgs(weeks[(weeks.findIndex((week) => week.label === args.label) + 1) % weeks.length])}
        className="cursor-pointer"
      >
        <BarChart {...args} />
      </div>
    );
  },
};
