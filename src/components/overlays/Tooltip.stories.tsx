import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Tooltip } from "./Tooltip";

function Icon({ paths }: { paths: string[] }) {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

const meta = {
  title: "Overlays/Tooltip",
  id: "components-tooltip",
  component: Tooltip,
  args: {
    label: "Formatting",
    onAction: fn(),
    actions: [
      { label: "Bold", icon: <Icon paths={["M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"]} /> },
      { label: "Italic", icon: <Icon paths={["M19 4h-9", "M14 20H5", "M15 4 9 20"]} /> },
      { label: "Underline", icon: <Icon paths={["M6 4v6a6 6 0 0 0 12 0V4", "M4 20h16"]} /> },
      { label: "Strikethrough", icon: <Icon paths={["M16 4H9a3 3 0 0 0-2.83 4", "M14 12a4 4 0 0 1 0 8H6", "M4 12h16"]} /> },
      { label: "Code", icon: <Icon paths={["m16 18 6-6-6-6", "m8 6-6 6 6 6"]} /> },
      {
        label: "Link",
        icon: (
          <Icon
            paths={[
              "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
              "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
            ]}
          />
        ),
      },
    ],
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Hover a button, or Tab in and use the arrow keys: the tooltip glides to each button and blur-swaps its text; leave the toolbar or press Escape to hide it. */
export const Default: Story = {};
