import { DrawerDemo } from "./demos/DrawerDemo";
import { DrawerLeftDemo } from "./demos/DrawerLeftDemo";
import { DrawerLongContentDemo } from "./demos/DrawerLongContentDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Button } from "../../actions/Button/Button";
import { Drawer } from "./Drawer";

const meta = {
  title: "Overlays/Drawer",
  id: "components-drawer",
  component: Drawer,
  parameters: { layout: "fullscreen" },
  args: {
    open: false,
    onOpenChange: fn(),
    title: "Project details",
    children: (
      <div className="space-y-3 text-body">
        <p>Keep notes, files and conversations together in one workspace.</p>
        <p className="text-muted">Only people invited to this project can view these details.</p>
      </div>
    ),
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    function onOpenChange(open: boolean) {
      args.onOpenChange(open);
      updateArgs({ open });
    }
    return (
      <div className="grid min-h-screen place-items-center">
        <Button aria-haspopup="dialog" aria-expanded={args.open} onClick={() => onOpenChange(true)}>Open drawer</Button>
        <Drawer {...args} onOpenChange={onOpenChange}>
          <div className="space-y-5">
            {args.children}
            <Button onClick={() => onOpenChange(false)}>Done</Button>
          </div>
        </Drawer>
      </div>
    );
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Open the drawer, then drag its header toward the edge, press Close or Escape, or click the backdrop; focus returns to the button. */
export const Default: Story = {};

export const Left: Story = {
  args: { side: "left" },
};

export const LongContent: Story = {
  args: {
    title: "Project activity",
    children: (
      <ol role="list" className="space-y-5">
        {Array.from({ length: 20 }, (_, i) => (
          <li key={i} className="text-body">
            <p className="font-medium">Draft {i + 1} reviewed</p>
            <p className="text-muted">The latest changes are ready for the next review.</p>
          </li>
        ))}
      </ol>
    ),
  },
};

export const Usage: Story = {
  render: () => <DrawerDemo />,
};

export const LeftUsage: Story = {
  render: () => <DrawerLeftDemo />,
};

export const LongContentUsage: Story = {
  render: () => <DrawerLongContentDemo />,
};
