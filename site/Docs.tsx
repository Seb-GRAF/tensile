import { useState, type ComponentType } from "react";
import { Button, CommandPalette, Drawer, Header, Link, PageHeader, Separator, SidebarNav, Table } from "tensile";
import { GettingStarted } from "./docs/GettingStarted";
import { PropsTable } from "./docs/PropsTable";
import { Example } from "./docs/Example";
import api from "./docs/api.json";

type Documentation = {
  description: string;
  usage: string;
  anatomy: string;
  notes: string[];
  examples: { id: string; title: string; description: string; Demo: ComponentType; code: string }[];
  keyboard: { key: string; description: string }[];
  related: string[];
};

const documents = import.meta.glob<Documentation>("../src/components/**/*.docs.ts", { eager: true, import: "default" });
const componentDocs: Record<string, Documentation | undefined> = Object.fromEntries(
  Object.entries(documents).map(([path, documentation]) => [path.split("/").at(-2)!, documentation]),
);

export const docsPages = [
  {
    id: "get-started", title: "Get started", group: "Overview",
    description: "Add a little motion to your React app. Install Tensile, load the styles, and try your first component.",
    props: [], documentation: undefined,
    sections: [{ id: "install", label: "Install" }, { id: "styles", label: "Load the styles" }, { id: "first-component", label: "Your first component" }, { id: "next-steps", label: "Make it yours" }, { id: "requirements", label: "Requirements" }],
  },
  ...Object.values(api).map((component) => {
    const documentation = componentDocs[component.title];
    return {
      ...component,
      description: documentation?.description ?? component.description,
      documentation,
      sections: documentation ? [
        { id: "examples", label: "Usage and variants" },
        ...documentation.examples.map((example) => ({ id: example.id, label: example.title })),
        { id: "composition", label: "Composition" },
        ...(documentation.keyboard.length > 0 ? [{ id: "keyboard", label: "Keyboard" }] : []),
        { id: "api", label: "API reference" },
        { id: "related", label: "Related components" },
      ] : [{ id: "api", label: "API reference" }],
    };
  }),
];

const groups = docsPages.reduce<Record<string, typeof docsPages>>((result, page) => {
  (result[page.group] ??= []).push(page);
  return result;
}, {});

const commands = docsPages.flatMap((page) => [
  { label: page.title, href: `?docs=${page.id}` },
  ...page.sections.map((section) => ({ label: `${page.title} / ${section.label}`, href: `?docs=${page.id}#${section.id}` })),
]);

export function Docs({ page, brand, onNavigate }: { page: typeof docsPages[number]; brand: React.ReactNode; onNavigate: (href: string) => void }) {
  const [open, setOpen] = useState(false);
  const index = docsPages.indexOf(page);
  const previous = docsPages[index - 1];
  const next = docsPages[index + 1];

  const navigation = (
    <div className="grid gap-6">
      {Object.entries(groups).map(([group, pages]) => (
        <SidebarNav
          key={group}
          label={group}
          leading={<p className="mb-1 px-2 text-label font-medium">{group}</p>}
          items={pages.map((item) => ({ value: item.id, label: item.title, href: `?docs=${item.id}` }))}
          value={page.id}
          onValueChange={() => setOpen(false)}
        />
      ))}
      <Separator />
      <div className="grid gap-3 px-2 text-label text-muted">
        <p className="font-medium text-ink">Resources</p>
        <Link href="./#components" className="no-underline! hover:text-ink">All components</Link>
        <Link href="https://github.com/seb-graf/tensile#tokens" className="no-underline! hover:text-ink">Styling and tokens</Link>
        <Link href="https://github.com/seb-graf/tensile#motion" className="no-underline! hover:text-ink">Motion</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh">
      <a href="#main" className="sr-only fixed top-3 left-3 z-(--layer-overlay) rounded-control bg-ink px-5 py-3 text-paper focus:not-sr-only">Skip to content</a>
      <Header
        variant="bar"
        brand={brand}
        links={[{ label: "Documentation", href: "?docs=get-started" }, { label: "Components", href: "./#components" }]}
        value="?docs=get-started"
        className="[&>div]:max-w-7xl"
        actions={
          <>
            <div className="relative h-13 w-40 sm:w-60 lg:w-72">
              <CommandPalette
                commands={commands}
                onSelect={(command) => onNavigate(commands.find((item) => item.label === command.label)!.href)}
                label="Search documentation"
                placeholder="Search docs…"
                listLabel="Documentation pages and sections"
                emptyText="No pages found"
                className="absolute top-0 right-0 w-full focus-within:w-[min(24rem,calc(100vw-3rem))] [&_kbd]:hidden sm:[&_kbd]:inline-flex"
              />
            </div>
            <Link href="https://github.com/seb-graf/tensile" className="ml-3 hidden text-label no-underline! lg:block">GitHub</Link>
          </>
        }
      />
      <div className="mx-auto max-w-7xl px-5 pt-4 md:hidden">
        <Button variant="secondary" size="sm" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}>Browse docs</Button>
      </div>
      <Drawer open={open} onOpenChange={setOpen} title="Documentation" side="left"><div className="pb-3">{navigation}</div></Drawer>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[12rem_minmax(0,1fr)] md:px-6 lg:gap-14 xl:grid-cols-[12rem_minmax(0,1fr)_10rem] xl:gap-14">
        <aside className="sticky top-16 hidden max-h-[calc(100dvh-4rem)] min-w-0 self-start overflow-y-auto py-8 pr-1 md:block">{navigation}</aside>
        <main id="main" tabIndex={-1} className="min-w-0 pt-6 pb-16 outline-none md:pt-10">
          <PageHeader
            title={page.title}
            description={page.description}
            breadcrumbs={<span className="text-label text-muted">{page.group}</span>}
            className="mb-8 [&_h1]:text-3xl [&_h1]:tracking-tight"
          />
          <div className="grid gap-10 [&>section]:min-w-0 [&>section]:space-y-4 [&>section>h2]:text-xl [&>section>h2]:font-semibold [&>section>h2]:tracking-tight [&>section>p]:text-body [&>section>p]:leading-7 [&>section>p]:text-muted [&>section>p_code]:rounded [&>section>p_code]:bg-hover [&>section>p_code]:px-1 [&>section>p_code]:text-sm [&>section>p_code]:break-words [&>section>p_code]:text-ink">
            {page.id === "get-started" ? <GettingStarted /> : (
              <>
                {page.documentation && (
                  <>
                    <section id="examples" className="scroll-mt-24">
                      <h2>Usage and variants</h2>
                      <p>{page.documentation.usage}</p>
                      <div className="grid gap-10 pt-2">
                        {page.documentation.examples.map((example) => (
                          <section key={example.id} id={example.id} className="min-w-0 scroll-mt-24 space-y-4">
                            <h3 className="text-lg font-semibold tracking-tight">{example.title}</h3>
                            <p className="text-body leading-7 text-muted">{example.description}</p>
                            <Example key={`${page.id}-${example.id}`} label={`${page.title}: ${example.title}`} code={example.code}>
                              <example.Demo />
                            </Example>
                          </section>
                        ))}
                      </div>
                    </section>
                    <section id="composition" className="scroll-mt-24">
                      <h2>Composition</h2>
                      <p>{page.documentation.anatomy}</p>
                      {page.documentation.notes.map((note) => <p key={note}>{note}</p>)}
                    </section>
                    {page.documentation.keyboard.length > 0 && <section id="keyboard" className="scroll-mt-24">
                      <h2>Keyboard</h2>
                      <Table
                        caption={`${page.title} keyboard interaction`}
                        columns={[
                          { key: "key", header: "Key", rowHeader: true },
                          { key: "description", header: "Action", cell: (row) => <span className="block min-w-48 whitespace-normal">{row.description}</span> },
                        ]}
                        rows={page.documentation.keyboard}
                        rowKey={(row) => row.key}
                      />
                    </section>}
                  </>
                )}
                <section id="api" className="scroll-mt-24">
                  <h2>API reference</h2>
                  <PropsTable component={page} />
                  <p>Types and defaults come from the component source. The table includes component props and documented native props; the exported TypeScript type is the full contract.</p>
                </section>
                {page.documentation && (
                  <section id="related" className="scroll-mt-24">
                    <h2>Related components</h2>
                    <div className="flex flex-wrap gap-x-5 gap-y-3 text-body">
                      {page.documentation.related.map((name) => <Link key={name} href={`?docs=${name.toLowerCase()}`}>{name}</Link>)}
                    </div>
                  </section>
                )}
              </>
            )}
          </div>
          <Separator className="mt-12" />
          <nav aria-label="Previous and next pages" className="flex justify-between gap-6 pt-6 text-sm">
            <div>{previous && <Link href={`?docs=${previous.id}`} className="no-underline!"><span className="mb-1 block text-label text-muted">Previous</span>{previous.title}</Link>}</div>
            <div className="text-right">{next && <Link href={`?docs=${next.id}`} className="no-underline!"><span className="mb-1 block text-label text-muted">Next</span>{next.title}</Link>}</div>
          </nav>
          <p className="mt-12 text-label text-muted">Tensile is <Link href="./LICENSE">MIT licensed</Link>. Made by Sébastien Graf.</p>
        </main>
        <aside className="sticky top-16 hidden max-h-[calc(100dvh-4rem)] self-start overflow-y-auto py-10 xl:block">
          <nav aria-label="On this page">
            <p className="mb-4 text-label font-medium">On this page</p>
            <ul role="list" className="grid gap-3 border-l border-line pl-4">
              {page.sections.map((section) => <li key={section.id}><Link href={`#${section.id}`} className="text-label text-muted no-underline! hover:text-ink">{section.label}</Link></li>)}
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
}
