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