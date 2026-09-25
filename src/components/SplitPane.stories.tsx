import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { SplitPane, type SplitPaneProps } from "./SplitPane";

function StatefulSplitPane(props: SplitPaneProps) {
  const [value, setValue] = useState(props.value);
  return (
    <SplitPane
      {...props}
      value={value}
      onValueChange={(value) => {
        setValue(value);
        props.onValueChange(value);
      }}
    />
  );
}

const meta = {
  component: SplitPane,
  args: {
    left: (
      <div className="p-5">
        <p className="text-[11px] font-medium text-muted">Playlists</p>
        <ul className="mt-3 space-y-2 text-[15px] font-medium text-ink">
          <li className="truncate">Morning run</li>
          <li className="truncate">Deep focus</li>
          <li className="truncate">Late drive</li>
        </ul>
      </div>
    ),
    right: (
      <div className="p-5">
        <p className="text-[11px] font-medium text-muted">Playlist</p>
        <p className="mt-3 text-[15px] font-semibold text-ink">Deep focus</p>
        <p className="mt-1 text-[13px] text-muted">Long, quiet tracks without vocals. 42 songs, 2 h 51 min.</p>
      </div>
    ),
    value: 0.4,
    onValueChange: fn(),
  },
  argTypes: { value: { control: { type: "range", min: 0, max: 1, step: 0.01 } } },
} satisfies Meta<typeof SplitPane>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drag the divider, or Tab to it and press ←, →, Home and End; dragged past either end, it stretches and springs back when you let go. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="h-80 w-[560px]">
        <StatefulSplitPane {...args} onValueChange={(value) => updateArgs({ value })} />
      </div>
    );
  },
};
