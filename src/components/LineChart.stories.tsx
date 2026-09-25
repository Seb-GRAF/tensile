import type { Meta, StoryObj } from "@storybook/react-vite";
import { LineChart } from "./LineChart";

const meta = {
  component: LineChart,
  args: {
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

/** The line draws itself on load; hover to see each day. */
export const Default: Story = {};
