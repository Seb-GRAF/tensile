import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Button } from "../actions/Button";
import { Card } from "../layout/Card";
import { Tabs } from "./Tabs";

const meta = {
  title: "Navigation/Tabs",
  id: "components-tabs",
  component: Tabs,
  args: {
    items: [
      { value: "overview", label: "Overview", content: <Card className="grid gap-3 p-5"><h2 className="font-medium">Project overview</h2><p className="text-label text-muted">Keep track of the team's work and upcoming milestones.</p><Button size="sm">View activity</Button></Card> },
      { value: "members", label: "Team members", content: <Card className="grid gap-3 p-5"><h2 className="font-medium">Team members</h2><p className="text-label text-muted">Invite people and manage their access to the project.</p><Button size="sm">Invite a member</Button></Card> },
      { value: "settings", label: "Settings", content: <Card className="grid gap-3 p-5"><h2 className="font-medium">Project settings</h2><p className="text-label text-muted">Choose the preferences that apply to everyone.</p><Button size="sm">Edit preferences</Button></Card> },
    ],
    value: "overview",
    onValueChange: fn(),
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-96 max-w-[calc(100vw-2rem)]">
        <Tabs {...args} onValueChange={(value) => { args.onValueChange(value); updateArgs({ value }); }} />
      </div>
    );
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Segmented: Story = { args: { variant: "segmented" } };
