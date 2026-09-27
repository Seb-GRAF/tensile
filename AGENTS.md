# morph-components

A Storybook library of animated React components. Every component is generic: all data and all text come in as props, with English defaults.

## Stack and commands

- React 19, TypeScript (strict), Motion (`motion/react`), Tailwind 4, Storybook 10 (react-vite), Geist.
- `npx tsc --noEmit` type-checks everything.
- `npm run storybook` and `npm run build-storybook` are for the maintainer. Subagents check stories with the `morph-component` skill's `check_story.py`, which starts its own server. Never stop a Storybook you didn't start.

## What exists

Components in `src/components/<category>/`, each with a story. Categories match the Storybook groups: `actions` (Actions), `inputs` (Inputs), `navigation` (Navigation), `feedback` (Feedback), `data-display` (Data display), `layout` (Layout), `overlays` (Overlays), and `media` (Media). Read the one you start from in full and copy its shape.

- `MorphButton`: one shape whose width and color follow `status`; blur-swapped content; a spinner; the shared `Check`.
- `Toggle`: switch; the knob is a `useLiquid` pill; the track color morphs.
- `SegmentedTabs`: tablist with roving focus and arrow keys; a `useLiquid` pill in percent; the selected label is a second, clipped layer in `paper`.
- `VolumeSlider`: slider drag built on `src/drag.ts`: the value comes from the pointer, the pill stretches past either end with `rubber` and `useStretch`, and springs back with `snap`; arrow-key steps.
- `MusicPlayer`: an island that expands into a player, built on `Expand`; play/pause path morph; `SeekBar`.
- `LineChart`: SVG line that draws itself; hover guide, dot and tooltip glide between points; tooltip text blur-swaps.
- `CommandPalette`: combobox and listbox built on `src/list.tsx`; rows blur in and out and move on springs as the filter changes; ⌘K.
- `Toast`: status pill that sizes to its content with `useWidth`; blur swap.
- `NumberTicker`: digit strips roll on `shape` in the direction the value moved; characters that come or go blur in while their width springs; takes font size, weight, color and line height from its parent.
- `Checkbox`: a box that fills lime, then the shared `Check` blurs in and draws; the label wraps the box, so clicking it toggles.
- `RadioGroup`: vertical radiogroup with roving focus; a `useLiquid` dot slides between rings and grows out of the first choice.
- `ProgressBar`: VolumeSlider's track; one `useLiquid` pill is the fill or, with `value` null, a segment that sweeps end to end.
- `ProgressRing`: an arc on `soft` (not `shape`, whose overshoot below 0 flashes a full ring); at 1 the disc turns accent and the `Check` draws.
- `ThemeToggle`: Toggle's switch; the knob's icon is one path that morphs from sun to moon on `shape`.
- `CopyButton`: an icon pill that widens to a lime `Check` and "Copied" with `useWidth`, then settles back.
- `Badge`: a white dot that grows into a lime count pill; digits roll with `NumberTicker` and the pill's width follows them; 0 hides it.
- `StatTile`: an ink card with a `NumberTicker` and a change chip whose color fades lime/paper and whose arrow swings when the change flips sign.
- `NumberStepper`: a spinbutton between − and +; `NumberTicker` digits; a press past a limit gives `useStretch`'s value a `snap` velocity, so the pill stretches toward that side and springs back.
- `Select`: select-only combobox; a paper pill that grows down into its menu out of a pill-sized wrapper, so the menu overlays; `ListHighlight`; the label blur-swaps on pick; a `Check` marks the choice.
- `ActionMenu`: menu button; the "More" pill grows right and down into a `role="menu"` with `ListHighlight`; the list layer blurs in and out and stays mounted and `inert` when closed.
- `TextField`: floating label that moves by transforms only; an error grows the pill into a card and blurs in; the focus ring sits on the shape.
- `SearchField`: a round search button whose width springs out into the field; Escape clears, then folds.
- `RangeSlider`: VolumeSlider's track with two knobs in the ink fill; a press grabs the nearer knob; knobs stop at each other; the track stretches past the grabbed knob's end.
- `SwipeButton`: the ink fill's end is a knob dragged from where you grab it; reaching the end calls `onConfirm`; a parent-controlled `confirmed` turns it accent with the `Check`; Enter or Space confirms.
- `HoldButton`: a lime fill grows at a steady rate while held (pointer, Space or Enter), springs back with `snap` if released early; a parent-controlled `done` morphs it into MorphButton's success.
- `SplitPane`: two panes and a `role="separator"`; the value is a fraction of the width; past `min`/`max` the pane goes `rubber` px further and springs back; the grip grows and turns ink while held.
- `CompareSlider`: before/after layers, the after layer clipped at the divider; the frame is the drag area; a `role="slider"` knob; the focus ring sits on the frame.
- `TimeWheel`: hour, minute and AM/PM wheels (`role="spinbutton"`); a flick lands on the row nearest position + velocity × 0.1 s with `snap`; hours and minutes loop, AM/PM stretches with `rubber`.
- `BottomSheet`: a `role="dialog"` sheet whose offset is a fraction of its height; dragged from its top strip; the release projects position + velocity × 0.2 s to close or spring back; the backdrop's opacity follows the offset.
- `UnderlineTabs`: SegmentedTabs' tablist with tabs sized to their labels; a `useLiquid` underline in px, measured from the selected tab and again once fonts load.
- `TabBar`: mobile bottom tablist; a `useLiquid` pill slides behind the selected icon; each item's `icon` blur-swaps to its `activeIcon`.
- `SidebarNav`: a `nav` list with `aria-current="page"`; SegmentedTabs' ink pill and clipped `paper` layer, turned vertical; ArrowUp/ArrowDown move focus only.
- `Pagination`: page numbers in fixed slots that blur-swap when the window shifts; SegmentedTabs' pill slides to the current page.
- `PageDots`: a `role="slider"` row of dots; the active dot is a `useLiquid` pill; a press or drag picks the page under the pointer; past either end the capsule and pill stretch with `rubber`.
- `WizardSteps`: display-only `<ol>` of steps; one ink line draws between dot centers with `pathLength` on `soft`; a finished dot turns accent with the `Check`.
- `Breadcrumbs`: middle crumbs collapse into a "…" pill whose width springs out to the hidden crumbs, which blur in; `clip-path: inset(-4px)` keeps each crumb's focus ring.
- `Popover`: `Expand` with `anchor="top-left"`: the trigger pill grows down and right into a non-modal dialog; a window `pointerdown` listener closes it on a click outside.
- `Tooltip`: one ink tooltip shared by a `role="toolbar"` of buttons; it glides between targets on `shape`, its width follows its text, the text blur-swaps; 400 ms before the first show.
- `Dialog`: `Expand` inside a layer that flies to the middle of the viewport on `shape` while it grows; modal, with a backdrop, Tab kept inside, focus back to the button.
- `Accordion`: each item is a paper pill whose height springs to `auto` to hold its panel; the panel stays mounted and `inert` when closed and blur-swaps; one item open at a time.
- `ExpandableCard`: `Expand` with `anchor="top-left"`: a 280 × 72 card grows into a 360 × 400 detail view.
- `Lightbox`: a thumbnail row; the clicked thumbnail's measured box springs (left, top, size, radius) into a 3:2 full view over a backdrop and back; arrows blur-swap the picture.
- `CollapsibleSidebar`: an icon rail whose width springs into the sidebar (pushing the content, not overlaying); labels blur in after it widens and out before it narrows; SidebarNav's pill grows with it.
- `Combobox`: Select's pill as a text input; typing filters with `filterByWords`, rows blur in and out and slide on springs, the empty row blurs in too.
- `OTPInput`: one input per cell (`autoComplete="one-time-code"`); one ring slides between cells with `useLiquid`; digits blur in; paste fills every cell.
- `Rating`: a `role="slider"` of 1.5 px star outlines; a lime fill cut to the star shapes slides on `useLiquid` to the hovered star and back to the value.
- `ColorSwatches`: a radiogroup of swatches; one ink ring with a paper lining slides between them with `useLiquid`, visible over any color.
- `TagInput`: chips blur in and out; chips and input slide to new places with Motion's `layout="position"`; the field's height follows the rows.
- `FileUpload`: a drop-zone button morphs into a progress pill (a lime `useLiquid` fill and a `NumberTicker` percentage), then into MorphButton's success.
- `DatePicker`: a `role="grid"` month with roving focus; the selected pill's edges ride two `useLiquid` pairs, so it stretches across rows and columns; months blur-swap in the direction of travel; the value is "YYYY-MM-DD".
- `Alert`: one card whose color moves between the status colors on `soft`; one icon path morphs between i, ! and a check; the text blur-swaps while the height springs.
- `ToastStack`: toasts stacked by depth (offset, scaled, tinted) fan out into a list on hover or focus; dismissed ones blur out and the rest spring into place.
- `Island`: `Expand` with a compact width from `useWidth`; `leading`/`trailing` in the pill, `children` in the panel; a new `activity` blur-swaps both and morphs the width.
- `BarChart`: bars grow in and spring to new data; a `useLiquid` highlight slides behind the hovered or focused bar; the tooltip glides and blur-swaps; arrow keys work.
- `DonutChart`: arcs spring to their share on a no-bounce spring; the hovered or focused arc thickens outward; the center text blur-swaps.
- `VideoControls`: a controlled dark bar with the play/pause morph, `SeekBar` and a VolumeSlider-style volume.
- `WaveformScrubber`: bars filled up to the position by a clipped second row; the drag pieces from `src/drag.ts` make it follow the pointer and stretch past the ends.

Shared code (owned by the maintainer, read-only for subagents):

- `src/springs.ts`: spring presets `shape` (size and position), `soft` (color and opacity), `snap` (release after a drag; the only preset that keeps a moving value's speed); the blur swap `swap`; `useLiquid` (two edges on different springs, so a sliding pill stretches ahead and catches up).
- `src/index.css`: color tokens `canvas ink ink-3 paper accent muted line hover`, shadow `shadow-float`.
- `src/Check.tsx`: `<Check size={20} />`, a check in the current text color that draws itself when it mounts, with the stroke worked out from `size`. Put it in a `motion.span` with `swap` to blur it in and out.
- `src/useWidth.ts`: `const [width, measure] = useWidth();` measures the element you pass `measure` to as its `ref` (again once fonts have loaded). Key that element by its content so each new version gets measured, then animate the shape to `width` (see `Toast`).
- `src/list.tsx`, taken from `CommandPalette`: `ROW` (40 px rows); `filterByWords(items, query)`, the word-prefix filter; `const [active, setActive, onArrowKey] = useActiveIndex(count)`, the highlighted row with ArrowUp/ArrowDown wrapping (call `onArrowKey` from the key handler of whatever holds focus; Enter and Escape stay in the component); `<ListHighlight index={active} />`, the `bg-hover` highlight that slides and stretches behind a row, placed first in a `relative` list.
- `src/drag.ts`, taken from `VolumeSlider`: `{...dragHandlers(onDrag, onRelease)}` on the element dragged over (with `touch-none`) captures the pointer and calls `onDrag(event)` on press and on every move while held, `onRelease()` when it lets go; `rubber(over)` turns px dragged past a limit into px drawn past it (at most 24); `const [stretch, style] = useStretch(width, height)` gives a pill that gets longer and thinner as `stretch` goes past an end. Set the dragged value from the pointer while held (a `MotionValue` you `set()` tracks its speed), then `animate(value, target, snap)` on release so it keeps that speed. On press, `stop()` the value: `set()` doesn't stop a spring that's still running from the last release, and the spring would win.
- `src/Expand.tsx`, taken from `MusicPlayer`: `<Expand open onOpenChange closed={{ width, height, radius }} opened={{ … }} anchor="center" | "top-left" label trigger={…} className="bg-ink text-paper">{panel}</Expand>`. One shape springs between the two sizes on `shape`; it takes the closed size in the layout and overlays what's around it when open, growing from the closed shape's center or top-left corner. The closed shape is a button (`label` names it, `trigger` is its content); the open content (`children`) is a fixed-size layer; both blur-swap. With `panelLabel`, the open layer is a named dialog and the button says it opens one. Focus moves into the panel on open and back to the button on close (unless the user has moved it to something else), Escape closes, and the focus ring sits on the shape while the button has it. Clicking outside is up to you.
- `src/SeekBar.tsx`, taken from `MusicPlayer`: `<SeekBar value={seconds} duration onValueChange onScrubChange label valueText />`, a media progress bar for dark surfaces (`bg-ink-3` track, `bg-paper` fill). While held it follows the pointer, thickens, and stretches past either end with `rubber`, springing back with `snap`; `onScrubChange(true/false)` lets playback wait while scrubbing; ArrowLeft/ArrowRight skip 5 s.
- `src/playback.ts`: `playPausePath(morph)`, the path from the play triangle (0) to the pause bars (1), and `clock(seconds)`, m:ss (used by `MusicPlayer`, `VideoControls`, `WaveformScrubber`).
- `src/index.ts`: exports every component and its props type.

## Motion and look

- One shape per component. Changing state morphs that shape's size, radius and color; nothing cuts or pops.
- Content that changes inside the shape swaps with a short blur, and the old content is gone before the new appears (`swap`).
- Springs everywhere, from `src/springs.ts`, with a tiny overshoot at most. Anything that slides between positions uses `useLiquid`.
- Drags follow the pointer directly: while held, the value comes from the pointer position; on release it springs back from wherever it was, keeping its speed. Past a limit it stretches like rubber, then springs back.
- Warm-gray canvas, black and white components, one lime accent (`--color-accent`), Geist.
- Sizes follow the existing components: compact controls are 32 px tall (`h-8`, as in `Toggle` and `SegmentedTabs`), buttons and sliders 44 px (`h-11`, as in `MorphButton` and `VolumeSlider`). Text is 13–15 px, small print 11 px. Surfaces are `bg-paper` or `bg-ink` with `shadow-float`.
- Banned: bouncy easing, particle bursts, glows, gradients on UI chrome, mismatched icon strokes, dead time, anything that looks like a template.
- Icons are inline SVG on a 24 grid with stroke-width = 36 / rendered size, so every line renders at 1.5 px (size-3 → 3, size-3.5 → 2.6, size-4 → 2.25, size-5 → 1.8, size-6 → 1.5).
- Secondary text: `text-muted` on light surfaces, `text-paper/55` on dark ones (both pass WCAG AA contrast).
- No red or amber. Status colors: info is `ink`, warning is `paper` with an ink icon, success is `accent`. Errors are ink text with an icon, plus `aria-invalid` and `aria-describedby` on the field.

## API rules: generic and reusable

- No hardcoded user-facing text inside a component. Visible labels, placeholders, empty states, status words, aria-labels and aria-valuetext are all props with an English default. Text that includes data is a function prop with a default, e.g. `openLabel = (title: string) => \`Open player, ${title}\``. Numbers, dates and durations get a format prop with a default; for plain numbers that default is `(value: number) => value.toLocaleString("en-US")`.
- Data comes in as props (options, items, steps…), each item with a `label` and an optional `icon`.
- Values the parent cares about are controlled: `value` + `onValueChange`, `open` + `onOpenChange`, `checked` + `onCheckedChange`. Temporary UI state (hover, highlight, drag in progress) stays inside the component.
- Only the data, the value and its callback are required. Everything else is optional with a default, so `<Select options={…} value={v} onValueChange={setV} />` works on its own.
- Put defaults in the parameter destructuring, so Storybook shows them and lets you edit them in the Controls panel.
- Export the props type as `<Name>Props`. Every component and its props type is exported from `src/index.ts` (the maintainer adds the lines).

```tsx
export type SelectProps = {
  options: { value: string; label: string; icon?: React.ReactNode }[];
  value: string | null;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  emptyText?: string;
};

export function Select({
  options,
  value,
  onValueChange,
  placeholder = "Select",
  label = "Choose an option",
  emptyText = "No options",
}: SelectProps) {
```

## Code conventions

- `src/components/<category>/<Name>.tsx` plus `<Name>.stories.tsx`. Named exports, double quotes, semicolons.
- No comments except a one-line JSDoc on props whose meaning isn't obvious. No checks for states the types or the parent already rule out.
- Accessible: the right ARIA role, full keyboard support (arrows, Enter, Space, Escape, as the pattern expects), focus ring `outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink` (`outline-paper` inside dark surfaces, as in `MusicPlayer`).
- Stories:
  - CSF3 with `satisfies Meta<typeof Name>`, `title: "<Group>/<Name>"`, and `id: "components-<name in lowercase>"` to keep story URLs stable.
  - One `Default` story with a one-line JSDoc saying how to interact.
  - `useArgs` so controlled props stay in sync with the Controls panel.
  - Values that change continuously (typing, dragging) are the exception: `updateArgs` lands too late, so keys get lost and drags lag behind the pointer. Keep the value in React state in a small wrapper component in the story file (React's `useState` can't sit next to `useArgs` in one render function) and mirror it to Controls with `updateArgs`; see `TextField.stories.tsx` and `VolumeSlider.stories.tsx`.
  - `fn()` for callbacks, except ones that fire every frame (see `VolumeSlider.stories.tsx`).
  - Add another story only for a state you can't reach by interacting.
- Known pitfalls:
  - Motion's `width: "auto"` only animates when the target changes. For pills that size to their content, measure the new content with `useWidth` (see `Toast`).
  - Content layers inside a morphing container get a fixed size and are centered, so nothing reflows mid-morph (see `MusicPlayer`).
  - Swap layers stacked in a grid (`col-start-1 row-start-1`) need `place-content-center` as well as `place-items-center`; otherwise the track is as wide as the widest layer, hangs off one side, and the other layer jumps off-center mid-morph.
  - Motion starts springs set by duration (`shape`, `soft`, `useLiquid`) from rest, even when the value is moving. When a release should keep its speed, animate with `snap`.
  - SVG attributes can't read CSS variables; use `fill-*` and `stroke-*` classes.
  - Storybook binds ⌘K to its own search, so test keyboard shortcuts in `iframe.html` (`check_story.py` does).
  - Storybook's `updateArgs` re-renders on a later tick (it waits at least 100 ms, plus any running animation); wait about 250 ms before checking the result.
  - A control inside an `overflow-hidden` shape gets its focus ring clipped. Put the ring on the shape with `has-focus-visible:` (see `Select`, `TextField`), or clip with `[clip-path:inset(-4px)]` instead of `overflow-hidden` so each child keeps its own ring (see `Breadcrumbs`).
  - Sizes measured on mount can come from the fallback font; measure again when `document.fonts.ready` resolves (see `UnderlineTabs`).
  - `.focus()` on an element inside an `overflow-hidden` shape can scroll the shape; pass `{ preventScroll: true }`.
  - Set a list's highlight on `onMouseMove`, not `onMouseEnter`: rows that grow in under a resting pointer would otherwise take the highlight from the keyboard.
  - `dragHandlers` capture the pointer on press, so in Chromium the click that follows goes to the dragged element, never to a button inside it. Keep buttons out of the dragged element (see `BottomSheet`'s grab strip).
  - `whileTap` turns Enter into fake `pointerdown`/`pointerup` events; don't combine it with your own pointer handlers on an element that also handles Enter (see `HoldButton`).
  - Drags need pointer capture and `touch-none`.
  - A grid row whose cells are all empty collapses to 0 px; give rows a fixed height when positions assume a fixed row count (see `DatePicker`).

## Working as a subagent

- You own exactly two files: `src/components/<category>/<Name>.tsx` and `src/components/<category>/<Name>.stories.tsx`. Don't edit anything else. If a shared file (`src/springs.ts`, `src/index.css`, shared hooks, `src/index.ts`, this file) needs a change, propose it in your report.
- Follow the `morph-component` skill (`.claude/skills/morph-component/SKILL.md`): plan, build, story, `npx tsc --noEmit`, `check_story.py`, report.
- Other subagents work in the same tree at the same time. Type errors in files you don't own get reported, not fixed. Don't run `npm run build-storybook`.
