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
| Tabs with panels | done | underline or segmented tablist | 3 |
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
| Detail page | `examples-detail-page` | LinkProvider, Breadcrumbs, PageHeader, Button, ActionMenu, Tabs, Card, DescriptionList, Carousel, Lightbox, Timeline, List, IconButton, Drawer, Field, Input, Textarea, Select, Toggle, MorphButton | keyboard through breadcrumbs, actions, tabs and each panel; Carousel keys, Lightbox by Enter with focus back on the thumbnail; the edit Drawer's empty-name error (`aria-invalid`, focus), save timeline, and focus back on Edit after Save, Cancel, Escape and close; 390 px (no overflow on any tab since the Tabs fix), 800 and 1280 px, alternate, reduced | 5 |
| Theme and motion | `examples-theme-and-motion` | PageHeader, ToggleGroup, Card, Button, Spinner, Toggle, Select, VolumeSlider, List, StatusBadge, Tabs, Popover, Dialog, Field, Input | local theme switch by pointer and keyboard (`data-theme`, the scale readout 1 / 1.6 / 0), overlays at both speeds, StatusBadge cycle; 390, 800 and 1280 px, alternate, reduced | 5 |
| Data management | `examples-data-management` | LinkProvider, AppShell, CollapsibleSidebar, TabBar, Avatar, Icon, PageHeader, Button, SearchField, ToggleGroup, Tag, StatusBadge, DataTable, EmptyState, AlertDialog | skip link; sidebar and tab bar navigation without page loads (`aria-current`); search, status chips and tag removal by keyboard, each with a 600 ms load (`aria-busy`) back to page 1; sort (`aria-sort`), selection across pages with the header's indeterminate state, Mark as paid; row menu → AlertDialog (focus on Cancel, Escape back to the row's trigger, confirm removes the row and its selection); empty state; 390 px (the table scrolls in its named region, pagination clears the tab bar), 800 and 1280 px, alternate, reduced | 6 |
| Marketing | `examples-marketing` (Page, Hero, Features, Pricing, Testimonials, FAQ, CTA) | LinkProvider, Header, Footer, Button, Link, Card, StatusBadge, ProgressBar, AvatarGroup, StatTile, Icon, ToggleGroup, NumberTicker, Avatar, Accordion, Field, Input | header links scroll to their sections by Enter and click, and the next Tab continues there; the 390 px drawer by pointer and keyboard (a link closes it and scrolls, Escape returns focus to Menu); billing period by Space with rolling prices and a reversal; Accordion by Enter, Space and arrows; the signup form's two errors (`aria-invalid`, focus back on the input) and its confirmation; no horizontal overflow at 390, 800 and 1280 px; alternate, reduced; each section story at 800 px | 6 |

## Components

Every public component, with its story (the Controls panel shows the full API and defaults), what it builds on, how it was checked, and what remains open. "W" is the wave that last changed it; checks ran in Chromium through `check_story.py`.

| Component | Story | Composes | Checked | Open issues |
|---|---|---|---|---|
| Accordion | `components-accordion` (Default) | Icon | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| ActionMenu | `components-actionmenu` (Default, IconTrigger) | Menu, outside press, top layer | W2; W4: first measure, alternate; W5: sm size | A shifted open menu sits flush with the viewport edge. |
| Alert | `components-alert` (Default) | — | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| AlertDialog | `components-alertdialog` (Default, WithTrigger) | Button, Dialog | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| AppShell | `components-appshell` (Default) | — | W5: pointer, keyboard, alternate, reduced, 390 px (and 1280 px for layout) | Bottom padding fits a 64 px mobile nav; no safe-area inset. |
| Avatar | `components-avatar` (Default, Initials) | Image | W1: rendering, native props, labels, focus; W4: shadow ring | An empty or oddly spaced `name` gives odd initials. |
| AvatarGroup | `components-avatargroup` (Default) | Avatar | W1: rendering, native props, labels, focus; W4: shadow ring | The "+N" count isn't formatted; with initials, each circle covers the second letter of the one before. |
| Badge | `components-badge` (Default) | NumberTicker | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| BarChart | `components-barchart` (Default) | Card | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| BottomSheet | `components-bottomsheet` (Default, LongContent) | Sheet, Button | W4: pointer, keyboard, alternate, reduced, 390 px; video for drags and morphs | — |
| Breadcrumbs | `components-breadcrumbs` (Default, WithLinks) | Icon | W3; W5: shared icon | The expanded trail keeps its intrinsic width and can overflow at 390 px. |
| Button | `components-button` (Default, Disabled, InAForm) | — | W1: rendering, native props, labels, focus; W4: shadow ring | — |
| Card | `components-card` (Default, Ink) | — | W1: rendering, native props, labels, focus; W4: shadow ring | The ink tone doesn't remap `--color-muted`, so generic components with muted text fall below AA inside it; it's for content designed for ink (charts, stats). |
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
| Field | `components-field` (Default, InAForm) | Icon | W1: rendering, native props, labels, focus; W4: shadow ring | Errors are described, not announced live; the label and error are ink, so a Field can't sit on an ink surface. |
| Fieldset | `components-fieldset` (Default, Disabled) | Icon | W1: rendering, native props, labels, focus; W4: shadow ring | A Fieldset nested in a disabled one reports `disabled: false` to div-based controls. |
| FileUpload | `components-fileupload` (Default, WithFileList, Disabled) | Check, Icon, NumberTicker | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | Drag-and-drop file dispatch is code-reviewed only. |
| Footer | `components-footer` (Default) | Separator | W5: pointer, keyboard, alternate, reduced, 390 px (and 1280 px for layout) | — |
| Header | `components-header` (Default) | IconButton, Icon, Underline, Drawer | W5: pointer, keyboard, alternate, reduced, 390 px (and 1280 px for layout) | The drawer's current pill jumps to the chosen link while the drawer slides out. |
| HoldButton | `components-holdbutton` (Default) | Check | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Icon | `components-icon` (Default, AllIcons) | `src/icons.tsx` | W0: rendering, size-derived strokes, reduced motion | — |
| IconButton | `components-iconbutton` (Default) | Icon | W1: rendering, native props, labels, focus; W4: shadow ring | Its type still accepts `aria-label`; `label` wins at runtime. |
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
| MusicPlayer | `components-musicplayer` (Default) | Expand, SeekBar, IconButton | W4: pointer, keyboard, alternate, reduced, 390 px; video for drags and morphs | — |
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
| SearchField | `components-searchfield` (Default, InAForm) | IconButton, Icon | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | Its open state is internal: a value cleared from outside leaves it open until focus enters and leaves it. |
| Select | `components-select` (Default, Empty, InAForm, LongList, NearTheBottom, InsideAClippingCard) | Check, list.tsx, outside press, top layer, Icon | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Separator | `components-separator` (Default) | — | W1: rendering, native props, labels, focus; W4: shadow ring | — |
| SidebarNav | `components-sidebarnav` (Default, Collapsed, LongLabels, Categories, WithLinks) | — | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Skeleton | `components-skeleton` (Default) | — | W1: rendering, native props, labels, focus; W4: shadow ring | — |
| Slider | `components-slider` (Default, InAForm, Disabled) | SliderTrack | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Spinner | `components-spinner` (Default) | — | W0: rendering, size-derived strokes, reduced motion | — |
| SplitPane | `components-splitpane` (Default) | drag.ts | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| StatTile | `components-stattile` (Default) | Card, Icon, NumberTicker | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| StatusBadge | `components-statusbadge` (Default) | Icon | W1: rendering, native props, labels, focus; W4: shadow ring | Neutral uses ink text on the hover tone for AA; whether it still reads as neutral needs a design decision. |
| SwipeButton | `components-swipebutton` (Default) | Check, drag.ts, Icon | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | Layouts narrower than its 280 px demo are unverified. |
| TabBar | `components-tabbar` (Default, WithLinks) | — | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Table | `components-table` (Default, Wide) | Skeleton, Card | W5: pointer, keyboard, alternate, reduced, 390 px (and 1280 px for layout) | The header sticks only when the caller gives the table a height; no sticky first column, so row headers scroll away in a narrow container. |
| Tabs | `components-tabs` (Default, Segmented, LongLabels) | — | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Tag | `components-tag` (Default, Removable) | Icon | W1: rendering, native props, labels, focus; W4: shadow ring | Labels don't truncate. |
| TagInput | `components-taginput` (Default, InAFieldInsideAForm) | Tag | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| Textarea | `components-textarea` (Default) | — | W1; W4: surface growth, alternate, reduced | — |
| TextField | `components-textfield` (Default, InAForm, Disabled) | Icon | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| ThemeToggle | `components-themetoggle` (Default) | Toggle | W2: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
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
| VideoControls | `components-videocontrols` (Default) | SeekBar, IconButton, VolumeSlider | W4: pointer, keyboard, alternate, reduced, 390 px; video for drags and morphs | — |
| VolumeSlider | `components-volumeslider` (Default, OnInk) | drag.ts | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |
| WaveformScrubber | `components-waveformscrubber` (Default) | drag.ts, SeekBar | W4: pointer, keyboard, alternate, reduced, 390 px; video for drags and morphs | — |
| WizardSteps | `components-wizardsteps` (Default, LongLabels) | Check | W3: pointer, keyboard, alternate, reduced; 390 px where responsive | — |

## Justified duplication

- Menu rows (`Menu`), listbox options (Select, Combobox, MultiSelect, CommandPalette), nav links and table rows keep their own markup and roles; they share the highlight (`ListHighlight`), keys (`useActiveIndex`) and typeahead from `src/list.tsx`, not a row component.
- MultiSelect repeats Select's top-layer orchestration (placement, height cap, keys, typeahead, list markup) instead of a generic select abstraction, as approved; multiple selection changes picking, the summary, Enter and the hidden inputs.
- Dialog's trigger flight and Lightbox's thumbnail flight stay separate: the Dialog panel measures its content and grows from a pill; the Lightbox animates a fixed 3:2 box with a different inset and radius.
- Field and Fieldset repeat about 12 lines of description and error markup; share them if a third consumer appears.
- Header measures its current link the way Tabs' underline tablist measures its tab (6 lines each) and shares its `Underline` for the drawing.
- ColorPicker and TimePicker both wrap their inner controls in `FieldContext value={{ disabled }}` (the Fieldset pattern) so the Field's label and id stay on the outer control.
- The Data management example draws its own top bar (brand and avatar) with Header's surface classes: its navigation lives in the sidebar and tab bar, and Header always renders links and a menu drawer.

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

Wave6: the Data management and Marketing examples, the README, the consumer app (a Dialog holding Field with Input, Field with Select and a MorphButton submit, beside SegmentedTabs, Toggle and a ghost Button), and the final AGENTS.md, skill and coverage updates. Data management passed 143 checks over seven runs (two at 800 px, one each at 1280 and 390 px, alternate, reduced, and one for the story's own guards: only the newest load ends `aria-busy`, and the page is capped at the last page). Marketing passed twelve runs (the Page at 800, 1280 and 390 px, alternate, reduced at 390 px, each section story, the CTA at 390 px); composing it found the CTA card's grid column not shrinking below the email pill at 390 px, fixed with `grid-cols-1`. The consumer app was opened in Chromium for the first time: built from the Wave 6 tree without Tailwind, its dialog form (the empty-email error with `aria-invalid`, the Select's top-layer menu, loading → success → close, focus back on the trigger) and the tabs reset pass at 800 and 390 px with no console errors and no horizontal overflow. The Detail page was rechecked at 390 px: no tab overflows. `npm test` runs 14 tests; the package consumer server-renders 105 exports. Reports: `/tmp/morph-wave6A-report.txt`, `/tmp/morph-wave6B-report.txt`; screenshots under `/tmp/morph-shots/{DataPage,Marketing,consumer,DetailPage-lead-390}/`; the consumer script and its log in `/tmp/morph-review/`.

The machine restarted on 2026-09-28, before Wave 6 was committed, and cleared `/tmp`: the reports, screenshots and command files named above for Waves 1–5 no longer exist, and the records in this file are what they showed. `/tmp` doesn't survive a restart, so the Wave 6 artifacts are temporary too.

Wave6 limits: in Data management, focus falls to the page after removing a filter tag, after Clear filters and after confirming a delete, because the focused control unmounts (the story could hand focus to the search field or the next row's menu, as TagInput and NotificationList do); a selection survives filters, and Mark as paid also changes hidden selected rows; View, Duplicate and New invoice do nothing, and the other sections show only a title; after every invoice is deleted, the empty state still offers Clear filters; some sorts make the table a few px wider than its card at 800 px, so it scrolls. In Marketing, the header marks no current section (there's no scroll-spy), the Buttons have no handlers, the email check is the input's own (`name@host` passes), and Enter on an invalid input that already has focus doesn't announce the error again. Proposed, not made: export `icons` from the package so examples stop redrawing shared shapes such as the check.

## Package and public documentation preparation — 2026-09-28

The landing page uses public package exports and three shared examples from `docs/examples/`. Storybook now includes four guides and 105 component documentation entries; LinkProvider is documented with Link. MorphButton has an authored page, and MorphButton, Tabs, and the field composition display their shared example source. Other component pages use the existing stories and generated props/source; those snippets are reference examples, not all standalone application files.

Current checks: TypeScript passed; all 14 logic tests passed; the library and combined site/Storybook builds passed. The isolated consumer check installs the packed artifact with independent dependencies, checks public imports and the shared example types, builds without Tailwind, verifies the token override, and server-renders all 106 exports. The SelectionBar fixture closes the previously failing export-coverage check. An additional build and SSR run passed with React and React DOM 19.0.0 and the Motion 13.0.0 package; Motion's transitive dependency range still resolved a current 13.x implementation.

Packed-file inspection found 135 entries: built JS and declarations, both CSS entries, five local WOFF2 subsets, README, package metadata, and the font notice. No story, site, test, or development-config files were present. At that audit, the library LICENSE was pending the maintainer's identity/license decision.

Browser review used T3's Chromium 152 preview. The landing page was inspected at 320, 390, 800, and 1280 CSS pixels with no horizontal page overflow. Checks covered save status changes, clipboard confirmation, tab selection by pointer and ArrowRight, empty/valid field submission, focus on the invalid field, the skip link, mobile navigation, documentation links, and local Geist loading. The getting-started and MorphButton docs were checked at 390 px; inline code wraps and props tables scroll within their own width. Storybook's zero-scale remount check confirmed an instant 44 px busy button and a 0 s spinner. This checks the motion-scale contract, not a live OS preference change.

The packed consumer was also opened in Chromium. A separate manual build omitted the library reset and supplied a small host reset in `@layer base`; the dialog form's invalid state and white button label worked without page overflow at 800 px. An unlayered host reset overrode component text colors, which is now explained in the styling guide. Arbitrary host resets are not certified.

Still unverified: hydration and framework-specific integration, Safari/Firefox, physical touch devices, screen-reader speech, a deployed repository base path, and exhaustive copy/paste acceptance for all generated component snippets. Storybook retains its existing large-chunk warning. Other agents' concurrent component work was not edited or treated as part of this release change. The package remains private; no publication or deployment was performed.

License follow-up (2026-09-28): the maintainer approved MIT with copyright 2026 Sébastien Graf. The rebuilt production site includes both license files. An actual `tensile-0.1.0.tgz` was inspected and contains `license: "MIT"`, the exact library LICENSE, and the unchanged Geist notice. Hosting and publication remain pending.
