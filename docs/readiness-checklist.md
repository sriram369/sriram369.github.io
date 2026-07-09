# SriramOS Readiness Checklist

Use this checklist before calling the evidence layer and baseline process complete.

## Public Website Evidence Layer

- [x] Achievements page exists in the navigation.
- [x] Public achievements render from `src/data/achievements.js`.
- [x] Achievement cards include date, category, summary, signal, proof metadata, proof links, and tags.
- [x] Public achievement records are checked by `npm run validate:evidence`.
- [x] Public proof links can be checked optionally with `npm run check:evidence-links`.
- [x] Public asset references are checked by `npm run check:public-assets`.
- [x] Public-safe share summary can be generated with `npm run share:public`.
- [x] Public build output is checked by `npm run safety:public`.
- [x] Workflow documentation consistency is checked by `npm run check:workflow`.
- [x] Live GitHub Pages deployment can be checked with `npm run check:live`.
- [x] End-to-end operations guide exists at `docs/evidence-operations.md`.
- [x] Evidence system status can be checked with `npm run status:evidence`.
- [x] Achievements page is directly linkable at `/#achievements`.
- [x] Individual proof cards are directly linkable at `/#achievements/:id`.
- [x] Public copy avoids sensitive private strategy and unfinished claims.
- [x] Desktop, mobile, and tablet navigation were smoke-tested locally.
- [x] GitHub Pages deploy workflow runs `npm run verify` before publishing.
- [ ] Changes are committed and pushed to `sriram369.github.io`.
- [ ] Live site is verified after deploy.

## Private Baseline Process

- [x] Local-only private process exists at `private/sriramos-baseline-process.md`.
- [x] Local intake templates exist under `private/intake/`.
- [x] Day-wise private notes can be captured with `npm run capture:daily`.
- [x] Private evidence rows can be appended safely with `npm run add:baseline`.
- [x] Private evidence rows can be updated safely with `npm run update:baseline`.
- [x] Ignored private workspace can be recreated with `npm run init:baseline`.
- [x] Older private ledgers can be upgraded with `npm run migrate:baseline`.
- [x] Private ledger records can be checked with `npm run validate:baseline`.
- [x] Public achievements can seed the private ledger with `npm run seed:baseline`.
- [x] Private baseline report can be generated with `npm run report:baseline`.
- [x] Missing evidence requests can be generated with `npm run request:evidence`.
- [x] Next-batch handoff packet can be generated with `npm run request:next`.
- [x] Verifier outreach drafts can be generated with `npm run outreach:verifiers`.
- [x] Verifier and metric matrix can be generated with `npm run matrix:verification`.
- [x] Completed verifier and metric rows can be previewed with `npm run apply:verification`.
- [x] Promotion candidates can be generated with `npm run promotion:baseline`.
- [x] Private formal LaTeX evidence packet can be generated with `npm run latex:evidence`.
- [x] Readiness snapshot can be generated with `npm run snapshot:readiness`.
- [x] Publish manifest can be generated with `npm run manifest:publish`.
- [x] Private baseline refresh can be run with `npm run refresh:baseline`.
- [x] Full local evidence preflight can be run with `npm run preflight:evidence`.
- [x] Private files are checked by `npm run safety:private`.
- [x] `private/` is ignored by tracked `.gitignore`.
- [x] Public documentation explains the split between public proof and private raw evidence.
- [ ] Johns Hopkins baseline evidence has been provided by Sriram.
- [ ] Raw evidence has been converted into structured records.
- [ ] Strong public-safe items have been promoted to the Achievements page.
- [ ] Sensitive or legally strategic items remain private.

## First Evidence Batch Needed From Sriram

- Johns Hopkins transcript or grade proof.
- AuraPath report, slides, rubric, score proof, professor quote source, and team-role evidence.
- Exact support for any "number one" or top-performance claim.
- JHU Social Media Head appointment proof and analytics screenshots.
- Course project repos, reports, demos, grades, and professor feedback.
- Names of professors, admins, teammates, managers, or collaborators who can verify claims.
- Use `private/intake/jhu-baseline.md` as the private paste-in template for this batch.

## Verification Commands

```bash
npm run lint
npm run build
npm run validate:evidence
npm run check:evidence-links
npm run check:live
npm run status:evidence
npm run add:baseline -- --help
npm run capture:daily -- --help
npm run update:baseline -- --help
npm run init:baseline
npm run migrate:baseline
npm run validate:baseline
npm run seed:baseline
npm run report:baseline
npm run request:evidence
npm run request:next
npm run outreach:verifiers
npm run matrix:verification
npm run apply:verification
npm run promotion:baseline
npm run plan:tech
npm run latex:evidence
npm run snapshot:readiness
npm run manifest:publish
npm run share:public
npm run refresh:baseline
npm run preflight:evidence
npm run safety:private
npm run safety:public
npm run check:public-assets
npm run check:workflow
npm run verify
```
