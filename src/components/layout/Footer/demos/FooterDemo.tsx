import { useState } from "react";
import { Footer, LinkProvider } from "tensile";

const groups = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Guides", href: "/guides" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function FooterDemo() {
  const [path, setPath] = useState("/");

  return (
    <LinkProvider navigate={setPath}>
      <div className="w-full">
        <Footer groups={groups} note="© 2026 Studio" className="m-3" />
        <output aria-live="polite" className="block px-6 text-label">
          Local route: {path}
        </output>
      </div>
    </LinkProvider>
  );
}
