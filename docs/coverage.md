# Coverage

What the design system covers, how, and where each piece stands. Status is **done** once a wave has built, checked and committed it.

## Foundations

| Piece | Artifact | Wave | Status |
|---|---|---|---|
| Tokens: colors, type, radii, shadow, focus, layers, page width | `src/theme.css`, Foundations/Tokens | 0 | done |
| Motion speed and reduced motion from CSS | `useSprings` in `src/springs.ts`, `--motion-duration-scale`, Foundations/Motion | 0 | done |
| Library stylesheet without page styles; opt-in reset | `src/index.css`, `src/reset.css` | 0, 1 | done |
| Icons | `Icon`, `src/icons.tsx` | 0 | done |
| Loading visual | `Spinner` | 0 | done |
| Measuring for responsive geometry | `src/useSize.ts` | 0 | done |
| Top layer, placement, outside press | `src/overlay.ts` | 1 | done |
| Modal behavior | `src/Modal.tsx` | 1 | done |
| Sheets dragged from an edge | `src/Sheet.tsx` | 4 | done |
| Scroll-body edge fade | `scroll-fade` in `src/theme.css` | 4 | done |
| Built package and consumer check | `vite.lib.config.ts`, `examples/consumer` | 1 | done |

## Requested coverage

| Requested | Status | Artifact or mapping | Wave |
|---|---|---|---|
| Button, IconButton | done | IconButton shares Button's classes | 1 |
| Link | done | `Link` and `LinkProvider` | 1 |
| Input, Textarea | done | | 1 |
| Spinner | done | | 0 |
| Field, Fieldset | done | Field exports `useField` | 1 |
| ButtonGroup | recipe | `div role="group"` with `flex flex-wrap gap-2`; Toolbar for keyboard navigation | docs |
| Card, Separator | done | | 1 |
| Typography, container, stack, inline, grid, aspect ratio | recipe | token utilities, `max-w-page`, Tailwind layout utilities | docs |
| Existing components (57) | done | actions, selection, text/numbers, menus, feedback and charts migrated in Wave2; navigation, sliders, dates, layout and dialogs in Wave3; overlays and media in Wave4 | 2–4 |
| PasswordField | done: `PasswordInput` | Input with a show/hide IconButton, inside Field | 2 |
| NumberInput | done | typed entry; NumberStepper stays the stepping control | 2 |
| Slider | done | shares `SliderTrack` with RangeSlider | 3 |
| MultiSelect | done | Select's shape and list with checks that toggle | 4 |
| CheckboxGroup | done | composes Checkbox | 2 |
| ToggleGroup | done | pressed buttons; also the selectable-chip pattern | 4 |
| DateRangePicker | done | shares `calendar.ts` and `CalendarView` with DatePicker | 3 |
| TimePicker | create | Popover with TimeWheel | 5 |
| ColorPicker | create | 2D area, hue Slider, hex Input | 5 |
| EditableText | done | Input-based | 2 |
| FileUpload | done | accept, multiple, disabled, responsive; file-list story | 3 |
| Avatar, AvatarGroup | done | Avatar composes Image | 1 |
| Chip or Tag | done: `Tag` | removable or static; selectable chips are ToggleGroup, counts are Badge, status is StatusBadge | 1 |
| DescriptionList, Timeline, List | done | display only | 1 |
| Keyboard shortcut | done: `Kbd` | | 1 |
| Skeleton, StatusBadge | done | | 1 |
| EmptyState, LoadingState, NotificationList | done | | 3 |
| Tabs with panels | done | composes SegmentedTabs or UnderlineTabs | 3 |
| Toolbar | done | roving focus; the gliding tooltip | 4 |
| Navigation links and active states | done | SidebarNav, CollapsibleSidebar, Breadcrumbs, Pagination, TabBar | 3 |
| PageHeader | done | | 3 |
| Header, Footer, AppShell | create | | 5 |
| Tooltip, Popover, Dialog, BottomSheet | done | Tooltip takes a render-function trigger; Popover measures and takes six preferred placements; BottomSheet covers the viewport | 3–4 |
| Drawer | done | shares `Sheet` with BottomSheet | 4 |
| AlertDialog | done | composes Dialog | 3 |
| ContextMenu | done | shares `Menu` with ActionMenu | 4 |
| HoverCard | defer | Popover covers rich content on click, Tooltip covers hover hints; hover-only rich previews are hard to reach by keyboard | |
| Table | create | | 5 |
| DataTable | create | controlled; the caller sorts and pages | 5 |
| TreeView | create | | 5 |
| Image | done | | 1 |
| Carousel | done | PageDots, IconButton, drag | 4 |
| Responsive media, Lightbox and media controls | done; recipe in docs | Lightbox on Modal; VideoControls composes VolumeSlider; the `<video>` recipe is in the README | 4, 6 |
| Hero, Features, Pricing, Testimonials, FAQ, CTA | recipe | Examples/Marketing | 6 |

## Composed examples

| Example | Story | Wave |
|---|---|---|
| Settings form | Examples/Settings form | 5 |
| Authentication form | Examples/Authentication | 5 |
| Detail page | Examples/Detail page | 5 |
| Theme and motion | Examples/Theme and motion | 5 |
| Data management page | Examples/Data management | 6 |
| Marketing page | Examples/Marketing | 6 |

## Deferred

Rich-text and code editors, maps, scheduling and booking, diagram and canvas editors, spreadsheet grids, payments, backend authentication, upload and storage services, domain workflows. Also: HoverCard, dark mode, runtime control-size tokens, right-to-left layout, virtualized lists, async option loading in Combobox, and a date field with a popover calendar (a recipe instead).

## Verification record

Browser checks use Chromium through `check_story.py`. “Alternate” means the blue accent, white on-accent text, smaller radii and slower motion; “reduced” emulates the reduced-motion preference. Phone-width checks use 390px CSS viewports, not physical devices. Screen-reader speech and other browser engines remain unverified.

Wave1: primitive contracts, native form props, labels, focus and rendering checked. Package typecheck, Storybook build, consumer build and server rendering passed. Artifacts: `/tmp/morph-wave1-*-report.txt`, `/tmp/morph-shots/`.

Wave2: each changed component has default, alternate and reduced browser evidence. Form stories exercise submitted values and controlled reset; menus cover keyboard selection, scrolling, upward placement and clipping escape. Responsive controls/charts have 390px checks. Reports preserve exact commands and any superseded failed attempts: `/tmp/morph-wave2{A,B,C,D,E,F,G}-report.txt`; screenshots and videos under `/tmp/morph-shots/<Name>/`. New public exports are also covered by the consumer server-render cases.

The extra 240px SwipeButton fixture test remains outside acceptance: its centered 280px demo wrapper did not shrink. The required 390px run passes; no claim is made about layouts too narrow for its 36px knob plus 8px inset and supplied label.

Wave3: navigation, tabs/panels, sliders, date/range/time controls, layout, upload/states and dialogs checked by pointer and keyboard, with alternate tokens, reduced motion and representative 390px runs. Native forms cover controlled reset, disabled values and Field naming/errors. Seven calendar arithmetic tests pass. Dialog checks include focus return, immediate Tab safety during exit, scrollable content and rapid reopen; AlertDialog starts on Cancel and ignores backdrop dismissal. Reports: `/tmp/morph-wave3{A,B,C,D,E,F,G}-report.txt` and `/tmp/morph-wave3F-states-report.txt`; exact command files are linked in those reports. The package consumer covers all 91 exports.

Wave3 limits: expanded Breadcrumbs retains its intrinsic width and can overflow at 390px. FileUpload picking is browser-tested; HTML5 file-drop dispatch is code-reviewed only. Resetting an unfinished DateRangePicker from null to the same null requires a caller remount. Calendar inputs retain the valid local ISO-date contract.

Wave4: sheets, anchored surfaces, tooltips, media, selection sets and the context menu, plus the fixes from the Wave 1–4 review (tooltip entrance, trigger-less Dialog, grip drag, Popover placements, paper-on-paper field contrast, Dialog scroll fade and padding, Textarea growth, NotificationList exits, ActionMenu's first-measure size). Each changed component has default, alternate, reduced-motion and 390px evidence; drags, flights and morphs have videos; touch long-press was reproduced and fixed with a Chromium gesture script. Dark surfaces now set `--color-line` to ink-3 so the new shadow ring stays invisible on dark backdrops. `--color-muted` moved to #6b6964 (AA on paper, hover and canvas). The nested Popover-in-Dialog focus failure seen once at 390px/alternate did not reproduce in three reruns of the exact sequence; no focus code was changed for it. Reports: `/tmp/morph-wave4{A,D,E,F,G}-report.txt`, `/tmp/morph-wave4-lead-report.txt`; commands in `/tmp/morph-review/*.commands.txt`.

Wave4 limits: a hard Carousel flick can skip a slide (projection as specified); Carousel arrows don't announce the new slide live; ContextMenu relies on the unscaled timer on iOS (no touch `contextmenu`) and draws a square focus outline around rounded caller content; Popover's flip and Tooltip's viewport clamping are decided when they open (both follow scrolling), so a resize while open doesn't re-place them; `--shadow-float` is compiled into the `shadow-float` utility, so an app can't override the shadow by redefining the variable (the ring's `--color-line` does follow overrides).

