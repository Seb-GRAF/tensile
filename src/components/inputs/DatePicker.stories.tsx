import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { DatePicker } from "./DatePicker";

const meta = {
  title: "Inputs/DatePicker",
  id: "components-datepicker",
  component: DatePicker,
  args: { value: "2026-09-18", onValueChange: fn() },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click a day, or Tab in, move with the arrow keys, Page Up/Down and Home/End, and press Enter or Space: the pill slides to the picked day, and months blur-swap in the direction you move. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <DatePicker
        {...args}
        onValueChange={(value) => {
          args.onValueChange(value);
          updateArgs({ value });
        }}
      />
    );
  },
};
