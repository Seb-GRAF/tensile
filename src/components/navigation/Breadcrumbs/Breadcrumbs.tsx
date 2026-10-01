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
  <Icon size={14} className="tn:mx-0.5 tn:text-muted/50">{icons.chevronRight}</Icon>
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
        <span aria-current="page" className="tn:flex tn:h-8 tn:items-center tn:gap-1.5 tn:px-1.5 tn:text-ink">
          {item.icon}
          {item.label}
        </span>
      );
    }
    const props = {
      ref: (element: HTMLButtonElement | HTMLAnchorElement | null) => {
        if (i === itemsBeforeCollapse) firstHidden.current = element;
      },
      className: "tn:flex tn:h-8 tn:min-w-0 tn:items-center tn:gap-1.5 tn:rounded-control tn:px-1.5 tn:outline-offset-2 tn:hover:text-ink tn:focus-visible:outline-2 tn:focus-visible:outline-focus",
    };
    const content = <>{item.icon}<span className="tn:truncate">{item.label}</span></>;
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
      className="tn:grid tn:h-8 tn:items-center tn:justify-items-start tn:rounded-control tn:[clip-path:inset(-4px)]"
    >
      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.ol key="expanded" ref={measure} {...swap} role="list" style={{ maxWidth: room }} className="tn:col-start-1 tn:row-start-1 tn:flex tn:w-max">
            {hidden.map((item, j) => (
              <li key={j} className="tn:flex tn:min-w-0 tn:items-center">
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
            className="tn:col-start-1 tn:row-start-1 tn:grid tn:h-8 tn:place-items-center tn:rounded-control tn:px-3 tn:outline-offset-2 tn:hover:bg-hover tn:focus-visible:outline-2 tn:focus-visible:outline-focus"
          >
            <Icon size={16}>{icons.more}</Icon>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <nav aria-label={label} className={className}>
      <ol ref={trail} role="list" className="tn:flex tn:w-fit tn:items-center tn:rounded-control tn:bg-paper tn:px-1.5 tn:py-1 tn:text-label tn:font-medium tn:whitespace-nowrap tn:text-muted tn:shadow-control">
        {items.map((item, i) =>
          i > itemsBeforeCollapse && i < end ? null : (
            <li key={i} className="tn:flex tn:items-center">
              {i > 0 && separator}
              {i === itemsBeforeCollapse && hidden.length > 0 ? pill : crumb(item, i)}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}
