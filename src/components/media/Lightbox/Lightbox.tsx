import { animate, motion, useIsPresent, useMotionValue, useTransform, type MotionValue } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useControllable } from "../../../controllable";
import { dragHandlers } from "../../../drag";
import { Modal } from "../../../Modal";
import { useSprings } from "../../../springs";
import { IconButton } from "../../actions/IconButton/IconButton";

export type LightboxProps = {
  /** Each image fills a square thumbnail and a 3:2 full view, e.g. an img with size-full object-cover; its label is its accessible name. */
  images: { label: string; image: React.ReactNode }[];
  /** Index of the open image, or null when closed. */
  value?: number | null;
  defaultValue?: number | null;
  onValueChange?: (value: number | null) => void;
  closeLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
  className?: string;
};

type Box = { left: number; top: number; width: number; height: number; borderRadius: string };

const RATIO = 3 / 2;
const INSET = 76;
const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };

function fullView(): Box {
  const inset = window.innerWidth < 640 ? 16 : INSET;
  const width = Math.min(window.innerWidth - 2 * inset, (window.innerHeight - 2 * INSET) * RATIO);
  const height = width / RATIO;
  return { left: (window.innerWidth - width) / 2, top: (window.innerHeight - height) / 2, width, height, borderRadius: "var(--tn-radius-card)" };
}

function mod(a: number, n: number) {
  return ((a % n) + n) % n;
}

function LightboxImage({ image, i, count, current, position }: {
  image: LightboxProps["images"][number];
  i: number;
  count: number;
  current: boolean;
  position: MotionValue<number>;
}) {
  const x = useTransform(position, (p) => `${(mod(i - p + count / 2, count) - count / 2) * 100}%`);
  return (
    <motion.div role="img" aria-label={image.label} aria-hidden={!current} style={{ x }} className="tn:absolute tn:inset-0">
      {image.image}
    </motion.div>
  );
}

function LightboxFlight({ images, index, direction, buttons, onIndexChange, onClosed }: {
  images: LightboxProps["images"];
  index: number;
  direction: number;
  buttons: React.RefObject<(HTMLButtonElement | null)[]>;
  onIndexChange: (index: number) => void;
  onClosed: (index: number) => void;
}) {
  const { shape, snap } = useSprings();
  const present = useIsPresent();
  const position = useMotionValue(index);
  const target = useRef(index);
  const start = useRef<{ pointer: number; position: number } | null>(null);
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const step = mod(index - target.current, images.length);
    if (step === 0) return;
    target.current += direction < 0 ? step - images.length : step;
    animate(position, target.current, snap);
  }, [index]);

  function thumbnail(): Box {
    const { left, top, width, height } = buttons.current[index]!.getBoundingClientRect();
    return { left, top, width, height, borderRadius: "var(--tn-radius-overlay)" };
  }

  function drag(event: React.PointerEvent<HTMLDivElement>) {
    if (event.type === "pointerdown") {
      position.stop();
      start.current = { pointer: event.clientX, position: position.get() };
    }
    position.set(start.current!.position + (start.current!.pointer - event.clientX) / frame.current!.offsetWidth);
  }

  function release() {
    if (!start.current) return;
    start.current = null;
    target.current = Math.round(position.get() + position.getVelocity() * 0.2);
    animate(position, target.current, snap);
    onIndexChange(mod(target.current, images.length));
  }

  return (
    <motion.div
      variants={{ thumbnail }}
      initial="thumbnail"
      animate={fullView()}
      exit="thumbnail"
      transition={shape}
      onAnimationComplete={() => { if (!present) onClosed(index); }}
      className="tn:absolute tn:overflow-hidden tn:bg-ink tn:shadow-float"
    >
      <div ref={frame} {...dragHandlers(drag, release)} onDragStart={(event) => event.preventDefault()} className="tn:absolute tn:inset-0 tn:touch-none tn:select-none">
        {images.map((image, i) => (
          <LightboxImage key={image.label} image={image} i={i} count={images.length} current={i === index} position={position} />
        ))}
      </div>
    </motion.div>
  );
}

export function Lightbox({
  images,
  value: valueProp,
  defaultValue = null,
  onValueChange,
  closeLabel = "Close",
  previousLabel = "Previous image",
  nextLabel = "Next image",
  className = "",
}: LightboxProps) {
  const { soft, swap } = useSprings();
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const [hidden, setHidden] = useState(value);
  const [shown, setShown] = useState(value);
  const [flight, setFlight] = useState(0);
  const [direction, setDirection] = useState(1);
  if (value !== shown) {
    setShown(value);
    if (shown === null && value !== hidden) setFlight(flight + 1);
    if (value !== null) setHidden(value);
  }

  useLayoutEffect(() => {
    if (value === null && hidden !== null) buttons.current[hidden]!.focus({ preventScroll: true });
  }, [value]);

  function move(step: number) {
    setDirection(step);
    setValue((value! + step + images.length) % images.length);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const step = moves[event.key];
    if (step === undefined) return;
    event.preventDefault();
    move(step);
  }

  return (
    <div className={`tn:flex tn:flex-wrap tn:gap-2 ${className}`}>
      {images.map((image, i) => (
        <button
          key={image.label}
          ref={(el) => { buttons.current[i] = el; }}
          type="button"
          aria-haspopup="dialog"
          aria-label={image.label}
          onClick={() => setValue(i)}
          className={`tn:size-24 tn:overflow-hidden tn:rounded-overlay tn:bg-ink tn:shadow-control tn:press tn:hover:brightness-90 tn:outline-offset-2 tn:focus-visible:outline-2 tn:focus-visible:outline-focus ${i === hidden ? "tn:opacity-0" : ""}`}
        >
          {image.image}
        </button>
      ))}
      <Modal
        open={value !== null}
        onClose={() => setValue(null)}
        aria-label={value !== null ? images[value].label : undefined}
        onKeyDown={onKeyDown}
        className="tn:[--tn-color-focus:var(--tn-color-white)] tn:[--tn-color-line:var(--tn-color-ink-3)]"
      >
        <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={soft} onClick={() => setValue(null)} className="tn:absolute tn:inset-0 tn:bg-scrim/80" />
        {value !== null && (
          <LightboxFlight
            key={`image-${flight}`}
            images={images}
            index={value}
            direction={direction}
            buttons={buttons}
            onIndexChange={setValue}
            onClosed={(index) => setHidden((current) => (current === index ? null : current))}
          />
        )}
        <motion.div key="close" {...swap} className="tn:absolute tn:top-4 tn:right-4">
          <IconButton label={closeLabel} variant="secondary" iconSize={16} data-autofocus onClick={() => setValue(null)} icon="close" />
        </motion.div>
        <motion.div key="previous" {...swap} className="tn:absolute tn:bottom-4 tn:left-4 tn:sm:top-1/2 tn:sm:bottom-auto tn:sm:-translate-y-1/2">
          <IconButton label={previousLabel} variant="secondary" iconSize={16} onClick={() => move(-1)} icon="chevronLeft" />
        </motion.div>
        <motion.div key="next" {...swap} className="tn:absolute tn:right-4 tn:bottom-4 tn:sm:top-1/2 tn:sm:bottom-auto tn:sm:-translate-y-1/2">
          <IconButton label={nextLabel} variant="secondary" iconSize={16} onClick={() => move(1)} icon="chevronRight" />
        </motion.div>
      </Modal>
    </div>
  );
}
