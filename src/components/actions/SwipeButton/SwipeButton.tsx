import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { Check } from "../../../Check";
import { dragHandlers, rubber, useStretch } from "../../../drag";
import { useSprings } from "../../../springs";
import { useSize } from "../../../useSize";
import { Icon } from "../../data-display/Icon/Icon";

export type SwipeButtonProps = {
  /** The done state. Set it to true in `onConfirm`, and back to false to let the user swipe again. */
  confirmed: boolean;
  onConfirm: () => void;
  label?: string;
  confirmedLabel?: string;
  className?: string;
};

const HEIGHT = 44;
const INSET = 4;
const KNOB = 36;

function SwipeTrack({ confirmed, onConfirm, label, confirmedLabel, width }: SwipeButtonProps & { width: number }) {
  const { shape, snap, soft, swap } = useSprings();
  const travel = width - 2 * INSET - KNOB;
  const [stretch, style] = useStretch(width, HEIGHT);
  const knob = useMotionValue(confirmed ? travel : 0);
  const fill = useTransform(() => KNOB + Math.max(0, knob.get()) + Math.max(0, stretch.get()));
  const trail = useTransform(knob, [0, 1], [0, 1]);
  const grab = useRef(0);

  useEffect(() => {
    animate(knob, confirmed ? travel : 0, shape);
  }, [confirmed, knob, travel]);

  function drag(event: React.PointerEvent<HTMLSpanElement>) {
    if (event.type === "pointerdown") {
      knob.stop();
      stretch.stop();
      grab.current = event.clientX - knob.get();
    }
    const px = event.clientX - grab.current;
    stretch.set(rubber(px > travel ? px - travel : Math.min(0, px)));
    if (knob.get() === travel) return;
    knob.set(Math.min(travel, Math.max(0, px)));
    if (px >= travel) onConfirm();
  }

  function release() {
    animate(stretch, 0, snap);
    if (!confirmed) animate(knob, 0, snap);
  }

  return (
    <motion.span
      style={style}
      initial={false}
      animate={{ backgroundColor: confirmed ? "var(--color-accent)" : "var(--color-paper)" }}
      transition={soft}
      className="absolute top-1/2 left-0 -translate-y-1/2 overflow-hidden rounded-control shadow-control"
    >
      <AnimatePresence initial={false}>
        {!confirmed && (
          <motion.span
            key="label"
            {...swap}
            className="absolute inset-y-0 right-0 left-10 grid place-items-center text-body font-medium whitespace-nowrap text-muted"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.span
        {...dragHandlers(drag, release)}
        style={{ width: fill }}
        className="absolute inset-y-1 left-1 cursor-grab touch-none overflow-hidden rounded-control"
      >
        <motion.span style={{ opacity: trail }} className="absolute inset-y-0 right-4.5 left-0 bg-accent" />
        <AnimatePresence initial={false}>
          {!confirmed && (
            <motion.span
              key="label"
              aria-hidden
              {...swap}
              style={{ width: width - INSET - KNOB }}
              className="absolute inset-y-0 left-9 grid place-items-center text-body font-medium whitespace-nowrap text-on-accent"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
        <span className="absolute inset-y-0 right-0 grid w-9 place-content-center place-items-center rounded-control bg-ink text-paper">
          <AnimatePresence initial={false}>
            <motion.span key={confirmed ? "check" : "arrow"} {...swap} className="col-start-1 row-start-1">
              {confirmed ? (
                <Check size={18} />
              ) : (
                <Icon size={16}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </Icon>
              )}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.span>
      <AnimatePresence initial={false}>
        {confirmed && (
          <motion.span
            key="confirmed"
            {...swap}
            className="absolute inset-y-0 right-10 left-0 grid place-items-center text-body font-medium whitespace-nowrap text-on-accent"
          >
            {confirmedLabel}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.span>
  );
}

export function SwipeButton({
  confirmed,
  onConfirm,
  label = "Slide to confirm",
  confirmedLabel = "Confirmed",
  className = "",
}: SwipeButtonProps) {
  const [size, measure] = useSize();
  return (
    <>
      <button
        ref={measure}
        type="button"
        aria-label={confirmed ? confirmedLabel : label}
        aria-disabled={confirmed}
        onClick={(event) => {
          if (event.detail === 0 && !confirmed) onConfirm();
        }}
        className={`relative h-11 w-full rounded-control outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus ${className}`}
      >
        {size && <SwipeTrack width={size.width} confirmed={confirmed} onConfirm={onConfirm} label={label} confirmedLabel={confirmedLabel} />}
      </button>
      <span role="status" className="sr-only">
        {confirmed && confirmedLabel}
      </span>
    </>
  );
}
