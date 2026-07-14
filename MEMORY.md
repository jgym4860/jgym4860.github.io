# Loop Engineering Memory

## Goal

- Complete a GitHub Pages-ready professional website.
- Support responsive desktop and mobile layouts.
- Implement a `Games` tab.
- Implement a snake game controllable by keyboard and mobile touch.
- Complete the first GitHub Pages deployment.
- Reflect the Step 1 game add-on requirements:
  - `Games` tab
  - snake game
  - keyboard controls
  - mobile touch controls
  - score and restart flow

## Required Deliverables

- `/index.html`
- `/styles.css`
- `/script.js`
- Separate `game.js` if needed
- Required images and static assets
- `AORR.md`
- `MEMORY.md`

## Current Scope

- Static HTML, CSS, and JavaScript only
- Professional website content
- Responsive layout
- `Games` tab
- Snake game
- GitHub Pages deployment

## Out of Scope

- Backend server
- Database
- Login and sign-up
- Payments
- User data collection
- External APIs without explicit approval
- Framework migration without explicit approval

## Current State

- Current state: the static scaffold is verified locally and no code change was needed in this one loop.
- Completed loops: repository reset, initial static site scaffold, `AORR.md` state-machine design, TDD loop design update, current basic-shell verification.
- Next loop: browser-facing responsive verification or profile content fill, depending on the next instruction.
- Current Retry count: 0
- Current error fingerprint: none
- Blocker: none
- Last normal state: static shell verified through local HTTP smoke checks

## Guardrails

- Do not delete existing personal content without confirmation.
- Do not invent unverified career or project information.
- Do not delete or weaken tests to make them pass.
- Do not print tokens.
- Do not store tokens in HTML, CSS, or JavaScript.
- Do not commit tokens to Git.
- Do not commit `github_token.txt`.
- Do not commit `env_settings.txt`.
- Do not add backend features.
- Do not perform large refactors without need.
- Do not remove functionality just to satisfy tests.

## Acceptance Criteria

- Root `index.html` exists.
- The site loads correctly from a local static server.
- CSS and JavaScript load correctly.
- No browser console errors remain.
- Desktop and mobile layouts work.
- `Games` tab navigates correctly.
- Snake game runs correctly.
- Keyboard controls work.
- Mobile touch controls work.
- Score and restart behave correctly.
- GitHub Pages returns HTTP 200.
- The deployed site behaves the same as local.

## Retry Policy

- Maximum 3 retries per single error.
- Stop if the same error fingerprint repeats twice.
- Fix only one cause per retry.
- Re-run the same Verifier after each retry.

## HITL Conditions

- Personal profile content is unclear.
- Existing content must be removed.
- Requirements conflict.
- GitHub repository permissions are insufficient.
- GitHub Pages settings must change.
- An external service must be added.
- Retry limit is reached.

## Tool Policy

- Codex handles task control, file edits, and test execution.
- WSL에서 `node`, `npm`, `claude` CLI를 사용할 수 있다면 우선 사용한다.
- Claude Code CLI를 실제로 사용할 때는 사용한 모델명을 기록한다. Sonnet 5 사용 가능 여부는 실행 시점에 확인한다.
- Never leave token values in any execution record.
- WSL에서 실행 전에는 필요한 도구의 실제 PATH와 버전을 다시 확인한다.

## Execution Log Template

```text
Loop ID:
Start time:
Goal:
Start state:
Hypothesis:
Act:
Changed files:
Verifier:
Test result:
Exit code:
Error fingerprint:
Retry count:
End state:
Next step:
Human check needed:
```

## Current Loop Record

- Loop ID: `basic-shell-001`
- 시작 시각: `2026-07-14`
- 목표: GitHub Pages용 정적 웹사이트의 가장 안전한 기본 구조를 확인한다
- 시작 상태: 루트 `index.html`, `styles.css`, `script.js`, `games/`, `assets/`가 존재하는 초기 스캐폴드
- 가설: 현재 스캐폴드는 기본 정적 사이트로 동작하고, 최소 경로와 연결이 유효하다
- Act: 루트 구조와 문서를 읽고, WSL에서 `python3 -m http.server`를 띄워 `index.html`, `styles.css`, `script.js` 응답을 확인했다
- 변경 파일: 없음
- Verifier: `python3 -m http.server` + `curl -I` to `/`, `/index.html`, `/styles.css`, `/script.js`
- 테스트 결과: 모두 HTTP 200 응답 확인
- exit code: `0`
- 오류 fingerprint: 없음
- Retry 횟수: `0`
- 종료 상태: `PASSED`
- 다음 작업: 브라우저 viewport 검증 또는 프로필 콘텐츠 정리
- 사람 확인 필요 항목: 없음

