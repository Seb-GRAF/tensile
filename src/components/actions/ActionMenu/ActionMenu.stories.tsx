import { ActionMenuDemo } from "./demos/ActionMenuDemo";
import { ActionMenuIconTriggerDemo } from "./demos/ActionMenuIconTriggerDemo";
import { ActionMenuSizesDemo } from "./demos/ActionMenuSizesDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import { ActionMenu } from "./ActionMenu";
import { Icon } from "../../data-display/Icon/Icon";

const meta = {
  title: "Actions/ActionMenu",
  id: "components-actionmenu",
  component: ActionMenu,
  args: {
    onAction: fn(),
    actions: [
      { label: "Add to queue", icon: <Icon name="listPlus" /> },
      { label: "Go to artist", icon: <Icon name="user" /> },
      { label: "Share", icon: <Icon name="share" /> },
      { label: "Download", icon: <Icon name="download" /> },
      { label: "Remove from library", icon: <Icon name="trash" /> },
    ],
  },
} satisfies Meta<typeof ActionMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click More, or focus it and press Enter, Space or ArrowDown (ArrowUp starts on the last action); arrows move, Enter or Space runs, Escape closes. */
export const Default: Story = {};

export const IconTrigger: Story = {
  args: {
    label: "Track actions",
    trigger: <Icon name="more" />,
    actions: [
      { label: "Rename" },
      { label: "Download", disabled: true },
      { label: "Remove from library" },
    ],
  },
  render: function Render(args) {
    const [action, setAction] = useState("");
    return <div className="grid justify-items-start gap-4"><ActionMenu {...args} onAction={(action) => { args.onAction(action); setAction(action.label); }} /><output>{action}</output></div>;
  },
};

export const Usage: Story = {
  render: () => <ActionMenuDemo />,
};

export const IconTriggerUsage: Story = {
  render: () => <ActionMenuIconTriggerDemo />,
};

export const SizesUsage: Story = {
  render: () => <ActionMenuSizesDemo />,
};
