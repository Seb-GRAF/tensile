import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { Check } from "../../Check";
import { dragHandlers, rubber, useStretch } from "../../drag";
import { shape, snap, soft, swap } from "../../springs";

export type SwipeButtonProps = {
  /** The done state. Set it to true in `onConfirm`, and back to false to let the user swipe again. */
  confirmed: boolean;
  onConfirm: () => void;
  label?: string;
  confirmedLabel?: string;
};

const WIDTH = 280;
const HEIGHT = 44;
const INSET = 4;
const KNOB = 36;
const TRAVEL = WIDTH - 2 * INSET - KNOB;

export function SwipeButton({
  confirmed,
  onConfirm,
  label = "Slide to confirm",
  confirmedLabel = "Confirmed",
}: SwipeButtonProps) {
  const [stretch, style] = useStretch(WIDTH, HEIGHT);
  const knob = useMotionValue(confirmed ? TRAVEL : 0);
  const fill = useTransform(() => KNOB + Math.max(0, knob.get()) + Math.max(0, stretch.get()));
  const grab = useRef(0);

  useEffect(() => {
    animate(knob, confirmed ? TRAVEL : 0, shape);
  }, [confirmed, knob]);

  function drag(event: React.PointerEvent<HTMLSpanElement>) {
    if (event.type === "pointerdown") {
      knob.stop();
      stretch.stop();
      grab.current = event.clientX - knob.get();
    }
    const px = event.clientX - grab.current;
    stretch.set(rubber(px > TRAVEL ? px - TRAVEL : Math.min(0, px)));
    if (knob.get() === TRAVEL) return;
    knob.set(Math.min(TRAVEL, Math.max(0, px)));
    if (px >= TRAVEL) onConfirm();
  }

  function release() {
    animate(stretch, 0, snap);
    if (!confirmed) animate(knob, 0, snap);
  }

  return (
    <>
      <button
        type="button"
        aria-label={confirmed ? confirmedLabel : label}
        aria-disabled={confirmed}
        onClick={(event) => {
          if (event.detail === 0 && !confirmed) onConfirm();
        }}
        className="relative h-11 w-70 rounded-full outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
      >
        <motion.span
          style={style}
          initial={false}
          animate={{ backgroundColor: confirmed ? "var(--color-accent)" : "var(--color-paper)" }}
          transition={soft}
          className="absolute top-1/2 left-0 -translate-y-1/2 overflow-hidden rounded-full shadow-float"
        >
          <AnimatePresence initial={false}>
            {!confirmed && (
              <motion.span
                key="label"
                {...swap}
                className="absolute inset-y-0 left-10 grid w-60 place-items-center text-[15px] font-medium whitespace-nowrap text-muted"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
          <motion.span
            {...dragHandlers(drag, release)}
            style={{ width: fill }}
            initial={false}
            animate={{ backgroundColor: confirmed ? "var(--color-accent)" : "var(--color-ink)" }}
            transition={soft}
            className="absolute inset-y-1 left-1 cursor-grab touch-none rounded-full"
          >
            <AnimatePresence initial={false}>
              {!confirmed && (
                <motion.span key="arrow" {...swap} className="absolute inset-y-0 right-0 grid w-9 place-items-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="block size-4 fill-none stroke-paper"
                    strokeWidth={2.25}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.span>
          <AnimatePresence initial={false}>
            {confirmed && (
              <motion.span
                key="confirmed"
                {...swap}
                className="absolute inset-0 flex items-center justify-center gap-1.5 text-[15px] font-medium whitespace-nowrap text-ink"
              >
                <Check size={18} />
                {confirmedLabel}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.span>
      </button>
      <span role="status" className="sr-only">
        {confirmed && confirmedLabel}
      </span>
    </>
  );
}
