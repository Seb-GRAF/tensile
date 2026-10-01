import { TreeViewDemo } from "./demos/TreeViewDemo";
import { TreeViewCollapsedSelectionDemo } from "./demos/TreeViewCollapsedSelectionDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Card } from "../../layout/Card/Card";
import { Icon } from "../Icon/Icon";
import { TreeView } from "./TreeView";

const folder = <Icon name="folder" size={16} />;

const file = <Icon name="file" size={16} />;

const meta = {
  title: "Data display/TreeView",
  id: "components-treeview",
  component: TreeView,
  parameters: { layout: "padded" },
  args: {
    label: "Project files",
    items: [
      {
        value: "src",
        label: "src",
        icon: folder,
        children: [
          {
            value: "src/components",
            label: "components",
            icon: folder,
            children: [
              { value: "src/components/Button.tsx", label: "Button.tsx", icon: file },
              { value: "src/components/CommandPalette.tsx", label: "CommandPalette.tsx", icon: file },
              { value: "src/components/DateRangePicker.stories.tsx", label: "DateRangePicker.stories.tsx", icon: file },
              { value: "src/components/NotificationList.tsx", label: "NotificationList.tsx", icon: file },
            ],
          },
          {
            value: "src/hooks",
            label: "hooks",
            icon: folder,
            children: [
              { value: "src/hooks/useMeasuredWidthAfterFontsLoad.ts", label: "useMeasuredWidthAfterFontsLoad.ts", icon: file },
              { value: "src/hooks/useSize.ts", label: "useSize.ts", icon: file },
            ],
          },
          { value: "src/index.ts", label: "index.ts", icon: file },
          { value: "src/theme.css", label: "theme.css", icon: file },
        ],
      },
      {
        value: "docs",
        label: "docs",
        icon: folder,
        children: [
          { value: "docs/getting-started.md", label: "getting-started.md", icon: file },
          { value: "docs/migrating-from-version-one-with-codemods.md", label: "migrating-from-version-one-with-codemods.md", icon: file },
        ],
      },
      { value: "package.json", label: "package.json", icon: file },
      { value: "README.md", label: "README.md", icon: file },
    ],
    value: "src/components/Button.tsx",
    onValueChange: fn(),
    expanded: ["src", "src/components"],
    onExpandedChange: fn(),
  },
} satisfies Meta<typeof TreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click a row to select it, which also opens or closes a folder, or click a chevron to open or close a folder without selecting it; or Tab in, move with ArrowUp, ArrowDown, Home and End, open, enter and leave folders with ArrowRight and ArrowLeft, type a name to jump, press Enter to select and open or close, and Space to select only. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Card className="w-72 p-2">
        <TreeView
          {...args}
          onValueChange={(value) => {
            args.onValueChange?.(value);
            updateArgs({ value });
          }}
          onExpandedChange={(expanded) => {
            args.onExpandedChange?.(expanded);
            updateArgs({ expanded });
          }}
        />
      </Card>
    );
  },
};

/** The selected file is inside closed folders, so the pill rests on the nearest visible folder; open src, then components, with their chevrons, and it slides down to CommandPalette.tsx. */
export const SelectionInClosedFolder: Story = {
  ...Default,
  args: { value: "src/components/CommandPalette.tsx", expanded: [] },
};

export const Usage: Story = {
  render: () => <TreeViewDemo />,
};

export const CollapsedSelectionUsage: Story = {
  render: () => <TreeViewCollapsedSelectionDemo />,
};
