import { useState } from "react";
import { Breadcrumbs } from "tensile";

const items = [
  {
    label: "Home",
  },
  {
    label: "Projects",
  },
  {
    label: "Studio",
  },
];

export function BreadcrumbsDemo() {
  const [result, setResult] = useState("Studio");

  return (
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
  );
}
