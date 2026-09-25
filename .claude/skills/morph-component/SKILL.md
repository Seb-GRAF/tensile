---
name: morph-component
description: Add a component to morph-components. Plan its states and the one shape that morphs between them, start from the closest existing component, build it, write its story, and check it in a real browser with check_story.py.
---

# Add a morph component

Read `AGENTS.md` first. It holds the rules; this skill is the order of work.

## 1. Plan

Before writing code, write down in a few lines:

- The states (idle, open, checked, dragging, done…) and what triggers each one, by pointer and by keyboard.
- The one shape, and its size, radius and color in each state.
- The content inside the shape per state, and which of it blur-swaps (`swap`).
- What slides between positions (`useLiquid`), what is dragged (pointer capture, rubber past the limits), what springs (`shape` for size and position, `soft` for color and opacity, `snap` for release after a drag).
- The props: data, value and callback (required); every text, label, aria text and format as an optional prop with an English default.

## 2. Start from the closest component

Read the component named in your brief, in full, and its story. Copy its shape: imports, props type, defaults in the destructuring, the motion container, the `AnimatePresence` swap layers, key maps like `const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };`, class order. Don't invent a new pattern where one exists.

## 3. Build

`src/components/<Name>.tsx`, named export, `export type <Name>Props`. Check against `AGENTS.md` as you go:

- Controlled value plus callback; temporary UI state (hover, highlight, drag) inside.
- No hardcoded user-facing text. Text with data in it is a function prop.
- Icons on a 24 grid, stroke-width = 36 / rendered size.
- Right ARIA role, full keyboard support, focus ring `outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink`.

## 4. Story

`src/components/<Name>.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Name } from "./Name";

const meta = {
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

Only pass args for required props and for demo data; optional props show their defaults in Controls. Add another story only for a state you can't reach by interacting.

A component that only displays its value (a ticker, a progress bar) has no callback to click through. Let the story's `render` change the value on a click, through `updateArgs`, so the change can be exercised in the browser.

## 5. Check

Run `npx tsc --noEmit`. Fix errors in your files; report errors in other files.

Then run the story in a real browser:

```sh
uv run .claude/skills/morph-component/scripts/check_story.py <story-id> '<steps as JSON>' --out /tmp/morph-shots/<Name>
```

- The story id is `components-<name in lowercase>--default`, e.g. `components-copybutton--default`.
- The script starts its own Storybook on a free port, opens the story's `iframe.html` at 800 × 600 (2× pixels) with clipboard access granted, runs the steps, saves `NN-<name>.png` per shot plus `contact.png`, and always stops the server. It exits with 1 if a step fails or the browser console shows an error (React warnings included).
- It takes about 10 s. If Storybook fails to start, read `storybook.log` in the out directory.

Steps, run in order:

| Step | Does |
|---|---|
| `{"click": "<selector>"}` | clicks the element |
| `{"focus": "<selector>"}` | focuses the element |
| `{"press": "<key>"}` | presses a key on the focused element: `"ArrowRight"`, `"Enter"`, `"Space"`, `"Escape"`, `"Shift+Tab"`, `"Meta+k"` |
| `{"keydown": "<key>"}`, `{"keyup": "<key>"}` | holds a key down and lets it go, for things that react to a held key |
| `{"type": "<text>"}` | types text into the focused element |
| `{"hover": "<selector>"}` | moves the mouse to the element's center |
| `{"down": "<selector>", "at": [x, y]}` | moves the mouse to a point in the element's box and presses the button |
| `{"move": "<selector>", "at": [x, y]}` | moves the mouse there (with the button held, a drag; without, a hover) |
| `{"up": "<selector>", "at": [x, y]}` | moves the mouse there and releases the button |
| `{"wait": <ms>}` | waits |
| `{"shot": "<name>"}` | saves a screenshot |
| `{"attr": "<selector>", "name": "<attribute>"}` | prints the attribute's value |

- Selectors are Playwright selectors, searched inside the story root: CSS (`button`, `[role=switch]`, `[aria-label=Copy]`), `text=Copied`, `>> nth=2` to pick the third match. A selector must match one element, and a step waits at most 5 s for it. Inside the single-quoted JSON, write a double quote as `\"`.
- `at` is a fraction of the element's box, `[0.5, 0.5]` if left out. Go below 0 or above 1 to drag past an edge. The box is measured at each step, so drag over an element that doesn't move or resize.
- A flick is several `move` steps a few pixels apart with `{"wait": 16}` between them, then `up`, so the release has speed.
- Check keyboard behavior with `attr`: `aria-checked`, `aria-selected`, `aria-valuenow`, `aria-expanded`, `aria-activedescendant`. `:focus` selects the focused element, so `{"attr": ":focus", "name": "aria-label"}` shows where focus went.
- Changes that go through `updateArgs` land on a later tick: wait about 250 ms before `attr`.

Exercise every interaction. For each animation, take one shot about 100 ms in and one about 600 ms after it started:

```json
[
  {"shot": "idle"},
  {"click": "button"}, {"wait": 100}, {"shot": "copied-100ms"}, {"wait": 500}, {"shot": "copied-600ms"},
  {"press": "Enter"}, {"wait": 250}, {"attr": "button", "name": "aria-label"}
]
```

Open `contact.png` and every shot, and look hard: one shape that morphs (no cuts, no pops, nothing reflowing mid-morph), old content gone before the new appears, 1.5 px icon lines, correct colors and contrast, visible focus ring. Fix what's off and run again.

## 6. Report

- Files you wrote.
- Props with their defaults.
- What you checked: the steps, the `attr` results, the screenshot paths.
- Proposed changes to shared files, if any.
- Anything you couldn't decide, and edge cases you chose not to handle.
