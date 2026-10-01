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
    <div className={`tn:lg:flex ${className}`}>
      <a
        href={`#${id}`}
        className="tn:fixed tn:top-3 tn:left-3 tn:z-(--tn-layer-overlay) tn:flex tn:h-11 tn:items-center tn:rounded-control tn:bg-paper tn:px-5 tn:text-body tn:font-medium tn:text-ink tn:shadow-float tn:outline-offset-2 tn:not-focus:sr-only tn:focus-visible:outline-2 tn:focus-visible:outline-focus"
      >
        {skipLabel}
      </a>
      {sidebar && <div className="tn:sticky tn:top-0 tn:hidden tn:h-dvh tn:shrink-0 tn:p-3 tn:lg:block">{sidebar}</div>}
      <div className="tn:min-w-0 tn:flex-1 tn:overflow-x-clip">
        {header}
        <main id={id} tabIndex={-1} className={`tn:mx-auto tn:max-w-page tn:p-6 tn:outline-none ${mobileNav ? "tn:pb-23 tn:lg:pb-6" : ""}`}>
          {children}
        </main>
      </div>
      {mobileNav && <div className="tn:fixed tn:inset-x-4 tn:bottom-4 tn:lg:hidden">{mobileNav}</div>}
    </div>
  );
}
