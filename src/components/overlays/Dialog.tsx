import { animate, motion, useMotionValue } from "motion/react";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Expand } from "../../Expand";
import { shape, soft } from "../../springs";
import { useWidth } from "../../useWidth";

export type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  /** Text of the button that opens the dialog. */
  label?: string;
  title?: string;
  closeLabel?: string;
};

const focusable =
  "a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex='-1'])";

export function Dialog({
  open,
  onOpenChange,
  children,
  label = "Open dialog",
  title = "Dialog",
  closeLabel = "Close",
}: DialogProps) {
  const [width, measure] = useWidth();
  const [openOnMount] = useState(open);
  const [height, setHeight] = useState(0);
  const mover = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useLayoutEffect(() => {
    if (open) setHeight(dialog.current!.offsetHeight);
  }, [open]);

  useEffect(() => {
    const box = mover.current!.getBoundingClientRect();
    const { clientWidth, clientHeight } = document.documentElement;
    animate(x, open ? x.get() + clientWidth / 2 - box.left - box.width / 2 : 0, shape);
    animate(y, open ? y.get() + clientHeight / 2 - box.top - box.height / 2 : 0, shape);
    if (open) dialog.current!.focus({ preventScroll: true });
  }, [open, x, y]);

  const trigger = (
    <span key={label} ref={measure} className="whitespace-nowrap px-5 text-sm font-medium">
      {label}
    </span>
  );

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;
    const items = event.currentTarget.querySelectorAll<HTMLElement>(focusable);
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && (event.target === first || event.target === event.currentTarget)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && event.target === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <>
      <motion.div
        inert={!open}
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={soft}
        onClick={() => onOpenChange(false)}
        className="fixed inset-0 z-10 bg-ink/40"
      />
      <motion.div ref={mover} style={{ x, y }} className="relative z-10 size-fit">
        {width === undefined && !openOnMount ? (
          trigger
        ) : (
          <Expand
            open={open}
            onOpenChange={onOpenChange}
            closed={{ width: width ?? 0, height: 44, radius: "var(--radius-control)" }}
            opened={{ width: 360, height, radius: "var(--radius-dialog)" }}
            anchor="center"
            label={label}
            trigger={trigger}
            className="bg-paper text-ink"
          >
            <div
              ref={dialog}
              role="dialog"
              aria-modal
              aria-labelledby={titleId}
              tabIndex={-1}
              onKeyDown={onKeyDown}
              className="p-5 outline-none"
            >
              <div className="flex items-center justify-between gap-3">
                <h2 id={titleId} className="text-[15px] font-semibold">
                  {title}
                </h2>
                <button
                  type="button"
                  aria-label={closeLabel}
                  onClick={() => onOpenChange(false)}
                  className="-my-1.5 -mr-2 grid size-8 shrink-0 place-items-center rounded-full text-muted outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
                >
                  <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current" strokeWidth={2.25} strokeLinecap="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
              {children}
            </div>
          </Expand>
        )}
      </motion.div>
    </>
  );
}
