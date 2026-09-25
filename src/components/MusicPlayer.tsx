import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { shape, soft, swap } from "../springs";

type Props = {
  title: string;
  artist: string;
  /** Track length in seconds. */
  duration: number;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
};

const PLAY = [[6, 4], [12, 7.7], [12, 16.3], [6, 20], [12, 7.7], [19, 12], [19, 12], [12, 16.3]];
const PAUSE = [[6, 4], [10, 4], [10, 20], [6, 20], [14, 4], [18, 4], [18, 20], [14, 20]];
const seekSteps: Record<string, number> = { ArrowRight: 5, ArrowLeft: -5 };

/** Play triangle (0) to pause bars (1): both halves of the triangle turn into bars. */
function glyph(morph: number) {
  const points = PLAY.map(([x, y], i) => `${x + (PAUSE[i][0] - x) * morph} ${y + (PAUSE[i][1] - y) * morph}`);
  return `M${points.slice(0, 4).join("L")}Z M${points.slice(4).join("L")}Z`;
}

function clock(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

function Art({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 52 52" className={className}>
      <rect width="52" height="52" rx="12" className="fill-accent" />
      <circle cx="26" cy="26" r="17" className="fill-ink" />
      <circle cx="26" cy="26" r="4" className="fill-accent" />
    </svg>
  );
}

export function MusicPlayer({ title, artist, duration, expanded, onExpandedChange }: Props) {
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);
  const morph = useMotionValue(0);
  const d = useTransform(morph, glyph);

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

  function seek(event: React.PointerEvent<HTMLDivElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    setPosition(duration * Math.min(1, Math.max(0, (event.clientX - box.left) / box.width)));
  }

  function onSeekKeyDown(event: React.KeyboardEvent) {
    const step = seekSteps[event.key];
    if (step === undefined) return;
    event.preventDefault();
    setPosition((p) => Math.min(duration, Math.max(0, p + step)));
  }

  return (
    <motion.div
      initial={false}
      animate={expanded ? { width: 340, height: 150, borderRadius: 32 } : { width: 224, height: 40, borderRadius: 20 }}
      transition={shape}
      onKeyDown={(event) => {
        if (event.key === "Escape") onExpandedChange(false);
      }}
      className="relative overflow-hidden bg-ink text-paper shadow-float"
    >
      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            key="player"
            {...swap}
            className="absolute top-1/2 left-1/2 h-[150px] w-[340px] -translate-x-1/2 -translate-y-1/2 p-5"
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Minimize player"
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
                aria-label={playing ? "Pause" : "Play"}
                onClick={() => setPlaying(!playing)}
                whileTap={{ scale: 0.85 }}
                className="grid size-10 shrink-0 place-items-center rounded-full outline-offset-2 focus-visible:outline-2 focus-visible:outline-paper"
              >
                <svg viewBox="0 0 24 24" className="size-7 fill-paper stroke-paper" strokeWidth={2} strokeLinejoin="round">
                  <motion.path d={d} />
                </svg>
              </motion.button>
            </div>
            <div
              role="slider"
              tabIndex={0}
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              aria-valuenow={Math.round(position)}
              aria-valuetext={clock(position)}
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(event.pointerId);
                setScrubbing(true);
                seek(event);
              }}
              onPointerMove={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) seek(event);
              }}
              onPointerUp={() => setScrubbing(false)}
              onPointerCancel={() => setScrubbing(false)}
              onKeyDown={onSeekKeyDown}
              className="mt-5 flex h-5 cursor-pointer touch-none items-center rounded-full outline-offset-2 focus-visible:outline-2 focus-visible:outline-paper"
            >
              <motion.div
                initial={false}
                animate={{ height: scrubbing ? 12 : 6 }}
                transition={shape}
                className="w-full overflow-hidden rounded-full bg-ink-3"
              >
                <div className="h-full bg-paper" style={{ width: `${(position / duration) * 100}%` }} />
              </motion.div>
            </div>
            <div className="mt-1 flex justify-between text-[11px] tabular-nums text-paper/55">
              <span>{clock(position)}</span>
              <span>−{clock(duration - position)}</span>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="island"
            {...swap}
            type="button"
            aria-expanded={false}
            aria-label={`Open player, ${title}`}
            onClick={() => onExpandedChange(true)}
            className="absolute top-1/2 left-1/2 flex h-10 w-[224px] -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 pr-3.5 pl-2 text-[13px] font-medium outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
          >
            <Art className="size-6" />
            <span className="truncate">{title}</span>
            <svg viewBox="0 0 24 24" className="ml-auto size-3 shrink-0 fill-paper stroke-paper" strokeWidth={2.5} strokeLinejoin="round">
              <motion.path d={d} />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
