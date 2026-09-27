import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { shape, soft, swap } from "../springs";

export type ToastStackProps = {
  /** Oldest first: the last toast is in front. */
  toasts: { id: string; label: string; icon?: React.ReactNode }[];
  onDismiss: (id: string) => void;
  label?: string;
  dismissLabel?: (label: string) => string;
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
}: ToastStackProps) {
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
      onMouseLeave={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false);
      }}
      className="outline-none"
    >
      <ol className="relative h-11 w-80">
        <AnimatePresence initial={false}>
          {toasts.map((toast, i) => {
            const depth = toasts.length - 1 - i;
            const place = Math.min(depth, VISIBLE - 1);
            return (
              <motion.li
                key={toast.id}
                initial={{ y: HEIGHT, opacity: 0 }}
                animate={
                  expanded
                    ? { y: -depth * (HEIGHT + GAP), scale: 1, opacity: 1 }
                    : { y: -place * PEEK, scale: 1 - place * 0.05, opacity: depth < VISIBLE ? 1 : 0 }
                }
                exit={swap.exit}
                transition={{ y: shape, scale: shape, opacity: soft }}
                className="absolute inset-x-0 bottom-0 pt-2"
              >
                <div className="relative flex h-11 items-center rounded-full bg-ink text-sm font-medium text-paper shadow-float outline-offset-2 has-focus-visible:outline-2 has-focus-visible:outline-ink">
                  <motion.span
                    initial={false}
                    animate={{ opacity: expanded ? 0 : place * 0.12 }}
                    transition={soft}
                    className="absolute inset-0 rounded-full bg-paper"
                  />
                  <motion.div
                    initial={swap.initial}
                    animate={expanded || depth === 0 ? swap.animate : swap.exit}
                    className="relative flex min-w-0 flex-1 items-center gap-2 pr-1.5 pl-4"
                  >
                    {toast.icon}
                    <span role="status" className="min-w-0 flex-1 truncate">
                      {toast.label}
                    </span>
                    <button
                      type="button"
                      aria-label={dismissLabel(toast.label)}
                      onClick={(event) => dismiss(event, toast.id)}
                      className="grid size-8 shrink-0 place-items-center rounded-full text-paper/55 outline-none"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="size-3.5 fill-none stroke-current"
                        strokeWidth={2.6}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
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
