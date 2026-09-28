import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  ColorSwatches,
  CopyButton,
  Footer,
  Header,
  HoldButton,
  Icon,
  IconButton,
  Input,
  Link,
  MorphButton,
  NumberStepper,
  NumberTicker,
  PageDots,
  SegmentedTabs,
  StatusBadge,
  SwipeButton,
  Toggle,
  VolumeSlider,
  type StatusBadgeProps,
} from "tensile";
import { icons } from "../src/icons";
import { useSprings } from "../src/springs";
import { useWidth } from "../src/useWidth";

const docs = "./storybook/?path=/docs/";
const start = `${docs}guides-get-started--docs`;
const github = "https://github.com/seb-graf/tensile";
const install = "npm install ./tensile-0.1.0.tgz";
const links = [
  { label: "Get started", href: start },
  { label: "Components", href: "#components" },
  { label: "Storybook", href: "./storybook/?path=/story/components-morphbutton--default" },
];

const pill =
  "inline-flex items-center justify-center whitespace-nowrap rounded-control font-medium shadow-control outline-offset-2 press focus-visible:outline-2 focus-visible:outline-focus";

const verbs = ["stretch.", "morph.", "settle.", "follow you.", "spring back."];

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
  { title: "Controlled, always", text: "Every value comes in as a prop and goes out through a callback. Your state is the only state." },
  { title: "Every word is a prop", text: "Labels, empty states and screen reader text have English defaults you can replace." },
  { title: "Keyboard first", text: "Arrows, Home, End, Escape and focus return work the way each pattern expects." },
  { title: "No Tailwind in your app", text: "Import one stylesheet. Override tokens in plain CSS, on the page or any subtree." },
  { title: "Reduced motion, handled", text: "One token scales every animation, and drops to zero when someone asks for less motion." },
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
  return `${docs}components-${name.toLowerCase()}--docs`;
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { spring } = useSprings();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={spring(0.6)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Verb() {
  const { shape, swap, scale } = useSprings();
  const [index, setIndex] = useState(0);
  const [width, measure] = useWidth();

  useEffect(() => {
    if (scale === 0) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % verbs.length), 2400);
    return () => clearInterval(timer);
  }, [scale]);

  return (
    <motion.span
      initial={false}
      animate={{ width }}
      transition={shape}
      className="inline-grid h-[1.12em] place-content-center place-items-center overflow-hidden rounded-full bg-accent text-on-accent"
    >
      <AnimatePresence initial={false}>
        <motion.span key={verbs[index]} ref={measure} {...swap} className="col-start-1 row-start-1 px-[0.28em] pb-[0.06em] whitespace-nowrap">
          {verbs[index]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

function ReleaseCard() {
  const [changelog, setChangelog] = useState(true);
  const [channel, setChannel] = useState("stable");
  const [reviewers, setReviewers] = useState(2);
  const [released, setReleased] = useState(false);

  useEffect(() => {
    if (!released) return;
    const timer = setTimeout(() => setReleased(false), 3000);
    return () => clearTimeout(timer);
  }, [released]);

  return (
    <Card className="grid gap-6 p-6 sm:p-7">
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

  function rise(step: number) {
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { ...spring(0.7), delay: 0.08 * step * scale },
    };
  }

  return (
    <section className="mx-auto grid max-w-page gap-14 px-6 pt-14 pb-20 md:pt-24 md:pb-28 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-16">
      <div className="min-w-0">
        <motion.p {...rise(0)} className="flex items-center gap-2 text-label font-medium text-muted">
          <span className="size-2 rounded-full bg-accent shadow-control" />
          {catalog.reduce((total, group) => total + group.names.length, 0)} React components · one motion system
        </motion.p>
        <motion.h1 {...rise(1)} className="mt-5 text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
          <span className="sr-only">Components that stretch, morph, settle, follow you and spring back.</span>
          <span aria-hidden className="block">Components</span>
          <span aria-hidden className="flex items-center gap-[0.22em]">
            that <Verb />
          </span>
        </motion.h1>
        <motion.p {...rise(2)} className="mt-7 max-w-xl text-lg text-muted">
          Tensile is a React library where every control is one shape that morphs between its states. Content blur-swaps, pills slide like
          liquid, and drags keep their speed when you let go. Go on, pull something.
        </motion.p>
        <motion.div {...rise(3)} className="mt-9 flex flex-wrap items-center gap-3">
          <a href={start} className={`${pill} h-11 bg-ink px-5 text-body text-paper hover:bg-ink-3`}>
            Get started
          </a>
          <a href="#feel" className={`${pill} h-11 bg-paper px-5 text-body text-ink hover:bg-hover`}>
            Try the components
          </a>
        </motion.div>
        <motion.div {...rise(4)} className="mt-8 flex max-w-md items-center gap-3 rounded-control bg-paper/60 p-1.5 pl-5 shadow-control">
          <code className="min-w-0 flex-1 overflow-x-auto text-label whitespace-nowrap">
            <span className="text-muted select-none">$ </span>
            {install}
          </code>
          <CopyButton value={install} label="Copy install command" className="shrink-0" />
        </motion.div>
        <motion.p {...rise(4)} className="mt-2.5 pl-5 text-caption text-muted">
          A local preview until the npm release. <Link href={start}>Build the tarball</Link> in a minute.
        </motion.p>
      </div>
      <motion.div {...rise(3)} className="min-w-0">
        <ReleaseCard />
        <p className="mt-4 text-center text-label text-muted">Every control on this card is a Tensile component. Slide it.</p>
      </motion.div>
    </section>
  );
}

function Tile({ names, title, text, tone = "paper", children, className = "" }: {
  names: string[];
  title: string;
  text: string;
  tone?: "paper" | "ink";
  children: React.ReactNode;
  className?: string;
}) {
  const muted = tone === "ink" ? "text-paper/55" : "text-muted";
  return (
    <Reveal className={className}>
      <Card tone={tone} className="flex h-full flex-col p-6 sm:p-7">
        <p className={`flex flex-wrap gap-x-3 text-label ${muted}`}>
          {names.map((name) => (
            <Link key={name} href={docsFor(name)}>
              {name}
            </Link>
          ))}
        </p>
        <h3 className="mt-3 text-xl font-semibold tracking-tight">{title}</h3>
        <p className={`mt-1.5 max-w-sm text-body ${muted}`}>{text}</p>
        <div className="flex min-h-40 flex-1 flex-wrap items-center justify-center gap-4 pt-8">{children}</div>
      </Card>
    </Reveal>
  );
}

function Specimens() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [deleted, setDeleted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [range, setRange] = useState("week");
  const [page, setPage] = useState(1);
  const [guests, setGuests] = useState(3);
  const [unread, setUnread] = useState(4);
  const [stage, setStage] = useState(0);

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
    <section id="feel" className="mx-auto max-w-page scroll-mt-20 px-6 pb-24">
      <Reveal>
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance md:text-5xl">Five rules. Feel each one.</h2>
        <p className="mt-4 max-w-xl text-lg text-muted">Nothing here is a video. Each tile runs the component you would import.</p>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-6">
        <Tile
          names={["MorphButton", "HoldButton"]}
          title="One shape, every state"
          text="A button doesn't swap for a spinner. It turns into one, then into a check, then back into itself."
          className="md:col-span-3"
        >
          <MorphButton status={status} loadingLabel="Saving" successLabel="Saved" onClick={() => setStatus("loading")}>
            Save changes
          </MorphButton>
          <HoldButton done={deleted} onDone={() => setDeleted(true)}>
            Hold to delete
          </HoldButton>
        </Tile>
        <Tile
          names={["VolumeSlider"]}
          title="Drags keep their speed"
          text="Fling it past the end. It stretches like rubber, then springs back at the speed you let go."
          tone="ink"
          className="md:col-span-3"
        >
          <VolumeSlider value={volume} onValueChange={setVolume} tone="ink" className="max-w-sm" />
        </Tile>
        <Tile
          names={["SegmentedTabs", "PageDots"]}
          title="Pills slide like liquid"
          text="The edge in front leads, the one behind catches up."
          className="md:col-span-2"
        >
          <div className="grid justify-items-center gap-6">
            <SegmentedTabs options={ranges} value={range} onValueChange={setRange} label="Range" />
            <PageDots count={5} value={page} onValueChange={setPage} label="Pages" />
          </div>
        </Tile>
        <Tile
          names={["NumberStepper", "Badge"]}
          title="Numbers roll"
          text="Digits turn in the direction the value moved."
          className="md:col-span-2"
        >
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
        <Tile
          names={["StatusBadge"]}
          title="Content blurs across"
          text="The old label is gone before the new one arrives, and the pill resizes to fit."
          className="md:col-span-2"
        >
          <div className="grid justify-items-center gap-6">
            <StatusBadge {...stages[stage]} />
            <Button variant="secondary" size="sm" onClick={() => setStage((stage + 1) % stages.length)}>
              Next stage
            </Button>
          </div>
        </Tile>
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
      <div className="mx-auto grid max-w-page gap-12 px-6 py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <h2 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">Make it yours in six lines of CSS.</h2>
          <p className="mt-4 max-w-md text-lg text-muted">
            Colors, radii, shadows, focus and motion speed are tokens. Change them here and watch the card follow.
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
    <section className="mx-auto grid max-w-page gap-12 px-6 py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
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
        <h2 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">It moves. You stay in charge.</h2>
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
    <section id="components" className="mx-auto max-w-page scroll-mt-20 px-6 py-24">
      <Reveal className="grid gap-8 md:grid-cols-[1fr_20rem] md:items-end">
        <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
          <NumberTicker value={count} /> {count === 1 ? "component" : "components"}, <span className="text-muted">one motion system.</span>
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
                  {group.names.map((name) => (
                    <motion.li key={name} layout="position" transition={shape} {...swap}>
                      <Link href={docsFor(name)} className="text-body">
                        {name}
                      </Link>
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
          Nothing called “{query}” yet. <Link href={`${github}/issues`}>Ask for it on GitHub</Link>.
        </p>
      )}
    </section>
  );
}

function Closing() {
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!confirmed) return;
    const timer = setTimeout(() => location.assign(start), 700);
    return () => clearTimeout(timer);
  }, [confirmed]);

  return (
    <section className="mx-auto max-w-page px-6 pb-24">
      <Reveal>
        <Card tone="ink" className="grid gap-10 p-8 sm:p-12 md:grid-cols-[1.4fr_1fr] md:items-end md:p-16">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight text-balance md:text-6xl">
              Give your interface a little <span className="text-accent">tension.</span>
            </h2>
            <p className="mt-5 max-w-md text-lg text-paper/55">Install the package, import one stylesheet, and ship controls that answer back.</p>
          </div>
          <div className="grid gap-4">
            <SwipeButton confirmed={confirmed} onConfirm={() => setConfirmed(true)} label="Slide to get started" confirmedLabel="Opening the guide" />
            <p className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-label text-paper/55">
              <Link href={start}>Read the guide</Link>
              <Link href={github}>Star on GitHub</Link>
            </p>
          </div>
        </Card>
      </Reveal>
    </section>
  );
}

export function App() {
  return (
    <>
      <a href="#main" className="sr-only fixed top-3 left-3 z-(--layer-overlay) rounded-control bg-ink px-5 py-3 text-paper focus:not-sr-only">
        Skip to content
      </a>
      <Header
        brand={
          <a href="./" className="flex items-center gap-2 rounded-sm text-xl font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2">
            <span className="size-3 rounded-full bg-accent shadow-control" />
            Tensile
          </a>
        }
        links={links}
        value="./"
        actions={
          <div className="flex items-center gap-4">
            <Link href={github} className="text-label">
              GitHub
            </Link>
            <a href={start} className={`${pill} h-8 bg-ink px-4 text-label text-paper hover:bg-ink-3`}>
              Get started
            </a>
          </div>
        }
      />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Specimens />
        <Theming />
        <Code />
        <Catalog />
        <Closing />
      </main>
      <Footer
        groups={[
          { title: "Build", links: [links[0], { label: "Components", href: `${docs}components-button--docs` }] },
          {
            title: "Learn",
            links: [
              { label: "Styling and themes", href: `${docs}guides-styling--docs` },
              { label: "Motion", href: `${docs}guides-motion--docs` },
              { label: "Composition", href: `${docs}guides-composition--docs` },
            ],
          },
          {
            title: "Explore",
            links: [links[2], { label: "GitHub", href: github }, { label: "MIT license", href: "./LICENSE" }, { label: "Font license", href: "./THIRD_PARTY_NOTICES" }],
          },
        ]}
        note="Tensile. React components with shared styling and motion."
      />
    </>
  );
}
