import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useLayoutEffect, useRef } from "react";
import { dragHandlers, rubber } from "../../../drag";
import { icons } from "../../../icons";
import { useSprings } from "../../../springs";
import { IconButton } from "../../actions/IconButton/IconButton";
import { Icon } from "../../data-display/Icon/Icon";
import { PageDots } from "../../navigation/PageDots/PageDots";

export type CarouselProps = {
  slides: { label: string; content: React.ReactNode }[];
  /** The selected slide, from 0. */
  value: number;
  onValueChange: (value: number) => void;
  /** CSS width of each slide; "80%" or "min(320px, 80%)" shows the neighbours. */
  slideWidth?: string;
  /** Where the current slide sits when it's narrower than the carousel. */
  align?: "center" | "start";
  /** "visible" keeps the slides past the carousel's edges visible; the page is expected to clip them. */
  overflow?: "clip" | "visible";
  /** "center": one pill below, arrows around the dots; "end": the pill at the end of the row below, dots before the arrows; "sides": arrows over the current slide's edges, dots in the pill below. */
  controls?: "center" | "end" | "sides";
  label?: string;
  previousLabel?: string;
  nextLabel?: string;
  /** A slide's position in each slide's name and the dots' value text; `n` counts from 1. */
  slideLabel?: (n: number, count: number) => string;
  className?: string;
};

const GAP = 16;
const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };

export function Carousel({
  slides,
  value,
  onValueChange,
  slideWidth = "86%",
  align = "start",
  overflow = "clip",
  controls = "center",
  label = "Carousel",
  previousLabel = "Previous slide",
  nextLabel = "Next slide",
  slideLabel = (n: number, count: number) => `${n} of ${count}`,
  className = "",
}: CarouselProps) {
  const { snap } = useSprings();
  const position = useMotionValue(value);
  const left = align === "center" ? `(100% - ${slideWidth}) / 2` : "0px";
  const x = useTransform(position, (p) => `calc(${left} - ${p} * (${slideWidth} + ${GAP}px))`);
  const start = useRef<{ pointer: number; position: number } | null>(null);
  const panels = useRef<(HTMLDivElement | null)[]>([]);
  const area = useRef<HTMLDivElement>(null);
  const wheel = useRef<{ from: number; offset: number; timer: number }>(null);
  const last = slides.length - 1;

  useEffect(() => { animate(position, value, snap); }, [position, value]);
  useLayoutEffect(() => {
    if (slides.some((_, i) => i !== value && panels.current[i]!.contains(document.activeElement))) {
      panels.current[value]!.focus({ preventScroll: true });
    }
  }, [value]);
  useEffect(() => {
    function onWheel(event: WheelEvent) {
      const delta = event.shiftKey ? event.deltaX || event.deltaY : Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : 0;
      if (event.ctrlKey || delta === 0) return;
      event.preventDefault();
      if (!wheel.current) {
        position.stop();
        wheel.current = { from: value, offset: 0, timer: 0 };
      }
      const gesture = wheel.current;
      const step = panels.current[0]!.getBoundingClientRect().width + GAP;
      gesture.offset = Math.min(step, Math.max(-step, gesture.offset + delta));
      const raw = gesture.from + gesture.offset / step;
      const bounded = Math.min(last, Math.max(0, raw));
      position.set(bounded + rubber((raw - bounded) * step) / step);
      clearTimeout(gesture.timer);
      gesture.timer = window.setTimeout(() => {
        wheel.current = null;
        const next = Math.min(last, Math.max(0, Math.abs(gesture.offset) < 4 ? gesture.from : gesture.from + Math.sign(gesture.offset)));
        animate(position, next, snap);
        moveTo(next);
      }, 120);
    }
    const element = area.current!;
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => element.removeEventListener("wheel", onWheel);
  }, [value, last, onValueChange]);

  function moveTo(slide: number) {
    const next = Math.min(last, Math.max(0, slide));
    if (next !== value) onValueChange(next);
  }

  function drag(event: React.PointerEvent<HTMLDivElement>) {
    if (event.type === "pointerdown") {
      position.stop();
      start.current = { pointer: event.clientX, position: position.get() };
    }
    const step = panels.current[0]!.getBoundingClientRect().width + GAP;
    const raw = start.current!.position + (start.current!.pointer - event.clientX) / step;
    const bounded = Math.min(last, Math.max(0, raw));
    position.set(bounded + rubber((raw - bounded) * step) / step);
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
  const previousButton = (
    <IconButton label={previousLabel} variant={controls === "sides" ? "secondary" : "ghost"} size="sm" disabled={value === 0} onClick={() => moveTo(value - 1)}>
      <Icon>{icons.chevronLeft}</Icon>
    </IconButton>
  );
  const nextButton = (
    <IconButton label={nextLabel} variant={controls === "sides" ? "secondary" : "ghost"} size="sm" disabled={value === last} onClick={() => moveTo(value + 1)}>
      <Icon>{icons.chevronRight}</Icon>
    </IconButton>
  );
  const dots = <PageDots count={slides.length} value={value} onValueChange={onValueChange} label={label} pageLabel={slideLabel} />;
  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className={className}>
      <div
        ref={area}
        tabIndex={0}
        {...handlers}
        onPointerDown={(event) => {
          if (!(event.target as Element).closest("a, button")) handlers.onPointerDown(event);
        }}
        onDragStart={(event) => event.preventDefault()}
        onKeyDown={onKeyDown}
        className="group relative flow-root touch-pan-y select-none contain-inline-size outline-none"
      >
        <div className={`pointer-events-none ${overflow === "clip" ? "-mx-4 -mt-2 -mb-8 overflow-clip px-4 pt-2 pb-8 mask-x-from-[calc(100%-16px)]" : ""}`}>
          <motion.div style={{ x }} className="flex gap-4">
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
                style={{ width: slideWidth }}
                className="pointer-events-auto shrink-0 overflow-clip rounded-card bg-paper text-ink shadow-float surface outline-none"
              >
                {slide.content}
              </div>
            ))}
          </motion.div>
        </div>
        <div
          style={{ left: `calc(${left})`, width: slideWidth }}
          className="pointer-events-none absolute inset-y-0 flex items-center justify-between rounded-card px-3 outline-offset-2 group-focus-visible:outline-2 group-focus-visible:outline-focus *:pointer-events-auto"
        >
          {controls === "sides" && (
            <>
              {previousButton}
              {nextButton}
            </>
          )}
        </div>
      </div>
      {controls === "center" && (
        <div className="relative mx-auto mt-3 flex w-fit rounded-control bg-paper p-1 shadow-control">
          {previousButton}
          {dots}
          {nextButton}
        </div>
      )}
      {controls === "end" && (
        <div className="relative mt-3 ml-auto flex w-fit rounded-control bg-paper p-1 shadow-control">
          {dots}
          {previousButton}
          {nextButton}
        </div>
      )}
      {controls === "sides" && <div className="relative mx-auto mt-3 w-fit rounded-control bg-paper shadow-control">{dots}</div>}
    </div>
  );
}
