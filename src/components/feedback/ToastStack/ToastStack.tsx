import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { useSprings } from "../../../springs";
import { IconButton } from "../../actions/IconButton/IconButton";

export type ToastStackProps = {
  /** Oldest first: the last toast is in front. */
  toasts: { id: string; label: string; icon?: React.ReactNode }[];
  onDismiss: (id: string) => void;
  label?: string;
  dismissLabel?: (label: string) => string;
  className?: string;
};

const HEIGHT = 44;
const GAP = 8;
const PEEK = 10;
const VISIBLE = 3;

export function ToastStack({
  toasts,
  onDismiss,
  label = "Notifications",
  dismissLabel = (label: string) => `Dismiss ${label}`,
  className = "",
}: ToastStackProps) {
  const { shape, soft, swap } = useSprings();
  const [expanded, setExpanded] = useState(false);
  const region = useRef<HTMLElement>(null);

  function dismiss(event: React.MouseEvent<HTMLButtonElement>, id: string) {
    const item = event.currentTarget.closest("li")!;
    const neighbor = item.previousElementSibling ?? item.nextElementSibling;
    (neighbor?.querySelector("button") ?? region.current!).focus();
    onDismiss(id);
  }

  return (
    <section
      ref={region}
      aria-label={label}
      tabIndex={-1}
      onMouseMove={() => setExpanded(true)}
      onMouseLeave={(event) => setExpanded(event.currentTarget.contains(document.activeElement))}
      onFocus={() => setExpanded(true)}
      onBlur={(event) => setExpanded(event.currentTarget.contains(event.relatedTarget) || event.currentTarget.matches(":hover"))}
      className={`tn:w-full tn:outline-none tn:[--tn-color-focus:var(--tn-color-paper)] tn:[--tn-ghost-hover:var(--tn-color-ink-3)] tn:[--tn-color-line:var(--tn-color-ink-3)] ${className}`}
    >
      <ol role="list" className="tn:relative tn:h-11">
        <AnimatePresence initial={false}>
          {toasts.map((toast, i) => {
            const depth = toasts.length - 1 - i;
            const place = Math.min(depth, VISIBLE - 1);
            return (
              <motion.li
                key={toast.id}
                initial={toasts.length > 1 ? { y: 0 } : { y: HEIGHT, opacity: 0 }}
                animate={
                  expanded
                    ? { y: -depth * (HEIGHT + GAP), scale: 1, opacity: 1 }
                    : { y: -place * PEEK, scale: 1 - place * 0.05, opacity: depth < VISIBLE ? 1 : 0 }
                }
                exit={swap.exit}
                transition={{ y: shape, scale: shape, opacity: soft }}
                className="tn:absolute tn:inset-x-0 tn:bottom-0 tn:pt-2"
              >
                <div className="tn:relative tn:flex tn:h-11 tn:items-center tn:rounded-control tn:bg-ink tn:text-sm tn:font-medium tn:text-paper tn:shadow-float">
                  <motion.span
                    initial={false}
                    animate={{ opacity: expanded ? 0 : place * 0.12 }}
                    transition={soft}
                    className="tn:absolute tn:inset-0 tn:rounded-control tn:bg-paper"
                  />
                  <motion.div
                    initial={swap.initial}
                    animate={expanded || depth === 0 ? swap.animate : swap.exit}
                    className="tn:relative tn:flex tn:min-w-0 tn:flex-1 tn:items-center tn:gap-2 tn:pr-1.5 tn:pl-4"
                  >
                    <span role="status" className="tn:grid tn:min-w-0 tn:flex-1 tn:grid-cols-1">
                      <AnimatePresence initial={false}>
                        <motion.span key={toast.label} {...swap} className="tn:col-start-1 tn:row-start-1 tn:flex tn:min-w-0 tn:items-center tn:gap-2">
                          {toast.icon}
                          <span className="tn:min-w-0 tn:flex-1 tn:truncate">{toast.label}</span>
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <IconButton
                      variant="ghost"
                      size="sm"
                      iconSize={14}
                      label={dismissLabel(toast.label)}
                      icon="close"
                      onClick={(event) => dismiss(event, toast.id)}
                      className="tn:shrink-0 tn:text-paper/60"
                    />
                  </motion.div>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ol>
    </section>
  );
}
