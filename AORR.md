# AORR

## Purpose
This repository hosts a static professional website for GitHub Pages with a Games tab and a snake game.

## State Machine
- READY: prepare the next smallest loop
- ACTING: edit only the files needed for that loop
- VERIFYING: run the selected verifier
- RETRYING: fix one cause and rerun the same verifier
- PASSED: the loop goal is verified locally
- DEPLOY_READY: local work is complete and ready for deployment approval
- DEPLOYING: commit, push, and publish to GitHub Pages
- DEPLOYED: the published site is live and verified
- BLOCKED: a permission or environment blocker prevents progress
- HITL_REQUIRED: human review is needed

## Loop Summary
- Loop 1: minimal static shell
- Loop 2: site shell and nav verification
- Loop 3: local test and build verification
- Loop 4: deployment and GitHub Pages checks
- Loop 5: fix GitHub Pages markdown encoding issues

## Current Issue
GitHub Pages failed while rendering AORR.md and MEMORY.md because the files were not safe UTF-8 for Jekyll.

## Next Step
Rewrite the markdown files as ASCII-only UTF-8 and rerun local verification, then push the fix.
## Change Loop
- Loop ID: `change-request-favicon-dexter-001`
- State transitions: READY -> ACTING -> VERIFYING -> PASSED
- Failure reason: none
- Retry result: none required
- Stop reason: all Change Items in the request were implemented and verified locally


## Tetris Change Loop
- Loop ID: `change-request-tetris-001`
- Change Item: `game addition`
- State transition: READY -> ACTING -> VERIFYING -> RETRYING -> VERIFYING -> PASSED
- Hypothesis: a self-contained Tetris core and a second game section can satisfy the request without changing the existing Snake implementation
- Act: added `assets/tetris-core.js` and `games/tetris.js`; added Tetris UI to `games/index.html`; appended responsive styles; added core and page tests
- Observe: initial run had 14 passed and 1 failed test because the new boundary assertion reused the initial state; production tests were unchanged
- Reason: TEST
- Repeat: corrected only `tests/tetris-core.test.mjs` to accumulate moves, then reran the same verifier
- Final verifier: `npm test` passed with 15 tests; `npm run build` passed; local HTTP checks returned 200 for home, Games, `games/tetris.js`, and `assets/tetris-core.js`
- Retry count: 1
- Error fingerprint: `TEST:tetris-boundary-reused-initial-state`
- Human check needed: browser visual and touch interaction confirmation
