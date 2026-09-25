import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Accordion } from "./Accordion";

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
  component: Accordion,
  parameters: { layout: "padded" },
  args: {
    items: [
      {
        value: "offline",
        label: "Can I listen offline?",
        icon: <Icon paths={["M12 15V3", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "m7 10 5 5 5-5"]} />,
        content: "Download albums and playlists on up to five devices. They stay playable as long as you go online once every 30 days.",
      },
      {
        value: "plan",
        label: "How do I change my plan?",
        icon: <Icon paths={["M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z", "M2 10h20"]} />,
        content: "Open Account, then Plan. Upgrades apply right away; a downgrade starts on your next billing date.",
      },
      {
        value: "family",
        label: "Can I share my account?",
        icon: (
          <Icon
            paths={[
              "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
              "M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
              "M22 21v-2a4 4 0 0 0-3-3.87",
              "M16 3.13a4 4 0 0 1 0 7.75",
            ]}
          />
        ),
        content: "The Family plan covers up to six people in one home, each with their own library and recommendations.",
      },
      {
        value: "cancel",
        label: "How do I cancel?",
        icon: <Icon paths={["M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0", "m15 9-6 6", "m9 9 6 6"]} />,
        content: "Cancel any time from Account. You keep Premium until the end of the period you paid for.",
      },
    ],
    value: "offline",
    onValueChange: fn(),
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click a question to open it (the open one closes) and again to close it, or Tab to a header, move with ArrowUp, ArrowDown, Home and End, and toggle with Enter or Space. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Accordion
        {...args}
        onValueChange={(value) => {
          args.onValueChange(value);
          updateArgs({ value });
        }}
      />
    );
  },
};
