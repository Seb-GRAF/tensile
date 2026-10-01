import { Link } from "tensile";
import { FieldExample } from "../../src/components/inputs/Field/demos/FieldExample";
import fieldExampleCode from "../../src/components/inputs/Field/demos/FieldExample.tsx?raw";
import { Example } from "./Example";

const base = import.meta.env.BASE_URL;

export function Patterns() {
  return (
    <>
      <section id="layout">
        <h2>Layout</h2>
        <p>Page structure needs no components. Use ordinary HTML and your own CSS or Tailwind: a page container such as <code>mx-auto max-w-page px-6</code>, then grids and flex rows inside it.</p>
        <p>Put content such as a navigation, steps or a list of options in a <Link href={`${base}docs/card/`}>Card</Link>; those components draw no card of their own, so there's never a card inside a card. Never put a button inside another button or a link.</p>
        <p>For type, use <code>text-caption</code>, <code>text-label</code>, <code>text-sm</code> and <code>text-body</code>, then larger sizes for headings. Text is <code>text-ink</code> or <code>text-muted</code>, on paper and inside a dark region alike; on a small ink pill it's <code>text-paper</code> or <code>text-paper/60</code>.</p>
      </section>
      <section id="field">
        <h2>A field with validation</h2>
        <p>Field owns the label and the error. Input owns the text. Button owns the submit. Your form decides what a valid value is and moves focus to the field that needs it.</p>
        <Example label="Field with validation" code={fieldExampleCode}>
          <div className="w-full max-w-sm"><FieldExample /></div>
        </Example>
      </section>
      <section id="actions">
        <h2>Actions and chips</h2>
        <p>Put related buttons in <code>{'<div role="group" aria-label="…">'}</code>. Use <Link href={`${base}docs/toolbar/`}>Toolbar</Link> when they need arrow keys and shared tooltips.</p>
        <p>Selectable chips are <Link href={`${base}docs/togglegroup/`}>ToggleGroup</Link>. Removable filters are <Link href={`${base}docs/tag/`}>Tag</Link> with <code>onRemove</code>. Counts are <Link href={`${base}docs/badge/`}>Badge</Link>, and statuses are <Link href={`${base}docs/statusbadge/`}>StatusBadge</Link>.</p>
      </section>
      <section id="toasts">
        <h2>Toasts</h2>
        <p>Mount one <Link href={`${base}docs/toaster/`}>Toaster</Link> and call <code>toast()</code> from anywhere. A toast with the same <code>id</code> updates in place, so a loading toast can turn into a success.</p>
        <Example label="Toasts" code={`import { Button, Toaster, toast } from "tensile";

function upload() {
  const id = toast("Uploading photo", { status: "loading" });
  setTimeout(() => toast("Photo uploaded", { id, status: "success" }), 2000);
}

export function App() {
  return (
    <>
      <Button onClick={upload}>Upload photo</Button>
      <Toaster className="fixed inset-x-4 bottom-4 mx-auto max-w-sm" />
    </>
  );
}`} />
      </section>
      <section id="video">
        <h2>Video</h2>
        <p>A native <code>video</code> drives <Link href={`${base}docs/videocontrols/`}>VideoControls</Link>. The controls report changes, and your handlers pass them to the element.</p>
        <Example label="Video.tsx" code={`const video = useRef<HTMLVideoElement>(null);

<div className="relative aspect-video overflow-hidden rounded-card">
  <video
    ref={video}
    src={src}
    className="size-full object-cover"
    onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
    onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
  />
  <div className="absolute inset-x-3 bottom-3">
    <VideoControls
      duration={duration}
      playing={playing}
      onPlayingChange={(next) => {
        setPlaying(next);
        if (next) video.current!.play();
        else video.current!.pause();
      }}
      currentTime={time}
      onCurrentTimeChange={(next) => {
        video.current!.currentTime = next;
        setTime(next);
      }}
      volume={volume}
      onVolumeChange={(next) => {
        video.current!.volume = next;
        setVolume(next);
      }}
    />
  </div>
</div>`} />
      </section>
    </>
  );
}
