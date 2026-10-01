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
        icon: <Icon name="download" />,
        content: "Download albums and playlists on up to five devices. They stay playable as long as you go online once every 30 days.",
      },
      {
        value: "plan",
        label: "How do I change my plan, and when does the new price start to apply?",
        icon: <Icon name="creditCard" />,
        content: "Open Account, then Plan. Upgrades apply right away; a downgrade starts on your next billing date.",
      },
      {
        value: "family",
        label: "Can I share my account?",
        icon: <Icon name="users" />,
        content: "The Family plan covers up to six people in one home, each with their own library and recommendations.",
      },
      {
        value: "cancel",
        label: "How do I cancel?",
        icon: <Icon name="circleX" />,
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
