import { useLinkClick } from "../../navigation/Link/Link";
import { Card } from "../Card/Card";
import { Separator } from "../Separator/Separator";

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
    <footer className={`@container ${className}`}>
      <Card tone="ink" className="mx-auto max-w-page px-6 py-10 @3xl:p-12">
        <nav aria-label={label} className="grid gap-x-6 gap-y-8 @md:grid-cols-2 @3xl:auto-cols-fr @3xl:grid-flow-col">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="text-label font-semibold">{group.title}</h2>
              <ul role="list" className="mt-3 grid gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={linkClick}
                      className="rounded-sm text-label text-paper/55 outline-offset-2 hover:text-paper focus-visible:outline-2 focus-visible:outline-focus"
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
            <div className="text-label text-paper/55">{note}</div>
          </>
        )}
      </Card>
    </footer>
  );
}
