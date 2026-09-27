import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Dialog } from "./Dialog";

const meta = {
  title: "Overlays/Dialog",
  id: "components-dialog",
  component: Dialog,
  parameters: { layout: "padded" },
  args: {
    open: false,
    onOpenChange: fn(),
    children: (
      <>
        <p className="mt-1 text-sm text-muted">Invite people to edit this playlist. They get an email with a link to it.</p>
        <div className="mt-4 flex gap-2">
          <input
            type="email"
            aria-label="Email"
            placeholder="name@example.com"
            className="h-11 min-w-0 grow rounded-full bg-hover px-4 text-sm text-ink outline-offset-2 placeholder:text-muted focus-visible:outline-2 focus-visible:outline-ink"
          />
          <button
            type="button"
            className="h-11 shrink-0 rounded-full bg-ink px-5 text-sm font-medium text-paper outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
          >
            Invite
          </button>
        </div>
      </>
    ),
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click Open dialog: the button flies to the middle while it grows into the dialog. Tab wraps inside it; Escape, the backdrop or the × close it, and focus goes back to the button. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Dialog
        {...args}
        onOpenChange={(open) => {
          args.onOpenChange(open);
          updateArgs({ open });
        }}
      />
    );
  },
};
