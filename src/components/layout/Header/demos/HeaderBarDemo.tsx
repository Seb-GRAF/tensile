import { useState } from "react";
import { Header, LinkProvider, Button } from "tensile";

const links = [
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
];

export function HeaderBarDemo() {
  const [path, setPath] = useState("/projects");
  const [message, setMessage] = useState("");

  return (
    <LinkProvider navigate={setPath}>
      <div className="w-full">
        <Header
          variant="bar"
          brand={<span className="font-semibold">Studio</span>}
          links={links}
          value={path}
          navLabel="Demo navigation"
          menuLabel="Demo menu"
          actions={
            <Button size="sm" onClick={() => setMessage("Project created")}>
              New
            </Button>
          }
        />
        <p className="p-6 text-label" aria-live="polite">
          {message || `Current page: ${path}`}
        </p>
      </div>
    </LinkProvider>
  );
}
