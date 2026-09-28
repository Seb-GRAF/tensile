import { useState } from "react";
import { Card, CopyButton, Tabs } from "tensile";

export function Example({ code, children, label }: { code: string; children?: React.ReactNode; label: string }) {
  const [view, setView] = useState("preview");
  const source = (
    <Card tone="ink" className="min-w-0 overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-5 pt-3">
        <span className="text-label text-paper/65">{label}</span>
        <CopyButton value={code} label={`Copy ${label}`} />
      </div>
      <pre tabIndex={0} aria-label={`${label} code`} className="max-h-128 overflow-auto px-5 pt-2 pb-6 font-mono text-label leading-6 outline-offset-[-4px] focus-visible:outline-2 focus-visible:outline-paper">
        <code>{code}</code>
      </pre>
    </Card>
  );

  return children ? (
    <Tabs
      label={`${label} example`}
      value={view}
      onValueChange={setView}
      items={[
        {
          value: "preview", label: "Preview", content: (
            <Card className="relative flex min-h-64 items-center justify-center px-6 py-16 sm:px-10">
              <CopyButton value={code} label={`Copy ${label}`} className="absolute top-3 right-3" />
              {children}
            </Card>
          ),
        },
        { value: "code", label: "Code", content: source },
      ]}
    />
  ) : source;
}
