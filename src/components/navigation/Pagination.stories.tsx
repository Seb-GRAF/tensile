import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Pagination } from "./Pagination";

const meta = {
  title: "Navigation/Pagination",
  id: "components-pagination",
  component: Pagination,
  args: { count: 20, value: 1, onValueChange: fn() },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click a page or an arrow, or Tab in and press Enter or Space: the pill slides to the current page, and the numbers blur-swap when the range shifts. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Pagination
        {...args}
        onValueChange={(value) => {
          args.onValueChange(value);
          updateArgs({ value });
        }}
      />
    );
  },
};
