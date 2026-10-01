import { TabsSegmentedDemo } from "./demos/TabsSegmentedDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Button } from "../../actions/Button/Button";
import { Avatar } from "../../data-display/Avatar/Avatar";
import { DescriptionList } from "../../data-display/DescriptionList/DescriptionList";
import { List } from "../../data-display/List/List";
import { Card } from "../../layout/Card/Card";
import { Tabs } from "./Tabs";
import { TabsExample } from "./demos/TabsExample";
import exampleSource from "./demos/TabsExample.tsx?raw";

const members = [
  { id: "maya", title: "Maya Lindqvist", description: "maya.lindqvist@northwind.io", trailing: "Owner" },
  { id: "jonas", title: "Jonas Okafor", description: "jonas.okafor@northwind.io", trailing: "Editor" },
  { id: "priya", title: "Priya Raman", description: "priya.raman@northwind.io", trailing: "Editor" },
  { id: "leo", title: "Léo Martin", description: "leo.martin@northwind.io", trailing: "Viewer" },
];

const meta = {
  title: "Navigation/Tabs",
  id: "components-tabs",
  component: Tabs,
  parameters: { layout: "padded" },
  args: {
    items: [
      { value: "overview", label: "Overview", content: <div className="grid gap-3"><h2 className="font-medium">Project overview</h2><p className="text-label text-muted">Keep track of the team's work and upcoming milestones.</p><Button size="sm">View activity</Button></div> },
      {
        value: "members",
        label: "Team members",
        content: (
          <div className="grid gap-3">
            <h2 className="font-medium">Team members</h2>
            <p className="text-label text-muted">Invite people and manage their access to the project.</p>
            <List items={members.map((member) => ({ ...member, leading: <Avatar name={member.title} /> }))} />
            <Button size="sm">Invite a member</Button>
          </div>
        ),
      },
      {
        value: "settings",
        label: "Settings",
        content: (
          <div className="grid gap-3">
            <h2 className="font-medium">Project settings</h2>
            <p className="text-label text-muted">Choose the preferences that apply to everyone.</p>
            <DescriptionList items={[{ label: "Visibility", value: "Only invited members" }, { label: "Time zone", value: "Central European Time (UTC+1)" }]} />
            <Button size="sm">Edit preferences</Button>
          </div>
        ),
      },
    ],
    value: "overview",
    onValueChange: fn(),
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Card className="mx-auto w-96 max-w-[calc(100vw-2rem)] overflow-clip p-5">
        <Tabs {...args} onValueChange={(value) => { args.onValueChange?.(value); updateArgs({ value }); }} />
      </Card>
    );
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Choose a tab by click or with the arrow keys: the panel slides in from the chosen tab's side while its height springs, and Tab moves into it. */
export const Default: Story = {};

export const Segmented: Story = { args: { variant: "segmented" } };

export const Usage: Story = {
  render: () => <div style={{ maxWidth: 400 }}><TabsExample /></div>,
  parameters: { docs: { source: { code: exampleSource, language: "tsx" } } },
};

export const SegmentedUsage: Story = {
  render: () => <TabsSegmentedDemo />,
};
