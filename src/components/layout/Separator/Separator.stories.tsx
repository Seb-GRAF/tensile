import { SeparatorDemo } from "./demos/SeparatorDemo";
import { SeparatorVerticalDemo } from "./demos/SeparatorVerticalDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "../Card/Card";
import { Separator } from "./Separator";

const meta = {
  title: "Layout/Separator",
  id: "components-separator",
  component: Separator,
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A vertical rule between two details, a horizontal one between two blocks, and one on ink, where the line turns ink-3. */
export const Default: Story = {
  render: () => (
    <div className="grid w-80 gap-4">
      <Card className="p-5">
        <h2 className="text-body font-semibold">Quarterly report</h2>
        <div className="mt-1 flex items-center gap-2 text-label text-muted">
          <span>PDF, 2.4 MB</span>
          <Separator orientation="vertical" aria-hidden />
          <span>Edited 2 hours ago</span>
        </div>
        <Separator className="my-4" />
        <p className="text-label">Revenue grew 12% on the quarter, led by the new annual plans.</p>
      </Card>
      <Card tone="ink" className="p-5">
        <h2 className="text-body font-semibold">Pro plan</h2>
        <p className="mt-1 text-label text-paper/55">Renews on October 12</p>
        <Separator className="my-4" />
        <p className="text-label">3 of 5 seats in use</p>
      </Card>
    </div>
  ),
};

export const Usage: Story = {
  render: () => <SeparatorDemo />,
};

export const VerticalUsage: Story = {
  render: () => <SeparatorVerticalDemo />,
};
