import { useState } from "react";
import { Breadcrumbs, LinkProvider } from "tensile";

const items = [
  {
    label: "Home",
    href: "/home",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Studio",
    href: "/studio",
  },
];

export function BreadcrumbsLinksDemo() {
  const [result, setResult] = useState("Studio");

  return (
    <LinkProvider navigate={setResult}>
      <div className="grid w-full gap-4">
        <div className="overflow-x-auto p-1">
          <Breadcrumbs
            items={items}
            onNavigate={(item) => setResult(item.label)}
          />
        </div>
        <output aria-live="polite" className="text-label">
          {result}
        </output>
      </div>
    </LinkProvider>
  );
}
