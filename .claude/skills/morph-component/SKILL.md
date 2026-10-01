---
name: morph-component
description: Add or migrate a component in morph-components. Plan its states, semantics, props and the one shape that morphs between them, start from the closest existing component, build it on the shared foundations, write its stories, and check it in a real browser with check_story.py.
---

# Add or migrate a morph component

Read `AGENTS.md` first. It holds the rules; this skill is the order of work.

## 1. Plan

Before writing code, write down in a few lines:

- The states (idle, open, checked, dragging, disabled, invalid, loading, done…) and what triggers each one, by pointer, keyboard and touch.
- The semantics: the element or ARIA role, how it's named, what the keyboard does (arrows, Home, End, Enter, Space, Escape, Tab), where focus goes, what it submits in a form (`name`) and how a form reset reaches it.
- The one shape, and its size, radius and color in each state, from tokens.
- The content inside the shape per state, and which of it blur-swaps (`swap`).
- What slides between positions (`useLiquid`), what is dragged (pointer capture, rubber past the limits), what springs (`shape` for size and position, `soft` for color and opacity, `snap` for release after a drag), all from `useSprings()`.
- What it composes: which existing components and shared pieces it uses instead of rebuilding them.
- The props: data, value and callback (required); every text, label, aria text and format as an optional prop with an English default; the native props it passes through; `className`.

For a migration, also list what changes for callers (props, DOM, layout) and what stays the same.

## 2. Start from the closest component

Read the component named in your brief, in full, and its story. Copy its shape: imports, props type, defaults in the destructuring, the motion container, the `AnimatePresence` swap layers, key maps like `const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };`, class order. Don't invent a new pattern where one exists.

## 3. Build

`src/components/<category>/<Name>/<Name>.tsx`, named export, `export type <Name>Props`. Check against `AGENTS.md` as you go:

- Controlled value plus callback; temporary UI state (hover, highlight, drag) inside.
- Transitions from `useSprings()`; delays times `scale`; press feedback with the `press` class; functional timers left alone.
- Token utilities for color, type, radius, focus and layers; `Icon` and `icons` for icons.
- No hardcoded user-facing text. Text with data in it is a function prop.
- Full width where the component is a field, track, table, chart or card; `className` on the outer element.
- Right ARIA role, full keyboard support, focus ring `outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus`.
- Every class in the component file carries the `tn:` prefix (`tn:outline-offset-2 tn:focus-visible:outline-2`) and every token is `--tn-*` (AGENTS.md › Tokens); stories and demos use plain classes.

Keep public usage demos in the component’s `demos/` subfolder as standalone `<Name>Demo.tsx` files. Import those demos into stories and list them in `<Name>.docs.ts`; the public docs show the demo source verbatim. Use public `tensile` imports in demos.

## 4. Story

`src/components/<category>/<Name>/<Name>.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Name } from "./Name";

const meta = {
  title: "<Group>/Name",
  id: "components-name",
  component: Name,
  args: { value: "…", onValueChange: fn() },
} satisfies Meta<typeof Name>;

export default meta;
type Story = StoryObj<typeof meta>;

/** How to interact, in one line. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Name
        {...args}
        onValueChange={(value) => {
          args.onValueChange(value);
          updateArgs({ value });
        }}
      />
    );
  },
};
```

Only pass args for required props and for demo data; optional props show their defaults in Controls. Give fields and tracks a demo width with a wrapper (`<div className="w-80">`). Add another story only for a contract Default can't show: disabled or read-only, loading, error, empty, inside a form, a composition.

A form story wraps the control in a `<form>` with a submit button and prints the submitted data, so a check can read it:

```tsx
const [data, setData] = useState("");
<form onSubmit={(event) => { event.preventDefault(); setData(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget)))); }}>
  …
  <output>{data}</output>
</form>
```

A component that only displays its value (a ticker, a progress bar) has no callback to click through. Let the story's `render` change the value on a click, through `updateArgs`, so the change can be exercised in the browser.

## 5. Check

Run `npx tsc --noEmit`. Fix errors in your files; report errors in other files.

Then run the story in a real browser:

```sh
uv run .claude/skills/morph-component/scripts/check_story.py <story-id> '<steps as JSON>' --out /tmp/morph-shots/<Name>
```

- The story id is `components-<name in lowercase>--<story in kebab case>`, e.g. `components-copybutton--default`.
- The script starts its own Storybook on a free port, opens the story's `iframe.html` at 800 × 600 (2× pixels) in Chromium with clipboard access granted, runs the steps, saves `NN-<name>.png` per shot plus `contact.png`, and always stops the server. It exits with 1 if a step fails, a check fails, or the browser console shows an error (React warnings included).
- It takes about 10 s. If Storybook fails to start, read `storybook.log` in the out directory.

Options:

| Option | Does |
|---|---|
| `--viewport 390x844` | page size in CSS px (default 800x600); use a phone size for anything responsive |
| `--reduced-motion` | emulates `prefers-reduced-motion: reduce`, so the motion scale is 0 |
| `--globals theme:alternate` | runs with the alternate tokens (accent, radii, speed) |
| `--args 'scale:3;open:!true'` | sets story args, in Storybook's URL syntax (values with characters such as `/` are dropped; use plain words) |
| `--browser firefox` | runs in `chromium` (default), `firefox` or `webkit`; only Chromium gets clipboard access |
| `--video` | records the run to `video.webm`; look at it frame by frame with `ffmpeg -i video.webm -vf fps=20,tile=6x4 film.png` |

Steps, run in order:

| Step | Does |
|---|---|
| `{"click": "<selector>"}` | clicks the element; with `"at": [x, y]`, clicks that point of its box (a backdrop's corner) |
| `{"focus": "<selector>"}` | focuses the element |
| `{"press": "<key>"}` | presses a key on the focused element: `"ArrowRight"`, `"Enter"`, `"Space"`, `"Escape"`, `"Shift+Tab"`, `"Meta+k"` |
| `{"keydown": "<key>"}`, `{"keyup": "<key>"}` | holds a key down and lets it go, for things that react to a held key |
| `{"type": "<text>"}` | types text into the focused element |
| `{"upload": "<selector>", "files": ["photo.jpg"]}` | picks small test files on an `input type="file"` (it may be hidden) |
| `{"hover": "<selector>"}` | moves the mouse to the element's center |
| `{"down": "<selector>", "at": [x, y]}` | moves the mouse to a point in the element's box and presses the button |
| `{"move": "<selector>", "at": [x, y]}` | moves the mouse there (with the button held, a drag; without, a hover) |
| `{"up": "<selector>", "at": [x, y]}` | moves the mouse there and releases the button |
| `{"wait": <ms>}` | waits |
| `{"shot": "<name>"}` | saves a screenshot |
| `{"attr": "<selector>", "name": "<attribute>", "equals": <value>}` | checks an attribute; `null` means absent |
| `{"prop": "<selector>", "name": "<property>", "equals": <value>}` | checks a DOM property: `value`, `checked`, `offsetWidth`, `validity.valid` |
| `{"text": "<selector>", "equals": "<text>"}` | checks the element's visible text |
| `{"visible": "<selector>"}`, `{"hidden": "<selector>"}` | checks that the element is visible, or hidden or absent |

- Selectors are Playwright selectors, searched in the whole story page, so overlays rendered outside the story root are found too: CSS (`button`, `[role=switch]`, `[aria-label=Copy]`), `text=Copied`, and `>> nth=2` at the end to pick the third match. A selector must match one element, and a step waits at most 5 s for it. Inside the single-quoted JSON, write a double quote as `\"`.
- `at` is a fraction of the element's box, `[0.5, 0.5]` if left out. Go below 0 or above 1 to drag past an edge. The box is measured at each step, so drag over an element that doesn't move or resize.
- A flick is several `move` steps a few pixels apart with `{"wait": 16}` between them, then `up`, so the release has speed.
- A check prints `PASS` or `FAIL` with the value it read; the run continues after a failure and exits with 1 at the end. Without `equals`, `attr`, `prop` and `text` only print the value: that's a reading, not a check.
- `:focus` selects the focused element, so `{"attr": ":focus", "name": "aria-label", "equals": "Close"}` checks where focus went.
- The script drives a mouse and a keyboard. Touch-only behavior (a long press, the browser's own touch gestures) needs a separate temporary Playwright script under `/tmp` that starts and stops its own Storybook, e.g. with CDP's `Input.synthesizeTapGesture`; keep it and its log as evidence.
- Changes that go through `updateArgs` land on a later tick: wait about 250 ms before checking.

Exercise every interaction, by pointer and by keyboard, and check the result of each one. For each animation, take one shot about 100 ms in and one about 600 ms after it started; with `--args` or the alternate theme slowing things down, wait longer. Check reversals and quick repeated input, and record drags and morphs with `--video`:

```json
[
  {"shot": "idle"},
  {"click": "button"}, {"wait": 100}, {"shot": "copied-100ms"}, {"wait": 500}, {"shot": "copied-600ms"},
  {"attr": "button", "name": "aria-label", "equals": "Copied"},
  {"press": "Tab"}, {"attr": ":focus", "name": "aria-label", "equals": "Next"}
]
```

Run it again with `--reduced-motion` (state changes land at once, nothing loops) and, if the component is responsive, with `--viewport 390x844`.

Open `contact.png` and every shot, and look hard: one shape that morphs (no cuts, no pops, nothing reflowing mid-morph), old content gone before the new appears, 1.5 px icon lines, correct colors and contrast, visible focus ring, long labels that fit or truncate. Fix what's off and run again.

## 6. Re-read and report

Re-read your full diff. For every guard, branch, prop and helper you added, name the input that reaches it; delete the rest. Remove comments that aren't the one-line prop JSDoc.

Report:

- Files you wrote or changed.
- Public API: props with their defaults; for a migration, what changed for callers.
- What you reused (components, shared pieces) and what you didn't, with the reason.
- Verification: the steps, the `PASS`/`FAIL` lines as printed, the screenshot and video paths, the runs with `--reduced-motion`, `--viewport` or `--globals`.
- Accessibility behavior you checked: roles, names, keyboard, focus movement, form data.
- Proposed changes to shared files, if any.
- Known limits, anything you couldn't decide, and edge cases you chose not to handle.
