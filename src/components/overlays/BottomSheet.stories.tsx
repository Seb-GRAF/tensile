import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { BottomSheet } from "./BottomSheet";

function Icon({ paths }: { paths: string[] }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

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
          <p className="text-[15px] font-semibold text-ink">Winter Breeze</p>
          <p className="text-[13px] text-muted">Arulo</p>
        </div>
        <div className="mx-3 mb-2 h-px bg-line" />
        {actions.map(({ label, paths }) => (
          <button
            key={label}
            type="button"
            className="flex h-11 w-full items-center gap-3 rounded-xl px-3 text-[15px] text-ink outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
          >
            <span className="text-muted">
              <Icon paths={paths} />
            </span>
            {label}
          </button>
        ))}
      </div>
    ),
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click Open sheet, then drag the handle: flick or pull it down to close, pull it up to stretch. Escape, the backdrop, or Enter on the handle close it too. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="relative flex h-[600px] w-[390px] justify-center overflow-hidden bg-paper pt-36">
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => updateArgs({ open: true })}
            className="h-11 rounded-full bg-ink px-5 text-sm font-medium text-paper shadow-float outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
          >
            Open sheet
          </button>
          <BottomSheet
            {...args}
            onOpenChange={(open) => {
              args.onOpenChange(open);
              updateArgs({ open });
            }}
          />
        </div>
      </div>
    );
  },
};
