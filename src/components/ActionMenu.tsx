import { motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { ListHighlight, ROW, useActiveIndex } from "../list";
import { shape, swap } from "../springs";
import { useWidth } from "../useWidth";

type Action = { label: string; icon?: React.ReactNode };

export type ActionMenuProps = {
  actions: Action[];
  onAction: (action: Action) => void;
  label?: string;
  menuLabel?: string;
};

export function ActionMenu({ actions, onAction, label = "More", menuLabel = "Actions" }: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive, onArrowKey] = useActiveIndex(actions.length);
  const [width, measure] = useWidth();
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLUListElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (open) menu.current!.focus({ preventScroll: true });
  }, [open]);

  function openAt(index: number) {
    setActive(index);
    setOpen(true);
  }

  function run(action: Action) {
    onAction(action);
    button.current!.focus();
  }

  function onButtonKeyDown(event: React.KeyboardEvent) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    openAt(event.key === "ArrowDown" ? 0 : actions.length - 1);
  }

  function onMenuKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      button.current!.focus();
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      run(actions[active]);
      return;
    }
    onArrowKey(event);
  }

  return (
    <div className="relative h-11" style={{ width }}>
      <motion.div
        initial={false}
        animate={{
          width: open ? 224 : width,
          height: open ? 44 + 1 + 12 + actions.length * ROW : 44,
          borderRadius: open ? 20 : 22,
        }}
        transition={shape}
        className="absolute top-0 left-0 overflow-hidden bg-paper shadow-float outline-offset-2 has-[button:focus-visible]:outline-2 has-[button:focus-visible]:outline-ink"
      >
        <button
          ref={button}
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={menuId}
          onMouseDown={(event) => {
            if (open) event.preventDefault();
          }}
          onClick={() => {
            if (open) button.current!.focus();
            else openAt(0);
          }}
          onKeyDown={onButtonKeyDown}
          className="flex h-11 items-center text-sm font-medium text-ink outline-none"
        >
          <span key={label} ref={measure} className="whitespace-nowrap px-4">
            {label}
          </span>
        </button>
        <motion.div
          inert={!open}
          initial={false}
          animate={open ? swap.animate : swap.exit}
          className="absolute top-11 left-0 w-[224px]"
        >
          <div className="h-px bg-line" />
          <ul
            ref={menu}
            id={menuId}
            role="menu"
            tabIndex={-1}
            aria-label={menuLabel}
            aria-activedescendant={`${menuId}-${active}`}
            onKeyDown={onMenuKeyDown}
            onBlur={() => setOpen(false)}
            className="relative mx-1.5 my-1.5 outline-none"
          >
            <ListHighlight key={open ? "open" : "closed"} index={active} />
            {actions.map((action, i) => (
              <li
                key={action.label}
                id={`${menuId}-${i}`}
                role="menuitem"
                onMouseMove={() => setActive(i)}
                onClick={() => run(action)}
                className="relative flex h-10 cursor-pointer items-center gap-2.5 px-2.5 text-sm text-ink"
              >
                {action.icon && <span className="text-muted">{action.icon}</span>}
                {action.label}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}
