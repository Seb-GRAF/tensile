import { motion } from "motion/react";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { useSprings } from "../../../springs";
import { Link } from "../Link/Link";

type Item = { id: string; label: string };

export type TableOfContentsProps = {
  /** Sections of the page by element id, in page order, optionally with subsections. */
  items: (Item & { items?: Item[] })[];
  label?: string;
  /** Distance in px from the top of the viewport to the line a section's top passes to become current; at least the sections' `scroll-margin-top`. */
  offset?: number;
  className?: string;
};

export function TableOfContents({ items, label = "On this page", offset = 100, className = "" }: TableOfContentsProps) {
  const { shape } = useSprings();
  const id = useId();
  const flat = items.flatMap((item) => [item, ...(item.items ?? [])]);
  const [active, setActive] = useState(items[0].id);
  const [marker, setMarker] = useState<{ top: number; height: number }>();
  const links = useRef<(HTMLAnchorElement | null)[]>([]);
  const clicked = useRef<string>(undefined);
  const quiet = useRef<number>(undefined);
  const index = Math.max(0, flat.findIndex((item) => item.id === active));

  useEffect(() => {
    function update() {
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
      const passed = flat.filter((item) => document.getElementById(item.id)!.getBoundingClientRect().top <= offset);
      const current = bottom ? flat.at(-1)!.id : (passed.at(-1) ?? flat[0]).id;
      clearTimeout(quiet.current);
      if (clicked.current === undefined) setActive(current);
      else if (bottom || current === clicked.current) clicked.current = undefined;
      else quiet.current = window.setTimeout(() => {
        clicked.current = undefined;
        update();
      }, 150);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      clearTimeout(quiet.current);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items, offset]);

  useLayoutEffect(() => {
    const link = links.current[index]!;
    const measure = () => setMarker({ top: link.offsetTop, height: link.offsetHeight });
    measure();
    document.fonts.ready.then(measure);
  }, [index, items]);

  function row(item: Item) {
    const i = flat.indexOf(item);
    return (
      <Link
        ref={(element) => {
          links.current[i] = element;
        }}
        href={`#${item.id}`}
        underline={false}
        aria-current={i === index ? "location" : undefined}
        onClick={() => {
          setActive(item.id);
          clicked.current = item.id;
        }}
        className={`tn:block tn:transition-colors tn:duration-[calc(300ms*var(--tn-motion-duration-scale))] tn:hover:transition-none ${i === index ? "tn:text-ink" : "tn:text-muted tn:hover:text-ink"}`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <nav aria-labelledby={id} className={`tn:text-label ${className}`}>
      <p id={id} className="tn:mb-4 tn:font-medium">{label}</p>
      <ul role="list" className="tn:relative tn:grid tn:gap-3 tn:border-l tn:border-line tn:pl-4">
        {items.map((item) => (
          <li key={item.id}>
            {row(item)}
            {item.items && (
              <ul role="list" className="tn:mt-3 tn:grid tn:gap-3 tn:pl-3">
                {item.items.map((child) => <li key={child.id}>{row(child)}</li>)}
              </ul>
            )}
          </li>
        ))}
        {marker && (
          <motion.li
            aria-hidden
            initial={false}
            animate={marker}
            transition={shape}
            className="tn:pointer-events-none tn:absolute tn:-left-px tn:w-0.5 tn:rounded-full tn:bg-ink"
          />
        )}
      </ul>
    </nav>
  );
}
