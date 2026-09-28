import { useState } from "react";
import { Button, CommandPalette, Drawer, Header, Link, PageHeader, Separator, SidebarNav } from "tensile";
import { GettingStarted } from "./docs/GettingStarted";
import { PropsTable } from "./docs/PropsTable";
import { StoryPreview } from "./docs/StoryPreview";
import api from "./docs/api.json";

export const docsPages = [
  {
    id: "get-started", title: "Get started", group: "Overview",
    description: "Add a little motion to your React app. Install Tensile, load the styles, and try your first component.",
    source: "", stories: [], props: [],
    sections: [{ id: "install", label: "Install" }, { id: "styles", label: "Load the styles" }, { id: "first-component", label: "Your first component" }, { id: "next-steps", label: "Make it yours" }, { id: "requirements", label: "Requirements" }],
  },
  ...Object.values(api).map((component) => ({
    ...component,
    sections: [{ id: "examples", label: "Examples" }, { id: "api", label: "API reference" }],
  })),
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
      <Drawer open={open} onOpenChange={setOpen} title="Documentation" side="left"><div className="px-5 pb-8">{navigation}</div></Drawer>
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
                <section id="examples">
                  <h2>Examples</h2>
                  <StoryPreview key={page.id} component={page} />
                </section>
                <section id="api">
                  <h2>API reference</h2>
                  <PropsTable component={page} />
                  <p>The table shows component props and native props with explicit defaults. The exported TypeScript type is the full contract.</p>
                </section>
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
        <aside className="sticky top-16 hidden self-start pt-10 xl:block">
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
