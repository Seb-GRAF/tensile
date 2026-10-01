import { Link } from "tensile";

const base = import.meta.env.BASE_URL;

export function Limitations() {
  return (
    <>
      <section id="browsers">
        <h2>Browsers and assistive tech</h2>
        <p>Selected keyboard, form and accessibility scenarios run in Playwright Chromium, Firefox and WebKit. Installed Safari, mobile browsers and screen reader speech haven't been verified. These checks do not cover every component or establish accessibility conformance.</p>
        <p>iOS fires no <code>contextmenu</code> event on touch, so ContextMenu opens on its own 500 ms long press there. A long press with a pen on Windows may also click what's under the pen.</p>
      </section>
      <section id="scope">
        <h2>Not included</h2>
        <p>Left out on purpose: right-to-left layouts, tokens for control heights, virtualized lists, async options in Combobox, and specialist tools such as rich text and code editors, maps, scheduling, diagram editors, spreadsheet grids, payments, sign-in backends and upload services.</p>
      </section>
      <section id="components">
        <h2>Components</h2>
        <p>Uncontrolled values don't follow a native form reset; see <Link href={`${base}docs/forms/#reset`}>Forms</Link>.</p>
        <p>Field links its error to the control, but doesn't announce it the moment it appears. A Fieldset inside a disabled Fieldset reports <code>disabled: false</code> to controls that aren't native inputs.</p>
        <p>DateRangePicker needs valid local ISO dates. A reset from outside a form can't clear a first pick that's waiting for its second.</p>
        <p>Popover picks its side and Tooltip its position when they open; resizing the window while they're open doesn't move them. A click outside closes a Popover, and focus goes where you clicked.</p>
        <p>Carousel: a hard flick can skip a slide, and the arrows don't announce the new slide.</p>
        <p>TreeView: item values must be unique across the whole tree.</p>
        <p>DataTable always shows five placeholder rows while loading, and its column widths follow the rows on screen.</p>
        <p><code>--tn-shadow-float</code> can't be changed through its variable; see <Link href={`${base}docs/styling/`}>Styling and tokens</Link>.</p>
      </section>
    </>
  );
}
