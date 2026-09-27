import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Popover } from "./Popover";

const meta = {
  title: "Overlays/Popover",
  id: "components-popover",
  component: Popover,
  args: {
    open: false,
    onOpenChange: fn(),
    children: (
      <div className="p-4">
        <p className="text-[15px] font-semibold text-ink">Winter Breeze</p>
        <p className="text-[13px] text-muted">Arulo</p>
        <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[13px]">
          <dt className="text-muted">Album</dt>
          <dd className="text-right">Lumen</dd>
          <dt className="text-muted">Released</dt>
          <dd className="text-right">2024</dd>
          <dt className="text-muted">Length</dt>
          <dd className="text-right tabular-nums">2:20</dd>
        </dl>
        <button
          type="button"
          className="mt-4 h-11 w-full rounded-full bg-ink text-sm font-medium text-paper outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
        >
          Go to album
        </button>
      </div>
    ),
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click Details, or focus it and press Enter or Space; click outside or press Escape to close it. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Popover
        {...args}
        onOpenChange={(open) => {
          args.onOpenChange(open);
          updateArgs({ open });
        }}
      />
    );
  },
};
