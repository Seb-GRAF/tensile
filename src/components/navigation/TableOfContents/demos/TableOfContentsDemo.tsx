import { TableOfContents } from "tensile";

const sections = [
  { id: "toc-overview", label: "Overview", text: "What the release changes, who it affects and when it ships." },
  { id: "toc-install", label: "Install the update", text: "Update the package, then restart the development server." },
  { id: "toc-migrate", label: "Migrate your settings", text: "Rename the two options that moved and remove the one that no longer exists." },
  { id: "toc-known-issues", label: "Known issues", text: "Two edge cases in older browsers, and how to work around them." },
];

export function TableOfContentsDemo() {
  return (
    <div className="grid w-full grid-cols-[10rem_minmax(0,1fr)] gap-8">
      <TableOfContents items={sections} label="Release notes" className="sticky top-24 self-start" />
      <div className="grid gap-6">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="min-h-64 scroll-mt-24 space-y-2">
            <h3 className="text-lg font-semibold">{section.label}</h3>
            <p className="text-body text-muted">{section.text}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
