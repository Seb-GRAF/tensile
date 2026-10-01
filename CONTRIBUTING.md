# Contributing

Use Node 24 (`nvm use`) and npm. Install with `npm ci`. Read `AGENTS.md` before changing a component, then read the closest implementation in full. Keep changes focused and preserve unrelated work.

## Development

- `npm run storybook`: component workshop.
- `npm run site`: build the public package and start landing-page development.
- `npm run build:site && npm run preview:site`: landing page and documentation together.

Components take content through props with English defaults. Reuse the existing controls and foundations. Add a story for a distinct behavior, not every possible prop combination. Explain interaction and limitations in the story or component documentation. Ask before adding new components, files, options, or abstractions.

Each component lives in `src/components/<category>/<Name>/` with its implementation, stories and authored `<Name>.docs.ts`. Standalone demo files live in that component’s `demos/` subfolder. Demos use public package imports and render in both the docs and Storybook; documentation displays each file verbatim. Keep each variant in its own demo file. Do not maintain a second copy of an example's behavior.

## Checks

```sh
uv run --with playwright==1.63.0 playwright install --with-deps chromium firefox webkit
npm run check
```

`npm run check` runs TypeScript, unit tests, Vite and Next.js consumer checks, keyboard scenarios in Chromium/Firefox/WebKit, and the documentation build. Install [uv](https://docs.astral.sh/uv/getting-started/installation/) for the browser checks.

Run build commands sequentially: they share `dist/`. The consumer check packs the library, installs the tarball outside the checkout, checks types including documentation examples, builds without Tailwind, and server-renders every export. Add an SSR fixture when adding an export.

For visible changes, review the production site at phone, tablet, and desktop widths. Check keyboard focus, reduced motion, long content, errors, font requests, and horizontal overflow. Report browser versions actually checked. Type-checking and server rendering are not browser, hydration, or screen-reader verification.

The Vite consumer installs both React 19.0.0 and the newest React 19 release, checking public types, the production build, and server rendering against each. The Next.js app checks hydration, controlled and uncontrolled updates, and reduced motion against its current React 19 dependency.

Keyboard fixtures in `tests/keyboard/` cover navigation, dialog focus containment and return, and controlled form submission and reset. Add regression cases to the closest fixture. An `a11y` step runs axe against the rendered story and open dialogs for WCAG 2.2 A/AA rules, including earlier WCAG versions. Violations fail the run; JSON reports include findings that need manual review. Browser versions are printed in each run's log. CI retains the logs, screenshots and axe reports in its keyboard-results artifact for seven days.

Before a release with interaction changes, manually check the affected controls with VoiceOver/Safari and NVDA/Firefox: names and descriptions, errors, selection announcements, and focus after dismissal. Review axe's incomplete findings. Record the tested versions and results in the PR; automated checks alone do not establish accessibility conformance.

## Compatibility

| Area | Target and verification |
| --- | --- |
| React | React and React DOM 19.x; minimum and current versions checked in the Vite consumer. React 18 is not supported. |
| Next.js | App Router, exercised by the Next.js 16 consumer. Other framework versions are not part of CI. |
| Desktop browsers | Current Chromium, Firefox, and Safari are the targets. CI runs selected scenarios in Playwright Chromium, Firefox, and WebKit. WebKit automation does not verify installed Safari. |
| Mobile and assistive technology | Manual verification is required; CI does not establish iOS, Android, VoiceOver, or NVDA support. |

Keep the existing 0.x versioning policy below. Removing support or changing public behavior requires a changeset with migration instructions.

Do not stop another developer's server. Stop servers you start for verification when you finish.

## Issues and pull requests

Describe the expected behavior, actual behavior, component and version, and a minimal reproduction. Include browser and operating system details for rendering or input issues. For a pull request, explain the concrete change and the checks you ran. Identify anything still unverified.

Use [seb-graf/tensile](https://github.com/seb-graf/tensile) for pull requests and [GitHub Issues](https://github.com/seb-graf/tensile/issues) for bug reports.

## Changesets

For a user-facing package change, run `npm run changeset` and commit the generated file with your code. Describe the behavior users will see and any migration steps. Choose `patch` for compatible fixes and `minor` for new features. During 0.x, breaking changes also use `minor`; once 1.0 is released, breaking changes use `major`. Documentation and tooling changes do not need a changeset.

Do not update `package.json` versions or `CHANGELOG.md` by hand. Changesets collects the release notes and the release workflow keeps a single release PR up to date, including the lockfile.

## Environments

- Local: Storybook and the documentation site.
- Preview: Vercel deploys development branches and posts preview links on PRs. Open `/tensile/` on the preview URL. Fork contributions may need deployment approval in Vercel. Preview pages are marked `noindex`.
- Production: GitHub Pages serves the documentation for the released commit; npm's `latest` tag is the stable package. Vercel does not deploy `main`.
- Prerelease: maintainers can run the Release workflow on `main` with channel `next`. It versions pending changesets as a snapshot, validates the packed artifact, and publishes only to `tensile@next`. It does not commit the snapshot or update production docs. Use this while a release PR is still pending.

Use short-lived branches and PRs into `main`. The required `check` job must pass before merging. No separate develop or staging branch is needed.

## Releases

Merging the release PR authorizes stable publication and documentation deployment. The Release workflow:

1. Builds and packs the release with Changesets, retaining the artifact for 30 days.
2. Runs the full check command. Both consumer checks install that exact tarball through `TENSILE_TARBALL`, an absolute path, without rebuilding it.
3. Publishes the validated artifact through npm trusted publishing in the `npm` GitHub environment, then creates the version tag and GitHub release from the changelog.
4. Calls Deploy site for the same commit, updating GitHub Pages.

If npm publication succeeds but tag or GitHub release creation fails, recover the missing tag and release from the same commit and changelog; do not bump or republish the package. If only documentation deployment fails, rerun that job. Deploy site also supports manual dispatch for documentation-only updates; select the intended released tag when starting it.

Review the release PR's migration notes and inspect the tarball listing in the workflow. Verify lower peer-version bounds before advertising them as tested. Browser automation does not replace manual visual or screen-reader review.

### Hosting and repository settings

- GitHub: protect `main`, require the `check` status and PRs, and enable “Allow GitHub Actions to create and approve pull requests.” A solo maintainer does not need a second reviewer. Keep default workflow permissions read-only; each workflow requests the permissions it needs.
- npm: configure a GitHub Actions trusted publisher for owner `Seb-GRAF`, repository `tensile`, workflow `release.yml`, environment `npm`, with direct publishing allowed. No `NPM_TOKEN` secret is used.
- GitHub environment `npm`: restrict deployments to the `main` branch. The release PR merge is the release approval.
- Vercel: connect the repository to the `tensile-preview` project, using the root directory and Node 24. `vercel.json` provides the build, output directory, `/tensile/` routing, and preview-only branch policy. No Vercel credentials are exposed to PR workflows.
- GitHub Pages: use GitHub Actions as the source. The existing `github-pages` environment hosts production.

GitHub may ask a maintainer to approve CI runs for a bot-created release PR. Approve those runs before merging; do not bypass the required check.

Dependabot opens weekly grouped updates for compatible npm dependencies and GitHub Actions. Review major updates individually and add a changeset when an update changes the published package's behavior or requirements.

Workflow actions are pinned to commit SHAs and updated by Dependabot. The required dependency review checks newly introduced dependencies for known vulnerabilities. Report vulnerabilities privately using [Security](SECURITY.md).
