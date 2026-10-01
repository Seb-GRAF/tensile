import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { useControllable } from "../../../controllable";
import { useOutsidePress, useTopLayer } from "../../../overlay";
import { icons } from "../../../icons";
import { useSprings } from "../../../springs";
import { useSize } from "../../../useSize";
import { Icon } from "../../data-display/Icon/Icon";
import { useLinkClick } from "../Link/Link";

type PanelLink = { label: string; href: string; description?: string };

export type NavigationMenuProps = {
  /** Links, or triggers whose `links` open in a panel. */
  items: ({ label: string; href: string } | { label: string; links: PanelLink[] })[];
  /** The `label` of the item whose panel is open; null while none is. */
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  label?: string;
  className?: string;
};

const OPEN_DELAY = 200;
const CLOSE_DELAY = 150;
const MARGIN = 16;
const LINKS = "div:not([inert]) > ul a";
const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };

function Content({ links, direction, measure, onLinkClick }: { links: PanelLink[]; direction: number; measure: React.Ref<HTMLDivElement>; onLinkClick: React.MouseEventHandler<HTMLAnchorElement> }) {
  const { swap } = useSprings();
  const present = useIsPresent();
  return (
    <div ref={present ? measure : undefined} aria-hidden={!present} inert={!present} className="tn:col-start-1 tn:row-start-1">
      <motion.ul
        role="list"
        custom={direction}
        variants={{
          enter: (direction: number) => ({ ...swap.initial, x: direction * 12 }),
          center: { ...swap.animate, x: 0 },
          exit: (direction: number) => ({ ...swap.exit, x: direction * -12 }),
        }}
        initial="enter"
        animate="center"
        exit="exit"
        className="tn:grid tn:w-max tn:max-w-80 tn:p-1.5"
      >
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={onLinkClick}
              className="tn:block tn:rounded-[calc(var(--tn-radius-overlay)/2)] tn:px-2.5 tn:py-2 tn:outline-offset-2 tn:hover:bg-hover tn:focus-visible:outline-2 tn:focus-visible:outline-focus"
            >
              <span className="tn:block tn:text-sm tn:font-medium tn:text-ink">{link.label}</span>
              {link.description && <span className="tn:block tn:text-label tn:text-muted">{link.description}</span>}
            </a>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

function Panel({ id, index, links, elements, root, onLinkClick, onPointerEnter, onPointerLeave, onKeyDown }: {
  id: string;
  index: number;
  links: PanelLink[];
  elements: React.RefObject<(HTMLElement | null)[]>;
  root: React.RefObject<HTMLElement | null>;
  onLinkClick: React.MouseEventHandler<HTMLAnchorElement>;
  onPointerEnter: React.PointerEventHandler<HTMLDivElement>;
  onPointerLeave: React.PointerEventHandler<HTMLDivElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
}) {
  const { shape, soft, spring } = useSprings();
  const [size, measure] = useSize();
  const [previous, setPrevious] = useState(index);
  const [direction, setDirection] = useState(1);
  if (index !== previous) {
    setPrevious(index);
    setDirection(index > previous ? 1 : -1);
  }
  const x = size ? Math.min(innerWidth - size.width - MARGIN, Math.max(MARGIN, elements.current[index]!.getBoundingClientRect().left)) - root.current!.getBoundingClientRect().left : 0;

  return (
    <motion.div
      key={size ? "placed" : "measuring"}
      id={id}
      initial={{ opacity: 0, scale: 0.96, x, width: size?.width, height: size?.height }}
      animate={{ opacity: 1, scale: 1, x, width: size?.width, height: size?.height }}
      exit={{ opacity: 0, scale: 0.96, transition: spring(0.12) }}
      transition={{ x: shape, width: shape, height: shape, opacity: soft, scale: soft }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onKeyDown={onKeyDown}
      className="tn:pointer-events-auto tn:absolute tn:top-full tn:left-0 tn:mt-2 tn:grid tn:origin-top-left tn:grid-cols-1 tn:place-items-start tn:overflow-hidden tn:rounded-overlay tn:bg-paper tn:shadow-float tn:surface"
    >
      <AnimatePresence initial={false} custom={direction}>
        <Content key={index} links={links} direction={direction} measure={measure} onLinkClick={onLinkClick} />
      </AnimatePresence>
    </motion.div>
  );
}

export function NavigationMenu({
  items,
  value: valueProp,
  defaultValue = null,
  onValueChange,
  label = "Main",
  className = "",
}: NavigationMenuProps) {
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  const { shape } = useSprings();
  const linkClick = useLinkClick();
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const elements = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);
  const timer = useRef(0);
  const id = useId();
  const open = items.findIndex((item) => item.label === value);
  const openItem = items[open];
  const { settle } = useTopLayer(frame, open !== -1);
  useOutsidePress(root, open !== -1, () => setValue(null));

  useEffect(() => () => clearTimeout(timer.current), []);

  function later(next: string | null, delay: number) {
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setValue(next), delay);
  }

  function onPointerEnter(event: React.PointerEvent, next: string) {
    if (event.pointerType !== "mouse") return;
    if (open === -1) later(next, OPEN_DELAY);
    else {
      clearTimeout(timer.current);
      setValue(next);
    }
  }

  function onPointerLeave(event: React.PointerEvent) {
    if (event.pointerType === "mouse") later(null, CLOSE_DELAY);
  }

  function onItemKeyDown(event: React.KeyboardEvent, i: number) {
    if (event.key === "Tab" && !event.shiftKey && i === open) {
      event.preventDefault();
      frame.current!.querySelector<HTMLElement>(LINKS)!.focus();
      return;
    }
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    elements.current[(i + move + items.length) % items.length]!.focus();
  }

  function onPanelKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;
    const links = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(LINKS));
    if (event.shiftKey && event.target === links[0]) {
      event.preventDefault();
      elements.current[open]!.focus();
    } else if (!event.shiftKey && event.target === links.at(-1) && open < items.length - 1) {
      event.preventDefault();
      elements.current[open + 1]!.focus();
    }
  }

  return (
    <nav
      ref={root}
      aria-label={label}
      onKeyDown={(event) => {
        if (event.key !== "Escape" || open === -1) return;
        setValue(null);
        elements.current[open]!.focus();
      }}
      onBlur={(event) => {
        const next = event.relatedTarget;
        if (open !== -1 && next && !elements.current[open]!.contains(next) && !frame.current!.contains(next)) setValue(null);
      }}
      className={`tn:relative ${className}`}
    >
      <ul role="list" className="tn:flex">
        {items.map((item, i) => {
          const ref = (element: HTMLAnchorElement | HTMLButtonElement | null) => {
            elements.current[i] = element;
          };
          const classes = "tn:flex tn:h-11 tn:items-center tn:gap-1 tn:rounded-control tn:px-4 tn:text-sm tn:font-medium tn:outline-offset-2 tn:hover:bg-hover tn:focus-visible:outline-2 tn:focus-visible:outline-focus";
          return (
            <li key={item.label}>
              {"links" in item ? (
                <button
                  ref={ref}
                  type="button"
                  aria-expanded={i === open}
                  aria-controls={`${id}-panel`}
                  onPointerEnter={(event) => onPointerEnter(event, item.label)}
                  onPointerLeave={onPointerLeave}
                  onClick={() => {
                    clearTimeout(timer.current);
                    setValue(i === open ? null : item.label);
                  }}
                  onKeyDown={(event) => onItemKeyDown(event, i)}
                  className={`${classes} ${i === open ? "tn:bg-hover tn:text-ink" : "tn:text-muted"}`}
                >
                  {item.label}
                  <motion.span initial={false} animate={{ rotate: i === open ? 180 : 0 }} transition={shape} className="tn:-mr-1 tn:flex">
                    <Icon size={16}>{icons.chevronDown}</Icon>
                  </motion.span>
                </button>
              ) : (
                <a ref={ref} href={item.href} onClick={linkClick} onKeyDown={(event) => onItemKeyDown(event, i)} className={`${classes} tn:text-muted`}>
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ul>
      <div ref={frame} className="tn:pointer-events-none tn:absolute tn:inset-0">
        <AnimatePresence onExitComplete={settle}>
          {openItem && "links" in openItem && (
            <Panel
              key="panel"
              id={`${id}-panel`}
              index={open}
              links={openItem.links}
              elements={elements}
              root={root}
              onLinkClick={(event) => {
                linkClick(event);
                setValue(null);
              }}
              onPointerEnter={() => clearTimeout(timer.current)}
              onPointerLeave={onPointerLeave}
              onKeyDown={onPanelKeyDown}
            />
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
