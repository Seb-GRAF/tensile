# Changelog

## 0.2.1

### Patch Changes

- 8d37303: Update Motion to 13.5.0. Public component APIs are unchanged.

## 0.2.0

### Minor Changes

- 09fc494: - CodeBlock adds syntax highlighting and a `language` prop (TSX by default).
  - Breadcrumbs opens hidden pages in a menu; calendars place Today in the footer, and DateField exposes `firstDayOfWeek`.
  - IconButton adds `iconSize`; PasswordInput preserves native input refs.
  - Breaking: the stylesheet is prefixed. Component classes are `tn:`-prefixed and the tokens are `--tn-*` (`--tn-color-accent`, `--tn-radius-control`, `--tn-motion-duration-scale`); override those names. `tensile/tailwind.css` maps the tokens into an app's own Tailwind 4 classes.
  - Every value-holding component works uncontrolled too: leave out `value` (`checked`, `open`…) and pass `defaultValue` (`defaultChecked`, `defaultOpen`…); the callbacks are optional.
  - Dark mode: the `dark` class on any element switches the tokens. `Card tone="ink"` and the other large dark surfaces stay dark in both themes; the new `--tn-color-scrim` token draws the backdrops; `--tn-color-on-accent` is a fixed `#111110`.
  - Button and IconButton take `href` and render a link; Link takes `underline={false}`.
  - Select, Combobox and MultiSelect take disabled options and option groups; Accordion takes `type="multiple"`.
  - New: DateField, HoverCard, NavigationMenu, and `toast()` with `Toaster`.
  - `useSprings`, `useWidth` and `useSize` are public exports.
  - Breaking: `Icon` draws an icon of the library's set by name (`<Icon name="close" />`; the names are the exported `IconName` type) instead of taking SVG children, and `IconButton` takes `icon`, a name or an element for your own content, instead of children. The `icons` export is gone.
  - Fixed: TreeView's ArrowRight on an open empty folder, MorphButton dropping focus while loading, Image keeping its state when `src` changes, and DateRangePicker keeping a half-picked range after a form reset.
  - The documentation site has a page per URL, pre-rendered, with guides, framework pages, `llms.txt` and `llms-full.txt`.
  - Text fields with the label inside a Field (Input, TextField, Select, Combobox, MultiSelect, TimePicker) are 48 px tall instead of 52, and Textarea is 2 px shorter; CommandPalette and a TagInput without a Field are 44 px, like Input.

### Patch Changes

- 033349e: DatePicker and DateRangePicker describe required selection with accessible text instead of an unsupported `aria-required` attribute on the calendar grid. Use `requiredLabel` to translate the default "Required" description.
  
  TreeView keeps animation wrappers out of the accessible tree while preserving hidden, inert rows during their exit animation.

## 0.1.0 — 2026-09-28

- Motion installs automatically as a runtime dependency; no separate consumer install is needed.
- MIT license, copyright 2026 Sébastien Graf.
- ESM package with public React components, TypeScript declarations, compiled styles, optional reset, and bundled Geist fonts.
- Isolated tarball consumer validation, including public imports, CSS without Tailwind, documentation example types, and server-render coverage.
- Landing page with interactive examples and Storybook documentation for getting started, styling, motion, composition, and component APIs.

The package is named `tensile`, with source at `seb-graf/tensile`. GitHub Pages is the approved host. See the README's known limitations before adopting a component.
