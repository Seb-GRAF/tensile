import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { TabBar } from "./TabBar";

function Icon({ paths, filled = false }: { paths: string[]; filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`size-5 stroke-current ${filled ? "fill-current" : "fill-none"}`}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

const home = ["M3.5 10 12 3.5l8.5 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-4v-6h-6v6H5A1.5 1.5 0 0 1 3.5 19Z"];
const browse = [
  "M3 4.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a1.5 1.5 0 0 1-1.5-1.5Z",
  "M14 4.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a1.5 1.5 0 0 1-1.5-1.5Z",
  "M3 15.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a1.5 1.5 0 0 1-1.5-1.5Z",
  "M14 15.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a1.5 1.5 0 0 1-1.5-1.5Z",
];
const liked = [
  "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
];
const profile = ["M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z", "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2Z"];

const meta = {
  title: "Navigation/TabBar",
  id: "components-tabbar",
  component: TabBar,
  parameters: { layout: "fullscreen" },
  args: {
    items: [
      { value: "home", label: "Home", icon: <Icon paths={home} />, activeIcon: <Icon paths={home} filled /> },
      { value: "browse", label: "Browse", icon: <Icon paths={browse} />, activeIcon: <Icon paths={browse} filled /> },
      { value: "liked", label: "Liked", icon: <Icon paths={liked} />, activeIcon: <Icon paths={liked} filled /> },
      { value: "profile", label: "Profile", icon: <Icon paths={profile} />, activeIcon: <Icon paths={profile} filled /> },
    ],
    value: "home",
    onValueChange: fn(),
  },
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click a tab, or Tab in and use the arrow keys: the pill slides behind the icons and the outline icon blurs into the filled one. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="flex h-[600px] w-[390px] flex-col justify-end bg-paper p-4">
          <TabBar
            {...args}
            onValueChange={(value) => {
              args.onValueChange(value);
              updateArgs({ value });
            }}
          />
        </div>
      </div>
    );
  },
};
