import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  AvatarGroup,
  Badge,
  Button,
  Card,
  Checkbox,
  CodeBlock,
  ColorSwatches,
  Combobox,
  CopyButton,
  Dialog,
  Field,
  Footer,
  Header,
  HoldButton,
  Icon,
  IconButton,
  Input,
  Link,
  LinkProvider,
  MorphButton,
  NumberStepper,
  NumberTicker,
  PageDots,
  Select,
  StatusBadge,
  SwipeButton,
  Tabs,
  ThemeToggle,
  Toggle,
  ToggleGroup,
  VolumeSlider,
  useSprings,
  useWidth,
  type StatusBadgeProps,
} from "tensile";
import { Logo } from "./Logo";
import { chapters, Reel } from "./Reel";
import { Docs, docsPages, titleOf } from "./Docs";
import stats from "./docs/stats.json";

const start = docsPages[0].href;
const github = "https://github.com/seb-graf/tensile";
const install = "npm install tensile";
const links = [
  { label: "Documentation", href: start },
  { label: "Components", href: "#components" },
];

const channels = [
  { value: "stable", label: "Stable" },
  { value: "beta", label: "Beta" },
  { value: "canary", label: "Canary" },
];

const ranges = [
  { value: "day", label: "Day", content: "312 visits today" },
  { value: "week", label: "Week", content: "2,184 visits this week" },
  { value: "month", label: "Month", content: "9,460 visits this month" },
  { value: "year", label: "Year", content: "118,200 visits this year" },
];

const stages: StatusBadgeProps[] = [
  { status: "neutral", label: "Draft" },
  { status: "info", label: "In review" },
  { status: "warning", label: "Changes requested" },
  { status: "success", label: "Published" },
];

const roles = [
  { value: "viewer", label: "Viewer: can read and comment" },
  { value: "editor", label: "Editor: can change the release" },
  { value: "owner", label: "Owner: can publish and delete" },
];

const zones = [
  { value: "Europe/Zurich", label: "Zurich (GMT+2)" },
  { value: "America/New_York", label: "New York (GMT−4)" },
  { value: "Asia/Tokyo", label: "Tokyo (GMT+9)" },
  { value: "America/Los_Angeles", label: "Los Angeles (GMT−7)" },
];

const people = [
  { value: "maya", label: "Maya Chen" },
  { value: "leo", label: "Leo Park" },
  { value: "amara", label: "Amara Okafor" },
  { value: "jonas", label: "Jonas Weber" },
  { value: "sofia", label: "Sofia Rossi" },
  { value: "ravi", label: "Ravi Iyer" },
];

const accents = [
  { value: "lime", label: "Lime", color: "#b8f23e", on: "#111110" },
  { value: "cobalt", label: "Cobalt", color: "#3355ff", on: "#ffffff" },
  { value: "blush", label: "Blush", color: "#ffb3d1", on: "#111110" },
  { value: "mint", label: "Mint", color: "#5fe0b0", on: "#111110" },
];

const corners = [
  { value: "round", label: "Round", radii: { control: 26, overlay: 20, card: 24, dialog: 28 } },
  { value: "soft", label: "Soft", radii: { control: 12, overlay: 12, card: 14, dialog: 16 } },
  { value: "square", label: "Square", radii: { control: 4, overlay: 6, card: 6, dialog: 8 } },
];

const snippet = `import { useState } from "react";
import { Toggle } from "tensile";
import "tensile/styles.css";

export function Settings() {
  const [digest, setDigest] = useState(true);
  return (
    <Toggle
      label="Weekly digest"
      checked={digest}
      onCheckedChange={setDigest}
    />
  );
}`;

const reasons = [
  {
    title: "One motion system",
    text: "Every component moves on the same few springs. One CSS variable sets the speed for all of them, and it's 0 when the system asks for reduced motion.",
  },
  {
    title: "Accessible behavior",
    text: "Each component follows its ARIA pattern: the roles, and the arrow keys, Home, End and Escape. When an overlay closes, focus goes back where it was.",
  },
  {
    title: "Forms that submit",
    text: "Text fields, checkboxes and radios are native inputs. Selects, pickers and sliders add hidden inputs, so a plain form sends every value. Field wires up the label, help text and error.",
  },
  { title: "One package", text: "Install tensile and import what you need. Only the components you import end up in your JavaScript bundle." },
];

const promises = [
  { title: "You own the state", text: "Pass value and onValueChange, and your app holds the value. Leave them out, and the component keeps it, starting from defaultValue." },
  { title: "Text is a prop", text: "Labels, empty states and screen reader text have English defaults you can replace." },
  { title: "Plain CSS", text: "Import tensile/styles.css. Your app doesn't need Tailwind. Override variables on :root or on any element." },
];

const catalog = docsPages
  .filter((page) => page.documentation)
  .reduce<Record<string, typeof docsPages>>((result, page) => {
    (result[page.group] ??= []).push(page);
    return result;
  }, {});

function docsFor(name: string) {
  const page = docsPages.find((page) => page.title === name);
  return page ? page.href : undefined;
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { spring } = useSprings();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={spring(0.6)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Calls `step` with a counting beat every `interval` ms while the element is on screen, until someone presses or focuses something in it. Spread the result on that element. */
function useAutoplay(interval: number, step: (beat: number) => void) {
  const { scale } = useSprings();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [touched, setTouched] = useState(false);
  const playing = inView && !touched && scale !== 0;

  useEffect(() => {
    if (!playing) return;
    let beat = 0;
    const timer = setInterval(() => step(beat++), interval);
    return () => clearInterval(timer);
  }, [playing]);

  return { ref, onPointerDown: () => setTouched(true), onFocus: () => setTouched(true) };
}

function Verb({ verb }: { verb: string }) {
  const { shape, swap } = useSprings();
  const [width, measure] = useWidth();

  return (
    <motion.span
      initial={false}
      animate={{ width }}
      transition={shape}
      className="inline-grid h-[1.12em] place-content-center place-items-center overflow-hidden rounded-full bg-accent text-on-accent"
    >
      <AnimatePresence initial={false}>
        <motion.span key={verb} ref={measure} {...swap} className="col-start-1 row-start-1 px-[0.28em] pb-[0.06em] whitespace-nowrap">
          {verb}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

function Brand() {
  const { scale } = useSprings();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (scale === 0) return;
    const timers = [setTimeout(() => setOpen(true), 700), setTimeout(() => setOpen(false), 1900)];
    return () => timers.forEach(clearTimeout);
  }, [scale]);

  return (
    <Link
      href={import.meta.env.BASE_URL}
      underline={false}
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      className="flex items-center rounded-sm text-xl tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <Logo open={open} />
      <span className="sr-only">Tensile</span>
    </Link>
  );
}

function ReleaseCard() {
  const [changelog, setChangelog] = useState(true);
  const [channel, setChannel] = useState("stable");
  const [reviewers, setReviewers] = useState(2);
  const [released, setReleased] = useState(false);
  const script = [
    () => setChannel("beta"),
    () => setChannel("canary"),
    () => setReviewers(3),
    () => setChangelog(false),
    () => setReleased(true),
    () => {},
    () => {
      setChannel("stable");
      setReviewers(2);
      setChangelog(true);
    },
    () => {},
  ];
  const demo = useAutoplay(1300, (beat) => script[beat % script.length]());

  useEffect(() => {
    if (!released) return;
    const timer = setTimeout(() => setReleased(false), 3000);
    return () => clearTimeout(timer);
  }, [released]);

  return (
    <Card {...demo} className="grid h-full content-between gap-6 p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-body font-semibold">Release 1.4</p>
          <p className="mt-0.5 text-label text-muted">14 changes · 3 contributors</p>
        </div>
        <StatusBadge status={released ? "success" : "neutral"} label={released ? "Released" : "Draft"} />
      </div>
      <div className="grid gap-4">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <span className="text-body">Channel</span>
          <ToggleGroup type="single" options={channels} value={channel} onValueChange={setChannel} label="Release channel" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-body">Reviewers</span>
          <NumberStepper value={reviewers} onValueChange={setReviewers} min={1} max={5} label="Reviewers" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-body">Publish the changelog</span>
          <Toggle label="Publish the changelog" checked={changelog} onCheckedChange={setChangelog} />
        </div>
      </div>
      <SwipeButton confirmed={released} onConfirm={() => setReleased(true)} label="Slide to release" confirmedLabel="Released" />
    </Card>
  );
}

function Hero({ theme }: { theme: "light" | "dark" }) {
  const { spring, scale } = useSprings();
  const [chapter, setChapter] = useState(0);

  function rise(step: number) {
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { ...spring(0.7), delay: 0.08 * step * scale },
    };
  }

  return (
    <section className="mx-auto max-w-page px-6 pt-10 pb-24 md:pt-14 md:pb-32">
      <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-end lg:gap-12">
        <motion.h1 {...rise(1)} className="text-5xl leading-[0.98] font-semibold tracking-tighter sm:text-7xl lg:text-8xl">
          <span className="sr-only">Components that morph, switch, slide, stretch and settle.</span>
          <span aria-hidden className="block">Components</span>
          <span aria-hidden className="flex items-center gap-[0.22em]">
            that <Verb verb={chapters[chapter].verb} />
          </span>
        </motion.h1>
        <div className="lg:pb-2">
          <motion.p {...rise(2)} className="max-w-md text-lg text-muted">
            React components where each control is one shape that moves with its state. They work with a keyboard and a screen reader, and send
            their values with your forms.
          </motion.p>
          <motion.div {...rise(3)} className="mt-6 flex flex-wrap items-center gap-3">
            <Button href={start}>Get started</Button>
            <Button href="#play" variant="secondary">
              Try the components
            </Button>
          </motion.div>
          <motion.div {...rise(4)} className="mt-4 flex max-w-md items-center gap-3 rounded-control bg-paper/60 p-1.5 pl-5 shadow-control">
            <code className="min-w-0 flex-1 overflow-x-auto text-label whitespace-nowrap">
              <span className="text-muted select-none">$ </span>
              {install}
            </code>
            <CopyButton value={install} label="Copy install command" className="shrink-0" />
          </motion.div>
          <motion.ul {...rise(5)} role="list" className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-label text-muted">
            <li>v{stats.version}</li>
            <li>{stats.license} license</li>
            <li>{stats.components} components</li>
            <li>
              {Math.round(stats.gzip.js / 1000)} kB JS + {Math.round(stats.gzip.css / 1000)} kB CSS gzipped, plus Motion
            </li>
            <li>React 19</li>
          </motion.ul>
        </div>
      </div>
      <motion.div {...rise(6)} className="mt-10 md:mt-12">
        <Reel chapter={chapter} onChapterChange={setChapter} theme={theme} />
      </motion.div>
    </section>
  );
}

function Tile({ names, title, tone = "paper", demo, children, className = "" }: {
  names: string[];
  title: string;
  tone?: "paper" | "ink";
  demo?: ReturnType<typeof useAutoplay>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <Card {...demo} tone={tone} className="flex h-full flex-col p-6 sm:p-7">
        <p className="flex flex-wrap gap-x-3 text-label text-muted">
          {names.map((name) => {
            const href = docsFor(name);
            return href ? <Link key={name} href={href}>{name}</Link> : <span key={name}>{name}</span>;
          })}
        </p>
        <h3 className="mt-3 text-xl font-semibold tracking-tight">{title}</h3>
        <div className="flex flex-1 flex-wrap items-center justify-center gap-4 py-6">{children}</div>
      </Card>
    </Reveal>
  );
}

function MorphDemo() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [deleted, setDeleted] = useState(false);
  const demo = useAutoplay(3600, () => setStatus("loading"));

  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => setStatus(status === "loading" ? "success" : "idle"), 1400);
    return () => clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    if (!deleted) return;
    const timer = setTimeout(() => setDeleted(false), 2000);
    return () => clearTimeout(timer);
  }, [deleted]);

  return (
    <Tile
      names={["MorphButton", "HoldButton"]}
      title="One shape per control"
      demo={demo}
      className="md:col-span-3"
    >
      <MorphButton status={status} loadingLabel="Saving" successLabel="Saved" onClick={() => setStatus("loading")}>
        Save changes
      </MorphButton>
      <HoldButton done={deleted} onDone={() => setDeleted(true)}>
        Hold to delete
      </HoldButton>
    </Tile>
  );
}

function DragDemo() {
  const [volume, setVolume] = useState(0.6);
  return (
    <Tile
      names={["VolumeSlider"]}
      title="Drags keep their speed"
      tone="ink"
      className="md:col-span-3"
    >
      <VolumeSlider value={volume} onValueChange={setVolume} tone="ink" className="max-w-sm" />
    </Tile>
  );
}

function LiquidDemo() {
  const [range, setRange] = useState("week");
  const [page, setPage] = useState(1);
  const demo = useAutoplay(1400, (beat) => {
    setRange(ranges[(beat + 2) % ranges.length].value);
    setPage((beat + 2) % 5);
  });

  return (
    <Tile
      names={["Tabs", "PageDots"]}
      title="Selections slide"
      demo={demo}
      className="md:col-span-2"
    >
      <div className="grid justify-items-center gap-6">
        <Tabs variant="segmented" items={ranges} value={range} onValueChange={setRange} label="Range" />
        <PageDots count={5} value={page} onValueChange={setPage} label="Pages" />
      </div>
    </Tile>
  );
}

const guestBeats = [4, 5, 6, 5, 4, 3];
const unreadBeats = [5, 8, 12, 9, 10, 4];

function NumbersDemo() {
  const [guests, setGuests] = useState(3);
  const [unread, setUnread] = useState(4);
  const demo = useAutoplay(1300, (beat) => {
    setGuests(guestBeats[beat % guestBeats.length]);
    setUnread(unreadBeats[beat % unreadBeats.length]);
  });

  return (
    <Tile names={["NumberStepper", "Badge"]} title="Numbers roll" demo={demo} className="md:col-span-2">
      <div className="grid justify-items-center gap-6">
        <NumberStepper value={guests} onValueChange={setGuests} min={0} max={12} label="Guests" />
        <div className="relative">
          <IconButton label={`Notifications, ${unread} unread`} variant="secondary" onClick={() => setUnread(unread === 12 ? 0 : unread + 1)} icon="bell" />
          <Badge count={unread} className="absolute -top-1 -right-1" />
        </div>
      </div>
    </Tile>
  );
}

function SwapDemo() {
  const [stage, setStage] = useState(0);
  const demo = useAutoplay(1800, (beat) => setStage((beat + 1) % stages.length));

  return (
    <Tile
      names={["StatusBadge"]}
      title="Labels blur across"
      demo={demo}
      className="md:col-span-2"
    >
      <div className="grid justify-items-center gap-6">
        <StatusBadge {...stages[stage]} />
        <Button variant="secondary" size="sm" onClick={() => setStage((stage + 1) % stages.length)}>
          Next stage
        </Button>
      </div>
    </Tile>
  );
}

function InviteDemo() {
  const [team, setTeam] = useState(people.slice(0, 3).map((person) => ({ name: person.label })));
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string | null>("editor");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => {
      if (status === "loading") {
        setStatus("success");
        return;
      }
      setTeam([...team, { name: email.split("@")[0] }]);
      setOpen(false);
      setStatus("idle");
      setEmail("");
    }, 1200);
    return () => clearTimeout(timer);
  }, [status, team, email]);

  return (
    <Tile
      names={["Dialog", "Field", "Select", "MorphButton"]}
      title="Dialogs grow out of their button"
      className="md:col-span-3"
    >
      <div className="grid justify-items-center gap-3">
        <AvatarGroup people={team} size="lg" label="Release 1.4 team" />
        <p className="text-label text-muted">
          <NumberTicker value={team.length} /> people on Release 1.4
        </p>
        <Dialog open={open} onOpenChange={setOpen} trigger="Invite teammates" title="Invite teammates">
          <p className="mt-1 text-sm text-muted">They get an email with a link to Release 1.4.</p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setStatus("loading");
            }}
            className="mt-5 grid gap-3"
          >
            <Field label="Email" required>
              <Input type="email" autoComplete="email" value={email} onValueChange={setEmail} />
            </Field>
            <Field label="Role">
              <Select options={roles} value={role} onValueChange={setRole} />
            </Field>
            <MorphButton type="submit" status={status} loadingLabel="Sending" successLabel="Invite sent" className="mt-2 justify-self-end">
              Send invite
            </MorphButton>
          </form>
        </Dialog>
      </div>
    </Tile>
  );
}

function MenuDemo() {
  const [zone, setZone] = useState<string | null>(zones[0].value);
  const [owner, setOwner] = useState<string | null>(null);
  const demo = useAutoplay(2200, (beat) => setZone(zones[(beat + 1) % zones.length].value));

  return (
    <Tile
      names={["Select", "Combobox"]}
      title="Menus open from their field"
      demo={demo}
      className="md:col-span-3"
    >
      <div className="grid w-full max-w-sm gap-3">
        <Field label="Time zone">
          <Select options={zones} value={zone} onValueChange={setZone} />
        </Field>
        <Field label="Owner">
          <Combobox options={people} value={owner} onValueChange={setOwner} placeholder="Search people" />
        </Field>
      </div>
    </Tile>
  );
}

function Playground() {
  return (
    <section id="play" className="mx-auto max-w-page scroll-mt-20 px-6 pb-24 md:pb-32">
      <Reveal>
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance md:text-5xl">Now try them</h2>
        <p className="mt-4 max-w-xl text-lg text-muted">Each tile plays by itself until you click or tab into it.</p>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-6">
        <Reveal className="md:col-span-3 md:row-span-2">
          <ReleaseCard />
        </Reveal>
        <MorphDemo />
        <DragDemo />
        <LiquidDemo />
        <NumbersDemo />
        <SwapDemo />
        <InviteDemo />
        <MenuDemo />
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="mx-auto max-w-page px-6 pb-24 md:pb-32">
      <Reveal>
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance md:text-5xl">Why not shadcn/ui and Motion?</h2>
        <p className="mt-4 max-w-xl text-lg text-muted">
          You can build these with the two of them, but you write each animation yourself and keep them consistent. Tensile comes with that work
          done.
        </p>
        <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div key={reason.title} className="grid content-start gap-2 border-t border-ink/10 pt-5">
              <dt className="text-body font-semibold">{reason.title}</dt>
              <dd className="text-body text-muted">{reason.text}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

function Theming() {
  const [accent, setAccent] = useState("lime");
  const [corner, setCorner] = useState("round");
  const [digest, setDigest] = useState(true);
  const [mentions, setMentions] = useState(true);
  const [saved, setSaved] = useState(false);
  const demo = useAutoplay(2000, (beat) => {
    setAccent(accents[(beat + 1) % accents.length].value);
    setCorner(corners[Math.floor((beat + 1) / 2) % corners.length].value);
  });

  const chosen = accents.find((option) => option.value === accent)!;
  const { radii } = corners.find((option) => option.value === corner)!;
  const tokens: Record<string, string> = {
    "--tn-color-accent": chosen.color,
    "--tn-color-on-accent": chosen.on,
    "--tn-radius-control": `${radii.control}px`,
    "--tn-radius-overlay": `${radii.overlay}px`,
    "--tn-radius-card": `${radii.card}px`,
    "--tn-radius-dialog": `${radii.dialog}px`,
  };
  const css = `:root {\n${Object.entries(tokens).map(([name, value]) => `  ${name}: ${value};`).join("\n")}\n}`;

  return (
    <section className="bg-paper">
      <div {...demo} className="mx-auto grid max-w-page gap-12 px-6 py-24 md:py-32 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <h2 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">Restyle it with six CSS variables</h2>
          <p className="mt-4 max-w-md text-lg text-muted">
            Pick an accent and a corner style. The card uses the same components as the rest of the page, with different variables. Copy the
            CSS when you find a look you like.
          </p>
          <div className="mt-10 grid gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-body font-medium">Accent</span>
              <ColorSwatches options={accents} value={accent} onValueChange={setAccent} label="Accent" />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-body font-medium">Corners</span>
              <ToggleGroup type="single" options={corners} value={corner} onValueChange={setCorner} label="Corners" />
            </div>
          </div>
          <CodeBlock code={css} language="css" title="app.css" label="app.css code" copyLabel="Copy CSS" className="mt-10" />
        </Reveal>
        <Reveal className="lg:pt-6">
          <div style={tokens as React.CSSProperties} className="rounded-dialog bg-canvas p-5 sm:p-8">
            <Card className="grid gap-6 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-body font-semibold">Notifications</p>
                  <p className="mt-0.5 text-label text-muted">Choose what reaches your inbox.</p>
                </div>
                <StatusBadge status={saved ? "success" : "neutral"} label={saved ? "Saved" : "Unsaved"} />
              </div>
              <div className="grid gap-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-body">Weekly digest</span>
                  <Toggle
                    label="Weekly digest"
                    checked={digest}
                    onCheckedChange={(checked) => {
                      setDigest(checked);
                      setSaved(false);
                    }}
                  />
                </div>
                <Checkbox
                  label="Only when I'm mentioned"
                  checked={mentions}
                  onCheckedChange={(checked) => {
                    setMentions(checked);
                    setSaved(false);
                  }}
                />
              </div>
              <Button onClick={() => setSaved(true)} className="justify-self-start">
                Save preferences
              </Button>
            </Card>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Code() {
  const [digest, setDigest] = useState(true);

  return (
    <section className="mx-auto grid max-w-page gap-12 px-6 py-24 md:py-32 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <Reveal className="min-w-0">
        <CodeBlock code={snippet} title="Settings.tsx" label="Settings.tsx code" />
        <Card className="mt-3 flex items-center justify-between gap-4 px-5 py-4">
          <span className="text-label text-muted">Live example · Weekly digest</span>
          <Toggle label="Weekly digest" checked={digest} onCheckedChange={setDigest} />
        </Card>
      </Reveal>
      <Reveal>
        <h2 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">Your app keeps the state</h2>
        <dl className="mt-10 grid gap-6">
          {promises.map((promise) => (
            <div key={promise.title} className="grid gap-1 border-t border-ink/10 pt-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <dt className="text-body font-semibold">{promise.title}</dt>
              <dd className="text-body text-muted">{promise.text}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

function Preview({ Demo }: { Demo: React.ComponentType }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px" });

  return (
    <div ref={ref} inert aria-hidden className="relative aspect-[4/3] overflow-clip">
      {inView && (
        <div className="absolute top-0 left-0 flex size-[200%] origin-top-left scale-50 items-center justify-center p-6 sm:size-[160%] sm:scale-[0.625]">
          <Demo />
        </div>
      )}
    </div>
  );
}

function Catalog() {
  const { shape, swap } = useSprings();
  const [query, setQuery] = useState("");
  const groups = Object.entries(catalog)
    .map(([group, pages]) => ({ group, pages: pages.filter((page) => page.title.toLowerCase().includes(query.trim().toLowerCase())) }))
    .filter((group) => group.pages.length > 0);
  const count = groups.reduce((total, group) => total + group.pages.length, 0);

  return (
    <section id="components" className="mx-auto max-w-page scroll-mt-20 px-6 pb-24 md:pb-32">
      <Reveal className="grid gap-8 md:grid-cols-[1fr_20rem] md:items-end">
        <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
          <NumberTicker value={count} /> {count === 1 ? "component" : "components"}
        </h2>
        <Input
          value={query}
          onValueChange={setQuery}
          aria-label="Filter components"
          placeholder="Filter: slider, picker, menu…"
          leading={<Icon name="search" size={16} />}
        />
      </Reveal>
      <div className="mt-12">
        <AnimatePresence mode="popLayout" initial={false}>
          {groups.map((group) => (
            <motion.div
              key={group.group}
              layout="position"
              transition={shape}
              {...swap}
              className="grid gap-4 border-t border-ink/10 py-6 md:grid-cols-[10rem_1fr] md:gap-8"
            >
              <h3 className="text-body font-semibold">{group.group}</h3>
              <ul role="list" className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                <AnimatePresence mode="popLayout" initial={false}>
                  {group.pages.map((page) => (
                    <motion.li key={page.id} layout="position" transition={shape} {...swap}>
                      <Card className="relative grid overflow-clip">
                        <Preview Demo={page.documentation!.examples[0].Demo} />
                        <Link href={page.href} underline={false} className="mx-4 mb-3 truncate text-body font-medium after:absolute after:inset-0">
                          {page.title}
                        </Link>
                      </Card>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {count === 0 && (
        <p className="mt-2 text-body text-muted">
          No component matches "{query}". <Link href={`${github}/issues`}>Open an issue</Link> if you need one.
        </p>
      )}
    </section>
  );
}

function Closing({ onNavigate }: { onNavigate: (href: string) => void }) {
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!confirmed) return;
    const timer = setTimeout(() => onNavigate(start), 700);
    return () => clearTimeout(timer);
  }, [confirmed, onNavigate]);

  return (
    <section className="mx-auto max-w-page px-6 pb-24 md:pb-32">
      <Reveal>
        <Card tone="ink" className="grid gap-10 p-8 sm:p-12 md:grid-cols-[1.4fr_1fr] md:items-end md:p-16">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight text-balance md:text-6xl">
              Give your interface a little <span className="text-accent">tension</span>
            </h2>
            <p className="mt-5 max-w-md text-lg text-muted">Try one component in an app you already have. The guide goes from npm install to a working Toggle.</p>
          </div>
          <div className="grid gap-4">
            <SwipeButton confirmed={confirmed} onConfirm={() => setConfirmed(true)} label="Slide to get started" confirmedLabel="Opening the guide" />
            <p className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-label text-muted">
              <Link href={start}>Read the guide</Link>
              <Link href={github}>GitHub</Link>
            </p>
          </div>
        </Card>
      </Reveal>
    </section>
  );
}

export function App({ url: initialUrl }: { url: string }) {
  const base = import.meta.env.BASE_URL;
  const [url, setUrl] = useState(initialUrl);
  const page = docsPages.find((page) => page.href === new URL(url).pathname);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  function changeTheme(value: "light" | "dark") {
    document.documentElement.classList.toggle("dark", value === "dark");
    localStorage.setItem("tensile-theme", value);
    setTheme(value);
  }

  const toggle = <ThemeToggle value={theme} onValueChange={changeTheme} />;

  useEffect(() => {
    const onPopState = () => setUrl(window.location.href);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    document.title = titleOf(page);
    const section = document.getElementById(new URL(url).hash.slice(1));
    if (section) section.scrollIntoView();
    else window.scrollTo(0, 0);
    document.getElementById("main")!.focus({ preventScroll: true });
  }, [url, page]);

  function navigate(href: string) {
    const target = new URL(href, window.location.href);
    if (target.pathname !== base && !docsPages.some((page) => page.href === target.pathname)) {
      window.location.assign(target.href);
      return;
    }
    window.history.pushState(null, "", target.href);
    setUrl(target.href);
  }

  return (
    <LinkProvider navigate={navigate}>
      {page ? <Docs page={page} brand={<Brand />} toggle={toggle} onNavigate={navigate} /> : (
        <>
          <a href="#main" className="sr-only fixed top-3 left-3 z-(--tn-layer-overlay) rounded-control bg-ink px-5 py-3 text-paper focus:not-sr-only">
            Skip to content
          </a>
          <Header
            brand={<Brand />}
            links={links}
            value="./"
            actions={
              <div className="flex items-center gap-4">
                {toggle}
                <Link href={github} className="text-label">
                  GitHub
                </Link>
                <Button href={docsPages[0].href}>Get started</Button>
              </div>
            }
          />
          <main id="main" tabIndex={-1} className="outline-none">
            <Hero theme={theme} />
            <Playground />
            <Why />
            <Theming />
            <Code />
            <Catalog />
            <Closing onNavigate={navigate} />
          </main>
          <Footer
            groups={[
              { title: "Build", links: [links[0], { label: "Components", href: `${base}#components` }] },
              {
                title: "Learn",
                links: [
                  { label: "Styling and themes", href: `${base}docs/styling/` },
                  { label: "Motion", href: `${base}docs/motion/` },
                  { label: "Patterns and recipes", href: `${base}docs/patterns/` },
                ],
              },
              {
                title: "Explore",
                links: [{ label: "GitHub", href: github }, { label: "MIT license", href: `${base}LICENSE` }, { label: "Font license", href: `${base}THIRD_PARTY_NOTICES` }],
              },
            ]}
            note="Tensile is MIT licensed. Made by Sébastien Graf."
            className="m-3"
          />
        </>
      )}
    </LinkProvider>
  );
}
