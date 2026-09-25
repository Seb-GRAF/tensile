import { AnimatePresence, motion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { shape, soft, swap } from "../springs";

export type LightboxProps = {
  /** Each image fills a square thumbnail and a 3:2 full view, e.g. an img with size-full object-cover; its label is its accessible name. */
  images: { label: string; image: React.ReactNode }[];
  /** Index of the open image, or null when closed. */
  value: number | null;
  onValueChange: (value: number | null) => void;
  closeLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
};

type Box = { left: number; top: number; width: number; height: number; borderRadius: number };

const RATIO = 3 / 2;
const INSET = 76;
const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };

function fullView(): Box {
  const width = Math.min(window.innerWidth - 2 * INSET, (window.innerHeight - 2 * INSET) * RATIO);
  const height = width / RATIO;
  return { left: (window.innerWidth - width) / 2, top: (window.innerHeight - height) / 2, width, height, borderRadius: 24 };
}

export function Lightbox({
  images,
  value,
  onValueChange,
  closeLabel = "Close",
  previousLabel = "Previous image",
  nextLabel = "Next image",
}: LightboxProps) {
  const open = value !== null;
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const dialog = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(open);
  const [thumb, setThumb] = useState<{ index: number; box: Box }>();

  useLayoutEffect(() => {
    const index = value ?? thumb?.index;
    if (index === undefined) return;
    const { left, top, width, height } = buttons.current[index]!.getBoundingClientRect();
    setThumb({ index, box: { left, top, width, height, borderRadius: 16 } });
  }, [value]);

  useEffect(() => {
    if (open === wasOpen.current) return;
    wasOpen.current = open;
    if (open) dialog.current!.focus({ preventScroll: true });
    else buttons.current[thumb!.index]!.focus({ preventScroll: true });
  }, [open]);

  function move(step: number) {
    onValueChange((value! + step + images.length) % images.length);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") onValueChange(null);
    const step = moves[event.key];
    if (step) move(step);
  }

  return (
    <>
      <div inert={open} className="flex flex-wrap gap-2">
        {images.map((image, i) => (
          <button
            key={image.label}
            ref={(el) => {
              buttons.current[i] = el;
            }}
            type="button"
            aria-haspopup="dialog"
            aria-label={image.label}
            onClick={() => onValueChange(i)}
            className={`size-24 overflow-hidden rounded-2xl bg-ink shadow-float outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink ${i === thumb?.index ? "opacity-0" : ""}`}
          >
            {image.image}
          </button>
        ))}
      </div>
      <div
        ref={dialog}
        role="dialog"
        aria-modal
        aria-label={thumb && images[thumb.index].label}
        tabIndex={-1}
        inert={!open}
        onKeyDown={onKeyDown}
        className="fixed inset-0 z-10 outline-none"
      >
        <motion.div
          initial={false}
          animate={{ opacity: open ? 1 : 0 }}
          transition={soft}
          onClick={() => onValueChange(null)}
          className="absolute inset-0 bg-ink/80"
        />
        {thumb && (
          <motion.div
            initial={thumb.box}
            animate={open ? fullView() : thumb.box}
            transition={shape}
            onAnimationComplete={() => {
              if (!open) setThumb(undefined);
            }}
            className="absolute overflow-hidden bg-ink shadow-float"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={thumb.index}
                role="img"
                aria-label={images[thumb.index].label}
                {...swap}
                className="absolute inset-0"
              >
                {images[thumb.index].image}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
        <motion.button
          type="button"
          aria-label={closeLabel}
          onClick={() => onValueChange(null)}
          initial={false}
          animate={open ? swap.animate : swap.exit}
          className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-paper text-ink shadow-float outline-offset-2 focus-visible:outline-2 focus-visible:outline-paper"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4 fill-none stroke-current"
            strokeWidth={2.25}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </motion.button>
        <motion.button
          type="button"
          aria-label={previousLabel}
          onClick={() => move(-1)}
          initial={false}
          animate={open ? swap.animate : swap.exit}
          className="absolute top-1/2 left-4 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink shadow-float outline-offset-2 focus-visible:outline-2 focus-visible:outline-paper"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4 fill-none stroke-current"
            strokeWidth={2.25}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m14.5 7-5 5 5 5" />
          </svg>
        </motion.button>
        <motion.button
          type="button"
          aria-label={nextLabel}
          onClick={() => move(1)}
          initial={false}
          animate={open ? swap.animate : swap.exit}
          className="absolute top-1/2 right-4 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink shadow-float outline-offset-2 focus-visible:outline-2 focus-visible:outline-paper"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4 fill-none stroke-current"
            strokeWidth={2.25}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9.5 7 5 5-5 5" />
          </svg>
        </motion.button>
      </div>
    </>
  );
}
