# Tensile

React components where each control is one shape that moves with its state. A control morphs between its states, content inside it blurs out and in, and drags follow the pointer and keep their speed when you let go. Colors, type, radii, focus and motion speed are CSS variables you can override. All text and data come in as props, with English defaults.

[Website](https://seb-graf.github.io/tensile/) · [Documentation](https://seb-graf.github.io/tensile/docs/get-started/)

## Install

```sh
npm install tensile
```

Tensile needs React 19 and React DOM 19. Motion installs with it. Your app doesn't need Tailwind; if it uses Tailwind 4, `tensile/tailwind.css` brings the tokens into your own classes.

## Example

```tsx
import "tensile/reset.css"; // optional, if your app has no reset
import "tensile/styles.css";
import { Toggle } from "tensile";

export default function App() {
  return <Toggle label="Notifications" />;
}
```

The Toggle keeps its own state. Pass `checked` and `onCheckedChange` to keep it in yours.

## Documentation

- [Get started](https://seb-graf.github.io/tensile/docs/get-started/)
- [Styling and tokens](https://seb-graf.github.io/tensile/docs/styling/), including dark mode
- [Motion](https://seb-graf.github.io/tensile/docs/motion/)
- [Forms](https://seb-graf.github.io/tensile/docs/forms/)
- [Accessibility](https://seb-graf.github.io/tensile/docs/accessibility/)
- [Responsive behavior](https://seb-graf.github.io/tensile/docs/responsive/)
- [Patterns and recipes](https://seb-graf.github.io/tensile/docs/patterns/)
- [Known limitations](https://seb-graf.github.io/tensile/docs/limitations/)
- [Next.js](https://seb-graf.github.io/tensile/docs/nextjs/), [React Router](https://seb-graf.github.io/tensile/docs/react-router/), [Vite](https://seb-graf.github.io/tensile/docs/vite/)
- [All components](https://seb-graf.github.io/tensile/#components), each with live demos, props and keys
- [llms.txt](https://seb-graf.github.io/tensile/llms.txt) and [llms-full.txt](https://seb-graf.github.io/tensile/llms-full.txt) for AI tools

## License

[MIT](LICENSE) © 2026 Sébastien Graf. The bundled Geist fonts keep their SIL Open Font License; see [THIRD_PARTY_NOTICES](THIRD_PARTY_NOTICES).

## Developing the library

- `npm run storybook`: the component workshop at http://localhost:6006.
- `npx tsc --noEmit` type-checks everything; `npm test` runs the calendar and color tests.
- `npm run build` builds the package into `dist/`; `npm run check:consumer` checks a Vite app without Tailwind against it, and `npm run check:next` a Next.js app.
- `npm run site` develops the landing page and docs; `npm run build:site` builds them into `site-dist/`, and `npm run preview:site` serves that build at http://localhost:4173/tensile/.
- [Contributing](CONTRIBUTING.md) covers checks and releases; [Changelog](CHANGELOG.md) lists package changes.
- `AGENTS.md` holds the rules and the component inventory; `docs/coverage.md` records what each wave covered and how it was checked.

Each component lives in `src/components/<category>/<Name>/` with its stories, its authored `<Name>.docs.ts` and its demos in `demos/`. Demos import from `tensile` and render in both the docs and Storybook; the docs show each demo's exact source.

`npm run docs:generate` reads the components with TypeScript and writes `site/docs/api.json` (props, types, defaults) and `site/docs/stats.json` (version, license, component count, gzip sizes). Prop descriptions come from `<Name>.docs.ts` or the props' JSDoc. Don't edit either file by hand.

`npm run build:site` builds the site, then `scripts/prerender.mjs` renders every page to static HTML with its meta tags and writes `llms.txt` and `llms-full.txt`. Guides are React pages in `site/docs/`. `uv run scripts/og-image.py` redraws the Open Graph image in `site/public/og.png`.
