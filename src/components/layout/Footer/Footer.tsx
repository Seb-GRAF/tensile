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
    <footer className={`tn:@container ${className}`}>
      <Card tone="ink" className="tn:mx-auto tn:max-w-page tn:px-6 tn:py-10 tn:@3xl:p-12">
        <nav aria-label={label} className="tn:grid tn:gap-x-6 tn:gap-y-8 tn:@md:grid-cols-2 tn:@3xl:auto-cols-fr tn:@3xl:grid-flow-col">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="tn:text-label tn:font-semibold">{group.title}</h2>
              <ul role="list" className="tn:mt-3 tn:grid tn:gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={linkClick}
                      className="tn:rounded-sm tn:text-label tn:text-muted tn:outline-offset-2 tn:hover:text-ink tn:focus-visible:outline-2 tn:focus-visible:outline-focus"
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
            <Separator className="tn:my-8" />
            <div className="tn:text-label tn:text-muted">{note}</div>
          </>
        )}
      </Card>
    </footer>
  );
}
