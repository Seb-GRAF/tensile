import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { Expand } from "../../Expand";
import { clock, playPausePath } from "../../playback";
import { SeekBar, TimeReadout } from "../../SeekBar";
import { useSprings } from "../../springs";
import { IconButton } from "../actions/IconButton";
import { Icon } from "../data-display/Icon";

export type MusicPlayerProps = {
  title: string;
  artist: string;
  /** Track length in seconds. */
  duration: number;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  openLabel?: (title: string) => string;
  minimizeLabel?: string;
  playLabel?: string;
  pauseLabel?: string;
  seekLabel?: string;
  formatTime?: (seconds: number) => string;
  className?: string;
};


function Art({ className }: { className: string }) {
  return (
    <svg aria-hidden viewBox="0 0 52 52" className={className}>
      <rect width="52" height="52" rx="12" className="fill-accent" />
      <circle cx="26" cy="26" r="17" className="fill-ink" />
      <circle cx="26" cy="26" r="4" className="fill-accent" />
    </svg>
  );
}

export function MusicPlayer({
  title,
  artist,
  duration,
  expanded,
  onExpandedChange,
  openLabel = (title: string) => `Open player, ${title}`,
  minimizeLabel = "Minimize player",
  playLabel = "Play",
  pauseLabel = "Pause",
  seekLabel = "Seek",
  formatTime = clock,
  className = "",
}: MusicPlayerProps) {
  const { soft } = useSprings();
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);
  const morph = useMotionValue(0);
  const d = useTransform(morph, playPausePath);

  useEffect(() => {
    animate(morph, playing ? 1 : 0, soft);
  }, [playing, morph]);

  useEffect(() => {
    if (!playing || scrubbing) return;
    const start = performance.now() - position * 1000;
    let frame = requestAnimationFrame(function tick(now) {
      const next = (now - start) / 1000;
      if (next >= duration) {
        setPosition(duration);
        setPlaying(false);
        return;
      }
      setPosition(next);
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [playing, scrubbing, duration]);

  return (
    <div className={className}>
      <Expand
        open={expanded}
        onOpenChange={onExpandedChange}
        closed={{ width: 224, height: 40, radius: "var(--radius-control)" }}
        opened={{ width: 340, height: 150, radius: "var(--radius-dialog)" }}
        anchor="center"
        label={openLabel(title)}
        panelLabel={title}
        trigger={
          <span className="flex size-full items-center gap-2.5 pr-3.5 pl-2 text-label font-medium">
            <Art className="size-6 shrink-0" />
            <span className="truncate">{title}</span>
            <Icon size={12} className="ml-auto shrink-0">
              <motion.path d={d} className="fill-current" />
            </Icon>
          </span>
        }
        className="bg-ink text-paper [--color-focus:var(--color-paper)] [--color-line:var(--color-ink-3)]"
      >
        <div className="p-5">
          <div className="flex items-center gap-3">
            <IconButton
              variant="ghost"
              label={minimizeLabel}
              onClick={() => onExpandedChange(false)}
              className="shrink-0"
            >
              <Art className="size-11" />
            </IconButton>
            <div className="min-w-0 grow">
              <p className="truncate text-base font-semibold tracking-[-0.01em]">{title}</p>
              <p className="truncate text-sm text-paper/55">{artist}</p>
            </div>
            <IconButton
              variant="ghost"
              label={playing ? pauseLabel : playLabel}
              onClick={() => setPlaying(!playing)}
              className="shrink-0"
            >
              <Icon size={28}>
                <motion.path d={d} className="fill-current" />
              </Icon>
            </IconButton>
          </div>
          <div className="mt-5">
            <SeekBar
              value={position}
              duration={duration}
              onValueChange={setPosition}
              onScrubChange={setScrubbing}
              label={seekLabel}
              valueText={formatTime(position)}
            />
          </div>
          <TimeReadout value={position} duration={duration} formatTime={formatTime} />
        </div>
      </Expand>
    </div>
  );
}
