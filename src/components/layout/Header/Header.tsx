import { motion, useMotionTemplate, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { useLiquid, useSprings } from "../../../springs";
import { useSize } from "../../../useSize";
import { IconButton } from "../../actions/IconButton/IconButton";
import { useLinkClick } from "../../navigation/Link/Link";
import { SidebarNav } from "../../navigation/SidebarNav/SidebarNav";
import { Underline } from "../../navigation/Tabs/UnderlineTabList";
import { Drawer } from "../../overlays/Drawer/Drawer";

export type HeaderProps = {
  brand: React.ReactNode;
  links: { label: string; href: string }[];
  /** The current page's `href`. */
  value: string;
  actions?: React.ReactNode;
  /** Floating is an inset pill with a sliding ink pill on the current link; bar is a full-width bar with an underline. */
  variant?: "floating" | "bar";
  /** Names the menu button and titles the drawer it opens. */
  menuLabel?: string;
  navLabel?: string;
  closeLabel?: string;
  className?: string;
};

function Highlight({ left, right, links }: { left: number; right: number; links: HeaderProps["links"] }) {
  const [l, r] = useLiquid(left, -right);
  const width = useTransform(() => -r.get() - l.get());
  const clip = useMotionTemplate`inset(0 calc(100% + ${r}px) 0 ${l}px round var(--tn-radius-control))`;
  return (
    <>
      <motion.span aria-hidden style={{ left: l, width }} className="tn:pointer-events-none tn:absolute tn:inset-y-0 tn:rounded-control tn:bg-ink" />
      <motion.span aria-hidden style={{ clipPath: clip }} className="tn:pointer-events-none tn:absolute tn:inset-0 tn:flex tn:text-sm tn:font-medium tn:text-paper">
        {links.map((link) => (
          <span key={link.href} className="tn:flex tn:min-w-0 tn:items-center tn:px-4">
            <span className="tn:truncate">{link.label}</span>
          </span>
        ))}
      </motion.span>
    </>
  );
}

export function Header({
  brand,
  links,
  value,
  actions,
  variant = "floating",
  menuLabel = "Menu",
  navLabel = "Main",
  closeLabel = "Close",
  className = "",
}: HeaderProps) {
  const { soft } = useSprings();
  const linkClick = useLinkClick();
  const [open, setOpen] = useState(false);
  const index = links.findIndex((link) => link.href === value);
  const anchors = useRef<(HTMLAnchorElement | null)[]>([]);
  const [edges, setEdges] = useState<{ left: number; right: number }>();
  const [navSize, measureNav] = useSize();
  const floating = variant === "floating";

  useLayoutEffect(() => {
    if (index === -1) {
      setEdges(undefined);
      return;
    }
    const anchor = anchors.current[index]!;
    const measure = () => setEdges({ left: anchor.offsetLeft, right: anchor.offsetLeft + anchor.offsetWidth });
    measure();
    document.fonts.ready.then(measure);
  }, [index, links, navSize]);

  return (
    <header className={`tn:sticky tn:z-(--tn-layer-sticky) ${floating ? "tn:top-3 tn:mx-3 tn:mt-3" : "tn:top-0 tn:border-b tn:border-line tn:bg-paper tn:surface"} ${className}`}>
      <div className={`tn:mx-auto tn:flex tn:max-w-page tn:items-center ${floating ? "tn:h-13 tn:gap-2 tn:rounded-control tn:bg-paper tn:py-1 tn:pr-1 tn:pl-4 tn:shadow-float tn:surface" : "tn:h-16 tn:gap-4 tn:px-6"}`}>
        <IconButton
          label={menuLabel}
          icon="menu"
          variant="ghost"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="tn:-ml-3 tn:md:hidden"
        />
        {brand}
        <nav ref={measureNav} aria-label={navLabel} className="tn:relative tn:hidden tn:min-w-0 tn:md:block">
          <ul role="list" className="tn:flex">
            {links.map((link, i) => {
              const props = {
                ref: (el: HTMLAnchorElement | null) => {
                  anchors.current[i] = el;
                },
                href: link.href,
                "aria-current": i === index ? "page" as const : undefined,
                onClick: linkClick,
              };
              const label = <span className="tn:truncate">{link.label}</span>;
              return (
                <li key={link.href} className="tn:min-w-0">
                  {floating ? (
                    <a {...props} className="tn:flex tn:h-11 tn:items-center tn:rounded-control tn:px-4 tn:text-sm tn:font-medium tn:text-muted tn:outline-offset-2 tn:hover:bg-hover tn:focus-visible:outline-2 tn:focus-visible:outline-focus">
                      {label}
                    </a>
                  ) : (
                    <motion.a
                      {...props}
                      initial={false}
                      animate={{ color: i === index ? "var(--tn-color-ink)" : "var(--tn-color-muted)" }}
                      whileHover={{ color: "var(--tn-color-ink)" }}
                      transition={soft}
                      className="tn:flex tn:h-8 tn:items-center tn:rounded-control tn:px-3 tn:text-label tn:font-medium tn:outline-offset-2 tn:focus-visible:outline-2 tn:focus-visible:outline-focus"
                    >
                      {label}
                    </motion.a>
                  )}
                </li>
              );
            })}
          </ul>
          {edges && (floating ? <Highlight {...edges} links={links} /> : <Underline left={edges.left + 12} right={edges.right - 12} />)}
        </nav>
        {actions && <div className="tn:ml-auto tn:flex tn:items-center tn:gap-2">{actions}</div>}
      </div>
      <Drawer open={open} onOpenChange={setOpen} title={menuLabel} side="left" closeLabel={closeLabel}>
        <SidebarNav
          items={links.map((link) => ({ value: link.href, label: link.label, href: link.href }))}
          value={value}
          onValueChange={() => setOpen(false)}
          label={navLabel}
          className="tn:-mx-2"
        />
      </Drawer>
    </header>
  );
}
