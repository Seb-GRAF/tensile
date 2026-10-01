import { Example } from "./Example";

export function Motion() {
  return (
    <>
      <section id="speed">
        <h2>Speed</h2>
        <p>One token sets the speed of every animation: <code>--tn-motion-duration-scale</code>. At 1 components move as designed, at 2 twice as slow, at 0 not at all. CSS effects, such as the press scale and the spinner, use the same token.</p>
        <Example label="app.css" code={`@media (prefers-reduced-motion: no-preference) {
  :root {
    --tn-motion-duration-scale: 1.5;
  }
}`} />
        <p>Put a custom speed inside <code>no-preference</code>, as above. Outside it, your rule would undo reduced motion.</p>
        <p>Components read the scale from the root element when they mount. A change reaches components that mount afterwards; remount a part of the page to apply a new speed at once. On the server the scale is 1.</p>
      </section>
      <section id="reduced">
        <h2>Reduced motion</h2>
        <p>The library sets the scale to 0 when the system asks for reduced motion. You don't need to check the setting yourself.</p>
        <p>At 0, state changes are instant and repeating effects stop. Drags still follow the pointer, a flick still picks its target from its speed, and focus never waits for an animation.</p>
      </section>
      <section id="timers">
        <h2>What keeps real time</h2>
        <p>Timers that are part of how a component works don't scale: the hold time of HoldButton, the copy reset, the tooltip delay, toast lifetimes, the long press of ContextMenu and media time. Reduced motion doesn't make anything finish sooner.</p>
      </section>
      <section id="hooks">
        <h2>Use the same springs</h2>
        <p><code>useSprings()</code> returns the library's transitions for Motion at the current speed: <code>shape</code> for size and position, <code>soft</code> for color and opacity, <code>snap</code> for a release after a drag, <code>draw</code> for a line drawing itself, <code>swap</code> for content that blurs out and in, <code>spring(duration, bounce)</code> for anything else, and <code>scale</code> for your own delays.</p>
        <Example label="Panel.tsx" code={`import { motion } from "motion/react";
import { useSprings } from "tensile";

export function Panel({ open }: { open: boolean }) {
  const { shape } = useSprings();

  return (
    <motion.div
      animate={{ height: open ? 240 : 64 }}
      transition={shape}
      className="overflow-hidden rounded-card bg-paper shadow-float"
    />
  );
}`} />
        <p><code>useWidth()</code> and <code>useSize()</code> measure an element, so a shape can spring to the size of new content. Add <code>motion</code> to your own dependencies when you import it directly.</p>
      </section>
    </>
  );
}
