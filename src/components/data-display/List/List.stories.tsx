import { ListDemo } from "./demos/ListDemo";
import { ListSlotsDemo } from "./demos/ListSlotsDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "../../layout/Card/Card";
import { Icon } from "../Icon/Icon";
import { List } from "./List";

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
        leading: <Icon name="fileText" size={20} />,
        trailing: "2.4 MB",
      },
      {
        id: "guidelines",
        title: "Brand guidelines 2026, final version with legal and marketing review comments.pdf",
        description: "PDF · Edited yesterday",
        leading: <Icon name="fileText" size={20} />,
        trailing: "18.6 MB",
      },
      { id: "hero", title: "Homepage hero.png", description: "Image · Edited Sep 24", leading: <Icon name="image" size={20} />, trailing: "840 KB" },
      {
        id: "interviews",
        title: "Customer interviews.mp4",
        description: "Video · Edited Sep 12",
        leading: <Icon name="video" size={20} />,
        trailing: "1.2 GB",
      },
      {
        id: "budget",
        title: "Budget 2027.xlsx",
        description: "Spreadsheet · Edited Aug 30",
        leading: <Icon name="fileSpreadsheet" size={20} />,
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
