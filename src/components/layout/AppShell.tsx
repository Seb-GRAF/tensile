import { useId } from "react";

export type AppShellProps = {
  /** A full-height column beside the page from 1024 px up, staying in view while the page scrolls; hidden below. */
  sidebar?: React.ReactNode;
  /** At the top of the page column. */
  header?: React.ReactNode;
  /** Fixed to the bottom below 1024 px; hidden from there up. */
  mobileNav?: React.ReactNode;
  children: React.ReactNode;
  skipLabel?: string;
  className?: string;
};

export function AppShell({ sidebar, header, mobileNav, children, skipLabel = "Skip to content", className = "" }: AppShellProps) {
  const id = useId();
  return (
    <div className={`lg:flex ${className}`}>
      <a
        href={`#${id}`}
        className="fixed top-3 left-3 z-(--layer-overlay) flex h-11 items-center rounded-control bg-paper px-5 text-body font-medium text-ink shadow-float outline-offset-2 not-focus:sr-only focus-visible:outline-2 focus-visible:outline-focus"
      >
        {skipLabel}
      </a>
      {sidebar && <div className="sticky top-0 hidden h-dvh shrink-0 p-3 lg:block">{sidebar}</div>}
      <div className="min-w-0 flex-1 overflow-x-clip">
        {header}
        <main id={id} tabIndex={-1} className={`mx-auto max-w-page p-6 outline-none ${mobileNav ? "pb-26 lg:pb-6" : ""}`}>
          {children}
        </main>
      </div>
      {mobileNav && <div className="fixed inset-x-4 bottom-4 lg:hidden">{mobileNav}</div>}
    </div>
  );
}
