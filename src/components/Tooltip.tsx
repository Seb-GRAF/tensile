import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { shape, soft, swap } from "../springs";
import { useWidth } from "../useWidth";

type Action = { label: string; icon?: React.ReactNode };

export type TooltipProps = {
  /** The targets. Each label is the button's accessible name and its tooltip text. */
  actions: Action[];
  onAction: (action: Action) => void;
  label?: string;
};

const DELAY = 400;
const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };

function Bubble({ id, text }: { id: string; text: string }) {
  const [width, measure] = useWidth();
  return (
    <motion.div
      role="tooltip"
      id={id}
      initial={false}
      animate={{ width }}
      transition={shape}
      className="grid h-7 -translate-x-1/2 place-content-center place-items-center overflow-hidden rounded-full bg-ink text-[13px] font-medium text-paper shadow-float"
    >
      <span className="sr-only">{text}</span>
      <AnimatePresence initial={false}>
        <motion.span
          key={text}
          ref={measure}
          aria-hidden
          {...swap}
          className="col-start-1 row-start-1 whitespace-nowrap px-3"
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}

export function Tooltip({ actions, onAction, label = "Actions" }: TooltipProps) {
  const [target, setTarget] = useState<{ index: number; x: number } | null>(null);
  const [focused, setFocused] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const timer = useRef(0);
  const tooltipId = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") hide();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function show(index: number, button: HTMLButtonElement) {
    const next = { index, x: button.offsetLeft + button.offsetWidth / 2 };
    clearTimeout(timer.current);
    if (target) setTarget(next);
    else timer.current = window.setTimeout(() => setTarget(next), DELAY);
  }

  function hide() {
    clearTimeout(timer.current);
    setTarget(null);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const move = moves[event.key];
    if (!move) return;
    buttons.current[(focused + move + actions.length) % actions.length]!.focus();
  }

  return (
    <div
      role="toolbar"
      aria-label={label}
      onKeyDown={onKeyDown}
      onPointerLeave={hide}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) hide();
      }}
      className="relative flex w-fit rounded-full bg-paper p-1 shadow-float"
    >
      {actions.map((action, i) => (
        <button
          key={action.label}
          ref={(el) => {
            buttons.current[i] = el;
          }}
          type="button"
          tabIndex={i === focused ? 0 : -1}
          aria-label={action.label}
          aria-describedby={target?.index === i ? tooltipId : undefined}
          onPointerEnter={(event) => show(i, event.currentTarget)}
          onFocus={(event) => {
            setFocused(i);
            show(i, event.currentTarget);
          }}
          onClick={() => onAction(action)}
          className="flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-[13px] font-medium text-ink outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
        >
          {action.icon ?? action.label}
        </button>
      ))}
      <AnimatePresence>
        {target && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, x: target.x }}
            animate={{ opacity: 1, x: target.x }}
            exit={{ opacity: 0 }}
            transition={{ x: shape, opacity: soft }}
            className="pointer-events-none absolute bottom-full left-0 mb-2"
          >
            <Bubble id={tooltipId} text={actions[target.index].label} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
