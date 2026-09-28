import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import { ContextMenu } from "./ContextMenu";
import { Dialog } from "./Dialog";
import { Button } from "../actions/Button";
import { Card } from "../layout/Card";
import { Icon } from "../data-display/Icon";

const meta = {
  title: "Overlays/ContextMenu",
  id: "components-contextmenu",
  component: ContextMenu,
  args: {
    actions: [
      { label: "Rename", icon: <Icon><path d="m16 3 5 5-12 12H4v-5zM14 5l5 5" /></Icon> },
      { label: "Download", disabled: true },
      { label: "Share" },
      { label: "Move to archive" },
    ],
    onAction: fn(),
    children: <Card className="p-6"><p className="font-medium">Project notes</p><p className="mt-2 text-sm text-muted">Right-click, hold on touch, or use Shift+F10.</p></Card>,
  },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Right-click the card, hold it on touch, or focus it and press Shift+F10 or the context-menu key; arrows move, Enter or Space runs, Escape or a press outside closes. */
export const Default: Story = {
  render: function Render(args) {
    const [action, setAction] = useState("");
    const [clicks, setClicks] = useState(0);
    return (
      <div className="grid w-80 max-w-full gap-4">
        <ContextMenu {...args} onAction={(action) => { args.onAction(action); setAction(action.label); }}>
          <Card className="grid gap-4 p-6"><p className="font-medium">Project notes</p><Button variant="secondary" onClick={() => setClicks(clicks + 1)}>Open document</Button></Card>
        </ContextMenu>
        <Button variant="secondary">Outside action</Button>
        <output data-result="action" className="text-label">{action}</output>
        <output data-result="clicks" className="text-label">{clicks}</output>
      </div>
    );
  },
};

export const LongListAtTheEdge: Story = {
  args: { actions: Array.from({ length: 30 }, (_, i) => ({ label: `Action ${String(i + 1).padStart(2, "0")} — project document` })) },
  decorators: [(Story) => <div className="flex h-[calc(100vh-4rem)] w-[calc(100vw-4rem)] items-end justify-end"><Story /></div>],
};

export const InsideAClippingCard: Story = {
  args: { children: <p className="p-4">Notes inside a clipped card</p> },
  decorators: [(Story) => <Card className="w-80 max-w-full overflow-hidden p-4"><Story /></Card>],
};

export const InsideADialog: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState("");
    return (
      <Dialog open={open} onOpenChange={setOpen} title="Project document">
        <div className="mt-4 grid gap-4">
          <ContextMenu {...args} onAction={(action) => { args.onAction(action); setAction(action.label); }} />
          <output className="text-label">{action}</output>
        </div>
      </Dialog>
    );
  },
};
