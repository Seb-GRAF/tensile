import { UnderlineTabsDemo } from "./demos/UnderlineTabsDemo";
import { UnderlineTabsIconsDemo } from "./demos/UnderlineTabsIconsDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { UnderlineTabs } from "./UnderlineTabs";

const meta = {
  title: "Navigation/UnderlineTabs",
  id: "components-underlinetabs",
  component: UnderlineTabs,
  args: {
    options: [
      { value: "overview", label: "Overview" },
      { value: "specs", label: "Specs" },
      { value: "reviews", label: "Reviews" },
      { value: "release-notes", label: "Release notes" },
    ],
    value: "specs",
    onValueChange: fn(),
  },
} satisfies Meta<typeof UnderlineTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click a tab, or Tab in and use the arrow keys, Home and End: the underline stretches toward the new tab, then catches up. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <UnderlineTabs
        {...args}
        onValueChange={(value) => {
          args.onValueChange(value);
          updateArgs({ value });
        }}
      />
    );
  },
};

export const Usage: Story = {
  render: () => <UnderlineTabsDemo />,
};

export const IconsUsage: Story = {
  render: () => <UnderlineTabsIconsDemo />,
};
