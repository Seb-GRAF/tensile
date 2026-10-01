const PLAY = [[6, 4], [12, 7.7], [12, 16.3], [6, 20], [12, 7.7], [19, 12], [19, 12], [12, 16.3]];
const PAUSE = [[6, 4], [10, 4], [10, 20], [6, 20], [14, 4], [18, 4], [18, 20], [14, 20]];

/** SVG path from the play triangle (0) to the pause bars (1) on a 24 grid: both halves of the triangle turn into bars. */
export function playPausePath(morph: number) {
  const points = PLAY.map(([x, y], i) => `${x + (PAUSE[i][0] - x) * morph} ${y + (PAUSE[i][1] - y) * morph}`);
  return `M${points.slice(0, 4).join("L")}Z M${points.slice(4).join("L")}Z`;
}

/** Seconds as m:ss. */
export function clock(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}
