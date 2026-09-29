import { useEffect, useRef } from "react";
import { ListHighlight, scrollToRow, useActiveIndex, useTypeahead } from "./list";

export type MenuAction = { label: string; icon?: React.ReactNode; disabled?: boolean };

type MenuProps = {
  actions: MenuAction[];
  onAction: (action: MenuAction) => void;
  onClose: (restoreFocus: boolean) => void;
  open: boolean;
  id: string;
  label: string;
  initialIndex: number;
  maxHeight: number;
};

/** Menu rows, keyboard selection and dismissal shared by action and context menus. */
export function Menu({ actions, onAction, onClose, open, id, label, initialIndex, maxHeight }: MenuProps) {
  const menu = useRef<HTMLUListElement>(null);
  const [active, setActive, onArrowKey] = useActiveIndex(actions.length);
  const onTypeahead = useTypeahead(actions, active, setActive);
  const withIcons = actions.some((action) => action.icon);

  useEffect(() => {
    if (!open) return;
    setActive(initialIndex);
    menu.current!.focus({ preventScroll: true });
  }, [open, initialIndex]);

  useEffect(() => {
    if (open && actions[active]) {
      scrollToRow(menu.current!, active);
    }
  }, [open, active, actions, id]);

  function run(action: MenuAction) {
    if (action.disabled) return;
    onAction(action);
    onClose(true);
  }

  return (
    <ul
      ref={menu}
      id={id}
      role="menu"
      tabIndex={-1}
      aria-label={label}
      aria-activedescendant={actions[active] ? `${id}-${active}` : undefined}
      onBlur={() => onClose(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          onClose(true);
        } else if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (actions[active]) run(actions[active]);
        } else {
          onArrowKey(event);
          onTypeahead(event);
        }
      }}
      style={{ maxHeight }}
      className="relative m-1.5 overflow-y-auto overscroll-contain outline-none"
    >
      {actions.length > 0 && <ListHighlight index={active} />}
      {actions.map((action, i) => (
        <li
          key={action.label}
          id={`${id}-${i}`}
          role="menuitem"
          aria-disabled={action.disabled || undefined}
          onMouseDown={(event) => event.preventDefault()}
          onMouseMove={() => setActive(i)}
          onClick={() => run(action)}
          className={`relative flex h-10 cursor-pointer items-center gap-2.5 px-2.5 text-sm text-ink ${action.disabled ? "opacity-40" : ""}`}
        >
          {withIcons && <span className="w-4 shrink-0 text-muted">{action.icon}</span>}
          <span className="truncate">{action.label}</span>
        </li>
      ))}
    </ul>
  );
}
