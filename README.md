# Tensile

A React design system of animated components. Every control is one shape that morphs between its states; content inside it blur-swaps; things that slide use a liquid spring; drags follow the pointer and keep their speed on release. Colors, type, radii, shadows, focus and motion speed are CSS tokens an app overrides. Every component is generic: data and text come in as props with English defaults.

Stack: React 19, TypeScript, Motion (`motion/react`), Tailwind 4 (for the library's own build), Storybook 10, Geist.

- [Install and use](#install-and-use)
- [Tokens](#tokens)
- [Motion](#motion)
- [Components](#components)
- [Patterns and recipes](#patterns-and-recipes)
- [Forms](#forms)
- [Accessibility](#accessibility)
- [Responsive behavior](#responsive-behavior)
- [Migrating from the previous APIs](#migrating-from-the-previous-apis)
- [Known limitations](#known-limitations)
- [Developing the library](#developing-the-library)

## Install and use

Tensile is being prepared for release as the npm package `tensile`, from [seb-graf/tensile](https://github.com/seb-graf/tensile). This version is a local preview and has not been published. npm reports a previously unpublished package with that name; publishing rights still need verification. The copyright holder and license also need confirmation. Keep `private: true` until release preparation is complete.

With Node 24, build a package artifact in this checkout:

```sh
npm ci
npm pack
```

Install the resulting tarball in an existing React 19 application:

```sh
npm install /path/to/tensile-0.1.0.tgz motion@^13
```

Do not install an unrelated registry package with this name. `dist/` holds:

- `index.js`: ESM with a `"use client"` banner; React, React DOM and Motion stay external.
- `index.d.ts` and the other declarations.
- `styles.css`: global tokens, unprefixed utilities, font faces, and generated CSS property initialization; no Preflight or body background rule.
- `reset.css`: Tailwind's preflight, opt-in.

Peer dependencies: `react` ^19, `react-dom` ^19, `motion` ^13.

```tsx
// Once, at the app's entry.
import "tensile/reset.css"; // optional: only if the app has no reset of its own
import "tensile/styles.css";
import "./app.css"; // your overrides, loaded after the library

import { Button, Field, Input } from "tensile";
```

The app doesn't need Tailwind. `examples/consumer` is a Vite app without Tailwind that type-checks against the built declarations, builds, overrides tokens, and server-renders every export (`npm run check:consumer`).

The check installs an actual tarball in a temporary directory outside the checkout, with its own dependencies. It also type-checks the shared documentation examples. It does not validate hydration or promise framework-specific support.

For a first working component:

```tsx
import { useState } from "react";
import { Toggle } from "tensile";

export default function App() {
  const [enabled, setEnabled] = useState(false);
  return <Toggle label="Notifications" checked={enabled} onCheckedChange={setEnabled} />;
}
```

The reset changes native element defaults across the page. If you omit it, provide your own baseline for box sizing, form fonts, margins, borders, and native appearance in `@layer base`, then check the components in your app. Unlayered native-element rules can override component utilities. Apply `font-family: var(--font-sans)` to your app root if your reset does not establish it. Geist is served from bundled WOFF2 assets with `font-display: swap`; its license is in `THIRD_PARTY_NOTICES`.

ESM bundlers and React 19 are the intended environment. Peer-version lower bounds, non-Chromium engines, screen-reader speech, and framework hydration need separate verification. The library's compiled utilities are not a general Tailwind stylesheet; application layout classes need your own CSS or Tailwind build.

Server rendering: components render their markup on the server. The modal layers of Dialog, AlertDialog, BottomSheet, Drawer and Lightbox render nothing until they mount in the browser (their triggers and thumbnails do render). The motion scale is 1 on the server.

## Tokens

The tokens are CSS custom properties declared in `@layer theme` (`src/theme.css`). Override them on `:root`, or on any subtree, in CSS loaded after the library's: an unlayered rule always wins over the layer.

| Token | Default | Purpose |
|---|---|---|
| `--color-canvas` | `#ebe9e4` | page background (the app sets it on `body`; the library doesn't style `body`) |
| `--color-paper` | `#ffffff` | surfaces; text on ink |
| `--color-ink` | `#111110` | main text, primary surfaces |
| `--color-ink-3` | `#2e2e2c` | raised parts on ink (tracks), lines on ink |
| `--color-muted` | `#6b6964` | secondary text on paper, hover and canvas (WCAG AA on all three) |
| `--color-line` | `#e9e7e2` | separators, borders, and the ring of `--shadow-float` |
| `--color-hover` | `#f3f1ed` | hover and highlight on paper |
| `--color-accent` | `#b8f23e` | success and active fills |
| `--color-on-accent` | ink | text and icons on accent |
| `--color-focus` | ink | focus rings |
| `--font-sans` | Geist Variable | all text |
| `--text-caption` | 11 / 16 px | small print, axis labels |
| `--text-label` | 13 / 20 px | compact controls, secondary lines, errors |
| `--text-body` | 15 / 22 px | fields, buttons, dialog titles |
| `--radius-control` | 26px | controls (full pills up to 52 px tall) |
| `--radius-overlay` | 20px | open menus and popovers, alerts, open accordion items |
| `--radius-card` | 24px | cards, panels, full-view images |
| `--radius-dialog` | 28px | dialogs, sheets, drawers, expanded views |
| `--shadow-float` | a 1 px line ring, a contact shadow and a soft drop shadow | every floating surface and control |
| `--layer-raised`, `--layer-sticky`, `--layer-overlay` | 10, 20, 50 | stacking of raised shapes, sticky headers, exiting overlays |
| `--container-page` | 72rem | page content width (`max-w-page`) |
| `--motion-duration-scale` | 1 (0 under reduced motion) | multiplies every animation's duration and delay |

Tailwind's `text-sm` (14 px) and `text-base` and up (16 px+) complete the type scale. Control heights are a fixed scale, not tokens, because geometry is computed from them: 32 px compact controls, 44 px buttons, fields and sliders, 52 px large fields, 40 px list rows, 28 px chips, 24 px badges.

```css
/* app.css */
:root {
  --color-accent: #3355ff;
  --color-on-accent: #ffffff;
  --radius-control: 12px;
  --radius-overlay: 12px;
  --radius-card: 14px;
  --radius-dialog: 16px;
}

/* A speed change belongs inside no-preference, or it would undo reduced motion. */
@media (prefers-reduced-motion: no-preference) {
  :root {
    --motion-duration-scale: 1.6;
  }
}

/* A dark region: paper focus rings, dark separators and shadow rings inside it. */
.dark-band {
  --color-focus: var(--color-paper);
  --color-line: var(--color-ink-3);
}
```

Notes:

- Text on accent uses `--color-on-accent`, never an assumed ink, so a dark accent works.
- Morphing radii are animated between `var(--radius-…)` values, so overrides reach the animations too.
- `--shadow-float` is compiled into the `shadow-float` utility; redefining the variable doesn't change the shadow. Its ring color does follow `--color-line`.

## Motion

- `--motion-duration-scale` is 1 by default: 2 is twice as slow, 0 turns animation off. The library CSS sets 0 under `prefers-reduced-motion: reduce`.
- Components read it from the root element when they mount. A change reaches components mounted afterwards; remount a subtree to apply a new speed right away (the Storybook Theme toolbar and the "Theme and motion" example do that).
- At 0 every state change is instant and repeating effects stop, but drags still follow the pointer, a flick still picks its target from its speed, and focus never waits for an animation.
- Functional timers never scale: hold durations, the copy reset, the tooltip delay, toast lifetimes, long-press delays and media time stay the same at any speed.
- CSS effects (`press`, `animate-spinner`, `animate-shimmer`) use the same token.

## Components

Run `npm run storybook`; each component's stories are at `/?path=/story/<id>--default`, and the Controls panel shows the full API with its defaults. Examples live under "Examples".

**Actions**

| Component | Story id | Purpose |
|---|---|---|
| Button | `components-button` | The ordinary action button: primary, secondary, ghost; 44 or 32 px. |
| IconButton | `components-iconbutton` | An icon-only Button with a required accessible label. |
| MorphButton | `components-morphbutton` | A submit/action button that morphs through loading and success. |
| CopyButton | `components-copybutton` | Copies a value and widens to a "Copied" check. |
| HoldButton | `components-holdbutton` | Press and hold to confirm a destructive action. |
| SwipeButton | `components-swipebutton` | Drag the knob across to confirm. |
| ActionMenu | `components-actionmenu` | A menu button whose shape grows into its menu. |
| CommandPalette | `components-commandpalette` | An inline filterable command list with ⌘K. |
| Toolbar | `components-toolbar` | A roving-focus toolbar whose tooltips share one gliding bubble. |

**Inputs**

| Component | Story id | Purpose |
|---|---|---|
| Input | `components-input` | A native text input in a paper pill, with leading/trailing slots. |
| Textarea | `components-textarea` | A native textarea whose surface springs with its text. |
| Field | `components-field` | Label, description and error wiring for one control. |
| Fieldset | `components-fieldset` | A native fieldset with a legend, description, error and disabled state. |
| TextField | `components-textfield` | A text field with its own floating label. |
| PasswordInput | `components-passwordinput` | Input with a show/hide password toggle. |
| SearchField | `components-searchfield` | A round search trigger that expands to its container. |
| NumberInput | `components-numberinput` | Typed numeric entry with formatting, clamping and arrow steps. |
| NumberStepper | `components-numberstepper` | A −/+ spinbutton with a rolling number. |
| Select | `components-select` | A select-only combobox with a top-layer menu. |
| Combobox | `components-combobox` | A filterable select with a text input. |
| MultiSelect | `components-multiselect` | Select for several values, with toggling checks. |
| Toggle | `components-toggle` | A native switch with a liquid knob. |
| ThemeToggle | `components-themetoggle` | A light/dark switch with a sun/moon knob. |
| Checkbox | `components-checkbox` | A native checkbox with an accent fill and indeterminate state. |
| CheckboxGroup | `components-checkboxgroup` | A named group of checkboxes with an array value. |
| RadioGroup | `components-radiogroup` | Native radios with a sliding dot. |
| ToggleGroup | `components-togglegroup` | Pressed-state buttons: filter chips, formatting toggles. |
| ColorSwatches | `components-colorswatches` | Native radios as color swatches with a sliding ring. |
| ColorPicker | `components-colorpicker` | Saturation/brightness area, hue slider and hex field. |
| Rating | `components-rating` | A star rating slider, or a read-only image. |
| Slider | `components-slider` | One value on a measured track with rubber overdrag. |
| RangeSlider | `components-rangeslider` | Two values on one track. |
| TagInput | `components-taginput` | Type to add removable tags. |
| OTPInput | `components-otpinput` | One-time code cells with paste support. |
| EditableText | `components-editabletext` | Inline text that morphs into an input. |
| TimeWheel | `components-timewheel` | Flickable hour, minute and AM/PM wheels. |
| TimePicker | `components-timepicker` | A trigger that grows into a TimeWheel. |
| DatePicker | `components-datepicker` | A month calendar for one date. |
| DateRangePicker | `components-daterangepicker` | A month calendar for a start and end date. |
| FileUpload | `components-fileupload` | A file picker and drop target with progress. |

**Navigation**

| Component | Story id | Purpose |
|---|---|---|
| Link | `components-link` | A text link; `LinkProvider` hands same-origin clicks to your router. |
| Tabs | `components-tabs` | Tabs with panels (underline or segmented). |
| SegmentedTabs | `components-segmentedtabs` | A segmented control tablist. |
| UnderlineTabs | `components-underlinetabs` | A tablist with a liquid underline. |
| TabBar | `components-tabbar` | Bottom navigation with an icon pill. |
| SidebarNav | `components-sidebarnav` | Vertical navigation with a liquid pill. |
| CollapsibleSidebar | `components-collapsiblesidebar` | SidebarNav in a rail that expands. |
| Breadcrumbs | `components-breadcrumbs` | A trail whose middle expands. |
| Pagination | `components-pagination` | Page buttons or links with a liquid pill. |
| PageDots | `components-pagedots` | A dot slider for pages. |
| WizardSteps | `components-wizardsteps` | A display-only step progress line. |

**Feedback**

| Component | Story id | Purpose |
|---|---|---|
| Spinner | `components-spinner` | A decorative loading arc. |
| Skeleton | `components-skeleton` | A shimmering placeholder. |
| StatusBadge | `components-statusbadge` | A status pill that fades between statuses. |
| Badge | `components-badge` | A count dot that grows into a pill. |
| Toast | `components-toast` | A status pill for one message. |
| ToastStack | `components-toaststack` | A stack of dismissible toasts. |
| Alert | `components-alert` | A status card that morphs between messages. |
| ProgressBar | `components-progressbar` | Determinate or indeterminate progress. |
| ProgressRing | `components-progressring` | Circular progress that ends in a check. |
| EmptyState | `components-emptystate` | A title, description and action for empty views. |
| LoadingState | `components-loadingstate` | A named loading status. |
| NotificationList | `components-notificationlist` | Notifications with read and dismiss actions. |

**Data display**

| Component | Story id | Purpose |
|---|---|---|
| Icon | `components-icon` | 24-grid icon shapes with a 1.5 px line at any size. |
| Kbd | `components-kbd` | A key cap for shortcuts. |
| Tag | `components-tag` | A label chip, optionally removable. |
| List | `components-list` | Rows with leading, title, description and trailing slots. |
| DescriptionList | `components-descriptionlist` | Label/value pairs that stack when narrow. |
| Timeline | `components-timeline` | Events joined by a line. |
| Avatar | `components-avatar` | An image or initials in a circle. |
| AvatarGroup | `components-avatargroup` | Overlapping avatars with a "+N" count. |
| NumberTicker | `components-numberticker` | Rolling digits. |
| StatTile | `components-stattile` | A metric card with a change chip. |
| LineChart | `components-linechart` | A line chart with a keyboard-reachable tooltip. |
| BarChart | `components-barchart` | A bar chart with a liquid highlight. |
| DonutChart | `components-donutchart` | A donut chart with a center readout. |
| Table | `components-table` | A native table on a card that scrolls when wide. |
| DataTable | `components-datatable` | Table with sorting, selection, pagination, loading, empty and row actions. |
| TreeView | `components-treeview` | A keyboard tree with a liquid selection pill. |

**Layout**

| Component | Story id | Purpose |
|---|---|---|
| Card | `components-card` | A paper or ink surface. |
| Separator | `components-separator` | A horizontal or vertical rule. |
| Accordion | `components-accordion` | Disclosures, one open at a time. |
| ExpandableCard | `components-expandablecard` | A card that grows into a detail view. |
| SplitPane | `components-splitpane` | Two panes with a draggable separator. |
| PageHeader | `components-pageheader` | Page title, description, breadcrumbs and actions. |
| Header | `components-header` | A sticky site/app header with a mobile drawer. |
| Footer | `components-footer` | Link groups and a note. |
| AppShell | `components-appshell` | Skip link, header, sidebar, main and mobile nav. |

**Overlays**

| Component | Story id | Purpose |
|---|---|---|
| Popover | `components-popover` | A trigger that grows into a non-modal panel, with six placements. |
| Tooltip | `components-tooltip` | A delayed hint for any trigger. |
| Dialog | `components-dialog` | A modal panel that flies from its trigger. |
| AlertDialog | `components-alertdialog` | A confirmation dialog. |
| BottomSheet | `components-bottomsheet` | A draggable sheet from the bottom. |
| Drawer | `components-drawer` | A draggable side panel. |
| ContextMenu | `components-contextmenu` | A menu on right-click, long press or Shift+F10. |
| Island | `components-island` | A compact activity pill that expands. |

**Media**

| Component | Story id | Purpose |
|---|---|---|
| Image | `components-image` | An image that fades in, with a fallback. |
| Carousel | `components-carousel` | Draggable slides with arrows and dots. |
| Lightbox | `components-lightbox` | Thumbnails that fly into a full view. |
| VolumeSlider | `components-volumeslider` | A speaker slider on paper or ink. |
| MusicPlayer | `components-musicplayer` | An island that expands into a player. |
| VideoControls | `components-videocontrols` | A controlled play, seek and volume bar. |
| WaveformScrubber | `components-waveformscrubber` | Scrub along a waveform. |
| CompareSlider | `components-compareslider` | Before/after images with a divider. |

Examples, built only from the public exports: `examples-settings-form`, `examples-authentication`, `examples-detail-page`, `examples-theme-and-motion`, `examples-data-management`, `examples-marketing`.

## Patterns and recipes

Layout needs no components; use the tokens and ordinary utilities (or your own CSS):

- Page container: `mx-auto max-w-page px-6`. Stack: `grid gap-4`. Inline row: `flex flex-wrap items-center gap-2`. Grid: `grid gap-4 sm:grid-cols-2 lg:grid-cols-3`. Aspect ratio: `aspect-video`, `aspect-3/2`.
- Type: `text-caption`, `text-label`, `text-sm`, `text-body`, then Tailwind sizes for headings; `text-ink` and `text-muted` on light surfaces, `text-paper` and `text-paper/55` on ink.

Recipes:

- **Button group**: related actions in `<div role="group" aria-label="…" className="flex flex-wrap gap-2">`; use `Toolbar` when it needs arrow-key navigation.
- **Chips**: selectable chips are `ToggleGroup`; removable filter chips are `Tag` with `onRemove`; counts are `Badge`; statuses are `StatusBadge`.
- **Date field**: a `Popover` whose trigger shows the date and whose panel holds a `DatePicker`; name the trigger by its label and its value, as `TimePicker` does, and close it in `onValueChange`.

  ```tsx
  <p id="due-label" className="mb-1.5 text-label font-medium">Due date</p>
  <Popover
    open={open}
    onOpenChange={setOpen}
    trigger={<span id="due-value">{date ?? "Select a date"}</span>}
    aria-labelledby="due-label due-value"
    panelLabel="Due date"
    panelWidth={320}
  >
    <DatePicker value={date} onValueChange={(next) => { setDate(next); setOpen(false); }} />
  </Popover>
  ```

- **Video**: a native `<video>` drives `VideoControls`; the controls report changes and your handlers talk to the element.

  ```tsx
  const video = useRef<HTMLVideoElement>(null);
  <div className="relative aspect-video overflow-hidden rounded-card">
    <video ref={video} src={src} className="size-full object-cover" onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)} onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} />
    <div className="absolute inset-x-3 bottom-3">
      <VideoControls
        duration={duration}
        playing={playing}
        onPlayingChange={(next) => { setPlaying(next); next ? video.current!.play() : video.current!.pause(); }}
        currentTime={time}
        onCurrentTimeChange={(next) => { video.current!.currentTime = next; setTime(next); }}
        volume={volume}
        onVolumeChange={(next) => { video.current!.volume = next; setVolume(next); }}
      />
    </div>
  </div>
  ```

- **Routers**: wrap the app in `<LinkProvider navigate={(href) => router.push(href)}>`. Plain left clicks on same-origin links (Link, TabBar, SidebarNav, Breadcrumbs, Pagination with `pageHref`, Header, Footer) go to `navigate`; modified clicks, new-tab links, downloads and `#fragment` links keep their native behavior.
- **Dark regions**: set `--color-focus: var(--color-paper)` and `--color-line: var(--color-ink-3)` on the region (as `Card tone="ink"` does).

## Forms

- Every value is controlled (`value` + `onValueChange`, `checked` + `onCheckedChange`); there are no uncontrolled modes.
- Native elements where they exist: Input, Textarea, Checkbox, Toggle, RadioGroup and ColorSwatches render native inputs, so `name`, `required`, `disabled`, `autoComplete` and form submission work as usual. Composite controls (Select, MultiSelect, DatePicker, Slider, TimePicker, ColorPicker, TagInput, OTPInput…) take `name` and render hidden inputs, so `new FormData(form)` contains their values.
- Reset: handle the form's `onReset` and set your state back; the hidden inputs follow.
- `Field` gives its control a visible label, a description and an error (`aria-labelledby`, `aria-describedby`, `aria-invalid`); `Fieldset` groups controls under a legend and can disable them all.
- Validation: validate in your submit handler and pass messages to `Field`'s `error`. Use `noValidate` on the form, or Chrome shows its own bubbles for `required` fields. Move focus to the first invalid control yourself.
- See the "Settings form" and "Authentication" examples.

## Accessibility

- Each component uses the matching native element or ARIA pattern (buttons, links, combobox/listbox, menu, tablist, slider, spinbutton, tree, dialog/alertdialog, radiogroup, toolbar, region/carousel), with its full keyboard support (arrows, Home/End, Enter, Space, Escape, typeahead where the pattern has it).
- Focus rings use `--color-focus` with a 2 px offset; dark surfaces switch it to paper. Overlays return focus to their opener. Modal overlays use a native `<dialog>`, so the page behind is inert.
- Every piece of user-facing text is a prop with an English default; icon-only actions require a label.
- Reduced motion turns animation off without changing behavior.
- Muted text meets WCAG AA on paper, hover and canvas; paper controls keep a visible edge on paper surfaces.
- Checked in Chromium with keyboard and pointer (and touch gestures for the context menu). Screen-reader speech and other browser engines haven't been tested.

## Responsive behavior

- Fields, tracks, tables, charts and cards fill their container; buttons, tabs, toggles and pills size to their content. Give a width to a wrapper, or pass a width through `className` (it's for placement and size only).
- DescriptionList and Footer use container queries, so they respond to their own width; PageHeader's actions wrap below the title when there's no room.
- Header switches to a drawer below 768 px; AppShell shows its sidebar from 1024 px and a bottom nav below.
- Overlays stay inside the viewport: menus and popovers flip and cap their height, tooltips clamp, sheets and dialogs cap to the viewport and scroll their body.
- Wide tables scroll horizontally inside a focusable, named region.
- Everything is checked at 390 px wide as well as desktop sizes.

## Migrating from the previous APIs

| Change | What to do |
|---|---|
| Tooltip is now per trigger | Replace `actions`/`onAction` with `<Tooltip label>{(trigger) => <IconButton {...trigger} … />}</Tooltip>`; put related buttons in a `Toolbar` (`label`, `orientation`) to share one gliding bubble and get arrow-key navigation. |
| Dialog `label` → `trigger` | Pass the trigger content as `trigger`; `trigger={null}` renders no button (the dialog grows from the viewport's center). |
| Popover `label` → `trigger`; `triggerWidth`, `panelHeight` removed | Pass the visible trigger as `trigger` (it's measured) and use `label` only to name an icon-only trigger; the panel sizes to its content (`panelWidth`, default 288); choose a `placement` if the default `bottom-left` doesn't fit. |
| TabBar is navigation | Items take `href` for links; it renders a `nav` with `aria-current`, and arrows move focus only. |
| BottomSheet covers the viewport | It renders in a modal layer over the page instead of inside its parent; remove any positioned wrapper you added for it. |
| Fields, tracks and charts fill their container | Components that had fixed widths (Select, Combobox, TextField, SearchField, TagInput, the sliders, the date pickers, the charts and stat tile, ProgressBar, Alert, Accordion, FileUpload, ToastStack, CommandPalette, SwipeButton, WizardSteps, WaveformScrubber, CompareSlider, VideoControls) now take their container's width; wrap them or pass `className="w-80"`. |
| Native inputs | Toggle, ThemeToggle, Checkbox, RadioGroup and ColorSwatches render native inputs and take native input props; read values from their callbacks or from form data. |
| Textarea's surface | `className` and `style` now go on the surface around the textarea, like Input's pill. |
| Library CSS | It no longer styles `body`; set your page background and font smoothing yourself. The reset is opt-in (`reset.css`). |
| Visible changes | Muted text is darker (`#6b6964`); floating surfaces have a hairline ring; ExpandableCard and MusicPlayer open with a 28 px radius; chart tooltips use 13 px text; Pagination's disabled state is 40%; play buttons press to 96%. |

## Known limitations

- Screen readers and non-Chromium browsers are untested; iOS long press on ContextMenu relies on its own 500 ms timer (iOS fires no touch `contextmenu`), and a Windows pen long press may also click what's under the pen.
- Deferred on purpose: dark mode, HoverCard, right-to-left layout, runtime control-size tokens, virtualized lists, async options in Combobox, and specialist systems (rich-text and code editors, maps, scheduling, diagram editors, spreadsheet grids, payments, backend auth, upload services).
- Breadcrumbs' expanded trail keeps its intrinsic width and can overflow at 390 px.
- DateRangePicker: resetting an unfinished range from null to null needs a remount; calendar inputs must be valid local ISO dates.
- Image keeps its loaded or failed state when `src` changes on a mounted instance; give it `key={src}`.
- Field errors are described (`aria-describedby`) but not announced live; a Fieldset nested inside a disabled one reports `disabled: false` to div-based controls.
- Popover's flip and Tooltip's clamping are decided when they open; a resize while open doesn't re-place them. An outside click closes a Popover and focus follows the click.
- Carousel: a hard flick can skip a slide; arrows don't announce the new slide.
- TreeView: ArrowRight on an open folder with no children at the end of the tree throws; item values must be unique across the tree.
- DataTable always shows five placeholder rows while loading; column widths follow the visible rows.
- MorphButton disables itself while loading, so a focused submit button drops focus to the page; move focus yourself after a save (a fix with `aria-disabled` is proposed in `docs/coverage.md`).
- `--shadow-float` can't be overridden through its variable (see Tokens).
- `Card tone="ink"` (and any dark region) doesn't remap `--color-muted`: use `text-paper/55` for secondary text on ink, and keep generic components with muted text on light surfaces. Field's label and error are ink, so forms belong on paper.

## Developing the library

- `npm run storybook`: the component workshop at http://localhost:6006.
- `npx tsc --noEmit`, `npm test` (calendar and color logic with Node's test runner).
- `npm run build`, `npm run check:consumer`.
- `npm run build:site` builds the landing page and documentation into `site-dist/`; `npm run preview:site` serves that production build locally.
- `npm run site` develops the landing page; documentation links require the combined production preview or a separately served Storybook build.
- [Contributing](CONTRIBUTING.md) covers checks and the release procedure; [Changelog](CHANGELOG.md) records package changes.
- `AGENTS.md` holds the rules (tokens, motion, API, stories, pitfalls) and the inventory; `docs/coverage.md` holds what's covered and how each wave was verified; `.claude/skills/morph-component/` is the workflow for adding a component, with `check_story.py` for browser checks.
