import { Link } from "tensile";

const base = import.meta.env.BASE_URL;

export function Accessibility() {
  return (
    <>
      <section id="patterns">
        <h2>Elements and roles</h2>
        <p>Each component uses the native element where one exists, or the matching ARIA pattern: button, link, combobox and listbox, menu, tablist, slider, spinbutton, tree, dialog and alertdialog, radiogroup, toolbar, and carousel region.</p>
        <p>Each supports the keys its pattern expects: arrows, Home and End, Enter, Space, Escape, and typeahead where the pattern has it. Every component page lists its keys.</p>
        <p>Modal overlays use a native <code>dialog</code>, so the page behind them is inert and Tab stays inside.</p>
      </section>
      <section id="focus">
        <h2>Focus</h2>
        <p>Focus rings use <code>--tn-color-focus</code> with a 2 px offset; dark surfaces switch it to paper. Text fields show the ring only when focus came from the keyboard.</p>
        <p>Overlays return focus to the control that opened them. When a control you focused goes away, such as a dismissed toast or a removed row, focus moves to a neighbor or to its region.</p>
      </section>
      <section id="text">
        <h2>Text and labels</h2>
        <p>All text a user sees or hears is a prop with an English default, so you can translate it. Icon-only actions require a label.</p>
        <p>Muted text meets WCAG AA on paper, hover and canvas. Controls on paper keep a visible edge. Reduced motion turns animation off without changing behavior; see <Link href={`${base}docs/motion/`}>Motion</Link>.</p>
      </section>
      <section id="checked">
        <h2>What has been checked</h2>
        <p>Components are checked in Chromium with keyboard, pointer and touch gestures. Screen reader speech, Safari and Firefox haven't been tested, and no conformance level is claimed. See <Link href={`${base}docs/limitations/`}>Known limitations</Link>.</p>
      </section>
    </>
  );
}
