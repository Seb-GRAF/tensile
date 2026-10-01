import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { useControllable } from "../../../controllable";
import { Modal } from "../../../Modal";
import { useSprings } from "../../../springs";
import { icons } from "../../../icons";
import { IconButton } from "../../actions/IconButton/IconButton";
import { Icon } from "../../data-display/Icon/Icon";

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

function LightboxImage({ image, direction }: { image: LightboxProps["images"][number]; direction: number }) {
  const { soft } = useSprings();
  const present = useIsPresent();
  return (
    <motion.div
      role="img"
      aria-label={image.label}
      aria-hidden={!present}
      inert={!present}
      initial={{ opacity: 0, filter: "blur(4px)", x: direction * 24 }}
      animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
      exit={{ filter: "blur(4px)" }}
      transition={soft}
      className="tn:absolute tn:inset-0"
    >
      {image.image}
    </motion.div>
  );
}

function LightboxFlight({ images, index, direction, buttons, onClosed }: {
  images: LightboxProps["images"];
  index: number;
  direction: number;
  buttons: React.RefObject<(HTMLButtonElement | null)[]>;
  onClosed: () => void;
}) {
  const { shape } = useSprings();
  const present = useIsPresent();

  function thumbnail(): Box {
    const { left, top, width, height } = buttons.current[index]!.getBoundingClientRect();
    return { left, top, width, height, borderRadius: "var(--tn-radius-overlay)" };
  }

  return (
    <motion.div
      variants={{ thumbnail }}
      initial="thumbnail"
      animate={fullView()}
      exit="thumbnail"
      transition={shape}
      onAnimationComplete={() => { if (!present) onClosed(); }}
      className="tn:absolute tn:overflow-hidden tn:bg-ink tn:shadow-float"
    >
      <AnimatePresence initial={false}>
        <LightboxImage key={index} image={images[index]} direction={direction} />
      </AnimatePresence>
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
  const [direction, setDirection] = useState(1);
  if (value !== null && hidden !== value) setHidden(value);

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
        {value !== null && <LightboxFlight key="image" images={images} index={value} direction={direction} buttons={buttons} onClosed={() => setHidden(null)} />}
        <motion.div key="close" {...swap} className="tn:absolute tn:top-4 tn:right-4">
          <IconButton label={closeLabel} variant="secondary" data-autofocus onClick={() => setValue(null)}><Icon>{icons.close}</Icon></IconButton>
        </motion.div>
        <motion.div key="previous" {...swap} className="tn:absolute tn:bottom-4 tn:left-4 tn:sm:top-1/2 tn:sm:bottom-auto tn:sm:-translate-y-1/2">
          <IconButton label={previousLabel} variant="secondary" onClick={() => move(-1)}><Icon>{icons.chevronLeft}</Icon></IconButton>
        </motion.div>
        <motion.div key="next" {...swap} className="tn:absolute tn:right-4 tn:bottom-4 tn:sm:top-1/2 tn:sm:bottom-auto tn:sm:-translate-y-1/2">
          <IconButton label={nextLabel} variant="secondary" onClick={() => move(1)}><Icon>{icons.chevronRight}</Icon></IconButton>
        </motion.div>
      </Modal>
    </div>
  );
}
