# Release notes

Run `npm run changeset` for a user-facing package change. Choose `patch` for a compatible fix or `minor` for a feature. During 0.x, use `minor` for breaking changes and include migration instructions.

Commit the generated Markdown file with the change. Documentation and tooling changes do not need a changeset. The release workflow combines pending changesets into a release PR; do not edit versions or the generated changelog by hand.
