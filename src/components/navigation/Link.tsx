import { createContext, useContext } from "react";

const LinkContext = createContext<((href: string) => void) | undefined>(undefined);

export type LinkProviderProps = {
  /** Gets the link's `href` on a plain left click on a same-origin link, instead of the page loading it; links to a `#fragment` of the page keep scrolling natively. */
  navigate: (href: string) => void;
  children: React.ReactNode;
};

export function LinkProvider({ navigate, children }: LinkProviderProps) {
  return <LinkContext value={navigate}>{children}</LinkContext>;
}

/** The click handler for components that render their own `<a>`: inside a `LinkProvider`, a plain left click on a same-origin link (no `target` other than `_self`, no `download`, not a `#fragment` of this page) calls `navigate(href)` instead of loading the page. Call it after the link's own `onClick`; a click that one prevented is left alone. */
export function useLinkClick() {
  const navigate = useContext(LinkContext);
  return (event: React.MouseEvent<HTMLAnchorElement>) => {
    const link = event.currentTarget;
    if (
      !navigate ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      (link.target && link.target !== "_self") ||
      link.hasAttribute("download") ||
      link.getAttribute("href")!.startsWith("#") ||
      link.origin !== window.location.origin
    )
      return;
    event.preventDefault();
    navigate(link.getAttribute("href")!);
  };
}

export type LinkProps = React.ComponentProps<"a"> & { href: string };

export function Link({ onClick, className = "", ...props }: LinkProps) {
  const linkClick = useLinkClick();
  return (
    <a
      {...props}
      onClick={(event) => {
        onClick?.(event);
        linkClick(event);
      }}
      className={`rounded-sm underline decoration-current/40 underline-offset-2 outline-offset-2 hover:decoration-current focus-visible:outline-2 focus-visible:outline-focus ${className}`}
    />
  );
}
