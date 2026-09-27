import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Rating } from "./Rating";

const meta = {
  title: "Inputs/Rating",
  id: "components-rating",
  component: Rating,
  args: { value: 3, onValueChange: fn() },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Hover the stars to preview and click one to rate, or Tab in and press the arrow keys, Home and End: the lime fill slides under the outlines. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Rating
        {...args}
        onValueChange={(value) => {
          args.onValueChange(value);
          updateArgs({ value });
        }}
      />
    );
  },
};
