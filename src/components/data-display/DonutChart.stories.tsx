import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { DonutChart } from "./DonutChart";

const weeks = [
  [
    { label: "Music", value: 540 },
    { label: "Podcasts", value: 260 },
    { label: "Audiobooks", value: 130 },
    { label: "Radio", value: 70 },
  ],
  [
    { label: "Music", value: 310 },
    { label: "Podcasts", value: 450 },
    { label: "Audiobooks", value: 95 },
    { label: "Radio", value: 175 },
  ],
  [
    { label: "Music", value: 660 },
    { label: "Podcasts", value: 110 },
    { label: "Audiobooks", value: 250 },
    { label: "Radio", value: 25 },
  ],
];

const meta = {
  title: "Data display/DonutChart",
  id: "components-donutchart",
  component: DonutChart,
  args: {
    label: "Minutes listened by category",
    formatValue: (minutes) => `${Math.floor(minutes / 60)}h ${minutes % 60}m`,
    data: weeks[0],
  },
} satisfies Meta<typeof DonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Hover a segment, or Tab in and use the arrow keys, to see its value; Change data springs the arcs to another week. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="flex flex-col items-center gap-4">
        <DonutChart {...args} />
        <button
          type="button"
          onClick={() => updateArgs({ data: weeks[(weeks.findIndex((week) => week[0].value === args.data[0].value) + 1) % weeks.length] })}
          className="h-8 rounded-full bg-paper px-4 text-[13px] font-medium text-ink shadow-float outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
        >
          Change data
        </button>
      </div>
    );
  },
};
