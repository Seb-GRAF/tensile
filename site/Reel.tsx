import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Icon, IconButton } from "tensile";
import { playPausePath } from "../src/playback";
import { useSprings } from "../src/springs";
import { useSize } from "../src/useSize";

type Spring = { response: number; damping: number };
type Key = [at: number, target: number[], spring?: Spring];
type Edges = [at: number, left: number, right: number, spring?: Spring];
type Touch = [land: number, press: number, release: number, x: number, y: number];
type Tone = "ink" | "paper" | "accent";
type Palette = Record<Tone, number[]>;
type Elements = Record<string, HTMLElement>;

function spring(visualDuration: number, bounce = 0): Spring {
  return { response: 1.2 * visualDuration, damping: 1 - bounce };
}

const LOOP = 14.6;
const STILL = 7.9;
const ZOOM = 1.75;
const BLUR = 4;
const RUBBER = 24;
const OVER = 30;

const SHAPE = spring(0.38, 0.15);
const SOFT = spring(0.3);
const EXIT = spring(0.12);
const LEAD = spring(0.2, 0.15);
const TRAIL = spring(0.42, 0.1);
const SNAP = { response: (2 * Math.PI) / Math.sqrt(224), damping: 22.4 / (2 * Math.sqrt(224)) };
const PRESS = spring(0.15);
const LIFT = spring(0.2);
const UNDRAW = spring(0.22);
const CAMERA = spring(1.1);
const CUT = spring(0.001);

export const chapters = [
  { name: "MorphButton", verb: "morph.", start: 0 },
  { name: "Toggle", verb: "switch.", start: 3.4 },
  { name: "SegmentedTabs", verb: "slide.", start: 5.35 },
  { name: "VolumeSlider", verb: "stretch.", start: 8.05 },
  { name: "CopyButton", verb: "settle.", start: 11.3 },
];

function chapterAt(t: number) {
  return chapters.filter((chapter) => t >= chapter.start).length - 1;
}

function free(t: number, x0: number, v0: number, sp: Spring) {
  const w = (2 * Math.PI) / sp.response;
  if (sp.damping === 1) return Math.exp(-w * t) * (x0 + (v0 + w * x0) * t);
  const z = sp.damping;
  const wd = w * Math.sqrt(1 - z * z);
  return Math.exp(-z * w * t) * (x0 * Math.cos(wd * t) + ((v0 + z * w * x0) / wd) * Math.sin(wd * t));
}

function step(t: number, sp: Spring) {
  return t <= 0 ? 0 : 1 - free(t, 1, 0, sp);
}

function track(t: number, keys: Key[], sp: Spring) {
  const last = keys[keys.length - 1][1];
  const value = [...last];
  let prev = last;
  for (const [at, next, own] of keys) {
    const k = step(t - at, own ?? sp) + step(t + LOOP - at, own ?? sp);
    for (let i = 0; i < value.length; i++) value[i] += (next[i] - prev[i]) * k;
    prev = next;
  }
  return value;
}

function held(t: number, press: number, release: number, f: (t: number) => number, sp: Spring) {
  if (t < press) return 0;
  if (t < release) return f(t);
  return free(t - release, f(release), (f(release) - f(release - 0.001)) / 0.001, sp);
}

function liquid(t: number, keys: Edges[]) {
  const left: Key[] = [];
  const right: Key[] = [];
  keys.forEach(([at, l, r, own], i) => {
    const [, pl, pr] = keys[(i + keys.length - 1) % keys.length];
    const forward = l + r > pl + pr;
    left.push([at, [l], own ?? (forward ? TRAIL : LEAD)]);
    right.push([at, [r], own ?? (forward ? LEAD : TRAIL)]);
  });
  return [track(t, left, LEAD)[0], track(t, right, LEAD)[0]];
}

function presence(t: number, on: number, off: number) {
  const v = (t: number) => step(t - on - 0.1, SOFT) * (1 - step(t - off, EXIT));
  return Math.max(v(t), v(t + LOOP));
}

function reveal(el: HTMLElement, v: number) {
  el.style.visibility = v < 0.002 ? "hidden" : "";
  el.style.opacity = `${v}`;
  el.style.filter = v > 0.998 ? "" : `blur(${(1 - v) * BLUR}px)`;
  el.style.scale = `${0.96 + 0.04 * v}`;
}

function linear(hex: string) {
  return hex.match(/\w\w/g)!.map((h) => (parseInt(h, 16) / 255) ** 2.2);
}

function rgb(c: number[]) {
  return `rgb(${c.map((v) => 255 * v ** (1 / 2.2))})`;
}

function rubber(over: number) {
  return RUBBER * (1 - Math.exp(-over / RUBBER));
}

const BOX: Key[] = [
  [0, [138, 44, 22]],
  [1.29, [44, 44, 22]],
  [3.45, [52, 32, 16]],
  [5.35, [228, 38, 19]],
  [8.05, [260, 44, 22]],
  [11.4, [44, 44, 22]],
  [12.45, [116, 44, 22]],
  [13.75, [44, 44, 22]],
];

const TONES: [number, Tone][] = [
  [2.55, "accent"],
  [4.63, "paper"],
  [11.3, "ink"],
];

const TOUCHES: Touch[] = [
  [0.95, 1.17, 1.29, 24, 6],
  [4.3, 4.52, 4.63, 10, 3],
  [6.1, 6.32, 6.44, 74, 4],
  [7.05, 7.26, 7.38, 0, 4],
  [8.8, 9.02, 10.55, 7.2, 3],
  [12.1, 12.33, 12.45, 4, 5],
];
const DRAG = TOUCHES[4];

const PRESSES: Key[] = [TOUCHES[0], TOUCHES[5]].flatMap(([, press, release]): Key[] => [
  [press, [0.96]],
  [release, [1]],
]);

const SHOW: [string, number, number][] = [
  ["label", 0, 1.29],
  ["spinner", 1.29, 2.55],
  ["check", 2.55, 3.9],
  ["tab0", 5.35, 8.05],
  ["tab1", 5.4, 8.05],
  ["tab2", 5.45, 8.05],
  ["speaker", 8.05, 11.3],
  ["copy", 11.4, 12.45],
  ["copied", 12.45, 13.75],
  ["copy", 13.75, LOOP],
];

const KNOB_X: Edges[] = [
  [3.55, 5.9, 7.4, CUT],
  [3.57, -3, 23],
  [4.63, -23, 3],
  [5.35, -111, -37, SHAPE],
  [6.44, 37, 111],
  [7.38, -37, 37],
  [8.05, -126, 7.2, SHAPE],
];
const KNOB_Y: Key[] = [
  [3.55, [-5.3, -3.8], CUT],
  [3.57, [-13, 13]],
  [5.35, [-16, 16]],
  [8.05, [-18, 18]],
];
const KNOB_SHOWN = [3.55, 11.6];

const FRAMING: Key[] = [
  [0, [1, 0]],
  [1.29, [1.12, 0]],
  [3.45, [1.18, 0]],
  [5.35, [1, 0]],
  [8.05, [0.95, 0]],
  [9.02, [0.98, -10]],
  [10.55, [0.95, 0]],
  [11.4, [1.14, 0]],
  [12.45, [1.06, 0]],
  [13.75, [1.14, 0]],
];

function pointer(t: number) {
  const [, press] = DRAG;
  const p = Math.min(1, Math.max(0, (t - press) / 0.9));
  const tug = Math.sin(Math.PI * Math.min(1, Math.max(0, (t - press - 0.9) / 0.6))) ** 2;
  return 7.2 + (122.8 + OVER) * p * p * p * (p * (6 * p - 15) + 10) - 12 * tug;
}

function stretch(t: number) {
  const [, press, release] = DRAG;
  return held(t, press, release, (t) => rubber(Math.max(0, pointer(t) - 130)), SNAP);
}

function seek(t: number, el: Elements, palette: Palette, zoom: number) {
  const [camera, pan] = track(t, FRAMING, CAMERA);
  el.camera.style.transform = `scale(${zoom * camera}) translateX(${pan}px)`;

  const s = stretch(t);
  const squeeze = Math.sqrt(260 / (260 + s));
  const [w, h, r] = track(t, BOX, SHAPE);
  Object.assign(el.shape.style, {
    left: `${-w / 2}px`,
    top: `${(-h * squeeze) / 2}px`,
    width: `${w + s}px`,
    height: `${h * squeeze}px`,
    borderRadius: `${r * squeeze}px`,
    background: rgb(track(t, TONES.map(([at, tone]) => [at, palette[tone]]), SOFT)),
    scale: `${track(t, PRESSES, PRESS)[0]}`,
  });
  el.content.style.translate = `${w / 2}px ${(h * squeeze) / 2}px`;

  const shown: Record<string, number> = {};
  for (const [name, on, off] of SHOW) shown[name] = Math.max(shown[name] ?? 0, presence(t, on, off));
  for (const name in shown) reveal(el[name], shown[name]);
  tabs.forEach((_, i) => reveal(el[`pill${i}`], shown[`tab${i}`]));

  let [x0, x1] = liquid(t, KNOB_X);
  let [y0, y1] = track(t, KNOB_Y, SHAPE);
  if (t >= DRAG[1] && t < KNOB_SHOWN[1]) {
    x1 = Math.min(126, pointer(t)) + s;
    y1 = 22 * squeeze - 4;
    y0 = -y1;
  }
  el.knob.style.visibility = t >= KNOB_SHOWN[0] && t < KNOB_SHOWN[1] ? "" : "hidden";
  Object.assign(el.knob.style, {
    left: `${x0}px`,
    top: `${y0}px`,
    width: `${x1 - x0}px`,
    height: `${y1 - y0}px`,
    borderRadius: `${Math.min(x1 - x0, y1 - y0) / 2}px`,
  });
  el.pills.style.translate = `${-x0}px ${-y0}px`;
  el.speaker.style.top = `${(y1 - y0) / 2 - 8}px`;
  el.wave.style.opacity = `${Math.min(1, Math.max(0, (x1 - 18) / 12))}`;

  el.spinner.style.rotate = `${t * 450}deg`;
  el.checkPath.style.strokeDashoffset = `${1 - step(t - 2.7, SOFT) - step(t - 3.4, UNDRAW)}`;
  el.copiedPath.style.strokeDashoffset = `${1 - step(t - 12.6, SOFT)}`;

  const touch = TOUCHES.filter(([land]) => land <= t).at(-1);
  let on = 0;
  if (touch) {
    const [land, press, release, x, y] = touch;
    const arrive = step(t - land, SOFT);
    const lift = step(t - release, LIFT);
    const down = step(t - press, PRESS) - step(t - release, PRESS);
    on = arrive * (1 - lift);
    el.touch.style.translate = `${(touch === DRAG ? pointer(t) : x) - 7}px ${y - 7}px`;
    el.touch.style.scale = `${(1.3 - 0.3 * arrive) * (1 - 0.14 * down) * (1 + 0.2 * lift)}`;
  }
  el.touch.style.opacity = `${on}`;
  el.touch.style.visibility = on < 0.002 ? "hidden" : "";

  chapters.forEach((chapter, i) => {
    const end = chapters[i + 1]?.start ?? LOOP;
    el[`bar${i}`].style.width = `${Math.min(1, Math.max(0, (t - chapter.start) / (end - chapter.start))) * 100}%`;
  });
}

const tabs = ["Day", "Week", "Month"];

function tabRow(name: string, className: string) {
  return tabs.map((label, i) => (
    <span
      key={label}
      data-el={`${name}${i}`}
      className={`absolute grid place-items-center text-label font-medium ${className}`}
      style={{ left: -111 + 74 * i, top: -16, width: 74, height: 32 }}
    >
      {label}
    </span>
  ));
}

export type ReelProps = {
  /** Index in `chapters` of the component on screen. */
  chapter: number;
  onChapterChange: (chapter: number) => void;
  className?: string;
};

/** One shape that turns into five components in a loop while it's on screen; the chapter bar jumps between them. */
export function Reel({ chapter, onChapterChange, className = "" }: ReelProps) {
  const { scale, swap } = useSprings();
  const frame = useRef<HTMLDivElement>(null);
  const time = useRef(scale === 0 ? STILL : 0);
  const last = useRef(0);
  const inView = useInView(frame);
  const [size, measure] = useSize();
  const [paused, setPaused] = useState(false);
  const zoom = Math.min(ZOOM, (size?.width ?? 0) / 340);

  useEffect(() => {
    const el: Elements = {};
    for (const node of frame.current!.querySelectorAll<HTMLElement>("[data-el]")) el[node.dataset.el!] = node;
    const style = getComputedStyle(frame.current!);
    const palette = {
      ink: linear(style.getPropertyValue("--color-ink")),
      paper: linear(style.getPropertyValue("--color-paper")),
      accent: linear(style.getPropertyValue("--color-accent")),
    };

    seek(time.current, el, palette, zoom);
    onChapterChange(chapterAt(time.current));
    if (scale === 0 || paused || !inView) return;

    let id = requestAnimationFrame(function tick(now) {
      time.current = (time.current + Math.min(0.05, (now - (last.current || now)) / 1000) / scale) % LOOP;
      last.current = now;
      seek(time.current, el, palette, zoom);
      if (chapterAt(time.current) !== chapter) onChapterChange(chapterAt(time.current));
      id = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(id);
  }, [scale, paused, inView, chapter, zoom]);

  return (
    <div ref={frame} className={`relative h-80 overflow-hidden rounded-dialog bg-paper/50 sm:h-96 ${className}`}>
      <div ref={measure} aria-hidden className="absolute inset-0 select-none">
        <div data-el="camera" className="absolute top-[45%] left-1/2">
          <div data-el="shape" className="absolute overflow-hidden shadow-control">
            <div data-el="content" className="absolute">
              {tabRow("tab", "text-muted")}
              <div data-el="knob" className="absolute overflow-hidden bg-ink">
                <div data-el="pills" className="absolute">
                  {tabRow("pill", "text-paper")}
                </div>
                <span data-el="speaker" className="absolute text-paper" style={{ left: 10 }}>
                  <Icon size={16}>
                    <path d="M11 5 6 9H2v6h4l5 4z" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path data-el="wave" d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </Icon>
                </span>
              </div>
              <span data-el="label" className="absolute grid place-items-center text-body font-medium whitespace-nowrap text-paper" style={{ left: -69, top: -22, width: 138, height: 44 }}>
                Save changes
              </span>
              <span data-el="spinner" className="absolute text-paper" style={{ left: -9, top: -9 }}>
                <Icon size={18}>
                  <circle cx="12" cy="12" r="9" pathLength="1" strokeDasharray="0.28 1" />
                </Icon>
              </span>
              <span data-el="check" className="absolute text-on-accent" style={{ left: -10, top: -10 }}>
                <Icon size={20}>
                  <path data-el="checkPath" d="M4 12.5l5 5L20 6.5" pathLength="1" strokeDasharray="1 1" />
                </Icon>
              </span>
              <span data-el="copy" className="absolute text-paper" style={{ left: -9, top: -9 }}>
                <Icon size={18}>
                  <rect x="8" y="8" width="13" height="13" rx="2.5" />
                  <path d="M16 8V5.5A2.5 2.5 0 0 0 13.5 3h-8A2.5 2.5 0 0 0 3 5.5v8A2.5 2.5 0 0 0 5.5 16H8" />
                </Icon>
              </span>
              <span data-el="copied" className="absolute flex items-center justify-center gap-1.5 text-body font-medium whitespace-nowrap text-paper" style={{ left: -58, top: -22, width: 116, height: 44 }}>
                <span className="text-accent">
                  <Icon size={18}>
                    <path data-el="copiedPath" d="M4 12.5l5 5L20 6.5" pathLength="1" strokeDasharray="1 1" />
                  </Icon>
                </span>
                Copied
              </span>
            </div>
          </div>
          <div data-el="touch" className="absolute top-0 left-0 rounded-full border-2 border-paper bg-ink shadow-control" style={{ width: 14, height: 14 }} />
        </div>
      </div>
      <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-4">
        <span className="grid text-label font-medium sm:hidden">
          <AnimatePresence initial={false}>
            <motion.span key={chapters[chapter].name} {...swap} className="col-start-1 row-start-1">
              {chapters[chapter].name}
            </motion.span>
          </AnimatePresence>
        </span>
        <div className="flex gap-1 sm:gap-5">
          {chapters.map((item, i) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Show ${item.name}`}
              aria-current={i === chapter}
              onClick={() => {
                time.current = item.start + (scale === 0 ? 0.7 : 0);
                onChapterChange(i);
                setPaused(false);
              }}
              className={`grid gap-2 rounded-sm py-1.5 text-left text-label font-medium outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus ${i === chapter ? "text-ink" : "text-muted hover:text-ink"}`}
            >
              <span className="hidden sm:block">{item.name}</span>
              <span className="block h-0.5 w-6 overflow-hidden rounded-full bg-ink/15 sm:w-full">
                <span data-el={`bar${i}`} className="block h-full bg-ink" />
              </span>
            </button>
          ))}
        </div>
        {scale !== 0 && (
          <IconButton label={paused ? "Play the reel" : "Pause the reel"} variant="secondary" size="sm" onClick={() => setPaused(!paused)}>
            <Icon size={16}>
              <path d={playPausePath(paused ? 0 : 1)} className="fill-current" />
            </Icon>
          </IconButton>
        )}
      </div>
    </div>
  );
}
