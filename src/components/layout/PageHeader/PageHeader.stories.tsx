import { PageHeaderDemo } from "./demos/PageHeaderDemo";
import { PageHeaderActionsDemo } from "./demos/PageHeaderActionsDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../actions/Button/Button";
import { Link } from "../../navigation/Link/Link";
import { PageHeader } from "./PageHeader";

const meta = {
  title: "Layout/PageHeader",
  id: "components-pageheader",
  component: PageHeader,
  parameters: { layout: "padded" },
  args: {
    title: "Your playlists",
    description: "Music for every part of your day.",
    breadcrumbs: <Link href="#library">Library</Link>,
    actions: <><Button variant="secondary">Import</Button><Button>Create playlist</Button></>,
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;
/** A page title with its description, breadcrumbs and actions; in a narrow container the actions wrap below the title. */
export const Default: Story = {};

export const Usage: Story = {
  render: () => <PageHeaderDemo />,
};

export const ActionsUsage: Story = {
  render: () => <PageHeaderActionsDemo />,
};
