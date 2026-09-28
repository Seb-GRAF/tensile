import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { WaveformScrubber, type WaveformScrubberProps } from "./WaveformScrubber";

function StatefulWaveformScrubber(props: WaveformScrubberProps) {
  const [value, setValue] = useState(props.value);
  return (
    <WaveformScrubber
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
  title: "Media/WaveformScrubber",
  id: "components-waveformscrubber",
  component: WaveformScrubber,
  args: {
    peaks: [
      0.1, 0.15, 0.19, 0.23, 0.41, 0.42, 0.54, 0.61, 0.7, 0.71, 0.68, 0.86, 0.61, 0.67, 0.7, 0.73, 0.55, 0.43, 0.44,
      0.53, 0.48, 0.46, 0.45, 0.41, 0.45, 0.6, 0.44, 0.52, 0.68, 0.78, 0.56, 0.72, 0.94, 0.81, 0.63, 0.82, 0.93, 0.66,
      0.82, 0.49, 0.65, 0.63, 0.62, 0.43, 0.39, 0.51, 0.54, 0.51, 0.6, 0.59, 0.54, 0.53, 0.69, 0.51, 0.78, 0.7, 0.52,
      0.58, 0.34, 0.39, 0.34, 0.22, 0.16, 0.1,
    ],
    value: 42,
    duration: 140,
    onValueChange: fn(),
  },
} satisfies Meta<typeof WaveformScrubber>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Press or drag along the waveform to scrub, or Tab in and use the arrow keys, Home and End; past either end it stretches and springs back. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <div className="w-90 max-w-[calc(100vw-32px)]"><StatefulWaveformScrubber {...args} onValueChange={(value) => updateArgs({ value })} /></div>;
  },
};
