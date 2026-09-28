import { motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { useSprings } from "../../springs";
import { useSize } from "../../useSize";
import { IconButton } from "../actions/IconButton";
import { Icon } from "../data-display/Icon";
import { useLinkClick } from "../navigation/Link";
import { Underline } from "../navigation/UnderlineTabs";
import { Drawer } from "../overlays/Drawer";

export type HeaderProps = {
  brand: React.ReactNode;
  links: { label: string; href: string }[];
  /** The current page's `href`. */
  value: string;
  actions?: React.ReactNode;
  /** Names the menu button and titles the drawer it opens. */
  menuLabel?: string;
  navLabel?: string;
  closeLabel?: string;
  className?: string;
};

export function Header({
  brand,
  links,
  value,
  actions,
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

  useLayoutEffect(() => {
    if (index === -1) {
      setEdges(undefined);
      return;
    }
    const anchor = anchors.current[index]!;
    const measure = () => setEdges({ left: anchor.offsetLeft + 12, right: anchor.offsetLeft + anchor.offsetWidth - 12 });
    measure();
    document.fonts.ready.then(measure);
  }, [index, links, navSize]);

  return (
    <header className={`sticky top-0 z-(--layer-sticky) bg-paper shadow-float surface ${className}`}>
      <div className="mx-auto flex h-16 max-w-page items-center gap-4 px-6">
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
            {links.map((link, i) => (
              <li key={link.href} className="min-w-0">
                <motion.a
                  ref={(el) => {
                    anchors.current[i] = el;
                  }}
                  href={link.href}
                  aria-current={i === index ? "page" : undefined}
                  onClick={linkClick}
                  initial={false}
                  animate={{ color: i === index ? "var(--color-ink)" : "var(--color-muted)" }}
                  transition={soft}
                  className="flex h-8 items-center rounded-control px-3 text-label font-medium outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus"
                >
                  <span className="truncate">{link.label}</span>
                </motion.a>
              </li>
            ))}
          </ul>
          {edges && <Underline {...edges} />}
        </nav>
        {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
      </div>
      <Drawer open={open} onOpenChange={setOpen} title={menuLabel} side="left" closeLabel={closeLabel}>
        <nav aria-label={navLabel} className="px-2 pt-1 pb-5">
          <ul role="list" className="grid gap-1">
            {links.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={i === index ? "page" : undefined}
                  onClick={(event) => {
                    setOpen(false);
                    linkClick(event);
                  }}
                  className={`flex h-10 items-center rounded-control px-3 text-sm font-medium outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus ${i === index ? "bg-ink text-paper" : "text-muted"}`}
                >
                  <span className="truncate">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Drawer>
    </header>
  );
}
