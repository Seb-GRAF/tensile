import { CardDemo } from "./demos/CardDemo";
import { CardInkDemo } from "./demos/CardInkDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link } from "../../navigation/Link/Link";
import { Card } from "./Card";
import { Separator } from "../Separator/Separator";

const meta = {
  title: "Layout/Card",
  id: "components-card",
  component: Card,
  args: { className: "w-80 p-5" },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Press Tab to focus the link; the padding comes from `className`. */
export const Default: Story = {
  args: {
    children: (
      <>
        <h2 className="text-body font-semibold">Storage</h2>
        <p className="mt-1 text-label text-muted">
          You've used 18.4 GB of 25 GB. Files in the trash count toward it until you empty it.
        </p>
        <p className="mt-4 text-label">
          <Link href="/settings/storage">Manage storage</Link>
        </p>
      </>
    ),
  },
};

/** Press Tab to focus the link: on ink, the focus ring is paper and the separator ink-3. */
export const Ink: Story = {
  args: {
    tone: "ink",
    children: (
      <>
        <h2 className="text-body font-semibold">Pro plan</h2>
        <p className="mt-1 text-label text-paper/55">Renews on October 12 for $12 a month, billed to the card ending in 4242.</p>
        <Separator className="my-4" />
        <p className="text-label">
          <Link href="/settings/billing">Change plan</Link>
        </p>
      </>
    ),
  },
};

export const Usage: Story = {
  render: () => <CardDemo />,
};

export const InkUsage: Story = {
  render: () => <CardInkDemo />,
};
