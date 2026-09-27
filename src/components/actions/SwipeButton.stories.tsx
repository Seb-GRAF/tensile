import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { SwipeButton, type SwipeButtonProps } from "./SwipeButton";

function StatefulSwipeButton({
  onConfirmedChange,
  ...props
}: SwipeButtonProps & { onConfirmedChange: (confirmed: boolean) => void }) {
  const [confirmed, setConfirmed] = useState(props.confirmed);
  return (
    <SwipeButton
      {...props}
      confirmed={confirmed}
      onConfirm={() => {
        props.onConfirm();
        setConfirmed(true);
        onConfirmedChange(true);
        setTimeout(() => {
          setConfirmed(false);
          onConfirmedChange(false);
        }, 1500);
      }}
    />
  );
}

const meta = {
  title: "Actions/SwipeButton",
  id: "components-swipebutton",
  component: SwipeButton,
  args: { confirmed: false, onConfirm: fn() },
} satisfies Meta<typeof SwipeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drag the knob to the end, or focus the button and press Enter or Space, to confirm; let go early and it springs home. The done state resets after 1.5 s. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-70 max-w-full">
        <StatefulSwipeButton {...args} onConfirmedChange={(confirmed) => updateArgs({ confirmed })} />
      </div>
    );
  },
};
