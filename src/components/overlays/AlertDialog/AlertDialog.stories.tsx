import { AlertDialogDemo } from "./demos/AlertDialogDemo";
import { AlertDialogExternalTriggerDemo } from "./demos/AlertDialogExternalTriggerDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import { Button } from "../../actions/Button/Button";
import { AlertDialog } from "./AlertDialog";

const meta = {
  title: "Overlays/AlertDialog",
  id: "components-alertdialog",
  component: AlertDialog,
  args: {
    open: false,
    onOpenChange: fn(),
    title: "Delete playlist?",
    description: "The playlist will be removed from your library.",
    onConfirm: fn(),
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click Delete playlist: focus starts on Cancel; Escape or Cancel closes it, Confirm runs the action; the backdrop doesn't dismiss it. */
export const Default: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(args.open);
    const [confirmed, setConfirmed] = useState(false);
    return <div className="grid justify-items-center gap-4"><Button onClick={() => setOpen(true)}>Delete playlist</Button><AlertDialog {...args} open={open} onOpenChange={setOpen} onConfirm={() => { args.onConfirm(); setConfirmed(true); }} /><output>{confirmed ? "Deleted" : "Not deleted"}</output></div>;
  },
};

export const WithTrigger: Story = {
  args: { trigger: "Delete playlist" },
  render: function Render(args) {
    const [open, setOpen] = useState(args.open);
    return <AlertDialog {...args} open={open} onOpenChange={setOpen} />;
  },
};

export const Usage: Story = {
  render: () => <AlertDialogDemo />,
};

export const ExternalTriggerUsage: Story = {
  render: () => <AlertDialogExternalTriggerDemo />,
};
