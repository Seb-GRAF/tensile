import { useState, type ComponentType } from "react";
import { Button, CommandPalette, Drawer, Header, Link, PageHeader, Separator, SidebarNav, Table, TableOfContents } from "tensile";
import { Accessibility } from "./docs/Accessibility";
import { Forms } from "./docs/Forms";
import { GettingStarted } from "./docs/GettingStarted";
import { Limitations } from "./docs/Limitations";
import { Motion } from "./docs/Motion";
import { NextJs } from "./docs/NextJs";
import { Patterns } from "./docs/Patterns";
import { ReactRouter } from "./docs/ReactRouter";
import { Responsive } from "./docs/Responsive";
import { Styling } from "./docs/Styling";
import { Vite } from "./docs/Vite";
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

const base = import.meta.env.BASE_URL;

const guides = [
  {
    id: "get-started", title: "Get started", group: "Overview", Content: GettingStarted,
    description: "Add a little motion to your React app. Install Tensile, load the styles, and try your first component.",
    sections: [{ id: "install", label: "Install" }, { id: "styles", label: "Load the styles" }, { id: "first-component", label: "Your first component" }, { id: "your-state", label: "Keep the value in your state" }, { id: "next-steps", label: "Make it yours" }, { id: "requirements", label: "Requirements" }],
  },
  {
    id: "styling", title: "Styling and tokens", group: "Guides", Content: Styling,
    description: "Change colors, type, radii and the page width with CSS variables, and switch to dark mode.",
    sections: [{ id: "colors", label: "Colors" }, { id: "tokens", label: "Type, shape and layers" }, { id: "override", label: "Override tokens" }, { id: "dark", label: "Dark mode" }, { id: "ink", label: "Ink surfaces" }, { id: "stylesheets", label: "Styles and reset" }, { id: "fonts", label: "Fonts" }, { id: "placement", label: "Size and placement" }],
  },
  {
    id: "motion", title: "Motion", group: "Guides", Content: Motion,
    description: "Set the speed of every animation, respect reduced motion, and use the same springs in your own code.",
    sections: [{ id: "speed", label: "Speed" }, { id: "reduced", label: "Reduced motion" }, { id: "timers", label: "What keeps real time" }, { id: "hooks", label: "Use the same springs" }],
  },
  {
    id: "forms", title: "Forms", group: "Guides", Content: Forms,
    description: "Use controls with or without your own state, send their values with a form, and show errors.",
    sections: [{ id: "modes", label: "Controlled or uncontrolled" }, { id: "form-data", label: "Form data" }, { id: "reset", label: "Reset" }, { id: "field", label: "Labels and errors" }, { id: "validation", label: "Validation" }],
  },
  {
    id: "accessibility", title: "Accessibility", group: "Guides", Content: Accessibility,
    description: "What the components do for keyboard, screen reader and reduced-motion users, and what has been checked.",
    sections: [{ id: "patterns", label: "Elements and roles" }, { id: "focus", label: "Focus" }, { id: "text", label: "Text and labels" }, { id: "checked", label: "What has been checked" }],
  },
  {
    id: "responsive", title: "Responsive behavior", group: "Guides", Content: Responsive,
    description: "How components size to their container and adapt to small screens.",
    sections: [{ id: "widths", label: "Widths" }, { id: "breakpoints", label: "Breakpoints" }, { id: "overlays", label: "Overlays" }],
  },
  {
    id: "patterns", title: "Patterns and recipes", group: "Guides", Content: Patterns,
    description: "Lay out a page and combine components for forms, actions, toasts and media.",
    sections: [{ id: "layout", label: "Layout" }, { id: "field", label: "A field with validation" }, { id: "actions", label: "Actions and chips" }, { id: "toasts", label: "Toasts" }, { id: "video", label: "Video" }],
  },
  {
    id: "limitations", title: "Known limitations", group: "Guides", Content: Limitations,
    description: "What isn't tested, what isn't included, and the limits of single components.",
    sections: [{ id: "browsers", label: "Browsers and assistive tech" }, { id: "scope", label: "Not included" }, { id: "components", label: "Components" }],
  },
  {
    id: "nextjs", title: "Next.js", group: "Frameworks", Content: NextJs,
    description: "Use Tensile in a Next.js App Router project, from server components and with the Next.js router.",
    sections: [{ id: "install", label: "Install" }, { id: "styles", label: "Load the styles" }, { id: "server", label: "Server components" }, { id: "links", label: "Links and the router" }],
  },
  {
    id: "react-router", title: "React Router", group: "Frameworks", Content: ReactRouter,
    description: "Use Tensile in a React Router app and send link clicks to its router.",
    sections: [{ id: "install", label: "Install" }, { id: "styles", label: "Load the styles" }, { id: "links", label: "Links and the router" }],
  },
  {
    id: "vite", title: "Vite", group: "Frameworks", Content: Vite,
    description: "Use Tensile in a client-rendered React app built with Vite.",
    sections: [{ id: "install", label: "Install" }, { id: "styles", label: "Load the styles" }, { id: "routing", label: "Routing" }],
  },
];

const pages = [
  ...guides.map((guide) => ({ ...guide, props: [], documentation: undefined })),
  ...Object.values(api).map((component) => {
    const documentation = componentDocs[component.title];
    return {
      ...component,
      Content: undefined,
      description: documentation?.description ?? component.description,
      documentation,
      sections: documentation ? [
        { id: "examples", label: "Usage and variants", items: documentation.examples.map((example) => ({ id: example.id, label: example.title })) },
        { id: "composition", label: "Composition" },
        ...(documentation.keyboard.length > 0 ? [{ id: "keyboard", label: "Keyboard" }] : []),
        { id: "api", label: "API reference" },
        { id: "related", label: "Related components" },
      ] : [{ id: "api", label: "API reference" }],
    };
  }),
];

export const docsPages = pages.map((page) => ({ ...page, href: `${base}docs/${page.id}/` }));

export function titleOf(page?: typeof docsPages[number]) {
  return page ? `${page.title} · Tensile` : "Tensile · React components in motion";
}

const groups = docsPages.reduce<Record<string, typeof docsPages>>((result, page) => {
  (result[page.group] ??= []).push(page);
  return result;
}, {});

const commands = docsPages.flatMap((page) => [
  { label: page.title, href: page.href },
  ...page.sections.flatMap((section) => [section, ...("items" in section ? section.items ?? [] : [])]).map((section) => ({ label: `${page.title} / ${section.label}`, href: `${page.href}#${section.id}` })),
]);

export function Docs({ page, brand, toggle, onNavigate }: { page: typeof docsPages[number]; brand: React.ReactNode; toggle: React.ReactNode; onNavigate: (href: string) => void }) {
  const [open, setOpen] = useState(false);
  const index = docsPages.indexOf(page);
  const previous = docsPages[index - 1];
  const next = docsPages[index + 1];

  const navigation = (
    <div className="grid gap-6">
      <SidebarNav
        label="Documentation"
        items={Object.entries(groups).map(([group, pages]) => ({
          label: group,
          items: pages.map((item) => ({ value: item.id, label: item.title, href: item.href })),
        }))}
        value={page.id}
        onValueChange={() => setOpen(false)}
      />
      <Separator />
      <div className="grid gap-3 px-2 text-label text-muted">
        <p className="font-medium text-ink">Resources</p>
        <Link href={`${base}#components`} underline={false} className="hover:text-ink">All components</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh [--tn-container-page:80rem]">
      <a href="#main" className="sr-only fixed top-3 left-3 z-(--tn-layer-overlay) rounded-control bg-ink px-5 py-3 text-paper focus:not-sr-only">Skip to content</a>
      <Header
        variant="bar"
        brand={brand}
        links={[{ label: "Documentation", href: docsPages[0].href }, { label: "Components", href: `${base}#components` }]}
        value={docsPages[0].href}
        actions={
          <>
            {toggle}
            <div className="relative h-11 w-40 sm:w-60 lg:w-72">
              <CommandPalette
                commands={commands}
                onSelect={(command) => onNavigate(commands.find((item) => item.label === command.label)!.href)}
                label="Search documentation"
                placeholder="Search docs…"
                listLabel="Documentation pages and sections"
                emptyText="No pages found"
                className="absolute top-0 right-0 w-full transition-[width] duration-[calc(380ms*var(--tn-motion-duration-scale))] ease-out focus-within:w-[min(24rem,calc(100vw-3rem))]"
              />
            </div>
            <Link href="https://github.com/seb-graf/tensile" underline={false} className="ml-3 hidden text-label lg:block">GitHub</Link>
          </>
        }
      />
      <div className="mx-auto max-w-page px-5 pt-4 md:hidden">
        <Button variant="secondary" size="sm" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}>Browse docs</Button>
      </div>
      <Drawer open={open} onOpenChange={setOpen} title="Documentation" side="left"><div className="pb-3">{navigation}</div></Drawer>
      <div className="mx-auto grid max-w-page gap-10 px-5 md:grid-cols-[12rem_minmax(0,1fr)] md:px-6 lg:gap-14 xl:grid-cols-[12rem_minmax(0,1fr)_10rem] xl:gap-14">
        <aside className="sticky top-16 hidden max-h-[calc(100dvh-4rem)] min-w-0 self-start overflow-y-auto py-8 pr-1 md:block">{navigation}</aside>
        <main id="main" tabIndex={-1} className="min-w-0 pt-6 pb-16 outline-none md:pt-10">
          <PageHeader
            title={page.title}
            description={page.description}
            breadcrumbs={<span className="text-label text-muted">{page.group}</span>}
            className="mb-8"
          />
          <div className="grid gap-10 [&>section]:min-w-0 [&>section]:space-y-4 [&>section>h2]:text-xl [&>section>h2]:font-semibold [&>section>h2]:tracking-tight [&>section>p]:text-body [&>section>p]:leading-7 [&>section>p]:text-muted [&>section>p_code]:rounded [&>section>p_code]:bg-hover [&>section>p_code]:px-1 [&>section>p_code]:text-sm [&>section>p_code]:break-words [&>section>p_code]:text-ink">
            {page.Content ? <page.Content /> : (
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
                      {page.documentation.related.map((name) => <Link key={name} href={`${base}docs/${name.toLowerCase()}/`}>{name}</Link>)}
                    </div>
                  </section>
                )}
              </>
            )}
          </div>
          <Separator className="mt-12" />
          <nav aria-label="Previous and next pages" className="flex justify-between gap-6 pt-6 text-sm">
            <div>{previous && <Link href={previous.href} underline={false}><span className="mb-1 block text-label text-muted">Previous</span>{previous.title}</Link>}</div>
            <div className="text-right">{next && <Link href={next.href} underline={false}><span className="mb-1 block text-label text-muted">Next</span>{next.title}</Link>}</div>
          </nav>
          <p className="mt-12 text-label text-muted">Tensile is <Link href={`${base}LICENSE`}>MIT licensed</Link>. Made by Sébastien Graf.</p>
        </main>
        <aside className="sticky top-16 hidden max-h-[calc(100dvh-4rem)] self-start overflow-y-auto py-10 xl:block">
          <TableOfContents items={page.sections} />
        </aside>
      </div>
    </div>
  );
}
