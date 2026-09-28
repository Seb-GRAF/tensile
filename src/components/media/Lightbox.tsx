import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { Modal } from "../../Modal";
import { useSprings } from "../../springs";
import { icons } from "../../icons";
import { IconButton } from "../actions/IconButton";
import { Icon } from "../data-display/Icon";

export type LightboxProps = {
  /** Each image fills a square thumbnail and a 3:2 full view, e.g. an img with size-full object-cover; its label is its accessible name. */
  images: { label: string; image: React.ReactNode }[];
  /** Index of the open image, or null when closed. */
  value: number | null;
  onValueChange: (value: number | null) => void;
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
  const width = Math.min(window.innerWidth - 2 * INSET, (window.innerHeight - 2 * INSET) * RATIO);
  const height = width / RATIO;
  return { left: (window.innerWidth - width) / 2, top: (window.innerHeight - height) / 2, width, height, borderRadius: "var(--radius-card)" };
}

function LightboxImage({ image }: { image: LightboxProps["images"][number] }) {
  const { swap } = useSprings();
  const present = useIsPresent();
  return (
    <motion.div role="img" aria-label={image.label} aria-hidden={!present} inert={!present} {...swap} className="absolute inset-0">
      {image.image}
    </motion.div>
  );
}

function LightboxFlight({ images, index, buttons, onClosed }: {
  images: LightboxProps["images"];
  index: number;
  buttons: React.RefObject<(HTMLButtonElement | null)[]>;
  onClosed: () => void;
}) {
  const { shape } = useSprings();
  const present = useIsPresent();
  const { left, top, width, height } = buttons.current[index]!.getBoundingClientRect();
  const thumbnail = { left, top, width, height, borderRadius: "var(--radius-overlay)" };
  return (
    <motion.div
      initial={thumbnail}
      animate={fullView()}
      exit={thumbnail}
      transition={shape}
      onAnimationComplete={() => { if (!present) onClosed(); }}
      className="absolute overflow-hidden bg-ink shadow-float"
    >
      <AnimatePresence initial={false}>
        <LightboxImage key={index} image={images[index]} />
      </AnimatePresence>
    </motion.div>
  );
}

export function Lightbox({
  images,
  value,
  onValueChange,
  closeLabel = "Close",
  previousLabel = "Previous image",
  nextLabel = "Next image",
  className = "",
}: LightboxProps) {
  const { soft, swap } = useSprings();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const [hidden, setHidden] = useState(value);
  if (value !== null && hidden !== value) setHidden(value);

  useLayoutEffect(() => {
    if (value === null && hidden !== null) buttons.current[hidden]!.focus({ preventScroll: true });
  }, [value]);

  function move(step: number) {
    onValueChange((value! + step + images.length) % images.length);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const step = moves[event.key];
    if (step === undefined) return;
    event.preventDefault();
    move(step);
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {images.map((image, i) => (
        <button
          key={image.label}
          ref={(el) => { buttons.current[i] = el; }}
          type="button"
          aria-haspopup="dialog"
          aria-label={image.label}
          onClick={() => onValueChange(i)}
          className={`size-24 overflow-hidden rounded-overlay bg-ink shadow-float outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus ${i === hidden ? "opacity-0" : ""}`}
        >
          {image.image}
        </button>
      ))}
      <Modal
        open={value !== null}
        onClose={() => onValueChange(null)}
        aria-label={value !== null ? images[value].label : undefined}
        onKeyDown={onKeyDown}
        className="[--color-focus:var(--color-paper)] [--color-line:var(--color-ink-3)]"
      >
        <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={soft} onClick={() => onValueChange(null)} className="absolute inset-0 bg-ink/80" />
        {value !== null && <LightboxFlight key="image" images={images} index={value} buttons={buttons} onClosed={() => setHidden(null)} />}
        <motion.div key="close" {...swap} className="absolute top-4 right-4">
          <IconButton label={closeLabel} variant="secondary" data-autofocus onClick={() => onValueChange(null)}><Icon>{icons.close}</Icon></IconButton>
        </motion.div>
        <motion.div key="previous" {...swap} className="absolute top-1/2 left-4 -translate-y-1/2">
          <IconButton label={previousLabel} variant="secondary" onClick={() => move(-1)}><Icon>{icons.chevronLeft}</Icon></IconButton>
        </motion.div>
        <motion.div key="next" {...swap} className="absolute top-1/2 right-4 -translate-y-1/2">
          <IconButton label={nextLabel} variant="secondary" onClick={() => move(1)}><Icon>{icons.chevronRight}</Icon></IconButton>
        </motion.div>
      </Modal>
    </div>
  );
}
