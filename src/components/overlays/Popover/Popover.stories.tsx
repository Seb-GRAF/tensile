import { PopoverDemo } from "./demos/PopoverDemo";
import { PopoverPlacementsDemo } from "./demos/PopoverPlacementsDemo";
import { PopoverIconTriggerDemo } from "./demos/PopoverIconTriggerDemo";
import { PopoverDisabledDemo } from "./demos/PopoverDisabledDemo";
import { PopoverDialogDemo } from "./demos/PopoverDialogDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Button } from "../../actions/Button/Button";
import { Card } from "../../layout/Card/Card";
import { Popover } from "./Popover";
import { Dialog } from "../Dialog/Dialog";

const meta = {
  title: "Overlays/Popover",
  id: "components-popover",
  component: Popover,
  args: {
    open: false,
    onOpenChange: fn(),
    children: (
      <div className="p-4">
        <p className="text-body font-semibold text-ink">Winter Breeze</p>
        <p className="text-label text-muted">Arulo</p>
        <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-label">
          <dt className="text-muted">Album</dt>
          <dd className="text-right">Lumen</dd>
          <dt className="text-muted">Released</dt>
          <dd className="text-right">2024</dd>
          <dt className="text-muted">Length</dt>
          <dd className="text-right tabular-nums">2:20</dd>
        </dl>
        <Button className="mt-4 w-full">Go to album</Button>
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

const placements = [
  { placement: "bottom-left", label: "Bottom left" },
  { placement: "bottom-center", label: "Bottom center" },
  { placement: "bottom-right", label: "Bottom right" },
  { placement: "top-left", label: "Top left" },
  { placement: "top-center", label: "Top center" },
  { placement: "top-right", label: "Top right" },
] as const;

/** Each popover opens toward its placement, and flips only when the viewport has more room the other way. */
export const Placements: Story = {
  parameters: { layout: "fullscreen" },
  render: function Render(args) {
    const [open, setOpen] = useState<string | null>(null);
    return (
      <div className="grid min-h-dvh grid-cols-3 place-items-center gap-8 p-8">
        {placements.map(({ placement, label }) => (
          <Popover key={placement} {...args} placement={placement} trigger={label} open={open === placement} onOpenChange={(next) => setOpen(next ? placement : null)} />
        ))}
      </div>
    );
  },
};

export const NearTheEdges: Story = {
  parameters: { layout: "fullscreen" },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <div className="fixed right-4 bottom-4"><Popover {...args} trigger="Album details" onOpenChange={(open) => { args.onOpenChange(open); updateArgs({ open }); }} /></div>;
  },
};

export const InsideAClippingCard: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <Card className="h-20 w-48 overflow-hidden p-4"><Popover {...args} onOpenChange={(open) => { args.onOpenChange(open); updateArgs({ open }); }} /></Card>;
  },
};

export const InsideDialog: Story = {
  render: function Render(args) {
    const [dialog, setDialog] = useState(false);
    const [open, setOpen] = useState(false);
    return <Dialog open={dialog} onOpenChange={setDialog} title="Album"><div className="flex items-center gap-3 py-4"><Popover {...args} open={open} onOpenChange={setOpen} /><Button variant="ghost">Next</Button></div></Dialog>;
  },
};

export const Usage: Story = {
  render: () => <PopoverDemo />,
};

export const PlacementsUsage: Story = {
  render: () => <PopoverPlacementsDemo />,
};

export const IconTriggerUsage: Story = {
  render: () => <PopoverIconTriggerDemo />,
};

export const DisabledUsage: Story = {
  render: () => <PopoverDisabledDemo />,
};

export const DialogUsage: Story = {
  render: () => <PopoverDialogDemo />,
};
