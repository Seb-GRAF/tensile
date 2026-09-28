import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  Button,
  Card,
  Dialog,
  Field,
  Input,
  List,
  PageHeader,
  Popover,
  SegmentedTabs,
  Select,
  Spinner,
  StatusBadge,
  Tabs,
  Toggle,
  VolumeSlider,
  type StatusBadgeProps,
} from "../index";

const themes = [
  { value: "default", label: "Default" },
  { value: "alternate", label: "Alternate" },
];

const qualities = [
  { value: "automatic", label: "Automatic" },
  { value: "low", label: "Low" },
  { value: "high", label: "High" },
  { value: "lossless", label: "Lossless" },
];

const stages: StatusBadgeProps[] = [
  { status: "neutral", label: "Draft" },
  { status: "info", label: "In review" },
  { status: "warning", label: "Changes requested" },
  { status: "success", label: "Published" },
];

const releases = [
  { id: "night-drive", title: "Night drive", description: "24 tracks", stage: 3 },
  { id: "morning-run", title: "Morning run", description: "18 tracks", stage: 1 },
  { id: "deep-focus", title: "Deep focus", description: "40 tracks", stage: 0 },
];

const sections = [
  {
    value: "about",
    label: "About",
    content: <p className="text-sm text-muted">Late-night synth and downtempo, sequenced for a two-hour drive. New tracks arrive every Friday.</p>,
  },
  {
    value: "credits",
    label: "Credits",
    content: <p className="text-sm text-muted">Curated by Lena Park. Cover photo by Jonas Weber, taken on the coast road outside Lisbon.</p>,
  },
  {
    value: "history",
    label: "History",
    content: <p className="text-sm text-muted">Started in March 2024 with twelve tracks. Today 1,204 people follow it.</p>,
  },
];

const css = `[data-theme="alternate"] {
  --color-accent: #3355ff;
  --color-on-accent: #ffffff;
  --radius-control: 10px;
  --radius-overlay: 12px;
  --radius-card: 14px;
  --radius-dialog: 16px;
}

@media (prefers-reduced-motion: no-preference) {
  [data-theme="alternate"] {
    --motion-duration-scale: 1.6;
  }
}`;

function Showcase() {
  const [scale] = useState(() => getComputedStyle(document.documentElement).getPropertyValue("--motion-duration-scale"));
  const [reduced] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [spatial, setSpatial] = useState(true);
  const [quality, setQuality] = useState<string | null>("high");
  const [volume, setVolume] = useState(0.6);
  const [step, setStep] = useState(0);
  const [section, setSection] = useState("about");
  const [details, setDetails] = useState(false);
  const [inviting, setInviting] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <>
      <p className="text-label text-muted">
        Motion scale {scale} · Reduced motion {reduced ? "on" : "off"}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="grid content-start gap-4 p-5">
          <div>
            <h2 className="text-body font-semibold">Publish Night drive</h2>
            <p className="mt-1 text-label text-muted">Followers get it on Friday at 9:00.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button>Publish</Button>
            <Button variant="secondary">Preview</Button>
            <Button variant="ghost">Discard</Button>
          </div>
          <p className="flex items-center gap-2 text-label text-muted">
            <Spinner />
            Uploading cover art
          </p>
        </Card>
        <Card className="grid content-start gap-4 p-5">
          <h2 className="text-body font-semibold">Playback</h2>
          <Field label="Spatial audio" description="Follows your head on supported headphones.">
            <Toggle checked={spatial} onCheckedChange={setSpatial} />
          </Field>
          <Field label="Streaming quality">
            <Select options={qualities} value={quality} onValueChange={setQuality} />
          </Field>
          <VolumeSlider value={volume} onValueChange={setVolume} />
        </Card>
        <Card className="grid content-start gap-4 p-5">
          <h2 className="text-body font-semibold">Releases</h2>
          <List
            items={releases.map(({ stage, ...release }) => ({
              ...release,
              trailing: <StatusBadge {...stages[(stage + step) % stages.length]} />,
            }))}
          />
          <Button variant="secondary" size="sm" onClick={() => setStep((step + 1) % stages.length)} className="justify-self-start">
            Next status
          </Button>
        </Card>
        <Card className="grid content-start gap-4 p-5">
          <h2 className="text-body font-semibold">Night drive</h2>
          <Tabs items={sections} value={section} onValueChange={setSection} />
        </Card>
        <Card className="grid content-start gap-4 p-5">
          <div>
            <h2 className="text-body font-semibold">Now playing</h2>
            <p className="mt-1 text-label text-muted">Winter Breeze by Arulo</p>
          </div>
          <Popover open={details} onOpenChange={setDetails} trigger="Track details" panelLabel="Track details">
            <div className="p-4">
              <p className="text-body font-semibold text-ink">Winter Breeze</p>
              <p className="text-label text-muted">Arulo</p>
              <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-label">
                <dt className="text-muted">Album</dt>
                <dd className="text-right">Lumen</dd>
                <dt className="text-muted">Released</dt>
                <dd className="text-right">2024</dd>
                <dt className="text-muted">Length</dt>
                <dd className="text-right tabular-nums">2:20</dd>
              </dl>
              <Button className="mt-4 w-full">Go to album</Button>
            </div>
          </Popover>
        </Card>
        <Card className="grid content-start gap-4 p-5">
          <div>
            <h2 className="text-body font-semibold">Collaborators</h2>
            <p className="mt-1 text-label text-muted">Lena Park and 2 others can add songs to Night drive.</p>
          </div>
          <Dialog open={inviting} onOpenChange={setInviting} trigger="Invite people" title="Invite to Night drive" className="justify-self-start">
            <p className="mt-1 text-sm text-muted">They get an email with a link and can add songs right away.</p>
            <div className="mt-4 flex gap-2">
              <Input type="email" value={email} onValueChange={setEmail} aria-label="Email" placeholder="name@example.com" className="min-w-0 grow" />
              <Button onClick={() => setInviting(false)}>Invite</Button>
            </div>
          </Dialog>
        </Card>
        <Card tone="ink" className="grid gap-3 p-5 sm:col-span-2 lg:col-span-3">
          <h2 className="text-body font-semibold">Your own theme</h2>
          <p className="text-label text-paper/55">
            An app sets the tokens in its own CSS, loaded after the library's. This is the alternate theme; the switch above puts
            data-theme="alternate" on the root element. A speed change goes inside the no-preference query, or it would undo reduced motion.
          </p>
          <pre className="whitespace-pre-wrap text-label">
            <code>{css}</code>
          </pre>
        </Card>
      </div>
    </>
  );
}

function ThemeAndMotion() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme!);
  document.documentElement.dataset.theme = theme;

  return (
    <div className="mx-auto grid max-w-page gap-6 p-4 sm:p-8">
      <PageHeader
        title="Theme and motion"
        description="Every component reads the same tokens. Switch the theme to change the accent, the radii and the speed of every animation at once."
        actions={<SegmentedTabs options={themes} value={theme} onValueChange={setTheme} label="Theme" />}
      />
      <Showcase key={theme} />
    </div>
  );
}

const meta = {
  title: "Examples/Theme and motion",
  id: "examples-theme-and-motion",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** Switch the theme by click or with the arrow keys: the showcase remounts with the new accent, radii and motion speed. Open Track details and Invite people to compare the speed; Next status fades the badges. */
export const Default: Story = {
  render: () => <ThemeAndMotion />,
};
