import { SegmentedTabsDemo } from "./demos/SegmentedTabsDemo";
import { SegmentedTabsIconsDemo } from "./demos/SegmentedTabsIconsDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { SegmentedTabs } from "./SegmentedTabs";

const meta = {
  title: "Navigation/SegmentedTabs",
  id: "components-segmentedtabs",
  component: SegmentedTabs,
  args: {
    options: [
      { value: "day", label: "Day" },
      { value: "week", label: "Week" },
      { value: "month", label: "Month" },
    ],
    value: "week",
    onValueChange: fn(),
  },
} satisfies Meta<typeof SegmentedTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click a segment, or Tab in and use the arrow keys, Home and End: the ink pill slides to it. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <SegmentedTabs
        {...args}
        onValueChange={(value) => {
          args.onValueChange(value);
          updateArgs({ value });
        }}
      />
    );
  },
};

export const LongLabels: Story = {
  args: {
    options: [
      { value: "day", label: "This quarter" },
      { value: "week", label: "Previous quarter" },
      { value: "month", label: "Year to date" },
    ],
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-120 max-w-[calc(100vw-2rem)]">
        <SegmentedTabs {...args} onValueChange={(value) => { args.onValueChange(value); updateArgs({ value }); }} />
      </div>
    );
  },
};

export const Usage: Story = {
  render: () => <SegmentedTabsDemo />,
};

export const IconsUsage: Story = {
  render: () => <SegmentedTabsIconsDemo />,
};
