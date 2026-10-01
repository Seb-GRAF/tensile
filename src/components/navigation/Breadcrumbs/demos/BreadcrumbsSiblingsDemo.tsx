import { useState } from "react";
import { Breadcrumbs, LinkProvider } from "tensile";

const items = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Harbor Coffee",
    href: "/projects/harbor-coffee",
    siblings: [
      { label: "Northwind Rail", href: "/projects/northwind-rail" },
      { label: "Fieldnote Journal", href: "/projects/fieldnote-journal" },
      { label: "Atlas Climbing Gym", href: "/projects/atlas-climbing-gym" },
    ],
  },
  {
    label: "Brand refresh",
    siblings: [
      { label: "Packaging" },
      { label: "Spring campaign" },
    ],
  },
];

export function BreadcrumbsSiblingsDemo() {
  const [result, setResult] = useState("Brand refresh");

  return (
    <LinkProvider navigate={setResult}>
      <div className="grid w-full gap-4">
        <Breadcrumbs
          items={items}
          onNavigate={(item) => setResult(item.label)}
          itemsAfterCollapse={3}
        />
        <output aria-live="polite" className="text-label">
          {result}
        </output>
      </div>
    </LinkProvider>
  );
}
