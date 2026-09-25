import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { CompareSlider, type CompareSliderProps } from "./CompareSlider";

function Scene({ colors }: { colors: string[] }) {
  const [sky, sun, far, near, front] = colors;
  return (
    <svg viewBox="0 0 480 320" className="size-full">
      <rect width="480" height="320" fill={sky} />
      <circle cx="348" cy="100" r="30" fill={sun} />
      <path d="M0 200 60 150l58 34 78-72 66 58 68-36 70 44 80-40v182H0Z" fill={far} />
      <path d="M0 246c70-34 150-30 224-8s170 10 256-18v100H0Z" fill={near} />
      <path d="M0 290c96-14 200-16 300-6s130 2 180-10v46H0Z" fill={front} />
    </svg>
  );
}

function StatefulCompareSlider(props: CompareSliderProps) {
  const [value, setValue] = useState(props.value);
  return (
    <CompareSlider
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
  component: CompareSlider,
  args: {
    before: <Scene colors={["#dedbd4", "#eeece7", "#c9c5bd", "#b8b4ac", "#a6a29a"]} />,
    after: <Scene colors={["#cde4ee", "#fbe7a1", "#8fa9a3", "#b8f23e", "#2e2e2c"]} />,
    value: 0.5,
    onValueChange: fn(),
  },
  argTypes: { value: { control: { type: "range", min: 0, max: 1, step: 0.01 } } },
} satisfies Meta<typeof CompareSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Press or drag anywhere on the picture, or Tab to the handle and use the arrow keys, Home and End; past either edge the divider stretches and springs back. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <StatefulCompareSlider {...args} onValueChange={(value) => updateArgs({ value })} />;
  },
};
