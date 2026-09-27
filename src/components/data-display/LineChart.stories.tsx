import type { Meta, StoryObj } from "@storybook/react-vite";
import { LineChart } from "./LineChart";

const meta = {
  title: "Data display/LineChart",
  id: "components-linechart",
  component: LineChart,
  args: {
    label: "Minutes listened per day this week",
    formatValue: (minutes) => `${Math.floor(minutes / 60)}h ${minutes % 60}m`,
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
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Hover the line, or Tab in and use arrows, Home or End, to see each day. */
export const Default: Story = {
  render: (args) => <div className="w-90 max-w-[calc(100vw-2rem)]"><LineChart {...args} /></div>,
};
