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