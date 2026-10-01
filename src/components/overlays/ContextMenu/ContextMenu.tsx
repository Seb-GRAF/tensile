import { motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, type MenuAction } from "../../../Menu";
import { ROW } from "../../../list";
import { useOutsidePress, useTopLayer } from "../../../overlay";
import { useSprings } from "../../../springs";

export type ContextMenuProps = {
  actions: MenuAction[];
  onAction: (action: MenuAction) => void;
  children: React.ReactNode;
  menuLabel?: string;
  className?: string;
};

export function ContextMenu({ actions, onAction, children, menuLabel = "Actions", className = "" }: ContextMenuProps) {
  const { soft, spring } = useSprings();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number; width: number; maxHeight: number } | null>(null);
  const target = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const timer = useRef(0);
  const press = useRef({ x: 0, y: 0, held: false });
  const menuId = useId();
  const { settle } = useTopLayer(frame, open);
  useOutsidePress(frame, open, () => close(true));

  useEffect(() => () => clearTimeout(timer.current), []);

  function show(x: number, y: number) {
    const width = Math.min(224, innerWidth - 16);
    y = Math.max(8, Math.min(innerHeight - 8, y));
    const up = innerHeight - y < actions.length * ROW + 20 && y > innerHeight - y;
    const maxHeight = Math.max(0, (up ? y : innerHeight - y) - 20);
    returnFocus.current = target.current!.contains(document.activeElement) ? document.activeElement as HTMLElement : target.current;
    setPosition({ x: Math.max(8, Math.min(innerWidth - width - 8, x)), y: up ? y - Math.min(actions.length * ROW, maxHeight) - 12 : y, width, maxHeight });
    setOpen(true);
  }

  function close(restoreFocus: boolean) {
    setOpen(false);
    if (restoreFocus) returnFocus.current!.focus({ preventScroll: true });
  }

  return (
    <div
      ref={target}
      role="group"
      tabIndex={0}
      aria-label={menuLabel}
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={menuId}
      onContextMenu={(event) => {
        if (!event.currentTarget.contains(event.target as Node)) return;
        event.preventDefault();
        clearTimeout(timer.current);
        show(event.clientX, event.clientY);
      }}
      onKeyDown={(event) => {
        if (event.key !== "ContextMenu" && !(event.shiftKey && event.key === "F10")) return;
        if (!event.currentTarget.contains(event.target as Node)) return;
        event.preventDefault();
        const box = (event.target as HTMLElement).getBoundingClientRect();
        show(box.left, box.bottom);
      }}
      onPointerDown={(event) => {
        press.current = { x: event.clientX, y: event.clientY, held: false };
        if (!event.currentTarget.contains(event.target as Node)) return;
        if (event.pointerType === "mouse") return;
        timer.current = window.setTimeout(() => {
          press.current.held = true;
          show(press.current.x, press.current.y);
        }, 500);
      }}
      onPointerMove={(event) => {
        if (Math.hypot(event.clientX - press.current.x, event.clientY - press.current.y) > 8) clearTimeout(timer.current);
      }}
      onPointerUp={() => clearTimeout(timer.current)}
      onPointerCancel={() => clearTimeout(timer.current)}
      onTouchEnd={(event) => {
        if (press.current.held) event.preventDefault();
      }}
      className={`tn:rounded-card tn:outline-offset-2 tn:focus-visible:outline-2 tn:focus-visible:outline-focus ${className}`}
    >
      {children}
      {position && createPortal(
        <div className="tn:fixed tn:size-0" style={{ left: position.x, top: position.y }}>
          <div ref={frame} className="tn:absolute tn:inset-0">
            <motion.div
              inert={!open}
              aria-hidden={!open}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={open ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
              transition={open ? soft : spring(0.12)}
              onAnimationComplete={settle}
              style={{ width: position.width }}
              className="tn:absolute tn:top-0 tn:left-0 tn:origin-top-left tn:select-none tn:rounded-overlay tn:bg-paper tn:shadow-float"
            >
              <Menu actions={actions} onAction={onAction} onClose={close} open={open} id={menuId} label={menuLabel} initialIndex={0} maxHeight={position.maxHeight} />
            </motion.div>
          </div>
        </div>,
        target.current!.closest("dialog") ?? document.body,
      )}
    </div>
  );
}
