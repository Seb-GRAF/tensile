import { AccordionDemo } from "./demos/AccordionDemo";
import { AccordionIconsDemo } from "./demos/AccordionIconsDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Icon } from "../../data-display/Icon/Icon";
import { Accordion } from "./Accordion";

const meta = {
  title: "Layout/Accordion",
  id: "components-accordion",
  component: Accordion,
  parameters: { layout: "padded" },
  args: {
    items: [
      {
        value: "offline",
        label: "Can I listen offline?",
        icon: <Icon size={16}>{["M12 15V3", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "m7 10 5 5 5-5"].map((d) => <path key={d} d={d} />)}</Icon>,
        content: "Download albums and playlists on up to five devices. They stay playable as long as you go online once every 30 days.",
      },
      {
        value: "plan",
        label: "How do I change my plan, and when does the new price start to apply?",
        icon: <Icon size={16}>{["M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z", "M2 10h20"].map((d) => <path key={d} d={d} />)}</Icon>,
        content: "Open Account, then Plan. Upgrades apply right away; a downgrade starts on your next billing date.",
      },
      {
        value: "family",
        label: "Can I share my account?",
        icon: (
          <Icon size={16}>{[
              "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
              "M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
              "M22 21v-2a4 4 0 0 0-3-3.87",
              "M16 3.13a4 4 0 0 1 0 7.75",
            ].map((d) => <path key={d} d={d} />)}</Icon>
        ),
        content: "The Family plan covers up to six people in one home, each with their own library and recommendations.",
      },
      {
        value: "cancel",
        label: "How do I cancel?",
        icon: <Icon size={16}>{["M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0", "m15 9-6 6", "m9 9 6 6"].map((d) => <path key={d} d={d} />)}</Icon>,
        content: "Cancel any time from Account. You keep Premium until the end of the period you paid for.",
      },
    ],
    value: "offline",
    onValueChange: fn(),
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-[360px] max-w-full">
        <Accordion
          {...args}
          onValueChange={(value: string | null | string[]) => {
            args.onValueChange?.(value as never);
            updateArgs({ value });
          }}
        />
      </div>
    );
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click a question to open it (the open one closes) and again to close it, or Tab to a header, move with ArrowUp, ArrowDown, Home and End, and toggle with Enter or Space. */
export const Default: Story = {};

/** Open several questions at once: each header opens or closes only its own section. */
export const Multiple: Story = {
  args: { type: "multiple", value: ["offline", "plan"] },
};

export const Usage: Story = {
  render: () => <AccordionDemo />,
};

export const IconsUsage: Story = {
  render: () => <AccordionIconsDemo />,
};
