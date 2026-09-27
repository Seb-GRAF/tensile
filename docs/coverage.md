# Coverage

What the design system covers, how, and where each piece stands. Status is **done** once a wave has built, checked and committed it.

## Foundations

| Piece | Artifact | Wave | Status |
|---|---|---|---|
| Tokens: colors, type, radii, shadow, focus, layers, page width | `src/theme.css`, Foundations/Tokens | 0 | done |
| Motion speed and reduced motion from CSS | `useSprings` in `src/springs.ts`, `--motion-duration-scale`, Foundations/Motion | 0 | done |
| Library stylesheet without page styles; opt-in reset | `src/index.css`, `src/reset.css` | 0, 1 | styles done; reset planned |
| Icons | `Icon`, `src/icons.tsx` | 0 | done |
| Loading visual | `Spinner` | 0 | done |
| Measuring for responsive geometry | `src/useSize.ts` | 0 | done |
| Top layer, placement, outside press | `src/overlay.ts` | 1 | planned |
| Modal behavior | `src/Modal.tsx` | 1 | planned |
| Built package and consumer check | `vite.lib.config.ts`, `examples/consumer` | 1 | planned |

## Requested coverage

| Requested | Status | Artifact or mapping | Wave |
|---|---|---|---|
| Button, IconButton | create | IconButton composes Button | 1 |
| Link | create | `Link` and `LinkProvider` | 1 |
| Input, Textarea | create | | 1 |
| Spinner | done | | 0 |
| Field, Fieldset | create | Field exports `useField` | 1 |
| ButtonGroup | recipe | `div role="group"` with `flex flex-wrap gap-2`; Toolbar for keyboard navigation | docs |
| Card, Separator | create | | 1 |
| Typography, container, stack, inline, grid, aspect ratio | recipe | token utilities, `max-w-page`, Tailwind layout utilities | docs |
| Existing components (57) | migrate | batches: actions, inputs and selection, menus, feedback, data display (2); navigation, sliders, dates, layout, dialogs (3); overlays, media (4) | 2–4 |
| PasswordField | create as `PasswordInput` | Input with a show/hide IconButton, inside Field | 2 |
| NumberInput | create | typed entry; NumberStepper stays the stepping control | 2 |
| Slider | create | shares `SliderTrack` with RangeSlider | 3 |
| MultiSelect | create | Select's shape and list with checks | 4 |
| CheckboxGroup | create | composes Checkbox | 2 |
| ToggleGroup | create | pressed buttons; also the selectable-chip pattern | 4 |
| DateRangePicker | create | shares `calendar.ts` and `Calendar` with DatePicker | 3 |
| TimePicker | create | Popover with TimeWheel | 5 |
| ColorPicker | create | 2D area, hue Slider, hex Input | 5 |
| EditableText | create | Input-based | 2 |
| FileUpload | extend | accept, multiple, disabled, responsive; file-list story | 3 |
| Avatar, AvatarGroup | create | Avatar composes Image | 1 |
| Chip or Tag | create `Tag` | removable or static; selectable chips are ToggleGroup, counts are Badge, status is StatusBadge | 1 |
| DescriptionList, Timeline, List | create | display only | 1 |
| Keyboard shortcut | create `Kbd` | | 1 |
| Skeleton, StatusBadge | create | | 1 |
| EmptyState, LoadingState, NotificationList | create | | 3 |
| Tabs with panels | create `Tabs`, extend the tablists | composes SegmentedTabs or UnderlineTabs | 3 |
| Toolbar | create | roving focus; the gliding tooltip | 4 |
| Navigation links and active states | extend | SidebarNav, CollapsibleSidebar, Breadcrumbs, Pagination, TabBar | 3 |
| PageHeader | create | | 3 |
| Header, Footer, AppShell | create | | 5 |
| Tooltip, Popover, Dialog, BottomSheet | extend | Tooltip's API changes | 3–4 |
| Drawer | create | shares `Sheet` with BottomSheet | 4 |
| AlertDialog | create | composes Dialog | 3 |
| ContextMenu | create | shares `Menu` with ActionMenu | 4 |
| HoverCard | defer | Popover covers rich content on click, Tooltip covers hover hints; hover-only rich previews are hard to reach by keyboard | |
| Table | create | | 5 |
| DataTable | create | controlled; the caller sorts and pages | 5 |
| TreeView | create | | 5 |
| Image | create | | 1 |
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
