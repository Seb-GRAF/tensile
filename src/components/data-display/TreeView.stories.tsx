import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Card } from "../layout/Card";
import { Icon } from "./Icon";
import { TreeView } from "./TreeView";

const folder = (
  <Icon size={16}>
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </Icon>
);

const file = (
  <Icon size={16}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </Icon>
);

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

/** Click a row to select it and a chevron to open or close its folder; or Tab in, move with ArrowUp, ArrowDown, Home and End, open, enter and leave folders with ArrowRight and ArrowLeft, type a name to jump, and select with Enter or Space. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Card className="w-72 p-2">
        <TreeView
          {...args}
          onValueChange={(value) => {
            args.onValueChange(value);
            updateArgs({ value });
          }}
          onExpandedChange={(expanded) => {
            args.onExpandedChange(expanded);
            updateArgs({ expanded });
          }}
        />
      </Card>
    );
  },
};

/** The selected file is inside closed folders, so the pill rests on the nearest visible folder; open src, then components, and it slides down to CommandPalette.tsx. */
export const SelectionInClosedFolder: Story = {
  ...Default,
  args: { value: "src/components/CommandPalette.tsx", expanded: [] },
};
