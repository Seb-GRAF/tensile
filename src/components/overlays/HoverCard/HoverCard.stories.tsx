import { HoverCardDemo } from "./demos/HoverCardDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Avatar } from "../../data-display/Avatar/Avatar";
import { Link } from "../../navigation/Link/Link";
import { HoverCard } from "./HoverCard";

const meta = {
  title: "Overlays/HoverCard",
  id: "components-hovercard",
  component: HoverCard,
  args: {
    open: false,
    onOpenChange: fn(),
    content: (
      <div className="grid w-72 gap-3 p-4">
        <Avatar name="Ada Okafor" size="lg" />
        <div>
          <p className="text-body font-semibold">Ada Okafor</p>
          <p className="text-label text-muted">@ada · Staff engineer, Payments platform</p>
        </div>
        <p className="text-label">Builds the ledger and the reconciliation jobs behind every payout. Writing at <Link href="https://example.com/ada">ada.dev</Link>.</p>
        <p className="text-label text-muted"><span className="font-semibold text-ink">2,418</span> followers · <span className="font-semibold text-ink">186</span> following</p>
      </div>
    ),
    children: (trigger) => <Link {...trigger} href="https://example.com/ada" className="text-body">@ada</Link>,
  },
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Rest the pointer on @ada or Tab to it: the card opens below; move into it and it stays; Tab reaches its link; leave, blur or press Escape to close it. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <HoverCard
        {...args}
        onOpenChange={(open) => {
          args.onOpenChange?.(open);
          updateArgs({ open });
        }}
      />
    );
  },
};

/** At the top right of the viewport the card shifts left to stay inside it; at the bottom it opens above the trigger. */
export const NearTheEdges: Story = {
  parameters: { layout: "fullscreen" },
  render: ({ content, children }) => (
    <div className="min-h-dvh">
      <div className="fixed top-2 right-2"><HoverCard content={content}>{children}</HoverCard></div>
      <div className="fixed bottom-2 left-2"><HoverCard content={content}>{children}</HoverCard></div>
    </div>
  ),
};

export const Usage: Story = {
  render: () => <HoverCardDemo />,
};
