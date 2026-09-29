# Contributing

Use Node 24 and npm. Install with `npm ci`. Read `AGENTS.md` before changing a component, then read the closest implementation in full. Keep changes focused and preserve unrelated work.

## Development

- `npm run storybook`: component workshop.
- `npm run site`: build the public package and start landing-page development.
- `npm run build:site && npm run preview:site`: landing page and documentation together.

Components take content through props with English defaults. Reuse the existing controls and foundations. Add a story for a distinct behavior, not every possible prop combination. Explain interaction and limitations in the story or component documentation. Ask before adding new components, files, options, or abstractions.

Each component lives in `src/components/<category>/<Name>/` with its implementation, stories and authored `<Name>.docs.ts`. Standalone demo files live in that component’s `demos/` subfolder. Demos use public package imports and render in both the docs and Storybook; documentation displays each file verbatim. Keep each variant in its own demo file. Do not maintain a second copy of an example's behavior.

## Checks

```sh
npx tsc --noEmit
npm test
npm run check:consumer
npm run build:site
```

Run build commands sequentially: they share `dist/`. The consumer check packs the library, installs the tarball outside the checkout, checks types including documentation examples, builds without Tailwind, and server-renders every export. Add an SSR fixture when adding an export.

For visible changes, review the production site at phone, tablet, and desktop widths. Check keyboard focus, reduced motion, long content, errors, font requests, and horizontal overflow. Report browser versions actually checked. Type-checking and server rendering are not browser, hydration, or screen-reader verification.

Do not stop another developer's server. Stop servers you start for verification when you finish.

## Issues and pull requests

Describe the expected behavior, actual behavior, component and version, and a minimal reproduction. Include browser and operating system details for rendering or input issues. For a pull request, explain the concrete change and the checks you ran. Identify anything still unverified.

Use [seb-graf/tensile](https://github.com/seb-graf/tensile) for pull requests and [GitHub Issues](https://github.com/seb-graf/tensile/issues) for bug reports.

## Release procedure

Publication and deployment require maintainer authorization. The approved package name is `tensile` and the repository is `seb-graf/tensile`. The library is licensed under MIT, copyright 2026 Sébastien Graf. The site is hosted on GitHub Pages at https://seb-graf.github.io/tensile/. Do not publish with placeholder metadata.

1. Verify npm publishing rights for `tensile` and repository access. Include the license and bundled-font notices in the package. Confirm the package version and npm account before publishing.
2. Finish and review concurrent component work. Release from a clean, reviewed commit.
3. Update `version` in `package.json` and synchronize `package-lock.json`; update `CHANGELOG.md`. Start at `0.1.0`. During 0.x, document breaking changes in minor releases; reserve patches for compatible fixes.
4. Run the checks above, sequentially. Verify lower peer-version bounds before advertising them as tested.
5. Run `npm pack --dry-run --json`, then `npm pack`. Inspect the tarball: JS, declarations, both CSS entries, all font URLs and assets, README, package metadata, license, and third-party notices; no stories, site, tests, or development configuration.
6. Install that exact final tarball into a clean consumer, repeat types, build, SSR and browser checks, then retain it for publication. Do not rebuild a different artifact for publishing.
7. After authorization, create the matching version tag and publish the tested tarball with `npm publish ./tensile-0.1.0.tgz --access public`. Add release notes from the changelog.
8. After deployment authorization, manually run the site workflow for the release commit. Review the deployed base path, assets, documentation, and links. GitHub Pages serves the landing page and authored documentation under `/tensile/`. Storybook is built separately for development and review.

For subsequent releases, npm trusted publishing can replace local publication. Configure the approved repository and workflow in npm first. It requires npm 11.5.1 or newer and Node 22.14.0 or newer on supported hosted runners. No automatic publishing workflow is enabled here.
