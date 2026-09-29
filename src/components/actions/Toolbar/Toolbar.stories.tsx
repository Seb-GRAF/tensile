import { ToolbarDemo } from "./demos/ToolbarDemo";
import { ToolbarVerticalDemo } from "./demos/ToolbarVerticalDemo";
import { ToolbarTooltipsDemo } from "./demos/ToolbarTooltipsDemo";
import { ToolbarDisabledDemo } from "./demos/ToolbarDisabledDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../Button/Button";
import { IconButton } from "../IconButton/IconButton";
import { Icon } from "../../data-display/Icon/Icon";
import { Tooltip } from "../../overlays/Tooltip/Tooltip";
import { Toolbar } from "./Toolbar";

const actions = [
  { label: "Bold", path: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" },
  { label: "Italic", path: "M19 4h-9M14 20H5M15 4 9 20" },
  { label: "Underline", path: "M6 4v6a6 6 0 0 0 12 0V4M4 20h16" },
  { label: "Strikethrough", path: "M16 4H9a3 3 0 0 0-2.83 4M14 12a4 4 0 0 1 0 8H6M4 12h16" },
  { label: "Code", path: "m16 18 6-6-6-6m-8 0-6 6 6 6" },
  { label: "Link", path: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" },
];

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
    return <div className="grid justify-items-center gap-4"><Toolbar {...args}>{actions.map(({ label, path }) => <Tooltip key={label} label={label}>{(trigger) => <IconButton {...trigger} label={label} variant="ghost" size="sm" onClick={() => setAction(label)}><Icon size={16}><path d={path} /></Icon></IconButton>}</Tooltip>)}</Toolbar><output className="text-label text-muted">{action}</output><Button variant="secondary" size="sm">Next</Button></div>;
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
