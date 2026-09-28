import { useId } from "react";

export type AppShellProps = {
  /** Beside the page from 1024 px up; hidden below. */
  sidebar?: React.ReactNode;
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
    <div className={className}>
      <a
        href={`#${id}`}
        className="fixed top-3 left-3 z-(--layer-overlay) flex h-11 items-center rounded-control bg-paper px-5 text-body font-medium text-ink shadow-float outline-offset-2 not-focus:sr-only focus-visible:outline-2 focus-visible:outline-focus"
      >
        {skipLabel}
      </a>
      {header}
      <div className="mx-auto flex max-w-page gap-6 p-6">
        {sidebar && <div className="hidden lg:block">{sidebar}</div>}
        <main id={id} tabIndex={-1} className={`min-w-0 flex-1 outline-none ${mobileNav ? "pb-20 lg:pb-0" : ""}`}>
          {children}
        </main>
      </div>
      {mobileNav && <div className="fixed inset-x-4 bottom-4 lg:hidden">{mobileNav}</div>}
    </div>
  );
}
