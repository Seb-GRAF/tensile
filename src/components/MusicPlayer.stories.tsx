import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { MusicPlayer } from "./MusicPlayer";

const meta = {
  component: MusicPlayer,
  args: { title: "Winter Breeze", artist: "Arulo", duration: 140, expanded: false, onExpandedChange: fn() },
} satisfies Meta<typeof MusicPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the island to open the player; click the artwork or press Escape to close it. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <MusicPlayer
        {...args}
        onExpandedChange={(expanded) => {
          args.onExpandedChange(expanded);
          updateArgs({ expanded });
        }}
      />
    );
  },
};
