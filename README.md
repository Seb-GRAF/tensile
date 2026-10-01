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

## Development

Use Node 24 and npm.

```sh
npm ci
npm run storybook
```

- `npm run site` starts the documentation site.
- `npm run build` builds the package into `dist/`.
- `npm run check` runs types, unit tests, consumer checks, browser scenarios, and the docs build.

See [Contributing](CONTRIBUTING.md) for setup and verification, [Architecture](docs/ARCHITECTURE.md) for component guidelines, and [Releasing](docs/RELEASING.md) for the release process.

## Repository layout

| Path | Contents |
| --- | --- |
| `src/` | Shared foundations and public exports |
| `src/components/` | Components grouped by responsibility, with stories, docs, and demos |
| `src/examples/` | Pages composed from public components |
| `site/` | Documentation and landing page |
| `docs/` | Storybook guides and contributor documentation |
| `examples/` | Vite and Next.js package consumers |
| `tests/keyboard/` | Browser interaction fixtures and their runner |
| `scripts/` | Documentation generation and build tools |

`npm run docs:generate` derives API references and package statistics from the source. `npm run build:site` also renders static documentation pages. See [Changelog](CHANGELOG.md) for released changes.
