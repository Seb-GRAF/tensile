import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { RadioGroup } from "./RadioGroup";

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
  title: "Inputs/RadioGroup",
  id: "components-radiogroup",
  component: RadioGroup,
  args: {
    options: [
      {
        value: "computer",
        label: "This computer",
        icon: <Icon paths={["M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"]} />,
      },
      {
        value: "headphones",
        label: "Headphones",
        icon: <Icon paths={["M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"]} />,
      },
      {
        value: "speaker",
        label: "Kitchen speaker",
        icon: (
          <Icon
            paths={[
              "M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z",
              "M12 6h.01",
              "M16 14a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
              "M12 14h.01",
            ]}
          />
        ),
      },
      {
        value: "tv",
        label: "Living room TV",
        icon: <Icon paths={["M4 7h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z", "m17 2-5 5-5-5"]} />,
      },
    ],
    value: null,
    label: "Audio output",
    onValueChange: fn(),
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click an option or Tab in and use the arrow keys: the dot grows out of the first choice, then stretches as it slides. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <RadioGroup
        {...args}
        onValueChange={(value) => {
          args.onValueChange(value);
          updateArgs({ value });
        }}
      />
    );
  },
};
