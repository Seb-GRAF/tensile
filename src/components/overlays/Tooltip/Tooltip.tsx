import { AnimatePresence, motion } from "motion/react";
import { createContext, useContext, useEffect, useId, useRef, useState } from "react";
import { useTopLayer } from "../../../overlay";
import { useSprings } from "../../../springs";
import { useSize } from "../../../useSize";

type Trigger = {
  ref: React.RefCallback<HTMLElement>;
  onPointerEnter: React.PointerEventHandler<HTMLElement>;
  onPointerLeave: React.PointerEventHandler<HTMLElement>;
  onFocus: React.FocusEventHandler<HTMLElement>;
  onBlur: React.FocusEventHandler<HTMLElement>;
  "aria-describedby": string | undefined;
};

type Target = { element: HTMLElement; label: string };

type Group = {
  id: string;
  target: Target | null;
  show: (element: HTMLElement, label: string) => void;
  leave: (next: EventTarget | null) => void;
};

const TooltipContext = createContext<Group | null>(null);

export type TooltipProps = {
  label: string;
  children: (trigger: Trigger) => React.ReactNode;
  className?: string;
};

function Bubble({ id, target, root }: { id: string; target: Target; root: React.RefObject<HTMLDivElement | null> }) {
  const { shape, soft, swap } = useSprings();
  const [size, measure] = useSize();
  const box = target.element.getBoundingClientRect();
  const parent = root.current!.getBoundingClientRect();
  const width = size?.width ?? 0;
  const height = size?.height ?? 28;
  const x = Math.min(innerWidth - width - 8, Math.max(8, box.left + (box.width - width) / 2)) - parent.left;
  const y = (box.top >= height + 16 ? box.top - height - 8 : box.bottom + 8) - parent.top;

  return (
    <motion.div
      key={size ? "placed" : "measuring"}
      role="tooltip"
      id={id}
      initial={{ opacity: 0, x, y }}
      animate={{ opacity: 1, x, y, width: size?.width, height: size?.height }}
      exit={{ opacity: 0 }}
      transition={{ x: shape, y: shape, width: shape, height: shape, opacity: soft }}
      className="absolute top-0 left-0 grid overflow-hidden rounded-overlay bg-ink text-label font-medium text-paper shadow-float"
    >
      <span className="sr-only">{target.label}</span>
      <AnimatePresence initial={false}>
        <motion.span
          key={target.label}
          ref={measure}
          aria-hidden
          {...swap}
          className="col-start-1 row-start-1 w-max max-w-64 px-3 py-1 text-center"
        >
          {target.label}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}

export function TooltipGroup({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [target, setTarget] = useState<Target | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const timer = useRef(0);
  const id = useId();
  const { settle } = useTopLayer(frame, target !== null);

  function hide() {
    clearTimeout(timer.current);
    setTarget(null);
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") hide();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(timer.current);
    };
  }, []);

  function show(element: HTMLElement, label: string) {
    clearTimeout(timer.current);
    if (target) setTarget({ element, label });
    else timer.current = window.setTimeout(() => setTarget({ element, label }), 400);
  }

  function leave(next: EventTarget | null) {
    if (!(next instanceof Node) || !root.current!.contains(next)) hide();
  }

  return (
    <TooltipContext.Provider value={{ id, target, show, leave }}>
      <div ref={root} onPointerLeave={hide} onBlur={(event) => leave(event.relatedTarget)} className={`relative inline-block ${className}`}>
        {children}
        <div ref={frame} className="pointer-events-none absolute inset-0">
          <AnimatePresence onExitComplete={settle}>
            {target && <Bubble key="tooltip" id={id} target={target} root={root} />}
          </AnimatePresence>
        </div>
      </div>
    </TooltipContext.Provider>
  );
}

function TooltipTrigger({ label, children }: TooltipProps) {
  const group = useContext(TooltipContext)!;
  const element = useRef<HTMLElement | null>(null);
  return children({
    ref: (node) => { element.current = node; },
    onPointerEnter: () => group.show(element.current!, label),
    onPointerLeave: (event) => group.leave(event.relatedTarget),
    onFocus: () => group.show(element.current!, label),
    onBlur: (event) => group.leave(event.relatedTarget),
    "aria-describedby": group.target?.element === element.current ? group.id : undefined,
  });
}

export function Tooltip({ label, children, className = "" }: TooltipProps) {
  const group = useContext(TooltipContext);
  const trigger = <TooltipTrigger label={label}>{children}</TooltipTrigger>;
  return group ? <span className={`inline-flex ${className}`}>{trigger}</span> : <TooltipGroup className={className}>{trigger}</TooltipGroup>;
}
