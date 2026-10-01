# Architecture and component guidelines

Tensile uses React 19, strict TypeScript, Motion, Tailwind 4, and Geist. Components work independently of an application router, backend, or form library. Content and labels come from props, with English defaults.

## Dependencies and files

Dependencies point toward shared foundations:

1. Foundations in `src/` provide tokens, motion, measurement, focus, overlays, and shared logic.
2. Primitives own one responsibility, such as a button, input, icon, or spinner.
3. Composed components combine primitives.
4. Examples compose the public package API.

Import components directly within the library. Use `tensile` in demos and `src/index.ts` in composed Storybook examples. Avoid circular imports through the public entry point.

A component lives in `src/components/<category>/<Name>/`:

```text
Button/
  Button.tsx
  Button.stories.tsx
  Button.docs.ts
  demos/
    ButtonDemo.tsx
```

Categories are `actions`, `inputs`, `navigation`, `feedback`, `data-display`, `layout`, `overlays`, and `media`. Export each component and its `<Name>Props` type from `src/index.ts`.

Share a responsibility, not merely similar markup. Menu items, listbox options, navigation links, and table rows retain their own semantics. Prefer an existing implementation over adding a helper for one caller.

## Public APIs

- Use React nodes for content and props for user-facing text. Text derived from data uses a formatter prop.
- Native controls accept their element's props, including form attributes, accessibility attributes, and refs. Omit props that conflict with the component's own contract.
- Value controls support controlled and uncontrolled use through `useControllable`: `value` and `onValueChange`, or `defaultValue`. Follow the equivalent checked/open naming for those states.
- Composite form controls expose named values through hidden inputs. Read label, description, error, required, and disabled state from `useField` where applicable.
- Navigation items with `href` render links and use the shared link handling. Other actions render buttons.
- Put optional defaults in parameter destructuring. Keep transient focus, hover, and animation state inside the component.
- `className` controls the outer element's placement and size. Use explicit props for visual variants; do not rely on conflicting utility classes to override another component's styling.

Preserve public exports, prop behavior, and Storybook IDs during internal changes. Document breaking changes and migration steps in a changeset.

## Styling

Tokens live in `src/theme.css`. Use the existing token utilities for colors, spacing, type, radii, and focus. Component classes carry the `tn:` prefix, and CSS variables use `--tn-*`. Variants follow the prefix, as in `tn:hover:bg-hover`. The `dark` class is unprefixed.

Stories, demos, examples, and the site use unprefixed utilities through the Tailwind token bridge. The distributed stylesheet works without a consumer Tailwind build. The reset is a separate, optional import.

Use `Button` for button behavior, `Input` for text entry, `Field` for label and error wiring, `Spinner` for loading, and `Icon` for named icons. Place ordinary content inside a surface instead of giving every nested element its own card.

Fields, tables, and charts fill the available width. Keep fixed geometry only where interaction requires it. Demo widths belong to the demo. Check both themes and long content before treating a visual change as finished.

## Motion

Animate the control or surface that owns the changing state. Do not animate a whole form or layout just because its children change.

Use `useSprings` for the shared motion settings and reduced-motion behavior. Use `useWidth` or `useSize` for measured geometry, `useLiquid` where a moving indicator stretches, and the shared drag helpers for pointer capture and rubber limits. Follow the nearest component's motion pattern before adding another one.

Keep text and controls stable while a surface changes size. Exiting duplicate content must be inert and hidden from assistive technology. Drags follow the pointer directly and preserve release velocity through the existing spring behavior.

## Accessibility

Start with native elements. Never nest interactive controls. Use the keyboard pattern appropriate to the role, with a visible focus ring, a meaningful accessible name, and predictable focus return after dismissal.

Use `Modal`, `Expand`, and the top-layer utilities for overlays. Reuse their focus and positioning behavior. Decorative icons and duplicate clipped labels are hidden from assistive technology; each action has one accessible copy.

Report loading, error, selection, and disabled states through the control's semantics. Keep focus available during asynchronous work where the existing contract requires it. Use actual links for navigation and native form values for submission.

See [Contributing](../CONTRIBUTING.md) for automated and manual checks, including the limits of browser automation.

## Stories and documentation

Stories use CSF3 with `satisfies Meta<typeof Component>`. Keep explicit IDs such as `components-button` stable. Add stories for distinct behavior: disabled, loading, empty, error, form submission/reset, or a meaningful composition. Avoid a story for every prop combination.

Use `useArgs` for controls that update discretely. For typing and dragging, follow the existing local-state wrappers so delayed Storybook updates do not interrupt input.

Authored `<Name>.docs.ts` files explain use, anatomy, keyboard behavior, props, and limitations. Their demos are the same files Storybook renders. Do not duplicate an example's implementation in prose or another preview.

`scripts/generate-docs.mjs` derives `site/docs/api.json` and `site/docs/stats.json`. Run `npm run docs:generate` after changing public APIs; do not edit the generated files by hand. Guides live in `site/docs/`, and `scripts/prerender.mjs` produces static pages and the machine-readable documentation during the site build.
