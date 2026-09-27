import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { Expand } from "../Expand";
import { clock, playPausePath } from "../playback";
import { SeekBar } from "../SeekBar";
import { soft } from "../springs";

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
};


function Art({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 52 52" className={className}>
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
}: MusicPlayerProps) {
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
    // position is read once when playback (re)starts; the loop owns it from there
  }, [playing, scrubbing, duration]);

  return (
    <Expand
      open={expanded}
      onOpenChange={onExpandedChange}
      closed={{ width: 224, height: 40, radius: 20 }}
      opened={{ width: 340, height: 150, radius: 32 }}
      anchor="center"
      label={openLabel(title)}
      panelLabel={title}
      trigger={
        <span className="flex size-full items-center gap-2.5 pr-3.5 pl-2 text-[13px] font-medium">
          <Art className="size-6" />
          <span className="truncate">{title}</span>
          <svg viewBox="0 0 24 24" className="ml-auto size-3 shrink-0 fill-paper stroke-paper" strokeWidth={2.5} strokeLinejoin="round">
            <motion.path d={d} />
          </svg>
        </span>
      }
      className="bg-ink text-paper"
    >
      <div className="p-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label={minimizeLabel}
            onClick={() => onExpandedChange(false)}
            className="shrink-0 rounded-xl outline-offset-2 focus-visible:outline-2 focus-visible:outline-paper"
          >
            <Art className="size-[52px]" />
          </button>
          <div className="min-w-0 grow">
            <p className="truncate text-base font-semibold tracking-[-0.01em]">{title}</p>
            <p className="truncate text-sm text-paper/55">{artist}</p>
          </div>
          <motion.button
            type="button"
            aria-label={playing ? pauseLabel : playLabel}
            onClick={() => setPlaying(!playing)}
            whileTap={{ scale: 0.85 }}
            className="grid size-10 shrink-0 place-items-center rounded-full outline-offset-2 focus-visible:outline-2 focus-visible:outline-paper"
          >
            <svg viewBox="0 0 24 24" className="size-7 fill-paper stroke-paper" strokeWidth={2} strokeLinejoin="round">
              <motion.path d={d} />
            </svg>
          </motion.button>
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
        <div className="mt-1 flex justify-between text-[11px] tabular-nums text-paper/55">
          <span>{formatTime(position)}</span>
          <span>−{formatTime(duration - position)}</span>
        </div>
      </div>
    </Expand>
  );
}
