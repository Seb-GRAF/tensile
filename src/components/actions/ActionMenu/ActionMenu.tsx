import { motion } from "motion/react";
import { useId, useRef, useState } from "react";
import { Menu, type MenuAction } from "../../../Menu";
import { ROW } from "../../../list";
import { useOutsidePress, useTopLayer } from "../../../overlay";
import { useSprings } from "../../../springs";
import { useSize } from "../../../useSize";

export type ActionMenuProps = {
  actions: MenuAction[];
  onAction: (action: MenuAction) => void;
  label?: string;
  menuLabel?: string;
  trigger?: React.ReactNode;
  /** `sm` is the 32 px trigger for dense rows, e.g. an icon trigger in a table. */
  size?: "md" | "sm";
  className?: string;
};

const sizes = {
  md: { height: 44, box: "tn:h-11", label: "tn:px-4 tn:text-body", trigger: "tn:px-4 tn:text-body" },
  sm: { height: 32, box: "tn:h-8", label: "tn:px-4 tn:text-label", trigger: "tn:px-2 tn:text-label" },
};

const MARGIN = 16;

export function ActionMenu({ actions, onAction, label = "More", menuLabel = "Actions", trigger, size = "md", className = "" }: ActionMenuProps) {
  const { shape, swap } = useSprings();
  const [open, setOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const [triggerSize, measure] = useSize();
  const button = useRef<HTMLButtonElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const { room, settle } = useTopLayer(frame, open);
  useOutsidePress(frame, open, () => setOpen(false));
  const width = triggerSize?.width;
  const menuWidth = Math.max(224, width ?? 0);
  const grow = menuWidth - (width ?? 0);
  const up = room !== undefined && room.below < 13 + actions.length * ROW && room.above > room.below;
  const left = room !== undefined && room.right < grow + MARGIN && room.left > room.right;
  const maxHeight = room === undefined ? actions.length * ROW : Math.max(0, (up ? room.above : room.below) - 13);
  const closed = sizes[size].height;
  const height = open ? closed + 13 + Math.min(actions.length * ROW, maxHeight) : closed;
  const x = open && room ? (left ? Math.max(0, grow + MARGIN - room.left) : Math.min(0, room.right - grow - MARGIN)) : 0;

  function show(index: number) {
    setInitialIndex(index);
    setOpen(true);
  }

  function close(restoreFocus: boolean) {
    setOpen(false);
    if (restoreFocus) button.current!.focus({ preventScroll: true });
  }

  return (
    <div className={`tn:relative ${sizes[size].box} ${className}`} style={{ width }}>
      <div ref={frame} className="tn:absolute tn:inset-0">
        <motion.div
          key={width === undefined ? "measuring" : "measured"}
          initial={false}
          animate={{ width: open ? menuWidth : width, height, borderRadius: open ? "var(--tn-radius-overlay)" : "var(--tn-radius-control)", x }}
          transition={shape}
          onAnimationComplete={settle}
          className={`tn:absolute tn:flex tn:overflow-hidden tn:bg-paper tn:shadow-control tn:transition-shadow tn:duration-[calc(300ms*var(--tn-motion-duration-scale))] ${open ? "tn:[--tn-shadow-control-drop:initial]" : ""} tn:outline-offset-2 tn:has-[button:focus-visible]:outline-2 tn:has-[button:focus-visible]:outline-focus ${up ? "tn:bottom-0 tn:flex-col-reverse" : "tn:top-0 tn:flex-col"} ${left ? "tn:right-0 tn:items-end" : "tn:left-0"}`}
        >
          <button
            ref={button}
            type="button"
            aria-label={trigger === undefined ? undefined : label}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls={menuId}
            onMouseDown={(event) => { if (open) event.preventDefault(); }}
            onClick={() => open ? close(true) : show(0)}
            onKeyDown={(event) => {
              if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
              event.preventDefault();
              show(event.key === "ArrowDown" ? 0 : actions.length - 1);
            }}
            className={`tn:flex ${sizes[size].box} tn:shrink-0 tn:items-center tn:font-medium tn:text-ink tn:outline-none ${left ? "tn:self-stretch tn:justify-end" : ""} ${open ? "" : "tn:hover:bg-hover"}`}
          >
            <span ref={measure} className={`tn:inline-flex tn:items-center tn:whitespace-nowrap ${trigger === undefined ? sizes[size].label : sizes[size].trigger}`}>{trigger ?? label}</span>
          </button>
          <motion.div
            inert={!open}
            initial={false}
            animate={open ? swap.animate : swap.exit}
            style={{ width: menuWidth }}
            className={`tn:shrink-0 ${up ? "tn:border-b" : "tn:border-t"} tn:border-line`}
          >
            <Menu actions={actions} onAction={onAction} onClose={close} open={open} id={menuId} label={menuLabel} initialIndex={initialIndex} maxHeight={maxHeight} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
