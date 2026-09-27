import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import { ActionMenu } from "./ActionMenu";
import { Icon } from "../data-display/Icon";

const meta = {
  title: "Actions/ActionMenu",
  id: "components-actionmenu",
  component: ActionMenu,
  args: {
    onAction: fn(),
    actions: [
      { label: "Add to queue", icon: <Icon><path d="M11 12H3" /><path d="M16 6H3" /><path d="M16 18H3" /><path d="M18 9v6" /><path d="M21 12h-6" /></Icon> },
      { label: "Go to artist", icon: <Icon><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0" /></Icon> },
      { label: "Share", icon: <Icon><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="m16 6-4-4-4 4" /><path d="M12 2v13" /></Icon> },
      { label: "Download", icon: <Icon><path d="M12 15V3" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /></Icon> },
      {
        label: "Remove from library",
        icon: <Icon><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></Icon>,
      },
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
    trigger: <Icon><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></Icon>,
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
