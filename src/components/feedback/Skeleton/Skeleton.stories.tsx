import { SkeletonDemo } from "./demos/SkeletonDemo";
import { SkeletonCardDemo } from "./demos/SkeletonCardDemo";
import { SkeletonMediaDemo } from "./demos/SkeletonMediaDemo";
import { SkeletonListDemo } from "./demos/SkeletonListDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "../../layout/Card/Card";
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
      <Skeleton variant="circle" className="w-10" />
      <Skeleton variant="text" lines={2} className="flex-1" />
    </Card>
  ),
};

export const Usage: Story = {
  render: () => <SkeletonDemo />,
};

export const CardUsage: Story = {
  render: () => <SkeletonCardDemo />,
};

export const MediaUsage: Story = {
  render: () => <SkeletonMediaDemo />,
};

export const ListUsage: Story = {
  render: () => <SkeletonListDemo />,
};
