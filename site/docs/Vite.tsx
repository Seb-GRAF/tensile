import { Link } from "tensile";
import { Example } from "./Example";

const base = import.meta.env.BASE_URL;

export function Vite() {
  return (
    <>
      <section id="install">
        <h2>Install</h2>
        <p>Start from Vite's React template, or add Tensile to an existing Vite app. Vite handles the CSS and font files with no config.</p>
        <Example label="Terminal" code={"npm create vite@latest my-app -- --template react-ts\ncd my-app\nnpm install tensile"} />
      </section>
      <section id="styles">
        <h2>Load the styles</h2>
        <p>Import the CSS in <code>src/main.tsx</code>, before your own. Remove the template's <code>index.css</code> import, or keep its rules in <code>@layer base</code>.</p>
        <Example label="src/main.tsx" code={`import "tensile/reset.css";
import "tensile/styles.css";
import "./app.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);`} />
        <Example label="src/app.css" code={`body {
  background: var(--tn-color-canvas);
  font-family: var(--tn-font-sans);
}`} />
        <p>The <code>"use client"</code> line at the top of the package only matters to React Server Components; a client-rendered app ignores it.</p>
      </section>
      <section id="routing">
        <h2>Routing</h2>
        <p>Without a router, links load pages as usual. With a router, wrap your app in <code>LinkProvider</code> and pass the router's navigate function; see <Link href={`${base}docs/react-router/`}>React Router</Link>.</p>
      </section>
    </>
  );
}
