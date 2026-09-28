import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useLayoutEffect, useRef } from "react";
import { dragHandlers, rubber } from "../../drag";
import { icons } from "../../icons";
import { useSprings } from "../../springs";
import { IconButton } from "../actions/IconButton";
import { Icon } from "../data-display/Icon";
import { PageDots } from "../navigation/PageDots";

export type CarouselProps = {
  slides: { label: string; content: React.ReactNode }[];
  /** The selected slide, from 0. */
  value: number;
  onValueChange: (value: number) => void;
  label?: string;
  previousLabel?: string;
  nextLabel?: string;
  /** A slide's position in each slide's name and the dots' value text; `n` counts from 1. */
  slideLabel?: (n: number, count: number) => string;
  className?: string;
};

const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };

export function Carousel({
  slides,
  value,
  onValueChange,
  label = "Carousel",
  previousLabel = "Previous slide",
  nextLabel = "Next slide",
  slideLabel = (n: number, count: number) => `${n} of ${count}`,
  className = "",
}: CarouselProps) {
  const { snap } = useSprings();
  const position = useMotionValue(value);
  const x = useTransform(position, (p) => `${-p * 100}%`);
  const start = useRef<{ pointer: number; position: number } | null>(null);
  const panels = useRef<(HTMLDivElement | null)[]>([]);
  const last = slides.length - 1;

  useEffect(() => { animate(position, value, snap); }, [position, value]);
  useLayoutEffect(() => {
    if (slides.some((_, i) => i !== value && panels.current[i]!.contains(document.activeElement))) {
      panels.current[value]!.focus({ preventScroll: true });
    }
  }, [value]);

  function moveTo(slide: number) {
    const next = Math.min(last, Math.max(0, slide));
    if (next !== value) onValueChange(next);
  }

  function drag(event: React.PointerEvent<HTMLDivElement>) {
    if (event.type === "pointerdown") {
      position.stop();
      start.current = { pointer: event.clientX, position: position.get() };
    }
    const width = event.currentTarget.getBoundingClientRect().width;
    const raw = start.current!.position + (start.current!.pointer - event.clientX) / width;
    const bounded = Math.min(last, Math.max(0, raw));
    position.set(bounded + rubber((raw - bounded) * width) / width);
  }

  function release() {
    if (!start.current) return;
    start.current = null;
    const next = Math.min(last, Math.max(0, Math.round(position.get() + position.getVelocity() * 0.2)));
    animate(position, next, snap);
    moveTo(next);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const step = moves[event.key];
    if (step === undefined || (event.target !== event.currentTarget && event.target !== panels.current[value])) return;
    event.preventDefault();
    moveTo(value + step);
  }

  const handlers = dragHandlers(drag, release);
  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className={className}>
      <div
        tabIndex={0}
        {...handlers}
        onPointerDown={(event) => {
          if (!(event.target as Element).closest("a, button")) handlers.onPointerDown(event);
        }}
        onDragStart={(event) => event.preventDefault()}
        onKeyDown={onKeyDown}
        className="touch-pan-y select-none overflow-clip contain-inline-size rounded-card bg-paper text-ink shadow-float outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus"
      >
        <motion.div style={{ x }} className="flex">
          {slides.map((slide, i) => (
            <div
              key={slide.label}
              ref={(el) => { panels.current[i] = el; }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${slide.label}, ${slideLabel(i + 1, slides.length)}`}
              aria-hidden={i !== value}
              inert={i !== value}
              tabIndex={-1}
              className="w-full shrink-0 outline-none"
            >
              {slide.content}
            </div>
          ))}
        </motion.div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-3">
        <IconButton label={previousLabel} variant="secondary" disabled={value === 0} onClick={() => moveTo(value - 1)}><Icon>{icons.chevronLeft}</Icon></IconButton>
        <PageDots count={slides.length} value={value} onValueChange={onValueChange} label={label} pageLabel={slideLabel} />
        <IconButton label={nextLabel} variant="secondary" disabled={value === last} onClick={() => moveTo(value + 1)}><Icon>{icons.chevronRight}</Icon></IconButton>
      </div>
    </div>
  );
}
