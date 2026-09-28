import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Button } from "../actions/Button";
import { Icon } from "../data-display/Icon";
import { Separator } from "../layout/Separator";
import { BottomSheet } from "./BottomSheet";

const actions = [
  { label: "Add to queue", paths: ["M11 12H3", "M16 6H3", "M16 18H3", "M18 9v6", "M21 12h-6"] },
  { label: "Go to artist", paths: ["M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0"] },
  { label: "Share", paths: ["M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8", "m16 6-4-4-4 4", "M12 2v13"] },
  { label: "Download", paths: ["M12 15V3", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "m7 10 5 5 5-5"] },
];

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
        <div className="px-3 pb-3">
          <p className="text-body font-semibold text-ink">Winter Breeze</p>
          <p className="text-label text-muted">Arulo</p>
        </div>
        <Separator className="mx-3 mb-2" />
        {actions.map(({ label, paths }) => (
          <Button key={label} variant="ghost" className="w-full">
            <span className="flex w-full items-center gap-3">
              <Icon size={20} className="text-muted">{paths.map((d) => <path key={d} d={d} />)}</Icon>
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
        <BottomSheet {...args} onOpenChange={(open) => { args.onOpenChange(open); updateArgs({ open }); }} />
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
      <div className="p-5">
        <h2 className="mb-4 text-body font-semibold">Your library</h2>
        <ul role="list">
          {Array.from({ length: 24 }, (_, i) => (
            <li key={i}><Button variant="ghost" className="w-full"><span className="w-full text-left">Track {i + 1}</span></Button></li>
          ))}
        </ul>
      </div>
    ),
  },
};
