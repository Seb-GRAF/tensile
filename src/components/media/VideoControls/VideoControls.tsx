import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";
import { clock, playPausePath } from "../../../playback";
import { SeekBar, TimeReadout } from "../../../SeekBar";
import { useSprings } from "../../../springs";
import { IconButton } from "../../actions/IconButton/IconButton";
import { VolumeSlider } from "../VolumeSlider/VolumeSlider";

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
    <div className={`tn:flex tn:h-13 tn:w-full tn:items-center tn:rounded-control dark tn:bg-paper tn:p-1 tn:text-ink tn:shadow-float tn:surface ${className}`}>
      <IconButton
        variant="ghost"
        label={playing ? pauseLabel : playLabel}
        onClick={() => onPlayingChange(!playing)}
        icon={
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            width={24}
            height={24}
            strokeWidth={36 / 24}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="tn:block tn:fill-none tn:stroke-current"
          >
            <motion.path d={d} className="tn:fill-current" />
          </svg>
        }
        className="tn:shrink-0"
      />
      <div className="tn:mr-6 tn:ml-3 tn:min-w-0 tn:grow">
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
      <div className="tn:w-30 tn:shrink-0">
        <VolumeSlider value={volume} onValueChange={onVolumeChange} label={volumeLabel} tone="ink" />
      </div>
    </div>
  );
}
