# Publish Handoff

This repo deploys to GitHub Pages from `main` using `.github/workflows/deploy.yml`.

## Local Preflight

Run:

```bash
npm run preflight:evidence
```

This checks:

- The private baseline refreshes and reports current evidence gaps.
- `private/` is ignored and no private files are tracked.
- Public achievement records have required proof fields and valid public links.
- ESLint passes.
- The production Vite build succeeds.
- The generated public site contains no blocked private/legal terms.
- `docs/public-share-summary.md` is regenerated from public achievement data.
- `private/export/readiness-snapshot.md` is regenerated from the local repo and private ledger.
- `private/export/verifier-outreach.md` is regenerated for private verifier requests.
- `private/export/verification-matrix.md` is regenerated from verifier and metric intake.
- `private/export/sriramos-evidence-packet.tex` is regenerated as the formal private packet.
- `private/export/publish-manifest.md` is regenerated from the current git worktree.

## Publish Steps

Only publish after Sriram approves the local changes.

Review `private/export/publish-manifest.md`, then use its safe publish scope.

GitHub Actions will run `npm ci` and `npm run verify`, then upload `dist` to GitHub Pages.

## Live Verification

After the deploy finishes, verify:

- `https://sriram369.github.io/` loads.
- `https://sriram369.github.io/#achievements` opens the Proof Trail page directly.
- The Achievements nav item is active on the proof page.
- The page shows seven achievement cards.
- No private baseline content is visible publicly.

Then run:

```bash
npm run check:live
```

Review `private/export/live-site-check.md` and confirm the live deployment appears current.

## Do Not Publish

Do not commit or push:

- `private/`
- `node_modules/`
- `dist/`
- Raw screenshots, transcripts, sensitive review notes, or unfinished evidence claims.

Private baseline commands such as `npm run seed:baseline`, `npm run report:baseline`, and `npm run latex:evidence` are local-only workflows. Their generated files stay under ignored `private/`.
