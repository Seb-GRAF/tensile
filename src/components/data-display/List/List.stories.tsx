import { ListDemo } from "./demos/ListDemo";
import { ListSlotsDemo } from "./demos/ListSlotsDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "../../layout/Card/Card";
import { Icon } from "../Icon/Icon";
import { List } from "./List";

const file = (
  <>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </>
);

const image = (
  <>
    <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </>
);

const video = (
  <>
    <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
    <path d="M4 6h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
  </>
);

const spreadsheet = (
  <>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M8 13h2" />
    <path d="M14 13h2" />
    <path d="M8 17h2" />
    <path d="M14 17h2" />
  </>
);

const meta = {
  title: "Data display/List",
  id: "components-list",
  component: List,
  parameters: { layout: "padded" },
  args: {
    label: "Recent files",
    items: [
      {
        id: "report",
        title: "Q3 revenue report.pdf",
        description: "PDF · Edited 2 hours ago",
        leading: <Icon size={20}>{file}</Icon>,
        trailing: "2.4 MB",
      },
      {
        id: "guidelines",
        title: "Brand guidelines 2026, final version with legal and marketing review comments.pdf",
        description: "PDF · Edited yesterday",
        leading: <Icon size={20}>{file}</Icon>,
        trailing: "18.6 MB",
      },
      {
        id: "hero",
        title: "Homepage hero.png",
        description: "Image · Edited Sep 24",
        leading: <Icon size={20}>{image}</Icon>,
        trailing: "840 KB",
      },
      {
        id: "interviews",
        title: "Customer interviews.mp4",
        description: "Video · Edited Sep 12",
        leading: <Icon size={20}>{video}</Icon>,
        trailing: "1.2 GB",
      },
      {
        id: "budget",
        title: "Budget 2027.xlsx",
        description: "Spreadsheet · Edited Aug 30",
        leading: <Icon size={20}>{spreadsheet}</Icon>,
        trailing: "96 KB",
      },
    ],
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A file list in a card; the long title truncates to one line and the sizes stay whole, also in a narrow window. */
export const Default: Story = {
  render: (args) => (
    <Card className="mx-auto max-w-lg p-5">
      <List {...args} />
    </Card>
  ),
};

export const Usage: Story = {
  render: () => <ListDemo />,
};

export const SlotsUsage: Story = {
  render: () => <ListSlotsDemo />,
};
