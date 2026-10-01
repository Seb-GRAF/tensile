import { useState } from "react";
import { Card, CodeBlock, CopyButton, Tabs } from "tensile";

export function Example({ code, children, label }: { code: string; children?: React.ReactNode; label: string }) {
  const [view, setView] = useState("preview");
  const source = <CodeBlock code={code} title={label} label={`${label} code`} copyLabel={`Copy ${label}`} className="max-h-128 min-w-0" />;

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
