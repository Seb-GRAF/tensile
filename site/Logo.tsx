import { useEffect, useRef, useState } from "react";
import { useSprings } from "tensile";

type Spring = { x: number; v: number; target: number; k: number; c: number };

type Model = { open: boolean; attached: boolean; head: Spring; top: Spring; round: Spring; stemStub: Spring; headStub: Spring };

const advance = 26.88;
const cx = 13.4;
const half = 6.4;
const xHeight = -53.4;
const dotY = -66.2;
const pull = 13;
const breakAt = 12.9;
const joinAt = 1.9;

function spring(x: number, k: number, c: number): Spring {
  return { x, v: 0, target: x, k, c };
}

function createModel(): Model {
  return {
    open: false,
    attached: true,
    head: spring(xHeight + half, 520, 25),
    top: spring(xHeight, 500, 26),
    round: spring(0, 300, 30),
    stemStub: spring(0, 700, 55),
    headStub: spring(0, 700, 55),
  };
}

function springs(m: Model) {
  return [m.head, m.top, m.round, m.stemStub, m.headStub];
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function step(m: Model, dt: number) {
  const gap = m.top.x - (m.head.x + half);
  if (m.attached && m.open && gap > breakAt) {
    m.attached = false;
    m.stemStub.x = m.headStub.x = gap / 2;
    m.top.v += 560;
  } else if (!m.attached && !m.open && gap < joinAt) {
    m.attached = true;
    m.stemStub.x = m.headStub.x = 0;
    m.top.v += 280;
  }
  [m.head.k, m.head.c] = m.open ? (m.attached ? [520, 25] : [420, 17]) : [380, 25];
  m.head.target = m.open ? (m.attached ? dotY - pull : dotY) : xHeight + half;
  m.top.target = xHeight - (m.attached && m.open ? 3 * clamp(gap / breakAt, 0, 1) : 0);
  m.round.target = m.open ? (m.attached ? half * clamp((gap + 2 * half) / (breakAt + 2 * half), 0, 1) : half) : 0;
  for (const s of springs(m)) {
    s.v += (-s.k * (s.x - s.target) - s.c * s.v) * dt;
    s.x += s.v * dt;
  }
}

function jump(m: Model) {
  m.attached = !m.open;
  m.head.target = m.head.x = m.open ? dotY : xHeight + half;
  m.round.target = m.round.x = m.open ? half : 0;
  m.top.x = m.top.target = xHeight;
  m.stemStub.x = m.headStub.x = 0;
  for (const s of springs(m)) s.v = 0;
}

function roundedRect(y: number, w: number, h: number, r: number) {
  const x0 = cx - w / 2, x1 = cx + w / 2, y0 = y - h / 2, y1 = y + h / 2;
  return `M${x0 + r} ${y0}L${x1 - r} ${y0}A${r} ${r} 0 0 1 ${x1} ${y0 + r}L${x1} ${y1 - r}A${r} ${r} 0 0 1 ${x1 - r} ${y1}L${x0 + r} ${y1}A${r} ${r} 0 0 1 ${x0} ${y1 - r}L${x0} ${y0 + r}A${r} ${r} 0 0 1 ${x0 + r} ${y0}Z`;
}

function paths(m: Model) {
  const stretch = m.attached ? 0 : clamp(Math.abs(m.head.v) / 1200, 0, 0.5);
  const hh = 2 * half * (1 + stretch), hw = (2 * half) / Math.sqrt(1 + stretch);
  const r = clamp(m.round.x, 0, Math.min(hw, hh) / 2);
  const a = m.top.x, bottom = m.head.x + hh / 2, gap = a - bottom;
  let stem = `M${cx - half} ${a}L${cx + half} ${a}L${cx + half} 0L${cx - half} 0Z`;
  let head = roundedRect(m.head.x, hw, hh, r);

  if (m.attached && gap > 0) {
    const waist = half * (1 - clamp(gap / (m.open ? breakAt : joinAt * 3), 0, 1)) ** 0.7;
    const end = bottom - r, mid = (a + end) / 2, k1 = (a - mid) * 0.55, k2 = (a - mid) * 0.35, k3 = (mid - end) * 0.55;
    stem += `M${cx - half} ${a + 1}C${cx - half} ${a - k1} ${cx - waist} ${mid + k2} ${cx - waist} ${mid}C${cx - waist} ${mid - k2} ${cx - hw / 2} ${end + k3} ${cx - hw / 2} ${end}L${cx + hw / 2} ${end}C${cx + hw / 2} ${end + k3} ${cx + waist} ${mid - k2} ${cx + waist} ${mid}C${cx + waist} ${mid + k2} ${cx + half} ${a - k1} ${cx + half} ${a + 1}Z`;
  }
  if (!m.attached && m.stemStub.x > 0.3) {
    const l = m.stemStub.x;
    stem += `M${cx - half} ${a + 1}C${cx - half} ${a - l * 0.6} ${cx - 0.6} ${a - l} ${cx} ${a - l}C${cx + 0.6} ${a - l} ${cx + half} ${a - l * 0.6} ${cx + half} ${a + 1}Z`;
  }
  if (!m.attached && m.headStub.x > 0.3) {
    const l = m.headStub.x, end = bottom - Math.max(r, 1);
    head += `M${cx + hw / 2} ${end}C${cx + hw / 2} ${bottom + l * 0.4} ${cx + 0.6} ${bottom + l} ${cx} ${bottom + l}C${cx - 0.6} ${bottom + l} ${cx - hw / 2} ${bottom + l * 0.4} ${cx - hw / 2} ${end}Z`;
  }
  return { stem, head };
}

export type LogoProps = {
  /** Pulls the dot of the i out of its stem; turning false drops it back in. */
  open: boolean;
  className?: string;
};

/** The tensile wordmark in the current font size and color, set in Geist semibold. Decorative: name the link or heading around it. */
export function Logo({ open, className = "" }: LogoProps) {
  const { scale } = useSprings();
  const [model] = useState(createModel);
  const stem = useRef<SVGPathElement>(null);
  const head = useRef<SVGPathElement>(null);

  useEffect(() => {
    model.open = open;

    function draw() {
      const d = paths(model);
      stem.current!.setAttribute("d", d.stem);
      head.current!.setAttribute("d", d.head);
    }

    if (scale === 0) {
      jump(model);
      draw();
      return;
    }

    let last = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const ms = Math.min(50, now - last) / scale;
      last = now;
      for (let t = 0; t < ms; t++) step(model, 0.001);
      draw();
      if (springs(model).some((s) => Math.abs(s.v) > 0.01 || Math.abs(s.x - s.target) > 0.01)) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [open, scale]);

  const d = paths(model);
  return (
    <span aria-hidden className={`font-semibold whitespace-nowrap ${className}`}>
      tens
      <svg viewBox={`0 -100 ${advance} 100`} fill="currentColor" className="inline h-[1em] w-[0.2688em] overflow-visible align-baseline mr-(--tracking-tight)">
        <path ref={stem} d={d.stem} />
        <path ref={head} d={d.head} />
      </svg>
      le
    </span>
  );
}
