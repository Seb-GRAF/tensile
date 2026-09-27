import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "../layout/Card";
import { Skeleton } from "./Skeleton";

const meta = {
  title: "Feedback/Skeleton",
  id: "components-skeleton",
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A list item while it loads: the avatar and both lines pulse every 1.6 s; with reduced motion they hold still. */
export const Default: Story = {
  render: () => (
    <Card className="flex w-80 items-center gap-3 p-4">
      <Skeleton className="size-10 shrink-0 rounded-full" />
      <div className="grid flex-1 gap-2">
        <Skeleton className="h-4 w-48 rounded-full" />
        <Skeleton className="h-3 w-32 rounded-full" />
      </div>
    </Card>
  ),
};
