import { useEffect, useRef } from "react";
import { ListHighlight, scrollToRow, useActiveIndex, useTypeahead } from "./list";

export type MenuAction = { label: string; icon?: React.ReactNode; href?: string; disabled?: boolean };

type MenuProps = {
  actions: MenuAction[];
  onAction: (action: MenuAction, event: React.MouseEvent<HTMLElement>) => void;
  onClose: (restoreFocus: boolean) => void;
  open: boolean;
  id: string;
  label: string;
  initialIndex: number;
  maxHeight: number;
};

/** Menu rows, keyboard selection and dismissal shared by action and context menus; an action with an `href` is a link, and `onAction` gets its click, so the owner can route it. */
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

  function run(action: MenuAction, event: React.MouseEvent<HTMLElement>) {
    if (action.disabled) return;
    onAction(action, event);
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
          if (actions[active]) document.getElementById(`${id}-${active}`)!.click();
        } else {
          onArrowKey(event);
          onTypeahead(event);
        }
      }}
      style={{ maxHeight }}
      className="tn:relative tn:m-1.5 tn:overflow-y-auto tn:overscroll-contain tn:outline-none"
    >
      {actions.length > 0 && <ListHighlight index={active} />}
      {actions.map((action, i) => {
        const row = {
          id: `${id}-${i}`,
          role: "menuitem",
          "aria-disabled": action.disabled || undefined,
          onMouseDown: (event: React.MouseEvent) => event.preventDefault(),
          onMouseMove: () => setActive(i),
          onClick: (event: React.MouseEvent<HTMLElement>) => run(action, event),
          className: `tn:relative tn:flex tn:h-10 tn:cursor-pointer tn:items-center tn:gap-2.5 tn:px-2.5 tn:text-sm tn:text-ink ${action.disabled ? "tn:opacity-40" : ""}`,
        };
        const content = (
          <>
            {withIcons && <span className="tn:w-4 tn:shrink-0 tn:text-muted">{action.icon}</span>}
            <span className="tn:truncate">{action.label}</span>
          </>
        );
        return action.href ? (
          <li key={action.label} role="none">
            <a {...row} href={action.href} tabIndex={-1}>{content}</a>
          </li>
        ) : (
          <li key={action.label} {...row}>{content}</li>
        );
      })}
    </ul>
  );
}
