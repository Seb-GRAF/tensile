import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { ColorSwatches } from "./ColorSwatches";

const meta = {
  title: "Inputs/ColorSwatches",
  id: "components-colorswatches",
  component: ColorSwatches,
  args: {
    options: [
      { value: "black", label: "Black", color: "#161615" },
      { value: "sand", label: "Sand", color: "#d8ccb6" },
      { value: "sage", label: "Sage", color: "#95a98c" },
      { value: "ocean", label: "Ocean", color: "#2e5e8c" },
      { value: "coral", label: "Coral", color: "#e8715f" },
    ],
    value: "sand",
    onValueChange: fn(),
  },
} satisfies Meta<typeof ColorSwatches>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click a swatch or Tab in and use the arrow keys: the ring stretches toward the new swatch, then catches up. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <ColorSwatches
        {...args}
        onValueChange={(value) => {
          args.onValueChange(value);
          updateArgs({ value });
        }}
      />
    );
  },
};
