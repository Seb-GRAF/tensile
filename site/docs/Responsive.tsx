export function Responsive() {
  return (
    <>
      <section id="widths">
        <h2>Widths</h2>
        <p>Fields, sliders, tables, charts and cards fill their container. Buttons, tabs, toggles and pills size to their content. Give the container a width, or pass one through <code>className</code>.</p>
        <p>DescriptionList and Footer use container queries, so they respond to their own width, not the window's. PageHeader moves its actions below the title when there's no room. Wide tables scroll sideways inside a focusable, named region.</p>
      </section>
      <section id="breakpoints">
        <h2>Breakpoints</h2>
        <p>Header moves its links into a drawer below 768 px. AppShell shows its sidebar from 1024 px and a bottom navigation below. Every component is checked at 390 px wide as well as at desktop sizes.</p>
      </section>
      <section id="overlays">
        <h2>Overlays</h2>
        <p>Overlays stay inside the window. Menus and popovers flip to the side with more room and cap their height; tooltips stay on screen; dialogs and sheets fit the window and scroll their content.</p>
      </section>
    </>
  );
}
