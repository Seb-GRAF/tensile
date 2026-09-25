import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { SidebarNav } from "./SidebarNav";

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
  component: SidebarNav,
  args: {
    items: [
      {
        value: "home",
        label: "Home",
        icon: (
          <Icon
            paths={[
              "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
              "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
            ]}
          />
        ),
      },
      { value: "search", label: "Search", icon: <Icon paths={["M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0", "m21 21-4.3-4.3"]} /> },
      { value: "library", label: "Library", icon: <Icon paths={["m16 6 4 14", "M12 6v14", "M8 8v12", "M4 4v16"]} /> },
      { value: "downloads", label: "Downloads", icon: <Icon paths={["M12 15V3", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "m7 10 5 5 5-5"]} /> },
      { value: "profile", label: "Profile", icon: <Icon paths={["M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0"]} /> },
    ],
    value: "home",
    onValueChange: fn(),
  },
} satisfies Meta<typeof SidebarNav>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click an item, or Tab in, move focus with ArrowUp and ArrowDown and open it with Enter or Space: the ink pill stretches as it slides. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <SidebarNav
        {...args}
        onValueChange={(value) => {
          args.onValueChange(value);
          updateArgs({ value });
        }}
      />
    );
  },
};
