import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useSprings } from "../../../springs";
import { useWidth } from "../../../useWidth";
import { icons } from "../../../icons";
import { Icon } from "../../data-display/Icon/Icon";
import { useLinkClick } from "../Link/Link";

type Crumb = { label: string; icon?: React.ReactNode; href?: string };

export type BreadcrumbsProps = {
  /** The trail from the root; the last item is the current page. */
  items: Crumb[];
  onNavigate: (item: Crumb) => void;
  label?: string;
  expandLabel?: string;
  /** Items shown before the "…" pill. */
  itemsBeforeCollapse?: number;
  /** Items shown after the "…" pill, the current page included. */
  itemsAfterCollapse?: number;
  className?: string;
};

const separator = (
  <Icon size={14} className="mx-0.5 text-muted/50">{icons.chevronRight}</Icon>
);

export function Breadcrumbs({
  items,
  onNavigate,
  label = "Breadcrumb",
  expandLabel = "Show full path",
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 2,
  className = "",
}: BreadcrumbsProps) {
  const { shape, swap } = useSprings();
  const linkClick = useLinkClick();
  const end = items.length - itemsAfterCollapse;
  const hidden = items.slice(itemsBeforeCollapse, end);
  const hiddenPath = hidden.map((item) => item.label).join("/");
  const [expandedPath, setExpandedPath] = useState<string>();
  const expanded = expandedPath === hiddenPath;
  const [room, setRoom] = useState(0);
  const [width, measure] = useWidth();
  const trail = useRef<HTMLOListElement>(null);
  const firstHidden = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  function expand() {
    flushSync(() => {
      setRoom(trail.current!.parentElement!.clientWidth - trail.current!.offsetWidth + width!);
      setExpandedPath(hiddenPath);
    });
    firstHidden.current!.focus();
  }

  function crumb(item: Crumb, i: number) {
    if (i === items.length - 1) {
      return (
        <span aria-current="page" className="flex h-8 items-center gap-1.5 px-1.5 text-ink">
          {item.icon}
          {item.label}
        </span>
      );
    }
    const props = {
      ref: (element: HTMLButtonElement | HTMLAnchorElement | null) => {
        if (i === itemsBeforeCollapse) firstHidden.current = element;
      },
      className: "flex h-8 min-w-0 items-center gap-1.5 rounded-control px-1.5 outline-offset-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-focus",
    };
    const content = <>{item.icon}<span className="truncate">{item.label}</span></>;
    return item.href ? (
      <a {...props} href={item.href} onClick={(event) => { onNavigate(item); linkClick(event); }}>{content}</a>
    ) : (
      <button {...props} type="button" onClick={() => onNavigate(item)}>{content}</button>
    );
  }

  const pill = (
    <motion.div
      initial={false}
      animate={{ width }}
      transition={shape}
      className="grid h-8 items-center justify-items-start rounded-control [clip-path:inset(-4px)]"
    >
      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.ol key="expanded" ref={measure} {...swap} role="list" style={{ maxWidth: room }} className="col-start-1 row-start-1 flex w-max">
            {hidden.map((item, j) => (
              <li key={j} className="flex min-w-0 items-center">
                {j > 0 && separator}
                {crumb(item, itemsBeforeCollapse + j)}
              </li>
            ))}
          </motion.ol>
        ) : (
          <motion.button
            key="collapsed"
            ref={measure}
            {...swap}
            type="button"
            aria-label={expandLabel}
            aria-expanded={false}
            onClick={expand}
            className="col-start-1 row-start-1 grid h-8 place-items-center rounded-control px-3 outline-offset-2 hover:bg-hover focus-visible:outline-2 focus-visible:outline-focus"
          >
            <Icon size={16}>{icons.more}</Icon>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <nav aria-label={label} className={className}>
      <ol ref={trail} role="list" className="flex w-fit items-center rounded-control bg-paper px-1.5 py-1 text-label font-medium whitespace-nowrap text-muted shadow-control">
        {items.map((item, i) =>
          i > itemsBeforeCollapse && i < end ? null : (
            <li key={i} className="flex items-center">
              {i > 0 && separator}
              {i === itemsBeforeCollapse && hidden.length > 0 ? pill : crumb(item, i)}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}
