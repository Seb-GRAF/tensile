import { TableOfContents } from "tensile";

const items = [
  { id: "toc-setup", label: "Setup" },
  {
    id: "toc-components",
    label: "Components",
    items: [
      { id: "toc-buttons", label: "Buttons" },
      { id: "toc-fields", label: "Fields and labels" },
    ],
  },
  { id: "toc-theming", label: "Theming" },
];

export function TableOfContentsSubsectionsDemo() {
  return (
    <div className="grid w-full grid-cols-[10rem_minmax(0,1fr)] gap-8">
      <TableOfContents items={items} label="In this guide" className="sticky top-24 self-start" />
      <div className="grid gap-6">
        <section id="toc-setup" className="min-h-64 scroll-mt-24">
          <h3 className="text-lg font-semibold">Setup</h3>
        </section>
        <section id="toc-components" className="grid scroll-mt-24 gap-6">
          <h3 className="text-lg font-semibold">Components</h3>
          <section id="toc-buttons" className="min-h-64 scroll-mt-24">
            <h4 className="font-semibold">Buttons</h4>
          </section>
          <section id="toc-fields" className="min-h-64 scroll-mt-24">
            <h4 className="font-semibold">Fields and labels</h4>
          </section>
        </section>
        <section id="toc-theming" className="min-h-64 scroll-mt-24">
          <h3 className="text-lg font-semibold">Theming</h3>
        </section>
      </div>
    </div>
  );
}
