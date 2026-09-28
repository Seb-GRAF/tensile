import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { VideoControls, type VideoControlsProps } from "./VideoControls";

function StatefulVideoControls({
  onArgsChange,
  ...props
}: VideoControlsProps & { onArgsChange: (args: Partial<VideoControlsProps>) => void }) {
  const [playing, setPlaying] = useState(props.playing);
  const [currentTime, setCurrentTime] = useState(props.currentTime);
  const [volume, setVolume] = useState(props.volume);
  const [scrubbing, setScrubbing] = useState(false);

  useEffect(() => {
    if (!playing || scrubbing) return;
    let last = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      setCurrentTime((time) => Math.min(props.duration, time + (now - last) / 1000));
      last = now;
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [playing, scrubbing, props.duration]);

  useEffect(() => {
    if (currentTime === props.duration && !scrubbing) setPlaying(false);
  }, [currentTime, scrubbing, props.duration]);

  useEffect(() => {
    onArgsChange({ playing, currentTime, volume });
  }, [playing, currentTime, volume]);

  return (
    <div className="relative aspect-video w-160 max-w-[calc(100vw-32px)] overflow-hidden rounded-card shadow-float">
      <svg viewBox="0 0 640 360" className="size-full">
        <rect width="640" height="360" fill="#dae6ea" />
        <circle cx="452" cy="112" r="34" fill="#fbeaa8" />
        <path d="M0 225 80 169l77 38 104-81 88 65 91-40 93 49 107-45v205H0Z" fill="#b0c3bd" />
        <path d="M0 277c93-38 200-34 299-9s227 11 341-20v112H0Z" fill="#93aba5" />
        <path d="M0 326c128-16 267-18 400-7s173 2 240-11v52H0Z" fill="#647d77" />
      </svg>
      <div className="absolute inset-x-3 bottom-3">
        <VideoControls
          {...props}
          playing={playing}
          onPlayingChange={(playing) => {
            props.onPlayingChange(playing);
            if (playing && currentTime === props.duration) setCurrentTime(0);
            setPlaying(playing);
          }}
          currentTime={currentTime}
          onCurrentTimeChange={setCurrentTime}
          onScrubChange={setScrubbing}
          volume={volume}
          onVolumeChange={setVolume}
        />
      </div>
    </div>
  );
}

const meta = {
  title: "Media/VideoControls",
  id: "components-videocontrols",
  component: VideoControls,
  args: {
    duration: 134,
    playing: false,
    onPlayingChange: fn(),
    currentTime: 38,
    onCurrentTimeChange: fn(),
    volume: 0.6,
    onVolumeChange: fn(),
  },
  argTypes: { volume: { control: { type: "range", min: 0, max: 1, step: 0.01 } } },
} satisfies Meta<typeof VideoControls>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click play to run the drawn video; drag the progress bar to seek (playback waits while you hold it) or press ArrowLeft/ArrowRight on it; drag the volume past either end to stretch it, or use the arrow keys. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <StatefulVideoControls {...args} onArgsChange={updateArgs} />;
  },
};
