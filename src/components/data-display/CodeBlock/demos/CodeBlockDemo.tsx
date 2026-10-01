import { CodeBlock } from "tensile";

const code = `import { Toggle } from "tensile";

export function Settings({ digest, setDigest }: { digest: boolean; setDigest: (digest: boolean) => void }) {
  return <Toggle label="Weekly digest" checked={digest} onCheckedChange={setDigest} />;
}`;

export function CodeBlockDemo() {
  return <CodeBlock title="Settings.tsx" code={code} className="w-full" />;
}
