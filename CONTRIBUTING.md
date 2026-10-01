# Contributing to Tensile

Tensile is a React component library. Start with an issue for a new component, a breaking API change, or a large refactor. For a focused bug fix, open a pull request with a reproduction and the fix.

## Set up

Use Node 24, npm, and [uv](https://docs.astral.sh/uv/getting-started/installation/).

```sh
nvm use
npm ci
uv run --with playwright==1.63.0 playwright install --with-deps chromium firefox webkit
npm run storybook
```

`npm run site` starts the documentation site. `npm run build:site` builds its production version; `npm run preview:site` serves it. Stop development servers you start when you finish; leave other developers' servers alone.

## Make a change

Read the closest existing component before editing. Follow its naming, layout, and error handling. Keep the change focused; avoid unrelated cleanup, speculative options, and helpers with only one caller. Reuse the component that owns a behavior instead of rebuilding it.

See [Architecture and component guidelines](docs/ARCHITECTURE.md) for dependencies, public APIs, styling, motion, and accessibility. Use named exports, double quotes, and semicolons. Prefer concrete names and straightforward expressions. Do not add checks for states that the caller or types already rule out.

Each component has its implementation, stories, authored documentation, and shared demo files. Update the docs when behavior or props change. Demos import from `tensile` and are used by both Storybook and the docs site. Keep Storybook IDs stable so existing links continue to work.

## Verify the change

Run the checks that cover the behavior you changed while developing:

| Command | Checks |
| --- | --- |
| `npx tsc --noEmit` | Library, stories, demos, and site types |
| `npm test` | Calendar and color logic |
| `npm run check:consumer` | Packed package in a Vite app without Tailwind; public types, build, and server rendering |
| `npm run check:next` | Packed package in Next.js; build, hydration, state updates, and reduced motion |
| `npm run test:keyboard` | Storybook keyboard and accessibility scenarios in Chromium, Firefox, and WebKit |
| `npm run build:site` | Generated API references, site build, and static pages |

Before submitting, run the complete suite:

```sh
npm run check
```

Build commands share `dist/`; run them sequentially. Both consumer checks accept an absolute `TENSILE_TARBALL` path to validate an already-built package. The Vite consumer checks React 19.0.0 and the current React 19 release. Add a server-render fixture in `examples/consumer/ssr.mjs` when adding an export.

Add tests for non-trivial logic and behavior that can regress independently. Extend an existing test or keyboard fixture where possible. Do not add tests that repeat prop declarations, defaults, labels, or direct passthroughs.

The browser checker lives in `tests/keyboard/check_story.py`. Run one fixture with:

```sh
uv run tests/keyboard/check_story.py components-tabs--default \
  "$(cat tests/keyboard/components-tabs--default.json)" \
  --browser chromium --out /tmp/tensile-tabs
```

For visual or interaction changes, also check the affected states at phone, tablet, and desktop widths, in both themes and with reduced motion. Include long content, keyboard focus, disabled and error states where relevant. Check horizontal overflow and focus after dismissal.

An `a11y` fixture step runs axe on the story and open dialogs. Review incomplete findings manually. CI retains logs, screenshots, and axe reports for seven days. Before releasing interaction changes, check affected controls with VoiceOver/Safari and NVDA/Firefox and record the versions and results. Automated checks alone do not establish accessibility conformance.

## Compatibility

- React and React DOM 19.x; React 18 is not supported.
- Next.js App Router, checked with the Next.js 16 consumer.
- Current Chromium, Firefox, and Safari are browser targets. CI uses Playwright Chromium, Firefox, and WebKit; WebKit automation is not installed Safari testing.
- Physical mobile devices and assistive technologies require manual verification.

## Pull requests

Use a short-lived branch and open a PR into `main`. Describe the problem, the resulting behavior, and how you checked it. Include migration steps for breaking changes and screenshots for visible changes. State anything still unverified.

Keep commits focused and use a short, concrete title. Squash a PR into one commit when merging. Do not rewrite published release tags. The required checks must pass before merge.

For a user-facing package change, run `npm run changeset` and commit the generated file. Use `patch` for compatible fixes and `minor` for features. During 0.x, breaking changes also use `minor`; after 1.0, use `major`. Documentation and tooling changes do not need a changeset. Do not edit package versions or the changelog by hand.

Report bugs through [GitHub Issues](https://github.com/Seb-GRAF/tensile/issues), with the component, version, expected and actual behavior, and a minimal reproduction. Include browser and operating system details for rendering or input issues. Report vulnerabilities privately as described in [Security](SECURITY.md).

Maintainers: see [Releasing](docs/RELEASING.md) for dependency updates, preview environments, publishing, and recovery.
