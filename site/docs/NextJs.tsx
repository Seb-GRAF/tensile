import { Link } from "tensile";
import { Example } from "./Example";

const github = "https://github.com/seb-graf/tensile";

export function NextJs() {
  return (
    <>
      <section id="install">
        <h2>Install</h2>
        <p>Add Tensile to a Next.js project that uses the App Router. It needs no Next.js config and no Tailwind.</p>
        <Example label="Terminal" code="npm install tensile" />
      </section>
      <section id="styles">
        <h2>Load the styles</h2>
        <p>Import the CSS in the root layout, before your own.</p>
        <Example label="app/layout.tsx" code={`import "tensile/reset.css";
import "tensile/styles.css";
import "./app.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`} />
        <Example label="app/app.css" code={`body {
  background: var(--tn-color-canvas);
  font-family: var(--tn-font-sans);
}`} />
      </section>
      <section id="server">
        <h2>Server components</h2>
        <p>The package starts with <code>"use client"</code>, so every component is a client component. A server component can still render them and pass data and uncontrolled defaults, but not callbacks: functions can't cross from the server to the client.</p>
        <Example label="app/page.tsx" code={`import { Button, Field, Input, Select, Toggle } from "tensile";

const teams = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
];

export default function Page() {
  return (
    <form>
      <Field label="Email">
        <Input type="email" name="email" autoComplete="email" />
      </Field>
      <Field label="Team">
        <Select name="team" options={teams} defaultValue="design" />
      </Field>
      <Toggle label="Weekly digest" name="digest" />
      <Button type="submit">Save</Button>
    </form>
  );
}`} />
        <p>When you need a callback or your own state, move that part into a file that starts with <code>"use client"</code>.</p>
        <Example label="app/Digest.tsx" code={`"use client";

import { useState } from "react";
import { Toggle } from "tensile";

export function Digest() {
  const [digest, setDigest] = useState(false);
  return <Toggle label="Weekly digest" name="digest" checked={digest} onCheckedChange={setDigest} />;
}`} />
        <p><code>toast()</code> and the hooks, such as <code>useSprings</code>, run on the client only. The <Link href={`${github}/tree/main/examples/nextjs`}>Next.js example</Link> is a working app.</p>
      </section>
      <section id="links">
        <h2>Links and the router</h2>
        <p>Links in Tensile are plain <code>a</code> elements. Wrap your app in <code>LinkProvider</code> to send their clicks to the Next.js router instead of loading the page. It's a client component, because it holds a function.</p>
        <Example label="app/Providers.tsx" code={`"use client";

import { useRouter } from "next/navigation";
import { LinkProvider } from "tensile";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return <LinkProvider navigate={(href) => router.push(href)}>{children}</LinkProvider>;
}`} />
        <Example label="app/layout.tsx" code={`import { Providers } from "./Providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}`} />
        <p>Plain left clicks on links to your own site go to <code>router.push</code>. Clicks with a modifier key, links that open a new tab, downloads and <code>#fragment</code> links keep their native behavior. Unlike Next.js's own Link, these links aren't prefetched.</p>
      </section>
    </>
  );
}
