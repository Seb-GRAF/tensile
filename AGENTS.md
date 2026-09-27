# morph-components

A React design system of animated components, shown in Storybook. Every component is generic: all data and all text come in as props, with English defaults. Components compose each other, so forms, dashboards and pages are built from the same pieces.

## Stack and commands

- React 19, TypeScript (strict), Motion (`motion/react`), Tailwind 4, Storybook 10 (react-vite), Geist.
- `npx tsc --noEmit` type-checks everything.
- `npm run storybook` and `npm run build-storybook` are for the lead. Subagents check stories with the `morph-component` skill's `check_story.py`, which starts its own server. Never stop a Storybook you didn't start.
- `npm run build` builds the package into `dist/` (`index.js`, type declarations, `styles.css`, the opt-in `reset.css`); `npm run check:consumer` builds it and checks `examples/consumer` against it (types, a Vite build without Tailwind, server rendering of every export). Both are for the lead.

## Architecture

Three levels. They describe dependencies, not folders:

- **Foundations**, in the `src/` root: tokens (`theme.css`), motion (`springs.ts`), measuring (`useWidth.ts`, `useSize.ts`), interaction (`drag.ts`, `list.tsx`, `overlay.ts`, `Modal.tsx`, `Expand.tsx`), icon shapes (`icons.tsx`, `Check.tsx`), media (`playback.ts`, `SeekBar.tsx`). The lead owns them.
- **Primitives**: one responsibility each, usable on their own (`Icon`, `Spinner`, `Toggle`, `Checkbox`, the tablists, the sliders, `NumberTicker`, `Badge`…).
- **Composed components**: they combine primitives (`Select`, `Dialog`, `TextField`…).
- **Examples and recipes**: stories in `src/examples/` that build pages from public exports only.

Rules:

- Dependencies point one way: foundations ← primitives ← composed ← examples. No cycles.
- Use the component that owns a responsibility instead of rebuilding it: button behavior lives in `Button`, text-field styling in `Input`, label/description/error wiring in `Field`, loading visuals in `Spinner`, icons in `Icon`. Import components directly (`import { Spinner } from "../feedback/Spinner"`).
- Share a responsibility, not a look-alike. Menu items, listbox options, nav links and table rows keep their own markup and roles even where they look alike; two divs with similar classes don't make a component.
- Never nest interactive elements (no button inside a button or link). A morph or a clipped text layer may draw content twice; keep the copy `aria-hidden`, so there is one accessible copy.
- One morphing shape per control or surface, not per page. A form, a table or a layout is ordinary structure and isn't animated for its own sake.

Files: `src/components/<category>/<Name>.tsx` plus `<Name>.stories.tsx`. Categories match the Storybook groups: `actions` (Actions), `inputs` (Inputs), `navigation` (Navigation), `feedback` (Feedback), `data-display` (Data display), `layout` (Layout), `overlays` (Overlays), `media` (Media). `src/foundations/` holds the Foundations stories (tokens, motion), `src/examples/` the composed examples.

## What exists

Read the component you start from in full and copy its shape.

Actions:

- `Button`: the ordinary action button, a native `<button>` (`type="button"` unless set), `variant` primary (ink), secondary (paper) or ghost (the current text color), `size` md (44 px) or sm (32 px); `press`, instant hover; exports its `base` and `variants` classes for IconButton.
- `IconButton`: an icon-only Button, 44 or 32 px square; `label` is its required accessible name.
- `MorphButton`: native button props (except Motion-conflicting onDrag/onDragStart/onDragEnd/onAnimationStart), with React-node children; one shape follows `status`, content blur-swaps through Spinner and Check; non-idle or explicitly disabled cannot activate.
- `CopyButton`: an icon pill that widens to a lime `Check` and "Copied" with `useWidth`, then settles back.
- `HoldButton`: a lime fill grows at a steady rate while held (pointer, Space or Enter), springs back with `snap` if released early; a parent-controlled `done` morphs it into MorphButton's success.
- `SwipeButton`: measures its container for the knob travel; the ink fill is dragged from where it is grabbed, with rubber at the limits; `onConfirm` at the end, controlled accent success, Enter/Space confirmation.
- `ActionMenu`: menu button with an optional custom trigger; one shape grows into `Menu` in the top layer, flips up and caps the scrolling list to available room; disabled actions, arrows, Home/End, typeahead and focus return; list stays mounted and inert when closed.
- `CommandPalette`: full-width inline combobox and scrolling listbox built on `src/list.tsx`; rows blur in and out as filtering changes; arrows, Home/End and ⌘K; `Kbd` shortcut hint.

Inputs:

- `Input`: a native `<input>` in a paper pill (44 px, fills its container); `value`/`onValueChange`, `leading`/`trailing` slots; `className` and `style` go on the pill, everything else on the input; reads `useField()`.
- `Textarea`: a native `<textarea>` as its own `rounded-overlay` surface that grows with its content from `rows`; reads `useField()`.
- `Field`: a visible label, the control, a description and an error that blur-swaps; `useField()` gives controls `{ id, labelId, describedBy, invalid, required, disabled }` (null outside a Field; only `disabled` directly inside a Fieldset).
- `Fieldset`: a native `<fieldset>` with a legend, description and error; its `disabled` reaches native controls through the element and div-based ones through `useField()`.
- `Toggle`: native checkbox with `role="switch"` over the track; a `useLiquid` knob and a morphing track; native form props and Field context; Space toggles.
- `ThemeToggle`: composes Toggle, with one sun/moon path in its knob; the dark track scopes the accent token; `name` and `disabled` reach the checkbox.
- `Checkbox`: native checkbox with a visible wrapping label, an accent fill and the shared `Check`; `indeterminate` sets the native property and shows a dash; native form props.
- `CheckboxGroup`: named group of Checkboxes with a controlled string array; native repeated named values, Field/Fieldset context and disabled options.
- `RadioGroup`: native radios sharing a name, with native keyboard navigation and optional disabled options; a `useLiquid` dot slides between rings; Field/Fieldset naming and form props.
- `ColorSwatches`: native radios sharing a name; one ink ring with a paper lining slides between swatches with `useLiquid`; Field/Fieldset naming and form props.
- `Rating`: liquid accent fill clipped to star outlines; interactive slider with Field/form props, or a noninteractive named image when readOnly.
- `TextField`: native input props with its own floating label (no placeholder prop); full-width shape, with className/style on that shape; error grows it into a card and blur-swaps; no enclosing Field.
- `PasswordInput`: Input with a ghost IconButton that toggles password visibility; eye paths blur-swap; Input props and current-password autocomplete by default.
- `SearchField`: round search trigger expands to its container width; Escape clears, then folds; an IconButton clears the value and returns input focus; optional native name.
- `Select`: full-width select-only combobox with Field context and a hidden named input; its top-layer menu flips up, scrolls within available room and escapes clipping; arrows, Home/End, typeahead, blur-swapped value and a selected `Check`.
- `Combobox`: Select’s form and top-layer behavior with a text input; `filterByWords` filters rows, which blur and slide as results change; Enter picks without submitting the form.
- `TagInput`: composes removable Tags, with chips/input sliding through layout position and height measured by useSize; repeated hidden named inputs, Field context and disabled state.
- `OTPInput`: one input per digit with one-time-code autocomplete, a shared liquid focus ring and blur-swapped digits; paste fills the cells; hidden named code, disabled and Field error/required wiring.
- `EditableText`: a display Button morphs into an Input with measured content width; Enter/blur commit, Escape cancels, focus returns to the display.
- `NumberInput`: Input-based numeric entry with raw draft text while focused and formatted display on blur; Enter/blur commit and clamp, arrows step; empty becomes null, invalid input keeps the prior value; plain hidden form value.
- `NumberStepper`: Field-aware spinbutton with NumberTicker between ghost IconButtons; hidden named value and disabled state; a step beyond a limit gives useStretch a scale-adjusted snap kick.
- `RangeSlider`: VolumeSlider's track with two knobs in the ink fill; a press grabs the nearer knob; knobs stop at each other; the track stretches past the grabbed knob's end.
- `TimeWheel`: hour, minute and AM/PM wheels (`role="spinbutton"`); a flick lands on the row nearest position + velocity × 0.1 s with `snap`; hours and minutes loop, AM/PM stretches with `rubber`.
- `DatePicker`: a `role="grid"` month with roving focus; the selected pill's edges ride two `useLiquid` pairs, so it stretches across rows and columns; months blur-swap in the direction of travel; the value is "YYYY-MM-DD".
- `FileUpload`: a drop-zone button morphs into a progress pill (a lime `useLiquid` fill and a `NumberTicker` percentage), then into MorphButton's success.

Navigation:

- `Link`: a native `<a>` in the current text color with a light underline; inside `LinkProvider navigate={…}`, plain left clicks on same-origin links call `navigate(href)` instead of loading the page. `useLinkClick()` (from `Link.tsx`) gives the same click handling to components that render their own `<a>`.
- `SegmentedTabs`: tablist with roving focus and arrow keys; a `useLiquid` pill in percent; the selected label is a second, clipped layer in `paper`.
- `UnderlineTabs`: SegmentedTabs' tablist with tabs sized to their labels; a `useLiquid` underline in px, measured from the selected tab and again once fonts load.
- `TabBar`: mobile bottom tablist; a `useLiquid` pill slides behind the selected icon; each item's `icon` blur-swaps to its `activeIcon`.
- `SidebarNav`: a `nav` list with `aria-current="page"`; SegmentedTabs' ink pill and clipped `paper` layer, turned vertical; ArrowUp/ArrowDown move focus only.
- `CollapsibleSidebar`: an icon rail whose width springs into the sidebar (pushing the content, not overlaying); labels blur in after it widens and out before it narrows; SidebarNav's pill grows with it.
- `Breadcrumbs`: middle crumbs collapse into a "…" pill whose width springs out to the hidden crumbs, which blur in; `clip-path: inset(-4px)` keeps each crumb's focus ring.
- `Pagination`: page numbers in fixed slots that blur-swap when the window shifts; SegmentedTabs' pill slides to the current page.
- `PageDots`: a `role="slider"` row of dots; the active dot is a `useLiquid` pill; a press or drag picks the page under the pointer; past either end the capsule and pill stretch with `rubber`.
- `WizardSteps`: display-only `<ol>` of steps; one ink line draws between dot centers with `pathLength` on `soft`; a finished dot turns accent with the `Check`.

Feedback:

- `StatusBadge`: a 24 px status pill (info ink, success accent, warning paper with an ink icon and a line rim, neutral hover tone); a new status fades the color on `soft`, blur-swaps the label, and the width follows it.
- `Skeleton`: an `aria-hidden` placeholder with the `animate-shimmer` pulse; the caller's `className` sizes and rounds it.
- `Spinner`: `<Spinner size={16} />`, a turning arc in the current text color; decorative, so the busy control or region carries the name; stops at motion scale 0.
- `Toast`: status pill sized by `useWidth`, with a blur swap and `Spinner` while loading.
- `ToastStack`: full-width stack that fans out while hovered or focused; `IconButton` dismissals hand focus to a remaining toast; rows blur out and spring into place.
- `Alert`: full-width `rounded-overlay` card measured by `useSize`; status color fades, one icon path morphs and text blur-swaps as height springs; success uses `text-on-accent`.
- `Badge`: a white dot that grows into a lime count pill; digits roll with `NumberTicker` and the pill's width follows them; 0 hides it.
- `ProgressBar`: measured full-width track; a `useLiquid` fill or an indeterminate segment that sweeps end to end; at motion scale 0 the segment rests centered.
- `ProgressRing`: an arc on `soft` (not `shape`, whose overshoot below 0 flashes a full ring); at 1 the disc turns accent and the `Check` draws.

Data display:

- `Tag`: a 28 px `bg-hover` pill with a label and optional icon; with `onRemove`, a remove button beside the text, and the focus ring on the pill.
- `Kbd`: a native `<kbd>` key cap, 22 px, inline in text.
- `List`: a bare `<ul role="list">` of rows (leading slot, truncating title, description, trailing slot) separated by `line` rules; display only.
- `DescriptionList`: a `<dl>` of label/value pairs, side by side from 384 px of its own width (a container query), stacked below.
- `Timeline`: an `<ol role="list">` of events joined by a line through dots or icon circles; title, time and description.
- `Avatar`: a circle with an `Image`, or ink initials when there's no image or it fails; `size` sm, md or lg (24, 32, 44 px); named by `name`.
- `AvatarGroup`: overlapping avatars with paper rings and a "+N" circle past `max`; a list named by `label`.
- `Icon`: `<Icon size={16}>{shapes}</Icon>`, shapes on a 24 grid in the current text color; the stroke follows `size`, so lines render at 1.5 px; `aria-hidden`.
- `NumberTicker`: digit strips roll on `shape` in the direction the value moved; characters that come or go blur in while their width springs; takes font size, weight, color and line height from its parent.
- `StatTile`: full-width `Card tone="ink"` with `NumberTicker`; a change chip fades between accent and paper while its arrow turns and its text follows the fill.
- `LineChart`: full-width ink Card with an SVG line drawing on `draw`; guide and tooltip glide between points with pointer or ArrowLeft/Right/Home/End; live status reports the point.
- `BarChart`: full-width ink Card with springing bars; `useLiquid` hover/focus highlight and a gliding tooltip; a named group with arrow/Home/End keys and a live status.
- `DonutChart`: full-width ink Card with arcs on `draw`; hovered or focused arcs thicken outward and the center text blur-swaps.

Layout:

- `Card`: a surface (`rounded-card`, `shadow-float`), `tone` paper or ink, no padding of its own; the ink tone sets the focus ring to paper and `line` to ink-3 inside.
- `Separator`: a native `<hr>` rule in `line`, horizontal or vertical (stretching to its flex or grid row).
- `Accordion`: each item is a paper pill whose height springs to `auto` to hold its panel; the panel stays mounted and `inert` when closed and blur-swaps; one item open at a time.
- `ExpandableCard`: `Expand` with `anchor="corner"`: a 280 × 72 card grows into a 360 × 400 detail view.
- `SplitPane`: two panes and a `role="separator"`; the value is a fraction of the width; past `min`/`max` the pane goes `rubber` px further and springs back; the grip grows and turns ink while held.

Overlays:

- `Popover`: `Expand` with `anchor="corner"`: the trigger pill grows into a non-modal dialog toward the side with room; a window `pointerdown` listener closes it on a click outside.
- `Tooltip`: one ink tooltip shared by a `role="toolbar"` of buttons; it glides between targets on `shape`, its width follows its text, the text blur-swaps; 400 ms before the first show.
- `Dialog`: `Expand` inside a layer that flies to the middle of the viewport on `shape` while it grows; modal, with a backdrop, Tab kept inside, focus back to the button.
- `BottomSheet`: a `role="dialog"` sheet whose offset is a fraction of its height; dragged from its top strip; the release projects position + velocity × 0.2 s to close or spring back; the backdrop's opacity follows the offset.
- `Island`: `Expand` with a compact width from `useWidth`; `leading`/`trailing` in the pill, `children` in the panel; a new `activity` blur-swaps both and morphs the width.

Media:

- `Image`: a native `<img>` in a box the caller sizes and rounds; a `bg-hover` placeholder until it loads, then it fades in on `soft`; on error, `fallback` blurs in instead.
- `VolumeSlider`: slider drag built on `src/drag.ts`: the value comes from the pointer, the pill stretches past either end with `rubber` and `useStretch`, and springs back with `snap`; arrow-key steps.
- `MusicPlayer`: an island that expands into a player, built on `Expand`; play/pause path morph; `SeekBar`.
- `VideoControls`: a controlled dark bar with the play/pause morph, `SeekBar` and a VolumeSlider-style volume.
- `WaveformScrubber`: bars filled up to the position by a clipped second row; the drag pieces from `src/drag.ts` make it follow the pointer and stretch past the ends.
- `CompareSlider`: before/after layers, the after layer clipped at the divider; the frame is the drag area; a `role="slider"` knob; the focus ring sits on the frame.
- `Lightbox`: a thumbnail row; the clicked thumbnail's measured box springs (left, top, size, radius) into a 3:2 full view over a backdrop and back; arrows blur-swap the picture.

Shared code (owned by the lead; read-only for subagents unless a brief assigns a file):

- `src/theme.css`: the tokens (see Tokens), the `press` utility, and the `animate-spinner` and `animate-shimmer` animations. `src/index.css` is the library stylesheet built from it; Storybook loads `.storybook/preview.css`, which adds the page background and the alternate theme.
- `src/springs.ts`: `useSprings()` and `useLiquid` (see Motion). The constant exports `shape`, `soft`, `snap` and `swap` are deprecated: they ignore motion settings and go once every component uses `useSprings`.
- `src/icons.tsx`: `icons.close`, `icons.chevronLeft`, `icons.chevronRight`, `icons.chevronsUpDown`, `icons.search`, `icons.alert`, `icons.plus`, `icons.minus`: shapes more than one component draws, used as `<Icon size={16}>{icons.close}</Icon>`. A shape one component draws stays in that component; propose moving it here when a second one needs it.
- `src/Check.tsx`: `<Check size={20} />`, a check in the current text color that draws itself when it mounts, with the stroke worked out from `size`. Put it in a `motion.span` with `swap` to blur it in and out.
- `src/useWidth.ts`: `const [width, measure] = useWidth();` measures the element you pass `measure` to as its `ref` (again once fonts have loaded). Key that element by its content so each new version gets measured, then animate the shape to `width` (see `Toast`).
- `src/useSize.ts`: `const [size, ref] = useSize();` width and height of the element you pass `ref` to, measured on mount and on every resize. For geometry that follows the container: a slider's travel, a chart's slots. `size` is undefined until the first measurement.
- `src/list.tsx`, taken from `CommandPalette`: `ROW` (40 px rows); `filterByWords(items, query)`, the word-prefix filter; `const [active, setActive, onArrowKey] = useActiveIndex(count)`, the highlighted row with ArrowUp/ArrowDown wrapping and Home/End (call `onArrowKey` from the key handler of whatever holds focus; Enter and Escape stay in the component); `<ListHighlight index={active} />`, the `bg-hover` highlight that slides and stretches behind a row, placed first in a `relative` list. `useTypeahead(items, active, setActive)` matches label prefixes with a 700 ms timeout; `scrollToRow(list, index)` scrolls only the list, keeping the enclosing morph stable.
- `src/Menu.tsx`: shared action/context menu rows, highlight, disabled actions, keyboard selection and typeahead; focuses its list on open and calls `onClose(restoreFocus)` on dismissal. The owner supplies placement, trigger and focus return.
- `src/drag.ts`, taken from `VolumeSlider`: `{...dragHandlers(onDrag, onRelease)}` on the element dragged over (with `touch-none`) captures the pointer and calls `onDrag(event)` on press and on every move while held, `onRelease()` when it lets go; `rubber(over)` turns px dragged past a limit into px drawn past it (at most 24); `const [stretch, style] = useStretch(width, height)` gives a pill that gets longer and thinner as `stretch` goes past an end. Set the dragged value from the pointer while held (a `MotionValue` you `set()` tracks its speed), then `animate(value, target, snap)` on release so it keeps that speed. On press, `stop()` the value: `set()` doesn't stop a spring that's still running from the last release, and the spring would win.
- `src/overlay.ts`: `const { room, settle } = useTopLayer(frame, open)` lifts `frame` — a transparent `absolute inset-0` box inside a shape's `relative` wrapper — into the browser's top layer while `open`, exactly over the wrapper and following it every frame, until you call `settle` from the shape's `onAnimationComplete`; the shape inside keeps its own position, overlays everything, and escapes `overflow: hidden` and transformed ancestors, while DOM order and Tab order stay put. `room` (`above`, `below`, `left`, `right` in px, measured when it opened) is for opening upward or capping a menu's height. `useOutsidePress(ref, open, onPress)` calls `onPress` on a pointer press outside `ref` while open.
- `src/Modal.tsx`: `<Modal open onClose aria-label>{layers}</Modal>`, the modal base for dialogs, sheets and the lightbox: a native `<dialog>` shown with `showModal()` in a portal on `document.body`, so the page behind is inert, Tab stays inside, Escape calls `onClose`, and the page doesn't scroll. Its children are the layers that animate in and out (a backdrop, a panel), each with an `exit`; mark the element to focus first with `data-autofocus` (not React's `autoFocus`, which fires before the dialog opens). When `open` turns false it closes the dialog at once, so focus returns to the opener and the page is usable immediately, and it keeps the layers painted until their exit animations end. Nothing renders on the server. Portaled content is outside the story root; `check_story.py` finds it anyway.
- `src/Expand.tsx`, taken from `MusicPlayer`: `<Expand open onOpenChange closed={{ width, height, radius }} opened={{ … }} anchor="center" | "corner" label trigger={…} className="bg-ink text-paper">{panel}</Expand>`. One shape springs between the two sizes on `shape`; the radii are CSS lengths, usually tokens (`"var(--radius-control)"` closed, `"var(--radius-overlay)"` or `"var(--radius-dialog)"` open). It takes the closed size in the layout and, lifted with `useTopLayer`, overlays everything when open, growing from the closed shape's center or from the corner that leaves it the most room in the viewport, shifting horizontally when neither side fits. The closed shape is a button (`label` names it, `trigger` is its content); the open content (`children`) is a fixed-size layer; both blur-swap. With `panelLabel`, the open layer is a named dialog and the button says it opens one. Focus moves into the panel on open and back to the button on close (unless the user has moved it to something else), Escape closes, and the focus ring sits on the shape while the button has it. Clicking outside is up to you (`useOutsidePress`).
- `src/SeekBar.tsx`, taken from `MusicPlayer`: `<SeekBar value={seconds} duration onValueChange onScrubChange label valueText />`, a media progress bar for dark surfaces (`bg-ink-3` track, `bg-paper` fill). While held it follows the pointer, thickens, and stretches past either end with `rubber`, springing back with `snap`; `onScrubChange(true/false)` lets playback wait while scrubbing; ArrowLeft/ArrowRight skip 5 s.
- `src/playback.ts`: `playPausePath(morph)`, the path from the play triangle (0) to the pause bars (1), and `clock(seconds)`, m:ss (used by `MusicPlayer`, `VideoControls`, `WaveformScrubber`).
- `src/index.ts`: exports every component and its props type (the lead adds the lines).

## Tokens

The tokens are CSS custom properties defined once, in `src/theme.css`. Use the utilities they generate; never hard-code a value a token covers.

| Token | Default | Use | Utility |
|---|---|---|---|
| `--color-canvas` | `#ebe9e4` | page background | `bg-canvas` |
| `--color-paper` | `#ffffff` | surfaces; text on ink | `bg-paper`, `text-paper` |
| `--color-ink` | `#111110` | primary: main text, primary surfaces | `text-ink`, `bg-ink` |
| `--color-ink-3` | `#2e2e2c` | raised parts on ink (tracks) | `bg-ink-3` |
| `--color-muted` | `#75736e` | secondary text on light surfaces | `text-muted` |
| `--color-line` | `#e9e7e2` | separators and borders | `bg-line`, `border-line` |
| `--color-hover` | `#f3f1ed` | hover and highlight on paper | `bg-hover` |
| `--color-accent` | `#b8f23e` | accent: success, active fills | `bg-accent` |
| `--color-on-accent` | ink | text and icons on accent | `text-on-accent` |
| `--color-focus` | ink | focus ring | `outline-focus` |
| `--font-sans` | Geist Variable | all text | `font-sans` |
| `--text-caption` | 11 / 16 px | small print, axis labels, weekday headers | `text-caption` |
| `--text-label` | 13 / 20 px | compact controls, secondary lines, errors | `text-label` |
| Tailwind | 14 / 20 px | menu and list rows, disclosure triggers | `text-sm` |
| `--text-body` | 15 / 22 px | fields, buttons, dialog titles | `text-body` |
| Tailwind | 16 px and up | titles, display numbers, headings | `text-base`, `text-xl`… |
| `--radius-control` | 26px | controls: pills up to 52 px tall | `rounded-control` |
| `--radius-overlay` | 20px | open menus and popovers, alerts, open accordion items, error cards | `rounded-overlay` |
| `--radius-card` | 24px | cards, panels, full-view images | `rounded-card` |
| `--radius-dialog` | 28px | dialogs, sheets, drawers, expanded detail views | `rounded-dialog` |
| `--shadow-float` | | every floating surface and control | `shadow-float` |
| `--layer-raised`, `--layer-sticky`, `--layer-overlay` | 10, 20, 50 | a shape over its in-flow neighbors; sticky headers; an overlay animating out of the top layer | `z-(--layer-raised)`… |
| `--container-page` | 72rem | page content width | `max-w-page` |
| `--motion-duration-scale` | 1 (0 under reduced motion) | multiplies every animation's duration and delay | see Motion |

- Text on `paper` is `ink`, secondary `muted`; on `ink` it's `paper`, secondary `paper/55` (both pass WCAG AA); on `accent` it's `on-accent`, never an assumed ink, since an app's accent can be dark. Accent on ink is for icons, lines and large text.
- Focus ring: `outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus`, or `has-focus-visible:` on the shape. A dark surface sets `[--color-focus:var(--color-paper)]` on its root instead of using another outline color.
- `rounded-control` stays a full pill up to 52 px tall, because CSS caps a radius at half the height. Circles stay `rounded-full`: knobs, dots, avatars, rings. A shape that morphs animates its radius between `"var(--radius-…)"` strings; Motion resolves them when an animation starts, so the morph follows overrides.
- Sizes are a fixed scale, not tokens, because geometry is computed from them: compact controls `h-8` (32 px, as in `Toggle` and `SegmentedTabs`), buttons, fields and sliders `h-11` (44 px, as in `MorphButton` and `VolumeSlider`), large fields `h-13` (52 px), list rows `h-10`, chips `h-7`, badges `h-6`. Don't override `--spacing`.
- No `text-[…px]`, no arbitrary radii for these roles. Numbers that are geometry (SVG coordinates, pointer math, measured sizes, percentages) stay numbers.
- Disabled: `opacity-40` and no interaction. Hover on paper: `bg-hover`. Selected: an ink pill with paper text.
- An app overrides tokens by setting them on `:root` (or any subtree, except the motion scale, which is read from the root) in CSS loaded after the library's; the library declares them in `@layer theme`, so any unlayered rule wins. A speed override belongs inside `@media (prefers-reduced-motion: no-preference)`, or it undoes reduced motion.

## Motion

- `const { shape, soft, snap, draw, swap, spring, scale } = useSprings();` in every component, and every sub-component, that animates:
  - `shape` for size and position, `soft` for color and opacity, `snap` for the release after a drag (the only one that keeps a moving value's speed), `draw` for a line or arc drawing itself, `swap` for the blur swap (`{...swap}` on a layer inside `AnimatePresence`), `spring(visualDuration, bounce)` for a one-off spring, `scale` for delays and timed effects.
  - Every Motion animation takes one of these. Nothing relies on Motion's default transition: no `animate` without a `transition`, no `whileTap`. Press feedback is the `press` utility class.
  - Multiply delays by `scale` (`{ ...soft, delay: 0.15 * scale }`); divide a velocity you hand to `snap` by it.
- `--motion-duration-scale` sets the speed: 1 as designed, 2 twice as slow, 0 no animation. The library CSS sets it to 0 under `prefers-reduced-motion: reduce`, so don't check reduced motion yourself. It's read when a component mounts; a change reaches components mounted afterwards (Storybook's Theme toolbar remounts the story).
- CSS effects use the same token: `press`, `animate-spinner`, `animate-shimmer`, or `calc(<ms> * var(--motion-duration-scale))`.
- Functional timers never read the scale: a hold duration, a copy reset, a tooltip delay, a toast lifetime, a debounce, media time.
- At scale 0, state changes are instant and repeating effects stop, but drags still follow the pointer, a flick still picks its target from the measured velocity, and focus moves never wait for an animation.

## Look

- One shape per control or surface. Changing state morphs that shape's size, radius and color; nothing cuts or pops.
- Content that changes inside the shape swaps with a short blur, and the old content is gone before the new appears (`swap`).
- Springs everywhere, from `useSprings`, with a tiny overshoot at most. Anything that slides between positions uses `useLiquid`.
- Drags follow the pointer directly: while held, the value comes from the pointer position; on release it springs back from wherever it was, keeping its speed. Past a limit it stretches like rubber, then springs back.
- Warm-gray canvas, black and white components, one accent, Geist. Surfaces are `bg-paper` or `bg-ink` with `shadow-float`.
- Banned: bouncy easing, particle bursts, glows, gradients on UI chrome, mismatched icon strokes, dead time, anything that looks like a template.
- Icons are `Icon`: a 24 grid with stroke-width = 36 / rendered size, so every line renders at 1.5 px (12 px → 3, 14 → 2.6, 16 → 2.25, 20 → 1.8, 24 → 1.5). A hand-drawn SVG follows the same rule.
- No red or amber. Status colors: info is `ink`, warning is `paper` with an ink icon, success is `accent`. Errors are ink text with an icon, plus `aria-invalid` and `aria-describedby` on the field.

## API rules: generic and reusable

- No hardcoded user-facing text inside a component. Visible labels, placeholders, empty states, status words, aria-labels and aria-valuetext are all props with an English default. Text that includes data is a function prop with a default, e.g. `openLabel = (title: string) => \`Open player, ${title}\``. Numbers, dates and durations get a format prop with a default; for plain numbers that default is `(value: number) => value.toLocaleString("en-US")`. Where no generic name makes sense (an icon-only button), the label is required.
- Data comes in as props (options, items, steps…), each item with a `label` and an optional `icon`.
- Values the parent cares about are controlled: `value` + `onValueChange`, `open` + `onOpenChange`, `checked` + `onCheckedChange`. Actions are events (`onAction`, `onConfirm`). Temporary UI state (hover, highlight, drag in progress) stays inside the component. There are no uncontrolled modes.
- Only the data, the value and its callback are required. Everything else is optional with a default, so `<Select options={…} value={v} onValueChange={setV} />` works on its own.
- A primitive backed by one native element (a button, a link, an input, a textarea) takes that element's props: `Omit<React.ComponentProps<"input">, "value" | "onChange">` plus its own. The rest spreads onto the native element, so `type`, `name`, `disabled`, `required`, `autoComplete`, `aria-*`, `data-*` and `ref` (a plain prop in React 19) reach it. It reports changes with `onValueChange`; it doesn't also expose `onChange`.
- A composite control (a select, a date picker, a slider) takes `id`, `name`, `disabled`, `required` and `className`. `name` renders hidden inputs, so the value is in the form's data and a form reset works through the parent's state. `required` sets `aria-required`; errors come from `Field`.
- Inside a `Field`, a control takes its id, `aria-labelledby`, `aria-describedby`, `aria-invalid`, `required` and `disabled` from `useField()` and drops its own aria-label default. Components with their own visible label (`TextField`, `Checkbox`) don't go inside a `Field`.
- Navigation items take an `href` and render a link; items without one stay buttons that call the callback.
- Fields, tables, sliders, charts and cards fill their container's width; buttons, tabs, toggles and pills size to their content. Fixed sizes remain only where they are the component's geometry. Every component takes `className` for its outer element; demo widths live in stories.
- `className` is for placement and size: width, height where the component sets none, margin, flex and grid placement, padding on a bare surface like `Card`. It can't restyle the component: Tailwind has no rule for which of two utilities for the same property wins (`px-5` vs `px-0`), so never set a utility on your outer element that a caller would need to replace, and never override one component's classes from another. A different look is a prop.
- Content is a React node wherever it is content: button labels, card and dialog bodies, triggers.
- Nothing couples to a router, a backend, a form library or an app store.
- Put defaults in the parameter destructuring, so Storybook shows them and lets you edit them in the Controls panel.
- Export the props type as `<Name>Props`. Every component and its props type is exported from `src/index.ts` (the lead adds the lines).

```tsx
export type SelectProps = {
  options: { value: string; label: string; icon?: React.ReactNode }[];
  value: string | null;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  emptyText?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
};

export function Select({
  options,
  value,
  onValueChange,
  placeholder = "Select",
  label = "Choose an option",
  emptyText = "No options",
  name,
  disabled = false,
  className = "",
}: SelectProps) {
```

## Code conventions

- Named exports, double quotes, semicolons. `className = ""` in the destructuring, appended last to the outer element's classes.
- No comments except a one-line JSDoc on props whose meaning isn't obvious; shared modules document each export in one JSDoc. No checks for states the types or the parent already rule out.
- Accessible: the right ARIA role, full keyboard support (arrows, Home, End, Enter, Space, Escape, as the pattern expects), the focus ring above.
- Stories:
  - CSF3 with `satisfies Meta<typeof Name>`, `title: "<Group>/<Name>"`, and `id: "components-<name in lowercase>"` to keep story URLs stable.
  - A `Default` story with a one-line JSDoc saying how to interact.
  - Add a story only for a contract Default can't show: disabled or read-only, loading, error, empty, inside a form (submit and reset), a composition, an alternate configuration. Not every prop combination.
  - `useArgs` so controlled props stay in sync with the Controls panel.
  - Values that change continuously (typing, dragging) are the exception: `updateArgs` lands too late, so keys get lost and drags lag behind the pointer. Keep the value in React state in a small wrapper component in the story file (React's `useState` can't sit next to `useArgs` in one render function) and mirror it to Controls with `updateArgs`; see `TextField.stories.tsx` and `VolumeSlider.stories.tsx`.
  - `fn()` for callbacks, except ones that fire every frame (see `VolumeSlider.stories.tsx`).
  - Realistic content, including long labels. Use the library's `Button`, `Icon` and fields in stories instead of local copies once they exist.
  - Examples in `src/examples/` (`title: "Examples/<Name>"`, `id: "examples-<name>"`) import only from `src/index.ts`.
- Known pitfalls:
  - Motion's `width: "auto"` only animates when the target changes. For pills that size to their content, measure the new content with `useWidth` (see `Toast`).
  - Content layers inside a morphing container get a fixed size and are centered, so nothing reflows mid-morph (see `MusicPlayer`).
  - Swap layers stacked in a grid (`col-start-1 row-start-1`) need `place-content-center` as well as `place-items-center`; otherwise the track is as wide as the widest layer, hangs off one side, and the other layer jumps off-center mid-morph.
  - Motion starts springs set by duration (`shape`, `soft`, `useLiquid`) from rest, even when the value is moving. When a release should keep its speed, animate with `snap`.
  - Motion ignores `visualDuration: 0` and falls back to its bouncy default spring. Build springs with `useSprings`, never by hand.
  - Motion animates `backgroundColor` in the browser but `color` and `borderColor` in JS, with different color math, so they drift apart mid-fade. To fade a border along with a fill, fade the opacity of a fixed-color layer (see `StatusBadge`).
  - A radius or size given as `"var(--…)"` animates only between values of the same unit; the radius tokens are all px.
  - SVG attributes can't read CSS variables; use `fill-*` and `stroke-*` classes.
  - Tailwind only generates classes it finds written out in full; never build one like `` `rounded-${size}` ``.
  - Storybook binds ⌘K to its own search, so test keyboard shortcuts in `iframe.html` (`check_story.py` does).
  - Storybook's `updateArgs` re-renders on a later tick (it waits at least 100 ms, plus any running animation); wait about 250 ms before checking the result.
  - A control inside an `overflow-hidden` shape gets its focus ring clipped. Put the ring on the shape with `has-focus-visible:` (see `Select`, `TextField`), or clip with `[clip-path:inset(-4px)]` instead of `overflow-hidden` so each child keeps its own ring (see `Breadcrumbs`).
  - Sizes measured on mount can come from the fallback font; measure again when `document.fonts.ready` resolves (see `UnderlineTabs`).
  - `.focus()` on an element inside an `overflow-hidden` shape can scroll the shape; pass `{ preventScroll: true }`.
  - Set a list's highlight on `onMouseMove`, not `onMouseEnter`: rows that grow in under a resting pointer would otherwise take the highlight from the keyboard.
  - `dragHandlers` capture the pointer on press, so in Chromium the click that follows goes to the dragged element, never to a button inside it. Keep buttons out of the dragged element (see `BottomSheet`'s grab strip).
  - `whileTap` turns Enter into fake `pointerdown`/`pointerup` events and uses Motion's default spring; use the `press` utility instead.
  - Drags need pointer capture and `touch-none`.
  - Safari with VoiceOver drops list semantics from a `ul` or `ol` whose `list-style` is `none`, which the reset sets. Give a list that is content (not a menu or listbox) `role="list"` (see `List`).
  - A grid row whose cells are all empty collapses to 0 px; give rows a fixed height when positions assume a fixed row count (see `DatePicker`).

## Working as a subagent

- You own the files your brief lists, and only those: usually a component and its story, sometimes a batch of related components and a shared internal they alone use. Don't edit anything else. If a shared file (`src/theme.css`, `src/springs.ts`, shared hooks, `src/index.ts`, this file) needs a change, propose it in your report.
- Follow the `morph-component` skill (`.claude/skills/morph-component/SKILL.md`): plan, build, story, `npx tsc --noEmit`, `check_story.py`, re-read your diff, report.
- Other subagents work in the same tree at the same time. Type errors in files you don't own get reported, not fixed. Don't commit, don't change dependencies or config, don't run `npm run build-storybook`.
