import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { CommandPalette } from "./CommandPalette";

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
  title: "Actions/CommandPalette",
  id: "components-commandpalette",
  component: CommandPalette,
  args: {
    onSelect: fn(),
    commands: [
      { label: "Share listening stats", icon: <Icon paths={["M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8", "m16 6-4-4-4 4", "M12 2v13"]} /> },
      {
        label: "Shuffle library",
        icon: (
          <Icon
            paths={[
              "m18 14 4 4-4 4",
              "m18 2 4 4-4 4",
              "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-7.6a4 4 0 0 1 3.3-1.7H22",
              "M2 6h1.972a4 4 0 0 1 3.6 2.2",
              "M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45",
            ]}
          />
        ),
      },
      { label: "Sleep timer", icon: <Icon paths={["M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"]} /> },
      { label: "Search artists", icon: <Icon paths={["M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0"]} /> },
      { label: "Add to queue", icon: <Icon paths={["M11 12H3", "M16 6H3", "M16 18H3", "M18 9v6", "M21 12h-6"]} /> },
    ],
  },
} satisfies Meta<typeof CommandPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the field or press ⌘K, type to filter ("sh", "sha"), then use the arrow keys and Enter. */
export const Default: Story = {};
