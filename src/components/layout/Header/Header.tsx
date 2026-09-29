import { motion, useMotionTemplate, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { useLiquid, useSprings } from "../../../springs";
import { useSize } from "../../../useSize";
import { IconButton } from "../../actions/IconButton/IconButton";
import { Icon } from "../../data-display/Icon/Icon";
import { useLinkClick } from "../../navigation/Link/Link";
import { SidebarNav } from "../../navigation/SidebarNav/SidebarNav";
import { Underline } from "../../navigation/UnderlineTabs/UnderlineTabs";
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
  const clip = useMotionTemplate`inset(0 calc(100% + ${r}px) 0 ${l}px round var(--radius-control))`;
  return (
    <>
      <motion.span aria-hidden style={{ left: l, width }} className="pointer-events-none absolute inset-y-0 rounded-control bg-ink" />
      <motion.span aria-hidden style={{ clipPath: clip }} className="pointer-events-none absolute inset-0 flex text-sm font-medium text-paper">
        {links.map((link) => (
          <span key={link.href} className="flex min-w-0 items-center px-4">
            <span className="truncate">{link.label}</span>
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
    <header className={`sticky z-(--layer-sticky) ${floating ? "top-3 mx-3 mt-3" : "top-0 border-b border-line bg-paper surface"} ${className}`}>
      <div className={`mx-auto flex max-w-page items-center ${floating ? "h-13 gap-2 rounded-control bg-paper py-1 pr-1 pl-4 shadow-float surface" : "h-16 gap-4 px-6"}`}>
        <IconButton
          label={menuLabel}
          variant="ghost"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="-ml-3 md:hidden"
        >
          <Icon size={20}>
            <path d="M4 6h16M4 12h16M4 18h16" />
          </Icon>
        </IconButton>
        {brand}
        <nav ref={measureNav} aria-label={navLabel} className="relative hidden min-w-0 md:block">
          <ul role="list" className="flex">
            {links.map((link, i) => {
              const props = {
                ref: (el: HTMLAnchorElement | null) => {
                  anchors.current[i] = el;
                },
                href: link.href,
                "aria-current": i === index ? "page" as const : undefined,
                onClick: linkClick,
              };
              const label = <span className="truncate">{link.label}</span>;
              return (
                <li key={link.href} className="min-w-0">
                  {floating ? (
                    <a {...props} className="flex h-11 items-center rounded-control px-4 text-sm font-medium text-muted outline-offset-2 hover:bg-hover focus-visible:outline-2 focus-visible:outline-focus">
                      {label}
                    </a>
                  ) : (
                    <motion.a
                      {...props}
                      initial={false}
                      animate={{ color: i === index ? "var(--color-ink)" : "var(--color-muted)" }}
                      whileHover={{ color: "var(--color-ink)" }}
                      transition={soft}
                      className="flex h-8 items-center rounded-control px-3 text-label font-medium outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus"
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
        {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
      </div>
      <Drawer open={open} onOpenChange={setOpen} title={menuLabel} side="left" closeLabel={closeLabel}>
        <SidebarNav
          items={links.map((link) => ({ value: link.href, label: link.label, href: link.href }))}
          value={value}
          onValueChange={() => setOpen(false)}
          label={navLabel}
          className="-mx-2"
        />
      </Drawer>
    </header>
  );
}
