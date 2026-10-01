import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { useControllable } from "../../../controllable";
import { Expand } from "../../../Expand";
import { clock, playPausePath } from "../../../playback";
import { SeekBar, TimeReadout } from "../../../SeekBar";
import { useSprings } from "../../../springs";
import { IconButton } from "../../actions/IconButton/IconButton";

export type MusicPlayerProps = {
  title: string;
  artist: string;
  /** Track length in seconds. */
  duration: number;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
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
      <rect width="52" height="52" rx="12" className="tn:fill-accent" />
      <circle cx="26" cy="26" r="17" className="tn:fill-on-accent" />
      <circle cx="26" cy="26" r="4" className="tn:fill-accent" />
    </svg>
  );
}

export function MusicPlayer({
  title,
  artist,
  duration,
  expanded: expandedProp,
  defaultExpanded = false,
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
  const [expanded, setExpanded] = useControllable(expandedProp, defaultExpanded, onExpandedChange);
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
        onOpenChange={setExpanded}
        closed={{ width: 224, height: 40, radius: "var(--tn-radius-control)" }}
        opened={{ width: 340, height: 150, radius: "var(--tn-radius-dialog)" }}
        anchor="center"
        label={openLabel(title)}
        panelLabel={title}
        trigger={
          <span className="tn:flex tn:size-full tn:items-center tn:gap-2.5 tn:pr-3.5 tn:pl-2 tn:text-label tn:font-medium">
            <Art className="tn:size-6 tn:shrink-0" />
            <span className="tn:truncate">{title}</span>
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              width={12}
              height={12}
              strokeWidth={36 / 12}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="tn:ml-auto tn:block tn:shrink-0 tn:fill-none tn:stroke-current"
            >
              <motion.path d={d} className="tn:fill-current" />
            </svg>
          </span>
        }
        className="dark tn:bg-paper tn:text-ink"
      >
        <div className="tn:p-5">
          <div className="tn:flex tn:items-center tn:gap-3">
            <IconButton
              variant="ghost"
              label={minimizeLabel}
              onClick={() => setExpanded(false)}
              icon={<Art className="tn:size-11" />}
              className="tn:shrink-0"
            />
            <div className="tn:min-w-0 tn:grow">
              <p className="tn:truncate tn:text-base tn:font-semibold tn:tracking-[-0.01em]">{title}</p>
              <p className="tn:truncate tn:text-sm tn:text-muted">{artist}</p>
            </div>
            <IconButton
              variant="ghost"
              label={playing ? pauseLabel : playLabel}
              onClick={() => setPlaying(!playing)}
              icon={
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  width={28}
                  height={28}
                  strokeWidth={36 / 28}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="tn:block tn:fill-none tn:stroke-current"
                >
                  <motion.path d={d} className="tn:fill-current" />
                </svg>
              }
              className="tn:shrink-0"
            />
          </div>
          <div className="tn:mt-5">
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
