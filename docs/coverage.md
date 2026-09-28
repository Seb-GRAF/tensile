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
| TimePicker | done | Popover with TimeWheel | 5 |
| ColorPicker | done | 2D area, hue Slider, hex Input; conversions tested in `color.ts` | 5 |
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
| Header, Footer, AppShell | done | Header's mobile nav is a left Drawer; AppShell's skip link uses native fragment navigation | 5 |
| Tooltip, Popover, Dialog, BottomSheet | done | Tooltip takes a render-function trigger; Popover measures and takes six preferred placements; BottomSheet covers the viewport | 3–4 |
| Drawer | done | shares `Sheet` with BottomSheet | 4 |
| AlertDialog | done | composes Dialog | 3 |
| ContextMenu | done | shares `Menu` with ActionMenu | 4 |
| HoverCard | defer | Popover covers rich content on click, Tooltip covers hover hints; hover-only rich previews are hard to reach by keyboard | |
| Table | done | | 5 |
| DataTable | done | controlled; the caller sorts and pages | 5 |
| TreeView | done | | 5 |
| Image | done | | 1 |
| Carousel | done | PageDots, IconButton, drag | 4 |
| Responsive media, Lightbox and media controls | done; recipe in docs | Lightbox on Modal; VideoControls composes VolumeSlider; the `<video>` recipe is in the README | 4, 6 |
| Hero, Features, Pricing, Testimonials, FAQ, CTA | recipe | Examples/Marketing | 6 |

## Composed examples

Examples import only from `src/index.ts`; mock data and simulated network activity live in the stories.

| Example | Story id | Composes | Checked | Wave |
|---|---|---|---|---|
| Settings form | `examples-settings-form` | PageHeader, Card, Fieldset, Field, Input, PasswordInput, NumberInput, Select, MultiSelect, Toggle, MorphButton, Button, AlertDialog | keyboard through every control, invalid submit (errors, `aria-invalid`, focus on the first invalid control), valid FormData, save timeline, reset, AlertDialog focus; 390 px, alternate, reduced | 5 |
| Authentication | `examples-authentication` | Card, Field, Input, PasswordInput, Link, MorphButton, OTPInput, Button | full sign-in → code → done flow by keyboard, validation and a failed password, pasted code, focus at each step; 390 px, alternate, reduced | 5 |
| Detail page | `examples-detail-page` | see its report | see its report | 5 |
| Theme and motion | `examples-theme-and-motion` | PageHeader, SegmentedTabs, Card, Button, Spinner, Toggle, Select, VolumeSlider, List, StatusBadge, Tabs, Popover, Dialog, Field, Input | local theme switch by pointer and keyboard (`data-theme`, the scale readout 1 / 1.6 / 0), overlays at both speeds, StatusBadge cycle; 390, 800 and 1280 px, alternate, reduced | 5 |
| Data management | `examples-data-management` | see its report | see its report | 6 |
| Marketing | `examples-marketing` | see its report | see its report | 6 |

## Components

Every public component, with its story (the Controls panel shows the full API and defaults), what it builds on, how it was checked, and what remains open. "W" is the wave that last changed it; checks ran in Chromium through `check_story.py`.

| Component | Story | Composes | Checked | Open issues |
|---|---|---|---|---|
| Accordion | `components-accordion` (Default) | Icon | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| ActionMenu | `components-actionmenu` (Default, IconTrigger) | Menu, outside press, top layer | W2; W4: first measure, alternate; W5: sm size | A shifted open menu sits flush with the viewport edge. |
| Alert | `components-alert` (Default) | Icon | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| AlertDialog | `components-alertdialog` (Default, WithTrigger) | Button, Dialog | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| AppShell | `components-appshell` (Default) | — | W5: pointer, keyboard, alternate, reduced, 390 px (and 1280 px for layout) | Bottom padding fits a 64 px mobile nav; no safe-area inset. |
| Avatar | `components-avatar` (Default, Initials) | Image | W1: rendering, native props, labels, focus; W4: shadow ring | An empty or oddly spaced `name` gives odd initials. |
| AvatarGroup | `components-avatargroup` (Default) | Avatar | W1: rendering, native props, labels, focus; W4: shadow ring | The "+N" count isn't formatted. |
| Badge | `components-badge` (Default) | NumberTicker | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| BarChart | `components-barchart` (Default) | Card | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| BottomSheet | `components-bottomsheet` (Default, LongContent) | Sheet, Button | W4: pointer, keyboard, alternate, reduced, 390 px; video for drags and morphs | — |
| Breadcrumbs | `components-breadcrumbs` (Default, WithLinks) | Icon | W3; W5: shared icon | The expanded trail keeps its intrinsic width and can overflow at 390 px. |
| Button | `components-button` (Default, Disabled, InAForm) | — | W1: rendering, native props, labels, focus; W4: shadow ring | — |
| Card | `components-card` (Default, Ink) | — | W1: rendering, native props, labels, focus; W4: shadow ring | — |
| Carousel | `components-carousel` (Default, InteractiveContent) | drag.ts, IconButton, Icon, PageDots | W4: pointer, keyboard, alternate, reduced, 390 px; video for drags and morphs | A hard flick can skip a slide; arrows don't announce the new slide. |
| Checkbox | `components-checkbox` (Default, Indeterminate, InAForm) | Check, Icon | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| CheckboxGroup | `components-checkboxgroup` (Default, InAFieldsetInsideAForm) | Checkbox | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| CollapsibleSidebar | `components-collapsiblesidebar` (Default, LongLabels) | IconButton, Icon, SidebarNav | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| ColorPicker | `components-colorpicker` (Default, InAForm) | drag.ts, Input, Slider | W5: pointer, keyboard, alternate, reduced, 390 px (and 1280 px for layout) | A gray hex typed or set from outside resets the hue to 0; knob keys are arrows only. |
| ColorSwatches | `components-colorswatches` (Default, InAForm) | — | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Combobox | `components-combobox` (Default, InAForm) | Check, list.tsx, outside press, top layer, Icon | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| CommandPalette | `components-commandpalette` (Default) | list.tsx, Icon, Kbd | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| CompareSlider | `components-compareslider` (Default) | drag.ts, Icon | W4: pointer, keyboard, alternate, reduced, 390 px; video for drags and morphs | — |
| ContextMenu | `components-contextmenu` (Default, LongListAtTheEdge, InsideAClippingCard, InsideADialog) | Menu, outside press, top layer | W4: pointer, keyboard, alternate, reduced, 390 px; video for drags and morphs | iOS relies on its 500 ms timer; a Windows pen long press may also click; square focus outline around rounded content. |
| CopyButton | `components-copybutton` (Default) | Check, Icon | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| DataTable | `components-datatable` (Default, Loading, Empty, WithRowActions) | ActionMenu, EmptyState, Checkbox, Pagination, Icon, Table | W5: pointer, keyboard, alternate, reduced, 390 px (and 1280 px for layout) | Five placeholder rows while loading; widths follow visible rows; `select`/`actions` column keys are reserved. |
| DatePicker | `components-datepicker` (Default, InAFieldInsideAForm) | CalendarView | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | Inputs must be valid local ISO dates. |
| DateRangePicker | `components-daterangepicker` (Default, InAFieldInsideAForm) | CalendarView | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | Resetting an unfinished range from null to null needs a remount; inputs must be valid ISO dates. |
| DescriptionList | `components-descriptionlist` (Default) | — | W1: rendering, native props, labels, focus; W4: shadow ring | — |
| Dialog | `components-dialog` (Default, LongContent, WithoutTrigger) | Modal, Button, IconButton, Icon | W3; W4: entrance, centered content, scroll fade, focus, alternate, reduced, 390 px | — |
| DonutChart | `components-donutchart` (Default) | Card | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Drawer | `components-drawer` (Default, Left, LongContent) | Sheet, IconButton, Icon | W4: pointer, keyboard, alternate, reduced, 390 px; video for drags and morphs | — |
| EditableText | `components-editabletext` (Default, Empty) | Button, Input | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| EmptyState | `components-emptystate` (Default) | — | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| ExpandableCard | `components-expandablecard` (Default) | Expand, IconButton, Icon | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Field | `components-field` (Default, InAForm) | Icon | W1: rendering, native props, labels, focus; W4: shadow ring | Errors are described, not announced live. |
| Fieldset | `components-fieldset` (Default, Disabled) | Icon | W1: rendering, native props, labels, focus; W4: shadow ring | A Fieldset nested in a disabled one reports `disabled: false` to div-based controls. |
| FileUpload | `components-fileupload` (Default, WithFileList, Disabled) | Check, Icon, NumberTicker | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | Drag-and-drop file dispatch is code-reviewed only. |
| Footer | `components-footer` (Default) | Separator | W5: pointer, keyboard, alternate, reduced, 390 px (and 1280 px for layout) | — |
| Header | `components-header` (Default) | IconButton, Icon, Underline, Drawer | W5: pointer, keyboard, alternate, reduced, 390 px (and 1280 px for layout) | The drawer's current pill jumps to the chosen link while the drawer slides out. |
| HoldButton | `components-holdbutton` (Default) | Check | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Icon | `components-icon` (Default) | — | W0: rendering, size-derived strokes, reduced motion | — |
| IconButton | `components-iconbutton` (Default) | — | W1: rendering, native props, labels, focus; W4: shadow ring | Its type still accepts `aria-label`; `label` wins at runtime. |
| Image | `components-image` (Default, Fallback) | — | W1: rendering, native props, labels, focus; W4: shadow ring | Keeps its loaded or failed state when `src` changes; key it by `src`. |
| Input | `components-input` (Default, WithIcons, DisabledAndReadOnly) | — | W1: rendering, native props, labels, focus; W4: shadow ring | Clicking the pill's padding or leading icon doesn't focus the input. |
| Island | `components-island` (Default) | Expand, outside press | W4: pointer, keyboard, alternate, reduced, 390 px; video for drags and morphs | — |
| Kbd | `components-kbd` (Default) | — | W1: rendering, native props, labels, focus; W4: shadow ring | — |
| Lightbox | `components-lightbox` (Default) | Modal, IconButton, Icon | W4: pointer, keyboard, alternate, reduced, 390 px; video for drags and morphs | Its 76 px inset makes the full view small at 390 px. |
| LineChart | `components-linechart` (Default) | Card | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Link | `components-link` (Default, WithLinkProvider) | — | W1; W5: fragment links | — |
| List | `components-list` (Default) | — | W1: rendering, native props, labels, focus; W4: shadow ring | — |
| LoadingState | `components-loadingstate` (Default) | Spinner | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| MorphButton | `components-morphbutton` (Default, InAForm, Disabled) | Check, Spinner | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | It disables itself while busy, so a focused submit button drops focus to the page; `aria-disabled` with a cancelled click would keep focus and still block resubmits. |
| MultiSelect | `components-multiselect` (Default, Empty, InAFieldInsideAForm, LongListNearTheBottom, InsideAClippingCard) | Check, list.tsx, outside press, top layer, Icon | W4: pointer, keyboard, alternate, reduced, 390 px; video for drags and morphs | Disabling it while open leaves it open until blur. |
| MusicPlayer | `components-musicplayer` (Default) | Expand, SeekBar, IconButton, Icon | W4: pointer, keyboard, alternate, reduced, 390 px; video for drags and morphs | — |
| NotificationList | `components-notificationlist` (Default, Empty) | IconButton, Avatar, Icon, ListContent, EmptyState | W3; W4: exit frames, alternate, reduced, 390 px | — |
| NumberInput | `components-numberinput` (Default, InAForm) | Input | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | Commit clamps to min/max, so an out-of-range value never reaches the form and a range error can't show. |
| NumberStepper | `components-numberstepper` (Default, InAForm) | IconButton, Icon, NumberTicker | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| NumberTicker | `components-numberticker` (Default) | — | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| OTPInput | `components-otpinput` (Default, InAFieldInsideAForm) | — | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | Takes no `ref` or `autoFocus`; focus its first cell with a selector. |
| PageDots | `components-pagedots` (Default) | drag.ts | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| PageHeader | `components-pageheader` (Default) | — | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Pagination | `components-pagination` (Default, WithLinks) | IconButton, Icon | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| PasswordInput | `components-passwordinput` (Default, InAFieldInsideAForm) | IconButton, Icon, Input | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Popover | `components-popover` (Default, Placements, NearTheEdges, InsideAClippingCard, InsideDialog) | Expand, outside press | W4: pointer, keyboard, alternate, reduced, 390 px; video for drags and morphs | Flip decided at open; an outside click closes it and focus follows the click. |
| ProgressBar | `components-progressbar` (Default, Indeterminate) | — | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| ProgressRing | `components-progressring` (Default) | Check | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| RadioGroup | `components-radiogroup` (Default, Disabled, InAForm) | — | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| RangeSlider | `components-rangeslider` (Default, InAForm, Disabled) | SliderTrack | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Rating | `components-rating` (Default, ReadOnly, InAForm) | Icon | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| SearchField | `components-searchfield` (Default, InAForm) | IconButton, Icon | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| SegmentedTabs | `components-segmentedtabs` (Default, LongLabels) | — | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Select | `components-select` (Default, Empty, InAForm, LongList, NearTheBottom, InsideAClippingCard) | Check, list.tsx, outside press, top layer, Icon | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Separator | `components-separator` (Default) | — | W1: rendering, native props, labels, focus; W4: shadow ring | — |
| SidebarNav | `components-sidebarnav` (Default, Collapsed, LongLabels, WithLinks) | — | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Skeleton | `components-skeleton` (Default) | — | W1: rendering, native props, labels, focus; W4: shadow ring | — |
| Slider | `components-slider` (Default, InAForm, Disabled) | SliderTrack | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Spinner | `components-spinner` (Default) | — | W0: rendering, size-derived strokes, reduced motion | — |
| SplitPane | `components-splitpane` (Default) | drag.ts | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| StatTile | `components-stattile` (Default) | Card, Icon, NumberTicker | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| StatusBadge | `components-statusbadge` (Default) | Icon | W1: rendering, native props, labels, focus; W4: shadow ring | — |
| SwipeButton | `components-swipebutton` (Default) | Check, drag.ts, Icon | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | Layouts narrower than its 280 px demo are unverified. |
| TabBar | `components-tabbar` (Default, WithLinks) | — | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Table | `components-table` (Default, Wide) | Skeleton, Card | W5: pointer, keyboard, alternate, reduced, 390 px (and 1280 px for layout) | The header sticks only when the caller gives the table a height. |
| Tabs | `components-tabs` (Default, Segmented) | SegmentedTabs, UnderlineTabs | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Tag | `components-tag` (Default, Removable) | Icon | W1: rendering, native props, labels, focus; W4: shadow ring | Labels don't truncate. |
| TagInput | `components-taginput` (Default, InAFieldInsideAForm) | Tag | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Textarea | `components-textarea` (Default) | — | W1; W4: surface growth, alternate, reduced | — |
| TextField | `components-textfield` (Default, InAForm, Disabled) | Icon | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| ThemeToggle | `components-themetoggle` (Default) | Icon, Toggle | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Timeline | `components-timeline` (Default) | — | W1: rendering, native props, labels, focus; W4: shadow ring | — |
| TimePicker | `components-timepicker` (Default, InAFieldInsideAForm) | Popover, TimeWheel | W5: pointer, keyboard, alternate, reduced, 390 px (and 1280 px for layout) | Enter without a change keeps null; the trigger can't say it's required. |
| TimeWheel | `components-timewheel` (Default, InAFieldInsideAForm) | drag.ts | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Toast | `components-toast` (Default, Sharing) | Icon, Spinner | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| ToastStack | `components-toaststack` (Default) | IconButton, Icon | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Toggle | `components-toggle` (Default, InAForm) | — | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| ToggleGroup | `components-togglegroup` (Default, Formatting, InAFieldInsideAForm) | Button, IconButton | W4: pointer, keyboard, alternate, reduced, 390 px; video for drags and morphs | Shrinking `options` below the focused index drops it from the Tab order. |
| Toolbar | `components-toolbar` (Default, Vertical, WithDisabledAction) | TooltipGroup | W4: pointer, keyboard, alternate, reduced, 390 px; video for drags and morphs | — |
| Tooltip | `components-tooltip` (Default, NearTheEdges, InsideAClippingCard) | top layer | W4: pointer, keyboard, alternate, reduced, 390 px; video for drags and morphs | Viewport clamping decided when it shows. |
| TreeView | `components-treeview` (Default, SelectionInClosedFolder) | list.tsx, Icon | W5: pointer, keyboard, alternate, reduced, 390 px (and 1280 px for layout) | ArrowRight on an open, empty folder at the end throws; values must be unique across the tree. |
| UnderlineTabs | `components-underlinetabs` (Default) | — | W3; W5: shared underline regression | — |
| VideoControls | `components-videocontrols` (Default) | SeekBar, IconButton, Icon, VolumeSlider | W4: pointer, keyboard, alternate, reduced, 390 px; video for drags and morphs | — |
| VolumeSlider | `components-volumeslider` (Default, OnInk) | drag.ts, Icon | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| WaveformScrubber | `components-waveformscrubber` (Default) | drag.ts, SeekBar | W4: pointer, keyboard, alternate, reduced, 390 px; video for drags and morphs | — |
| WizardSteps | `components-wizardsteps` (Default, LongLabels) | Check | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |

## Justified duplication

- Menu rows (`Menu`), listbox options (Select, Combobox, MultiSelect, CommandPalette), nav links and table rows keep their own markup and roles; they share the highlight (`ListHighlight`), keys (`useActiveIndex`) and typeahead from `src/list.tsx`, not a row component.
- MultiSelect repeats Select's top-layer orchestration (placement, height cap, keys, typeahead, list markup) instead of a generic select abstraction, as approved; multiple selection changes picking, the summary, Enter and the hidden inputs.
- Dialog's trigger flight and Lightbox's thumbnail flight stay separate: the Dialog panel measures its content and grows from a pill; the Lightbox animates a fixed 3:2 box with a different inset and radius.
- Field and Fieldset repeat about 12 lines of description and error markup; share them if a third consumer appears.
- Header measures its current link the way UnderlineTabs measures its tab (6 lines each) and shares UnderlineTabs' `Underline` for the drawing.
- ColorPicker and TimePicker both wrap their inner controls in `FieldContext value={{ disabled }}` (the Fieldset pattern) so the Field's label and id stay on the outer control.

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


Wave5: tables, tree, app layout, pickers and the Settings, Authentication, Detail page and Theme examples. Each new component has pointer, keyboard, alternate, reduced-motion and 390px evidence (layout also at 1280px); forms check submitted FormData, reset and error wiring; `npm test` runs 14 tests (calendar and color). Found and fixed while composing: Tabs' panel column now shrinks to its container (the Detail page overflowed at 390px), Header shares UnderlineTabs' underline and draws none for an unmatched `value` instead of crashing, ActionMenu got a 32px size for table rows, the three-dots shape moved to `icons.more`, and fragment links bypass LinkProvider. The package consumer server-renders 105 exports. Reports: `/tmp/morph-wave5{A,B,C,D,E,F,G}-report.txt` (5D covers ColorPicker and TimePicker).

Wave5 limits: after an outside press TimePicker's focus follows the click; ColorPicker resets the hue for a gray set from outside; TreeView throws on ArrowRight at an open, empty folder at the end; DataTable's loading placeholders are fixed at five rows; AppShell's bottom padding fits a 64px mobile nav; Breadcrumbs requires `onNavigate` even when every item has an `href`; ActionMenu's 224px minimum truncates long action labels and a shifted menu sits flush with the viewport edge; MorphButton drops focus while busy (see its row).
