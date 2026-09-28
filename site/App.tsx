import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  AvatarGroup,
  Badge,
  Button,
  Card,
  Checkbox,
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
  SegmentedTabs,
  Select,
  StatusBadge,
  SwipeButton,
  Toggle,
  VolumeSlider,
  type StatusBadgeProps,
} from "tensile";
import { icons } from "../src/icons";
import { useSprings } from "../src/springs";
import { useWidth } from "../src/useWidth";
import { Logo } from "./Logo";
import { chapters, Reel } from "./Reel";
import { Docs, docsPages } from "./Docs";

const start = "?docs=get-started";
const github = "https://github.com/seb-graf/tensile";
const install = "npm install tensile";
const links = [
  { label: "Documentation", href: start },
  { label: "Components", href: "#components" },
];

const pill =
  "inline-flex items-center justify-center whitespace-nowrap rounded-control font-medium shadow-control outline-offset-2 press focus-visible:outline-2 focus-visible:outline-focus";

const channels = [
  { value: "stable", label: "Stable" },
  { value: "beta", label: "Beta" },
  { value: "canary", label: "Canary" },
];

const ranges = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
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

const promises = [
  { title: "You own the state", text: "Each component takes a value and a callback, such as value and onValueChange. It keeps no copy of its own." },
  { title: "Text is a prop", text: "Labels, empty states and screen reader text have English defaults you can replace." },
  { title: "Keyboard support", text: "Arrow keys, Home, End and Escape work as the ARIA pattern describes, and focus goes back where it came from when an overlay closes." },
  { title: "Plain CSS", text: "Import tensile/styles.css. Your app doesn't need Tailwind. Override variables on :root or on any element." },
  { title: "Reduced motion", text: "--motion-duration-scale multiplies every animation's duration. When the system asks for reduced motion it's 0, and nothing animates." },
];

const catalog = [
  { group: "Actions", names: ["ActionMenu", "Button", "CommandPalette", "CopyButton", "HoldButton", "IconButton", "MorphButton", "SelectionBar", "SwipeButton", "Toolbar"] },
  {
    group: "Inputs",
    names: [
      "Checkbox", "CheckboxGroup", "ColorPicker", "ColorSwatches", "Combobox", "DatePicker", "DateRangePicker", "EditableText", "Field", "Fieldset", "FileUpload",
      "Input", "MultiSelect", "NumberInput", "NumberStepper", "OTPInput", "PasswordInput", "RadioGroup", "RangeSlider", "Rating", "SearchField", "Select", "Slider",
      "TagInput", "TextField", "Textarea", "ThemeToggle", "TimePicker", "TimeWheel", "Toggle", "ToggleGroup",
    ],
  },
  { group: "Navigation", names: ["Breadcrumbs", "CollapsibleSidebar", "Link", "PageDots", "Pagination", "SegmentedTabs", "SidebarNav", "TabBar", "Tabs", "UnderlineTabs", "WizardSteps"] },
  { group: "Feedback", names: ["Alert", "Badge", "EmptyState", "LoadingState", "NotificationList", "ProgressBar", "ProgressRing", "Skeleton", "Spinner", "StatusBadge", "Toast", "ToastStack"] },
  {
    group: "Data display",
    names: ["Avatar", "AvatarGroup", "BarChart", "DataTable", "DescriptionList", "DonutChart", "Icon", "Kbd", "LineChart", "List", "NumberTicker", "StatTile", "Table", "Tag", "Timeline", "TreeView"],
  },
  { group: "Layout", names: ["Accordion", "AppShell", "Card", "ExpandableCard", "Footer", "Header", "PageHeader", "Separator", "SplitPane"] },
  { group: "Overlays", names: ["AlertDialog", "BottomSheet", "ContextMenu", "Dialog", "Drawer", "Island", "Popover", "Tooltip"] },
  { group: "Media", names: ["Carousel", "CompareSlider", "Image", "Lightbox", "MusicPlayer", "VideoControls", "VolumeSlider", "WaveformScrubber"] },
];

function docsFor(name: string) {
  const page = docsPages.find((page) => page.title === name);
  return page ? `?docs=${page.id}` : undefined;
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
      href="./"
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      className="flex items-center rounded-sm text-xl tracking-tight no-underline! focus-visible:outline-2 focus-visible:outline-offset-2"
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
          <SegmentedTabs options={channels} value={channel} onValueChange={setChannel} label="Release channel" />
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

function Hero() {
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
            React components where each control is one shape. It changes size, color and content with its state, and follows your pointer when
            you drag it.
          </motion.p>
          <motion.div {...rise(3)} className="mt-6 flex flex-wrap items-center gap-3">
            <Link href={start} className={`${pill} h-11 rounded-control! bg-ink px-5 text-body text-paper no-underline! hover:bg-ink-3`}>
              Get started
            </Link>
            <a href="#play" className={`${pill} h-11 bg-paper px-5 text-body text-ink hover:bg-hover`}>
              Try the components
            </a>
          </motion.div>
          <motion.div {...rise(4)} className="mt-4 flex max-w-md items-center gap-3 rounded-control bg-paper/60 p-1.5 pl-5 shadow-control">
            <code className="min-w-0 flex-1 overflow-x-auto text-label whitespace-nowrap">
              <span className="text-muted select-none">$ </span>
              {install}
            </code>
            <CopyButton value={install} label="Copy install command" className="shrink-0" />
          </motion.div>
        </div>
      </div>
      <motion.div {...rise(5)} className="mt-10 md:mt-12">
        <Reel chapter={chapter} onChapterChange={setChapter} />
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
  const muted = tone === "ink" ? "text-paper/55" : "text-muted";
  return (
    <Reveal className={className}>
      <Card {...demo} tone={tone} className="flex h-full flex-col p-6 sm:p-7">
        <p className={`flex flex-wrap gap-x-3 text-label ${muted}`}>
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
      names={["SegmentedTabs", "PageDots"]}
      title="Selections slide"
      demo={demo}
      className="md:col-span-2"
    >
      <div className="grid justify-items-center gap-6">
        <SegmentedTabs options={ranges} value={range} onValueChange={setRange} label="Range" />
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
          <IconButton label={`Notifications, ${unread} unread`} variant="secondary" onClick={() => setUnread(unread === 12 ? 0 : unread + 1)}>
            <Icon size={20}>
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </Icon>
          </IconButton>
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
    "--color-accent": chosen.color,
    "--color-on-accent": chosen.on,
    "--radius-control": `${radii.control}px`,
    "--radius-overlay": `${radii.overlay}px`,
    "--radius-card": `${radii.card}px`,
    "--radius-dialog": `${radii.dialog}px`,
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
              <SegmentedTabs options={corners} value={corner} onValueChange={setCorner} label="Corners" />
            </div>
          </div>
          <Card tone="ink" className="mt-10 p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-label text-paper/55">app.css</span>
              <CopyButton value={css} label="Copy CSS" />
            </div>
            <pre className="mt-3 overflow-x-auto font-mono text-label">{css}</pre>
          </Card>
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
        <Card tone="ink" className="overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-5 pt-5">
            <span className="text-label text-paper/55">Settings.tsx</span>
            <CopyButton value={snippet} label="Copy code" />
          </div>
          <pre className="overflow-x-auto px-5 pt-4 pb-6 font-mono text-label">{snippet}</pre>
          <div className="flex items-center justify-between gap-4 border-t border-line bg-ink-3/50 px-5 py-4">
            <span className="text-label text-paper/55">Renders</span>
            <Toggle label="Weekly digest" checked={digest} onCheckedChange={setDigest} />
          </div>
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

function Catalog() {
  const { shape, swap } = useSprings();
  const [query, setQuery] = useState("");
  const groups = catalog
    .map((group) => ({ ...group, names: group.names.filter((name) => name.toLowerCase().includes(query.trim().toLowerCase())) }))
    .filter((group) => group.names.length > 0);
  const count = groups.reduce((total, group) => total + group.names.length, 0);

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
          leading={<Icon size={16}>{icons.search}</Icon>}
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
              className="grid gap-3 border-t border-ink/10 py-5 md:grid-cols-[10rem_1fr] md:gap-8"
            >
              <h3 className="text-body font-semibold">{group.group}</h3>
              <ul role="list" className="flex flex-wrap gap-x-5 gap-y-2">
                <AnimatePresence mode="popLayout" initial={false}>
                  {group.names.map((name) => {
                    const href = docsFor(name);
                    return (
                      <motion.li key={name} layout="position" transition={shape} {...swap}>
                        {href ? <Link href={href} className="text-body">{name}</Link> : <span className="text-body text-muted">{name}</span>}
                      </motion.li>
                    );
                  })}
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
            <p className="mt-5 max-w-md text-lg text-paper/55">Try one component in an app you already have. The guide goes from npm install to a working Toggle.</p>
          </div>
          <div className="grid gap-4">
            <SwipeButton confirmed={confirmed} onConfirm={() => setConfirmed(true)} label="Slide to get started" confirmedLabel="Opening the guide" />
            <p className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-label text-paper/55">
              <Link href={start}>Read the guide</Link>
              <Link href={github}>GitHub</Link>
            </p>
          </div>
        </Card>
      </Reveal>
    </section>
  );
}

export function App() {
  const [url, setUrl] = useState(() => window.location.href);
  const doc = new URL(url).searchParams.get("docs");
  const page = docsPages.find((page) => page.id === doc);

  useEffect(() => {
    const onPopState = () => setUrl(window.location.href);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    document.title = page ? `${page.title} · Tensile` : "Tensile · React components in motion";
    const section = document.getElementById(new URL(url).hash.slice(1));
    if (section) section.scrollIntoView();
    else window.scrollTo(0, 0);
    document.getElementById("main")!.focus({ preventScroll: true });
  }, [url, page]);

  function navigate(href: string) {
    const target = new URL(href, window.location.href);
    if (target.pathname !== window.location.pathname) {
      window.location.assign(target.href);
      return;
    }
    window.history.pushState(null, "", target.href);
    setUrl(target.href);
  }

  return (
    <LinkProvider navigate={navigate}>
      {page ? <Docs page={page} brand={<Brand />} onNavigate={navigate} /> : (
        <>
          <a href="#main" className="sr-only fixed top-3 left-3 z-(--layer-overlay) rounded-control bg-ink px-5 py-3 text-paper focus:not-sr-only">
            Skip to content
          </a>
          <Header
            brand={<Brand />}
            links={links}
            value="./"
            actions={
              <div className="flex items-center gap-4">
                <Link href={github} className="text-label">
                  GitHub
                </Link>
                <Link href={start} className={`${pill} h-8 rounded-control! bg-ink px-4 text-label text-paper no-underline! hover:bg-ink-3`}>
                  Get started
                </Link>
              </div>
            }
          />
          <main id="main" tabIndex={-1} className="outline-none">
            <Hero />
            <Playground />
            <Theming />
            <Code />
            <Catalog />
            <Closing onNavigate={navigate} />
          </main>
          <Footer
            groups={[
              { title: "Build", links: [links[0], { label: "Components", href: "?docs=button" }] },
              {
                title: "Learn",
                links: [
                  { label: "Styling and themes", href: `${github}#tokens` },
                  { label: "Motion", href: `${github}#motion` },
                  { label: "Composition", href: `${github}#patterns-and-recipes` },
                ],
              },
              {
                title: "Explore",
                links: [{ label: "GitHub", href: github }, { label: "MIT license", href: "./LICENSE" }, { label: "Font license", href: "./THIRD_PARTY_NOTICES" }],
              },
            ]}
            note="Tensile is MIT licensed. Made by Sébastien Graf."
          />
        </>
      )}
    </LinkProvider>
  );
}
