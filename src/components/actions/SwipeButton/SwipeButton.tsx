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
      animate={{ backgroundColor: confirmed ? "var(--tn-color-accent)" : "var(--tn-color-paper)" }}
      transition={soft}
      className="tn:absolute tn:top-1/2 tn:left-0 tn:-translate-y-1/2 tn:overflow-hidden tn:rounded-control tn:shadow-control"
    >
      <AnimatePresence initial={false}>
        {!confirmed && (
          <motion.span
            key="label"
            {...swap}
            className="tn:absolute tn:inset-0 tn:grid tn:place-items-center tn:text-body tn:font-medium tn:whitespace-nowrap tn:text-muted"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.span
        {...dragHandlers(drag, release)}
        style={{ width: fill }}
        className="tn:absolute tn:inset-y-1 tn:left-1 tn:cursor-grab tn:touch-none tn:overflow-hidden tn:rounded-control"
      >
        <motion.span style={{ opacity: trail }} className="tn:absolute tn:inset-y-0 tn:right-4.5 tn:left-0 tn:bg-accent" />
        <span className="tn:absolute tn:inset-y-0 tn:right-0 tn:grid tn:w-9 tn:place-content-center tn:place-items-center tn:rounded-control tn:bg-ink tn:text-paper">
          <AnimatePresence initial={false}>
            <motion.span key={confirmed ? "check" : "arrow"} {...swap} className="tn:col-start-1 tn:row-start-1">
              {confirmed ? (
                <Check size={18} />
              ) : (
                <Icon name="arrowRight" size={16} />
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
            className="tn:absolute tn:inset-0 tn:grid tn:place-items-center tn:text-body tn:font-medium tn:whitespace-nowrap tn:text-on-accent"
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
        className={`tn:relative tn:h-11 tn:w-full tn:rounded-control tn:outline-offset-2 tn:focus-visible:outline-2 tn:focus-visible:outline-focus ${className}`}
      >
        {size && <SwipeTrack width={size.width} confirmed={confirmed} onConfirm={onConfirm} label={label} confirmedLabel={confirmedLabel} />}
      </button>
      <span role="status" className="tn:sr-only">
        {confirmed && confirmedLabel}
      </span>
    </>
  );
}
