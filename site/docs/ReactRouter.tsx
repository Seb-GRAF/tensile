import { Example } from "./Example";

export function ReactRouter() {
  return (
    <>
      <section id="install">
        <h2>Install</h2>
        <p>Add Tensile to a React Router app, in framework mode or as a library. It needs no Tailwind.</p>
        <Example label="Terminal" code="npm install tensile" />
      </section>
      <section id="styles">
        <h2>Load the styles</h2>
        <p>Import the CSS in <code>app/root.tsx</code> in framework mode, or in your entry file otherwise, before your own CSS.</p>
        <Example label="app/root.tsx" code={`import "tensile/reset.css";
import "tensile/styles.css";
import "./app.css";`} />
        <p>Components render on the server in framework mode. The <code>"use client"</code> line at the top of the package only matters to React Server Components; React Router ignores it otherwise.</p>
      </section>
      <section id="links">
        <h2>Links and the router</h2>
        <p>Links in Tensile are plain <code>a</code> elements. Wrap your routes in <code>LinkProvider</code> with React Router's <code>navigate</code>, so a click changes the route instead of loading the page.</p>
        <Example label="app/root.tsx" code={`import { Outlet, useNavigate } from "react-router";
import { LinkProvider } from "tensile";

export default function App() {
  const navigate = useNavigate();
  return (
    <LinkProvider navigate={navigate}>
      <Outlet />
    </LinkProvider>
  );
}`} />
        <p>Plain left clicks on links to your own site go to <code>navigate</code>. Clicks with a modifier key, links that open a new tab, downloads and <code>#fragment</code> links keep their native behavior.</p>
      </section>
    </>
  );
}
