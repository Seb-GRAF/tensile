import { useState } from "react";
import { LinkProvider, NavigationMenu } from "tensile";

const items = [
  {
    label: "Products",
    links: [
      { label: "Analytics", href: "/products/analytics", description: "Dashboards for every team." },
      { label: "Automations", href: "/products/automations", description: "Run work on a schedule." },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Docs",
    links: [
      { label: "Guides", href: "/docs/guides" },
      { label: "API reference", href: "/docs/api" },
    ],
  },
];

export function NavigationMenuDemo() {
  const [path, setPath] = useState("/");

  return (
    <LinkProvider navigate={setPath}>
      <div className="grid justify-items-center gap-4">
        <NavigationMenu items={items} label="Demo navigation" />
        <p className="text-label text-muted" aria-live="polite">Current page: {path}</p>
      </div>
    </LinkProvider>
  );
}
