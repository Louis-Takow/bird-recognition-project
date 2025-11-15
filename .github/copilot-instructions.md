## Quick orientation for AI coding agents

This repository contains Playwright end-to-end tests that exercise a bird-identification flow on an external site. The guidance below focuses on the concrete patterns and files an agent should read and use when making edits.

- Primary test entry: `tests/bird-recognition.spec.ts`. It creates data-driven Playwright tests by iterating over `birdsToTest` and uploading images with `page.setInputFiles(...)`.
- Test configuration: `playwright.config.ts` — key values:
  - `testDir: './tests'`
  - `fullyParallel: true`, `reporter: 'html'`, `trace: 'on-first-retry'`
  - Projects configured for `chromium`, `firefox`, `webkit`
  - `webServer` and `baseURL` are commented out (tests navigate to an external url `https://www.ornitho.com`).

Important patterns and selectors (copy/paste friendly):
- Upload drop zone selector used in tests: `text=Drag your image here`
- Button clicks: `button:has-text("Next")` (used across multiple pages)
- Top result container: `div:has-text("Résultats de l'intelligence artificielle n°1")`
- Result name and score selectors used inside the container:
  - Name: `div.caption > h4 > a`
  - Score: `div.caption > h4 > span.badge`

Project-specific notes an agent must respect
- Tests rely on image files referenced by relative file names (e.g. `tarin_triste.jpeg`). When adding or modifying tests ensure image assets are available under the test run working directory or adjust `setInputFiles` to an absolute path/fixture helper.
- Assertions expect French species names on results (e.g. `Tarin triste`). Don't change expected strings unless the test data and page language are intentionally changed.
- The repository currently has an empty `package.json` `scripts` section — do not assume npm scripts exist. Use `npx playwright test` when running tests locally or add scripts intentionally.

How to run tests locally (Windows PowerShell):
```powershell
npx playwright test
# or run a single test file
npx playwright test tests/bird-recognition.spec.ts
```

Files worth reading before making changes
- `tests/bird-recognition.spec.ts` — data-driven test structure and DOM assumptions
- `playwright.config.ts` — runtime config, retries, reporters, and projects
- `package.json` — dependencies: `@playwright/test` and `@types/node` are devDependencies

When editing tests or selectors
- Prefer small, localized selector updates. Tests use robust Playwright locators (text= and :has-text()); keep similar style.
- If you change navigation flow, update the wait/timeout values near the top of the test (the test uses explicit expect(...).toBeVisible with timeouts).
- If you add fixtures or assets, also update README or `package.json` scripts so humans know how to run them.

Examples to copy into PR descriptions
- "Update selector for results page: use `div:has-text("Résultats de l'intelligence artificielle n°1")` to target the first AI result block and then `div.caption > h4 > a` for the species name."
- "Add fixture images under `tests/fixtures/images/` and update `setInputFiles` to `tests/fixtures/images/<name>` so Playwright resolves them reliably."

If anything is unclear or you need additional conventions (image storage, CI config, or language settings), ask the repository maintainer. Provide diffs that only change the minimal set of lines needed.

-- end of guidance
