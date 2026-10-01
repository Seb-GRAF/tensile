import { ToolbarDemo } from "./demos/ToolbarDemo";
import { ToolbarVerticalDemo } from "./demos/ToolbarVerticalDemo";
import { ToolbarTooltipsDemo } from "./demos/ToolbarTooltipsDemo";
import { ToolbarDisabledDemo } from "./demos/ToolbarDisabledDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../Button/Button";
import { IconButton } from "../IconButton/IconButton";
import { Tooltip } from "../../overlays/Tooltip/Tooltip";
import { Toolbar } from "./Toolbar";

const actions = [
  { label: "Bold", icon: "bold" },
  { label: "Italic", icon: "italic" },
  { label: "Underline", icon: "underline" },
  { label: "Strikethrough", icon: "strikethrough" },
  { label: "Code", icon: "code" },
  { label: "Link", icon: "link" },
] as const;

const meta = {
  title: "Actions/Toolbar",
  id: "components-toolbar",
  component: Toolbar,
  args: { label: "Formatting", children: null },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Tab into the toolbar and move with the arrow keys, Home and End, or hover the buttons: one tooltip glides between them and blur-swaps its text. */
export const Default: Story = {
  render: function Render(args) {
    const [action, setAction] = useState("");
    return <div className="grid justify-items-center gap-4"><Toolbar {...args}>{actions.map(({ label, icon }) => <Tooltip key={label} label={label}>{(trigger) => <IconButton {...trigger} label={label} icon={icon} variant="ghost" size="sm" onClick={() => setAction(label)} />}</Tooltip>)}</Toolbar><output className="text-label text-muted">{action}</output><Button variant="secondary" size="sm">Next</Button></div>;
  },
};

export const Vertical: Story = { ...Default, args: { orientation: "vertical" } };

export const WithDisabledAction: Story = {
  render: (args) => <Toolbar {...args}><Button size="sm" variant="ghost">Copy</Button><Button size="sm" variant="ghost" disabled>Paste</Button><Button size="sm" variant="ghost">Share</Button></Toolbar>,
};

export const Usage: Story = {
  render: () => <ToolbarDemo />,
};

export const VerticalUsage: Story = {
  render: () => <ToolbarVerticalDemo />,
};

export const TooltipsUsage: Story = {
  render: () => <ToolbarTooltipsDemo />,
};

export const DisabledUsage: Story = {
  render: () => <ToolbarDisabledDemo />,
};
