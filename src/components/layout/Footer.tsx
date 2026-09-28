import { useLinkClick } from "../navigation/Link";
import { Separator } from "./Separator";

export type FooterProps = {
  groups: { title: string; links: { label: string; href: string }[] }[];
  note?: React.ReactNode;
  /** Names the footer's link navigation. */
  label?: string;
  className?: string;
};

export function Footer({ groups, note, label = "Footer", className = "" }: FooterProps) {
  const linkClick = useLinkClick();
  return (
    <footer className={`@container bg-paper ${className}`}>
      <div className="mx-auto max-w-page px-6 py-12">
        <nav aria-label={label} className="grid gap-x-6 gap-y-8 @md:grid-cols-2 @3xl:auto-cols-fr @3xl:grid-flow-col">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="text-label font-semibold text-ink">{group.title}</h2>
              <ul role="list" className="mt-3 grid gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={linkClick}
                      className="rounded-sm text-label text-muted outline-offset-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        {note && (
          <>
            <Separator className="my-8" />
            <div className="text-label text-muted">{note}</div>
          </>
        )}
      </div>
    </footer>
  );
}
