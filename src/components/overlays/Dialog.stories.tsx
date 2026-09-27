import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import { Button } from "../actions/Button";
import { Field } from "../inputs/Field";
import { Input } from "../inputs/Input";
import { Dialog } from "./Dialog";

const meta = {
  title: "Overlays/Dialog",
  id: "components-dialog",
  component: Dialog,
  parameters: { layout: "padded" },
  args: {
    open: false,
    onOpenChange: fn(),
    children: <InviteContent />,
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(args.open);
    return <div className="flex gap-2"><Dialog {...args} open={open} onOpenChange={(next) => { args.onOpenChange(next); setOpen(next); }} /><Button variant="ghost">Next</Button></div>;
  },
};

export const LongContent: Story = {
  args: {
    title: "Playlist permissions",
    children: <Permissions />,
  },
  render: Default.render,
};

export const WithoutTrigger: Story = {
  args: { trigger: null },
  render: function Render(args) {
    const [open, setOpen] = useState(args.open);
    return <><Button onClick={() => setOpen(true)}>Open from elsewhere</Button><Dialog {...args} open={open} onOpenChange={setOpen} /></>;
  },
};

function InviteContent() {
  const [email, setEmail] = useState("");
  return <><p className="mt-1 text-sm text-muted">Invite people to edit this playlist. They get an email with a link to it.</p><div className="mt-4 flex gap-2"><Input type="email" value={email} onValueChange={setEmail} aria-label="Email" placeholder="name@example.com" className="min-w-0 grow" /><Button>Invite</Button></div></>;
}

function Permissions() {
  const [message, setMessage] = useState("");
  return <div className="space-y-4 pt-4">{Array.from({ length: 16 }, (_, index) => <p key={index} className="text-sm text-muted">Collaborator {index + 1} can add songs and edit this playlist. Changes are visible to everyone with access.</p>)}<Field label="Message"><Input value={message} onValueChange={setMessage} placeholder="Add a note" /></Field><Button>Save permissions</Button></div>;
}
