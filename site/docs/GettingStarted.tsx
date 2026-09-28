import { useState } from "react";
import { Link, Toggle } from "tensile";
import { Example } from "./Example";

const source = `import { useState } from "react";
import { Toggle } from "tensile";

export default function App() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Toggle
      label="Notifications"
      checked={enabled}
      onCheckedChange={setEnabled}
    />
  );
}`;

export function GettingStarted() {
  const [enabled, setEnabled] = useState(false);

  return (
    <>
      <section id="install">
        <h2>Install</h2>
        <p>Start with an existing React 19 application. Motion installs with Tensile, and TypeScript declarations are included. Your app does not need Tailwind.</p>
        <Example label="Terminal" code="npm install tensile" />
      </section>
      <section id="styles">
        <h2>Load the styles</h2>
        <p>Import the styles once at your app’s entry point. Load your own CSS last so your tokens take precedence.</p>
        <Example label="App styles" code={'import "tensile/reset.css";\nimport "tensile/styles.css";\nimport "./app.css";'} />
        <p>The reset is optional if your app already has one. It changes native element defaults across the page. Keep a custom reset in <code>@layer base</code> so it does not override component utilities.</p>
        <p>Apply <code>font-family: var(--font-sans)</code> to your app root if your reset does not set it. Geist fonts ship with the library.</p>
      </section>
      <section id="first-component">
        <h2>Your first component</h2>
        <p>You own the state. Give the component a value and update it through its callback. Try the switch, then open the code.</p>
        <Example label="Toggle" code={source}>
          <div className="flex items-center gap-5">
            <span className="text-body">Notifications</span>
            <Toggle label="Notifications" checked={enabled} onCheckedChange={setEnabled} />
          </div>
        </Example>
        <p>Props types come from the same package, for example <code>import type &#123; ToggleProps &#125; from "tensile"</code>.</p>
      </section>
      <section id="next-steps">
        <h2>Make it yours</h2>
        <p>Override CSS variables on your app or on a single region. Components share the same color, shape, type, and motion tokens.</p>
        <Example label="app.css" code={':root {\n  --color-accent: #3355ff;\n  --color-on-accent: #ffffff;\n  --radius-control: 12px;\n}'} />
        <p>Read the <Link href="https://github.com/seb-graf/tensile#tokens">token reference</Link> and <Link href="https://github.com/seb-graf/tensile#motion">motion guide</Link>, or put a <Link href="?docs=field">Field</Link> around an input to build your first form.</p>
      </section>
      <section id="requirements">
        <h2>Requirements</h2>
        <p>Tensile targets React 19 and ESM bundlers that handle CSS and font URLs. Server rendering is smoke-tested; framework hydration, Safari, Firefox, and screen-reader speech still need separate verification. Complete dark mode and right-to-left layouts are not supported release features.</p>
        <p>See the <Link href="https://github.com/seb-graf/tensile#known-limitations">known limitations</Link> before choosing components for your app.</p>
      </section>
    </>
  );
}
