import { motion } from "motion/react";
import { useId, useRef, useState } from "react";
import { Menu } from "../../../Menu";
import { ROW } from "../../../list";
import { useOutsidePress, useTopLayer } from "../../../overlay";
import { useSprings } from "../../../springs";
import { Icon } from "../../data-display/Icon/Icon";
import { useLinkClick } from "../Link/Link";

type Page = { label: string; icon?: React.ReactNode; href?: string };

type Crumb = Page & {
  /** The other pages at this crumb's level, listed in a menu behind a chevron. */
  siblings?: Page[];
};

export type BreadcrumbsProps = {
  /** The trail from the root; the last item is the current page. */
  items: Crumb[];
  onNavigate: (item: Page) => void;
  label?: string;
  expandLabel?: string;
  /** Names the chevron button that lists a crumb's siblings, and the menu it opens. */
  siblingsLabel?: (label: string) => string;
  /** Items shown before the "…" pill. */
  itemsBeforeCollapse?: number;
  /** Items shown after the "…" pill, the current page included. */
  itemsAfterCollapse?: number;
  className?: string;
};

const separator = <Icon name="chevronRight" size={14} className="tn:mx-0.5 tn:text-muted/50" />;

const MARGIN = 16;
const MENU_WIDTH = 224;

function PageMenu({ pages, label, icon, onNavigate }: { pages: Page[]; label: string; icon: "more" | "chevronDown"; onNavigate: (page: Page) => void }) {
  const { shape, swap } = useSprings();
  const linkClick = useLinkClick();
  const [open, setOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const button = useRef<HTMLButtonElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const { room, settle } = useTopLayer(frame, open);
  useOutsidePress(frame, open, () => setOpen(false));
  const grow = MENU_WIDTH - 24;
  const up = room !== undefined && room.below < 13 + pages.length * ROW && room.above > room.below;
  const left = room !== undefined && room.right < grow + MARGIN && room.left > room.right;
  const maxHeight = room === undefined ? pages.length * ROW : Math.max(0, (up ? room.above : room.below) - 13);
  const height = open ? 32 + 13 + Math.min(pages.length * ROW, maxHeight) : 32;
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
    <div className="tn:relative tn:h-8 tn:w-6 tn:shrink-0">
      <div ref={frame} className="tn:absolute tn:inset-0">
        <motion.div
          initial={false}
          animate={{ width: open ? MENU_WIDTH : 24, height, borderRadius: open ? "var(--tn-radius-overlay)" : "var(--tn-radius-control)", x }}
          transition={shape}
          onAnimationComplete={settle}
          className={`tn:absolute tn:flex tn:overflow-hidden tn:bg-paper tn:transition-shadow tn:duration-[calc(300ms*var(--tn-motion-duration-scale))] ${open ? "tn:shadow-float" : ""} tn:outline-offset-2 tn:has-[button:focus-visible]:outline-2 tn:has-[button:focus-visible]:outline-focus ${up ? "tn:bottom-0 tn:flex-col-reverse" : "tn:top-0 tn:flex-col"} ${left ? "tn:right-0 tn:items-end" : "tn:left-0"}`}
        >
          <button
            ref={button}
            type="button"
            aria-label={label}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls={menuId}
            onMouseDown={(event) => { if (open) event.preventDefault(); }}
            onClick={() => open ? close(true) : show(0)}
            onKeyDown={(event) => {
              if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
              event.preventDefault();
              show(event.key === "ArrowDown" ? 0 : pages.length - 1);
            }}
            className={`tn:grid tn:h-8 tn:w-6 tn:shrink-0 tn:place-items-center tn:outline-none ${open ? "tn:text-ink" : "tn:hover:bg-hover tn:hover:text-ink"}`}
          >
            <motion.span initial={false} animate={{ rotate: open && icon === "chevronDown" ? 180 : 0 }} transition={shape} className="tn:flex">
              <Icon name={icon} size={14} />
            </motion.span>
          </button>
          <motion.div
            inert={!open}
            initial={false}
            animate={open ? swap.animate : swap.exit}
            style={{ width: MENU_WIDTH }}
            className={`tn:shrink-0 ${up ? "tn:border-b" : "tn:border-t"} tn:border-line`}
          >
            <Menu
              actions={pages}
              onAction={(page, event) => {
                onNavigate(page);
                if (page.href) linkClick(event as React.MouseEvent<HTMLAnchorElement>);
              }}
              onClose={close}
              open={open}
              id={menuId}
              label={label}
              initialIndex={initialIndex}
              maxHeight={maxHeight}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function Breadcrumbs({
  items,
  onNavigate,
  label = "Breadcrumb",
  expandLabel = "Show full path",
  siblingsLabel = (label: string) => `Pages next to ${label}`,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 2,
  className = "",
}: BreadcrumbsProps) {
  const linkClick = useLinkClick();
  const end = items.length - itemsAfterCollapse;
  const hidden = items.slice(itemsBeforeCollapse, end);

  function crumb(item: Crumb, i: number) {
    return (
      <>
        {page(item, i)}
        {item.siblings && <PageMenu icon="chevronDown" pages={item.siblings} label={siblingsLabel(item.label)} onNavigate={onNavigate} />}
      </>
    );
  }

  function page(item: Crumb, i: number) {
    const layout = `tn:grid tn:h-8 tn:grid-flow-col ${item.icon ? "tn:grid-cols-[auto_minmax(0,auto)]" : "tn:grid-cols-[minmax(1rem,auto)]"} tn:items-center tn:gap-1.5 tn:px-1.5`;
    const content = <>{item.icon}<span className="tn:truncate">{item.label}</span></>;
    if (i === items.length - 1) {
      return <span aria-current="page" className={`${layout} tn:text-ink`}>{content}</span>;
    }
    const props = {
      className: `${layout} tn:rounded-control tn:outline-offset-2 tn:hover:text-ink tn:focus-visible:outline-2 tn:focus-visible:outline-focus`,
    };
    return item.href ? (
      <a {...props} href={item.href} onClick={(event) => { onNavigate(item); linkClick(event); }}>{content}</a>
    ) : (
      <button {...props} type="button" onClick={() => onNavigate(item)}>{content}</button>
    );
  }

  return (
    <nav aria-label={label} className={className}>
      <ol role="list" className="tn:flex tn:w-fit tn:max-w-full tn:items-center tn:rounded-control tn:bg-paper tn:px-1.5 tn:py-1 tn:text-label tn:font-medium tn:whitespace-nowrap tn:text-muted tn:shadow-control">
        {items.map((item, i) =>
          i > itemsBeforeCollapse && i < end ? null : (
            <li key={i} className={`tn:flex tn:items-center ${i < items.length - 1 ? "tn:shrink-10000" : ""}`}>
              {i > 0 && separator}
              {i === itemsBeforeCollapse && hidden.length > 0 ? <PageMenu icon="more" pages={hidden} label={expandLabel} onNavigate={onNavigate} /> : crumb(item, i)}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}
