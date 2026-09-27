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
| Existing components (57) | in progress | actions, selection, text/numbers, menus, feedback and charts migrated in Wave2; navigation, sliders, dates, layout and dialogs in Wave3; overlays/media in Wave4 | 2–4 |
| PasswordField | done: `PasswordInput` | Input with a show/hide IconButton, inside Field | 2 |
| NumberInput | done | typed entry; NumberStepper stays the stepping control | 2 |
| Slider | done | shares `SliderTrack` with RangeSlider | 3 |
| MultiSelect | create | Select's shape and list with checks | 4 |
| CheckboxGroup | done | composes Checkbox | 2 |
| ToggleGroup | create | pressed buttons; also the selectable-chip pattern | 4 |
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
| Toolbar | create | roving focus; the gliding tooltip | 4 |
| Navigation links and active states | done | SidebarNav, CollapsibleSidebar, Breadcrumbs, Pagination, TabBar | 3 |
| PageHeader | done | | 3 |
| Header, Footer, AppShell | create | | 5 |
| Tooltip, Popover, Dialog, BottomSheet | extend | Tooltip's API changes | 3–4 |
| Drawer | create | shares `Sheet` with BottomSheet | 4 |
| AlertDialog | done | composes Dialog | 3 |
| ContextMenu | create | shares `Menu` with ActionMenu | 4 |
| HoverCard | defer | Popover covers rich content on click, Tooltip covers hover hints; hover-only rich previews are hard to reach by keyboard | |
| Table | create | | 5 |
| DataTable | create | controlled; the caller sorts and pages | 5 |
| TreeView | create | | 5 |
| Image | done | | 1 |
| Carousel | create | PageDots, IconButton, drag | 4 |
| Responsive media, Lightbox and media controls | extend and recipe | Lightbox on Modal and Image; VideoControls composes VolumeSlider; a `<video>` recipe | 4 |
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
