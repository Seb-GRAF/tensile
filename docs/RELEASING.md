# Maintaining and releasing Tensile

Use Node 24 and npm. Run all builds sequentially because they share `dist/`.

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

Workflow actions are pinned to commit SHAs and updated by Dependabot. The required dependency review checks newly introduced dependencies for known vulnerabilities. Report vulnerabilities privately using [Security](../SECURITY.md).

## Dependency updates

TypeScript stays on 6.x while the documentation generator and Storybook use its JavaScript compiler API. [TypeScript 7.0 has no compiler API](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/); review 7.1 compatibility before upgrading. Keep the compiler version aligned in the root package and both consumer examples.

Update npm manifests and the root lockfile together. Review GitHub Actions release notes and keep actions pinned to full commit SHAs. Run `npm run check` before merging dependency updates. Close an older update PR only after its changes are included or its incompatibility is documented.
