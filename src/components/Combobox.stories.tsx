import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Combobox } from "./Combobox";

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
  component: Combobox,
  args: {
    options: [
      {
        value: "added",
        label: "Date added",
        icon: <Icon paths={["M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z", "M16 2v4", "M8 2v4", "M3 10h18"]} />,
      },
      { value: "title", label: "Title", icon: <Icon paths={["M4 7V4h16v3", "M9 20h6", "M12 4v16"]} /> },
      { value: "artist", label: "Artist", icon: <Icon paths={["M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0"]} /> },
      { value: "album", label: "Album", icon: <Icon paths={["M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0", "M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0"]} /> },
      { value: "duration", label: "Duration", icon: <Icon paths={["M10 2h4", "m12 14 3-3", "M20 14a8 8 0 1 1-16 0 8 8 0 0 1 16 0"]} /> },
    ],
    value: null,
    onValueChange: fn(),
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the field or press ArrowDown to open, or type to filter ("a", then "al"); the arrows move, Enter or a click picks, Escape closes. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Combobox
        {...args}
        onValueChange={(value) => {
          args.onValueChange(value);
          updateArgs({ value });
        }}
      />
    );
  },
};
