import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { icons } from "../../icons";
import { useSprings } from "../../springs";
import { IconButton } from "../actions/IconButton";
import { Icon } from "../data-display/Icon";

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
      className={`w-full outline-none [--color-focus:var(--color-paper)] ${className}`}
    >
      <ol role="list" className="relative h-11">
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
                <div className="relative flex h-11 items-center rounded-control bg-ink text-sm font-medium text-paper shadow-float">
                  <motion.span
                    initial={false}
                    animate={{ opacity: expanded ? 0 : place * 0.12 }}
                    transition={soft}
                    className="absolute inset-0 rounded-control bg-paper"
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
                    <IconButton
                      variant="ghost"
                      size="sm"
                      label={dismissLabel(toast.label)}
                      onClick={(event) => dismiss(event, toast.id)}
                      className="shrink-0 text-paper/55"
                    >
                      <Icon size={14}>{icons.close}</Icon>
                    </IconButton>
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
