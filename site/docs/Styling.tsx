import { Link, Table } from "tensile";
import { Example } from "./Example";

const base = import.meta.env.BASE_URL;

const colors = [
  { token: "--tn-color-canvas", light: "#f3f1ec", dark: "#000000", use: "Page background. Set it on your page; the library doesn't style body." },
  { token: "--tn-color-paper", light: "#ffffff", dark: "#111110", use: "Surfaces; text on ink" },
  { token: "--tn-color-ink", light: "#111110", dark: "#ffffff", use: "Main text, primary surfaces" },
  { token: "--tn-color-ink-3", light: "#2e2e2c", dark: "#dad9d5", use: "Raised parts on ink, such as tracks" },
  { token: "--tn-color-muted", light: "#6b6964", dark: "#8f8d88", use: "Secondary text on paper, hover and canvas" },
  { token: "--tn-color-line", light: "#e9e7e2", dark: "#2e2e2c", use: "Separators, borders and the ring of shadow-float" },
  { token: "--tn-color-hover", light: "#f3f1ed", dark: "#232321", use: "Hover and highlight on paper" },
  { token: "--tn-color-accent", light: "#b8f23e", dark: "#b8f23e", use: "Success and active fills" },
  { token: "--tn-color-on-accent", light: "#111110", dark: "#111110", use: "Text and icons on accent" },
  { token: "--tn-color-focus", light: "ink", dark: "ink", use: "Focus rings" },
  { token: "--tn-color-scrim", light: "#111110", dark: "#111110", use: "Backdrops behind dialogs, sheets and the lightbox" },
];

const tokens = [
  { token: "--tn-font-sans", value: "Geist Variable", use: "All text" },
  { token: "--tn-text-caption", value: "11 / 16 px", use: "Small print, axis labels" },
  { token: "--tn-text-label", value: "13 / 20 px", use: "Compact controls, secondary lines, errors" },
  { token: "--tn-text-body", value: "15 / 22 px", use: "Fields, buttons, dialog titles" },
  { token: "--tn-radius-control", value: "26px", use: "Controls; a full pill up to 52 px tall" },
  { token: "--tn-radius-overlay", value: "16px", use: "Open menus and popovers, alerts, error cards" },
  { token: "--tn-radius-card", value: "20px", use: "Cards, panels, full-view images" },
  { token: "--tn-radius-dialog", value: "24px", use: "Dialogs, sheets, drawers, expanded views" },
  { token: "--tn-shadow-float", value: "a line ring, a contact shadow and a soft drop", use: "Every floating surface" },
  { token: "--tn-layer-raised, --tn-layer-sticky, --tn-layer-overlay", value: "10, 20, 50", use: "Raised shapes, sticky headers, overlays leaving the top layer" },
  { token: "--tn-container-page", value: "72rem", use: "Page content width (max-w-page)" },
  { token: "--tn-motion-duration-scale", value: "1, or 0 under reduced motion", use: "Multiplies every animation's duration and delay" },
];

export function Styling() {
  return (
    <>
      <section id="colors">
        <h2>Colors</h2>
        <p>The tokens are CSS variables. Components use them for every color, size and speed, so changing a token changes every component that uses it.</p>
        <Table
          caption="Color tokens"
          columns={[
            { key: "token", header: "Token", rowHeader: true },
            { key: "light", header: "Light" },
            { key: "dark", header: "Dark" },
            { key: "use", header: "Use", cell: (row) => <span className="block min-w-48 whitespace-normal">{row.use}</span> },
          ]}
          rows={colors}
          rowKey={(row) => row.token}
        />
        <p>Text on accent uses <code>--tn-color-on-accent</code>, never ink, so a dark accent works.</p>
      </section>
      <section id="tokens">
        <h2>Type, shape and layers</h2>
        <Table
          caption="Type, shape and layer tokens"
          columns={[
            { key: "token", header: "Token", rowHeader: true },
            { key: "value", header: "Default" },
            { key: "use", header: "Use", cell: (row) => <span className="block min-w-48 whitespace-normal">{row.use}</span> },
          ]}
          rows={tokens}
          rowKey={(row) => row.token}
        />
        <p>Control heights aren't tokens, because the components compute their geometry from them: 32 px compact controls, 44 px buttons, fields and sliders, 48 px fields with the label inside, 40 px list rows, 28 px chips and 24 px badges.</p>
      </section>
      <section id="override">
        <h2>Override tokens</h2>
        <p>The library declares its tokens in <code>@layer theme</code>. Set them on <code>:root</code>, or on any element, in CSS loaded after the library's: a rule outside a layer always wins.</p>
        <Example label="app.css" code={`:root {
  --tn-color-accent: #3355ff;
  --tn-color-on-accent: #ffffff;
  --tn-radius-control: 12px;
  --tn-radius-overlay: 12px;
  --tn-radius-card: 14px;
  --tn-radius-dialog: 16px;
}

/* Inside no-preference, so reduced motion still turns animation off. */
@media (prefers-reduced-motion: no-preference) {
  :root {
    --tn-motion-duration-scale: 1.6;
  }
}`} />
        <p>Shapes that morph animate between <code>var(--tn-radius-…)</code> values, so the animations follow your radii. The motion scale is read from the root element only.</p>
        <p><code>--tn-shadow-float</code> is compiled into the <code>shadow-float</code> class, so setting the variable doesn't change the shadow. Its ring follows <code>--tn-color-line</code>.</p>
      </section>
      <section id="dark">
        <h2>Dark mode</h2>
        <p>Add the <code>dark</code> class to an element. The color tokens inside it switch to the dark column above. Put it on <code>html</code> for the whole page, or on one region.</p>
        <Example label="Dark mode" code={`import { useEffect, useState } from "react";
import { ThemeToggle } from "tensile";

export function ThemeSwitch() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return <ThemeToggle value={theme} onValueChange={setTheme} />;
}`} />
        <p>To follow the system setting, set the class from <code>matchMedia("(prefers-color-scheme: dark)")</code>. Your own dark colors go in a <code>.dark</code> rule loaded after the library's CSS.</p>
      </section>
      <section id="ink">
        <h2>Ink surfaces</h2>
        <p><code>Card tone="ink"</code> is a dark region: it puts the <code>dark</code> class on itself, so everything inside it uses the dark tokens. Text, muted text, lines, hover and focus rings all follow, and so do the components you put in it, forms included. On a dark page it looks like a paper card.</p>
        <p>Make your own dark region the same way: add the <code>dark</code> class and draw it with <code>bg-paper text-ink</code>. Small ink pills, such as a primary button, invert in dark mode instead.</p>
      </section>
      <section id="stylesheets">
        <h2>Styles and reset</h2>
        <p><code>styles.css</code> holds the tokens, the classes the components use, the font faces and a few animations. It has no reset and doesn't style <code>body</code>. Its classes carry a <code>tn:</code> prefix and its tokens a <code>--tn-</code> prefix, so they can't meet your app's classes or your Tailwind theme.</p>
        <p>It holds only the classes the library uses; it isn't a full Tailwind build. Lay out your app with your own CSS, or with your own Tailwind setup.</p>
        <p>With Tailwind 4, add <code>@import "tensile/tailwind.css";</code> after <code>@import "tailwindcss";</code> to use the tokens in your own classes: <code>bg-paper</code>, <code>text-muted</code>, <code>text-label</code>, <code>rounded-control</code>, <code>shadow-float</code>, <code>max-w-page</code>, and the <code>press</code>, <code>surface</code> and <code>scroll-fade</code> utilities. They read the <code>--tn-*</code> variables, so your token overrides and dark mode reach them too. It also makes Geist your <code>font-sans</code>.</p>
        <p><code>reset.css</code> is Tailwind's Preflight and changes native elements across the page. Without it, your reset must set box sizing, form fonts and native appearance. Keep it in <code>@layer base</code>: a rule outside a layer, such as <code>button &#123; color: inherit &#125;</code>, overrides the components' classes.</p>
      </section>
      <section id="fonts">
        <h2>Fonts</h2>
        <p>Geist Variable ships as WOFF2 files, split by script, with <code>font-display: swap</code>. There's no request to a font service. Keep the font files next to the CSS when you deploy.</p>
        <p>Set <code>--tn-font-sans</code> to use your own font. Geist's license is in <Link href={`${base}THIRD_PARTY_NOTICES`}>THIRD_PARTY_NOTICES</Link>.</p>
      </section>
      <section id="placement">
        <h2>Size and placement</h2>
        <p><code>className</code> sets placement and size: width, margin, grid and flex placement, and padding on a bare surface such as Card. It can't restyle a component, because Tailwind doesn't say which of two classes for the same property wins. A different look is a prop.</p>
        <p>Don't change <code>--tn-spacing</code> to resize the components; their geometry depends on it.</p>
      </section>
    </>
  );
}
