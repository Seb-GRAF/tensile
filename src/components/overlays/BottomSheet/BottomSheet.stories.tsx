import { BottomSheetDemo } from "./demos/BottomSheetDemo";
import { BottomSheetLongContentDemo } from "./demos/BottomSheetLongContentDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Button } from "../../actions/Button/Button";
import { Icon } from "../../data-display/Icon/Icon";
import { Separator } from "../../layout/Separator/Separator";
import { BottomSheet } from "./BottomSheet";

const actions = [
  { label: "Add to queue", icon: "listPlus" },
  { label: "Go to artist", icon: "user" },
  { label: "Share", icon: "share" },
  { label: "Download", icon: "download" },
] as const;

const meta = {
  title: "Overlays/BottomSheet",
  id: "components-bottomsheet",
  component: BottomSheet,
  parameters: { layout: "fullscreen" },
  args: {
    open: false,
    onOpenChange: fn(),
    children: (
      <div className="px-2 pb-6">
        <div className="px-5 pb-3">
          <p className="text-body font-semibold text-ink">Winter Breeze</p>
          <p className="text-label text-muted">Arulo</p>
        </div>
        <Separator className="mx-5 mb-2" />
        {actions.map(({ label, icon }) => (
          <Button key={label} variant="ghost" className="w-full">
            <span className="flex w-full items-center gap-3">
              <Icon name={icon} size={20} className="text-muted" />
              {label}
            </span>
          </Button>
        ))}
      </div>
    ),
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="grid min-h-screen place-items-center">
        <Button aria-haspopup="dialog" aria-expanded={args.open} onClick={() => updateArgs({ open: true })}>Open sheet</Button>
        <BottomSheet {...args} onOpenChange={(open) => { args.onOpenChange?.(open); updateArgs({ open }); }} />
      </div>
    );
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Open the sheet, then drag its grab strip down (a flick or past halfway closes it, a short drag springs back), tap the handle, click the backdrop or press Escape. */
export const Default: Story = {};

export const LongContent: Story = {
  args: {
    children: (
      <div className="px-2 pb-5">
        <h2 className="mb-4 px-5 text-body font-semibold">Your library</h2>
        <ul role="list">
          {Array.from({ length: 24 }, (_, i) => (
            <li key={i}><Button variant="ghost" className="w-full"><span className="w-full text-left">Track {i + 1}</span></Button></li>
          ))}
        </ul>
      </div>
    ),
  },
};

export const Usage: Story = {
  render: () => <BottomSheetDemo />,
};

export const LongContentUsage: Story = {
  render: () => <BottomSheetLongContentDemo />,
};
