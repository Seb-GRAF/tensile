import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { ActionMenu } from "./ActionMenu";

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
  component: ActionMenu,
  args: {
    onAction: fn(),
    actions: [
      { label: "Add to queue", icon: <Icon paths={["M11 12H3", "M16 6H3", "M16 18H3", "M18 9v6", "M21 12h-6"]} /> },
      { label: "Go to artist", icon: <Icon paths={["M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0"]} /> },
      { label: "Share", icon: <Icon paths={["M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8", "m16 6-4-4-4 4", "M12 2v13"]} /> },
      { label: "Download", icon: <Icon paths={["M12 15V3", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "m7 10 5 5 5-5"]} /> },
      {
        label: "Remove from library",
        icon: <Icon paths={["M3 6h18", "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]} />,
      },
    ],
  },
} satisfies Meta<typeof ActionMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click More, or focus it and press Enter, Space or ArrowDown (ArrowUp starts on the last action); arrows move, Enter or Space runs, Escape closes. */
export const Default: Story = {};
