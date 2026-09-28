import { Card, CopyButton, Footer, Header, Link, Separator } from "tensile";
import { FieldExample } from "../docs/examples/FieldExample";
import { MorphButtonExample } from "../docs/examples/MorphButtonExample";
import { TabsExample } from "../docs/examples/TabsExample";

const docs = "./storybook/?path=/docs/";
const install = "npm install tensile";
const links = [
  { label: "Get started", href: `${docs}guides-get-started--docs` },
  { label: "Components", href: `${docs}components-button--docs` },
  { label: "Storybook", href: "./storybook/?path=/story/components-morphbutton--default" },
];

export function App() {
  return (
    <>
      <a href="#main" className="sr-only fixed top-3 left-3 z-(--layer-overlay) rounded-control bg-ink px-5 py-3 text-paper focus:not-sr-only">Skip to content</a>
      <Header
        brand={<a href="./" className="rounded-sm text-xl font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2">Tensile<span className="text-muted"> / </span></a>}
        links={links}
        value="./"
        actions={<Link href="https://github.com/seb-graf/tensile" className="text-label">GitHub ↗</Link>}
      />
      <main id="main" tabIndex={-1} className="outline-none">
        <section className="mx-auto grid max-w-page gap-12 px-6 pt-14 pb-16 md:pt-20 md:pb-20 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <h1 className="text-5xl leading-none font-semibold tracking-tight text-balance sm:text-6xl">A little motion.<br />A clearer interface.</h1>
            <p className="mt-6 max-w-lg text-lg text-muted">React controls that move with their state. Shared styling, controlled props, and CSS ready to import.</p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-body font-medium">
              <Link href={links[0].href}>Start building ↗</Link>
              <Link href="#interactions">Try the components ↓</Link>
            </div>
          </div>
          <Card className="min-w-0 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 text-label">
              <span className="font-medium">MorphButton</span>
              <span className="text-muted">Live example</span>
            </div>
            <div className="flex min-h-52 items-center justify-center">
              <MorphButtonExample />
            </div>
            <Separator />
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-label text-muted">
              <span>Idle → loading → success</span>
              <Link href={`${docs}components-morphbutton--docs`}>View code ↗</Link>
            </div>
          </Card>
        </section>

        <section aria-label="Installation" className="mx-auto max-w-page px-6 pb-16">
          <div className="grid gap-5 border-t border-ink/15 pt-6 lg:grid-cols-[1fr_2fr] lg:items-center">
            <div>
              <h2 className="text-body font-medium">Bring the pieces. Keep your app.</h2>
              <p className="mt-1 text-label text-muted">React 19 · No consumer Tailwind setup</p>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-3 rounded-overlay bg-paper p-3 pl-5">
                <code className="min-w-0 flex-1 overflow-x-auto py-2 text-sm whitespace-nowrap">{install}</code>
                <CopyButton value={install} label="Copy install command" className="shrink-0" />
              </div>
              <p className="mt-2 text-caption text-muted">Motion installs automatically. <Link href={links[0].href}>Load the styles and add your first component</Link>.</p>
            </div>
          </div>
        </section>

        <section id="interactions" className="mx-auto max-w-page px-6 pb-20">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">The interaction is the example.</h2>
          <p className="mt-3 max-w-xl text-body text-muted">Change a tab. Leave a field empty. The same components you see here are the ones you import.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-[1.2fr_1fr]">
            <Card className="min-w-0 p-6 sm:p-8">
              <h3 className="text-body font-medium">Content changes. The surface follows.</h3>
              <div className="mt-8 min-h-48 text-body"><TabsExample /></div>
              <Link href={`${docs}components-tabs--docs`} className="text-label">Explore Tabs ↗</Link>
            </Card>
            <Card className="min-w-0 p-6 sm:p-8">
              <h3 className="text-body font-medium">Make room for feedback.</h3>
              <div className="mt-8 min-h-48"><FieldExample /></div>
              <Link href={`${docs}guides-composition--docs`} className="text-label">Compose a field ↗</Link>
            </Card>
          </div>
        </section>

        <section className="bg-paper">
          <div className="mx-auto grid max-w-page gap-10 px-6 py-16 md:grid-cols-2 md:gap-20">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">A shared language.<br />Your own composition.</h2>
              <p className="mt-5 max-w-md text-body text-muted">Use a button on its own or combine fields, navigation, and surfaces. Your app owns the data and the state.</p>
              <Link href={`${docs}guides-composition--docs`} className="mt-6 inline-block text-body font-medium">Read the composition guide ↗</Link>
            </div>
            <dl className="grid gap-7 text-body">
              <div><dt className="font-medium">Style with tokens</dt><dd className="mt-1 text-muted">Change colors, typography, and radii in CSS. <Link href={`${docs}guides-styling--docs`}>Styling and themes</Link></dd></div>
              <div><dt className="font-medium">Motion with a purpose</dt><dd className="mt-1 text-muted">State changes share a motion system with reduced-motion behavior. <Link href={`${docs}guides-motion--docs`}>How motion works</Link></dd></div>
              <div><dt className="font-medium">Know the boundaries</dt><dd className="mt-1 text-muted">ESM and React 19. Browser and assistive-technology coverage is still being established. <Link href={`${docs}guides-get-started--docs`}>Requirements and limitations</Link></dd></div>
            </dl>
          </div>
        </section>
      </main>
      <Footer
        groups={[
          { title: "Build", links: links.slice(0, 2) },
          { title: "Learn", links: [{ label: "Styling and themes", href: `${docs}guides-styling--docs` }, { label: "Motion", href: `${docs}guides-motion--docs` }, { label: "Composition", href: `${docs}guides-composition--docs` }] },
          { title: "Explore", links: [links[2], { label: "GitHub", href: "https://github.com/seb-graf/tensile" }, { label: "MIT license", href: "./LICENSE" }, { label: "Font license", href: "./THIRD_PARTY_NOTICES" }] },
        ]}
        note="Tensile. React components with shared styling and motion."
      />
    </>
  );
}
