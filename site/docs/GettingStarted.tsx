import { useState } from "react";
import { Link, Toggle } from "tensile";
import { Example } from "./Example";

const base = import.meta.env.BASE_URL;

const uncontrolled = `import { Toggle } from "tensile";

export default function App() {
  return <Toggle label="Notifications" />;
}`;

const controlled = `import { useState } from "react";
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
        <p>Start with an existing React 19 app. Motion installs with Tensile, and the TypeScript types are included. Your app doesn't need Tailwind.</p>
        <Example label="Terminal" code="npm install tensile" />
        <p>Using a framework? See <Link href={`${base}docs/nextjs/`}>Next.js</Link>, <Link href={`${base}docs/react-router/`}>React Router</Link> or <Link href={`${base}docs/vite/`}>Vite</Link>.</p>
      </section>
      <section id="styles">
        <h2>Load the styles</h2>
        <p>Import the styles once, where your app starts. Load your own CSS last, so your tokens win.</p>
        <Example label="App styles" code={'import "tensile/reset.css";\nimport "tensile/styles.css";\nimport "./app.css";'} />
        <p>Skip the reset if your app has one. It changes native element defaults across the page. Keep your own reset in <code>@layer base</code>, so it doesn't override the components' styles.</p>
        <p>Set <code>font-family: var(--tn-font-sans)</code> and <code>background: var(--tn-color-canvas)</code> on your page if your CSS doesn't. The Geist font ships with the library.</p>
      </section>
      <section id="first-component">
        <h2>Your first component</h2>
        <p>Every component works on its own. This switch keeps its state itself; you don't need any state to try it.</p>
        <Example label="Toggle" code={uncontrolled}>
          <div className="flex items-center gap-5">
            <span className="text-body">Notifications</span>
            <Toggle label="Notifications" />
          </div>
        </Example>
        <p>Give it a <code>name</code> and it sends its value with a form. Pass <code>defaultChecked</code> to start it on.</p>
      </section>
      <section id="your-state">
        <h2>Keep the value in your state</h2>
        <p>When your app needs the value, pass it in and update it from the callback. Try the switch, then open the code.</p>
        <Example label="Controlled toggle" code={controlled}>
          <div className="flex items-center gap-5">
            <span className="text-body">Notifications</span>
            <Toggle label="Notifications" checked={enabled} onCheckedChange={setEnabled} />
          </div>
        </Example>
        <p>Every value works both ways: <code>value</code> and <code>onValueChange</code>, <code>checked</code> and <code>onCheckedChange</code>, <code>open</code> and <code>onOpenChange</code>. See <Link href={`${base}docs/forms/`}>Forms</Link>.</p>
        <p>Props types come from the same package, for example <code>import type &#123; ToggleProps &#125; from "tensile"</code>.</p>
      </section>
      <section id="next-steps">
        <h2>Make it yours</h2>
        <p>Override CSS variables on your page or on one region. All components share the same color, shape, type and motion tokens.</p>
        <Example label="app.css" code={':root {\n  --tn-color-accent: #3355ff;\n  --tn-color-on-accent: #ffffff;\n  --tn-radius-control: 12px;\n}'} />
        <p>Read <Link href={`${base}docs/styling/`}>Styling and tokens</Link> and <Link href={`${base}docs/motion/`}>Motion</Link>, or put a <Link href={`${base}docs/field/`}>Field</Link> around an input to build your first form.</p>
      </section>
      <section id="requirements">
        <h2>Requirements</h2>
        <p>Tensile needs React 19 and a bundler that handles ESM, CSS and font files. Server rendering and Next.js hydration are checked in Chromium. Safari, Firefox and screen reader speech still need their own checks. Right-to-left layouts aren't supported.</p>
        <p>Read the <Link href={`${base}docs/limitations/`}>known limitations</Link> before you pick components for your app.</p>
      </section>
    </>
  );
}
