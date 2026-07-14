# MEMORY

## Goal
- Ship a static professional portfolio on GitHub Pages
- Support desktop, tablet, and mobile layouts
- Keep a Games tab with a snake game
- Keep keyboard and touch controls working
- Preserve the existing site content where possible

## Required Deliverables
- index.html
- styles.css
- script.js
- games/index.html
- games/game.js
- assets/snake-core.js
- AORR.md
- MEMORY.md

## Current Scope
- Static HTML, CSS, and JavaScript only
- Responsive professional content sections
- Games tab and snake game
- GitHub Pages deployment

## Out of Scope
- Backend services
- Databases
- Login or payments
- External APIs without approval
- Framework migration without approval

## Current State
- The site works locally and the Pages site responds with HTTP 200
- GitHub Pages build history showed a stale errored entry and a current build in building state
- AORR.md and MEMORY.md were rewritten to ASCII-only UTF-8 to remove the build error caused by invalid encoding
- Current retry count: 0
- Current error fingerprint: markdown UTF-8 encoding issue
- Blocker: none after the encoding fix
- Last normal state: local test and build passed

## Guardrails
- Do not invent personal content
- Do not delete tests
- Do not print tokens
- Do not commit tokens or secret files
- Do not add backend features
- Do not remove working features to satisfy tests

## Acceptance Criteria
- Local static server serves index.html, styles.css, and script.js with HTTP 200
- Desktop, tablet, and mobile layouts work
- Games tab works
- Snake game works with keyboard and touch
- GitHub Pages responds with HTTP 200
- Jekyll build does not fail on markdown encoding

## Retry Policy
- Fix one cause at a time
- Rerun the same verifier after each retry
- Stop after repeated identical fingerprints or three retries

## Execution Note
- The markdown encoding issue was the last known GitHub Pages failure source.
## Change Request Loop
- Loop ID: `change-request-favicon-dexter-001`
- Change Item ID: `favicon 추가`, `Page 내용`
- Start state: READY
- End state: PASSED
- Hypothesis: adding a shared favicon and a visible Dexter credit on the home and games pages will satisfy the request without disturbing existing behavior
- Act: added `favicon.svg`, updated `index.html` and `games/index.html`, added minimal styling in `styles.css`, and extended the local verifier tests
- Changed files: `index.html`, `games/index.html`, `styles.css`, `tests/site-shell.test.mjs`, `tests/game-page.test.mjs`, `favicon.svg`
- Verifier: `npm test`, `npm run build`
- Result: both verifiers passed
- Exit code: 0
- Error fingerprint: none
- Retry count: 0
- Next Loop: deploy approval or the next user request
- Current normal commit candidate: `78286240819d3b9fcf0e73f59f963e9320c8e13f`
- Rollback 기준: revert only the six changed files from this loop if needed


## Tetris Change Loop
- Loop ID: `change-request-tetris-001`
- Start state: READY
- End state: PASSED
- Goal: add Tetris to the existing Games page while preserving Snake
- Changed files: `games/index.html`, `games/tetris.js`, `assets/tetris-core.js`, `styles.css`, `tests/game-page.test.mjs`, `tests/tetris-core.test.mjs`
- Verifier: `npm test`, `npm run build`, local `python3 -m http.server`
- Result: 15 tests passed; static build passed; local HTTP checks returned 200 for the main page, Games page, and Tetris modules
- Retry count: 1
- Error fingerprint: `TEST:tetris-boundary-reused-initial-state`; fixed in the test only
- Current state: local implementation passed; browser visual/touch confirmation remains HITL_REQUIRED
- Next loop: browser validation, then commit/push if approved
