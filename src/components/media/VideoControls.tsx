import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";
import { clock, playPausePath } from "../../playback";
import { SeekBar, TimeReadout } from "../../SeekBar";
import { useSprings } from "../../springs";
import { IconButton } from "../actions/IconButton";
import { Icon } from "../data-display/Icon";
import { VolumeSlider } from "./VolumeSlider";

export type VideoControlsProps = {
  /** Video length in seconds. */
  duration: number;
  playing: boolean;
  onPlayingChange: (playing: boolean) => void;
  /** Position in seconds. */
  currentTime: number;
  onCurrentTimeChange: (currentTime: number) => void;
  /** 0..1 */
  volume: number;
  onVolumeChange: (volume: number) => void;
  /** Called with true when a seek drag starts and false when it ends, so playback can wait while scrubbing. */
  onScrubChange?: (scrubbing: boolean) => void;
  playLabel?: string;
  pauseLabel?: string;
  seekLabel?: string;
  volumeLabel?: string;
  formatTime?: (seconds: number) => string;
  className?: string;
};

export function VideoControls({
  duration,
  playing,
  onPlayingChange,
  currentTime,
  onCurrentTimeChange,
  volume,
  onVolumeChange,
  onScrubChange = () => {},
  playLabel = "Play",
  pauseLabel = "Pause",
  seekLabel = "Seek",
  volumeLabel = "Volume",
  formatTime = clock,
  className = "",
}: VideoControlsProps) {
  const { soft } = useSprings();
  const morph = useMotionValue(playing ? 1 : 0);
  const d = useTransform(morph, playPausePath);

  useEffect(() => {
    animate(morph, playing ? 1 : 0, soft);
  }, [playing, morph]);

  return (
    <div className={`flex h-13 w-full items-center rounded-control bg-ink p-1 text-paper shadow-float surface [--color-focus:var(--color-paper)] [--color-line:var(--color-ink-3)] ${className}`}>
      <IconButton
        variant="ghost"
        label={playing ? pauseLabel : playLabel}
        onClick={() => onPlayingChange(!playing)}
        className="shrink-0"
      >
        <Icon size={24}>
          <motion.path d={d} className="fill-current" />
        </Icon>
      </IconButton>
      <div className="mr-6 ml-3 min-w-0 grow">
        <SeekBar
          value={currentTime}
          duration={duration}
          onValueChange={onCurrentTimeChange}
          onScrubChange={onScrubChange}
          label={seekLabel}
          valueText={formatTime(currentTime)}
        />
        <TimeReadout value={currentTime} duration={duration} formatTime={formatTime} />
      </div>
      <div className="w-30 shrink-0">
        <VolumeSlider value={volume} onValueChange={onVolumeChange} label={volumeLabel} tone="ink" />
      </div>
    </div>
  );
}
