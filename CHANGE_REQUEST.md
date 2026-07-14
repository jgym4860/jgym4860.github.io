# Change Request

## 화면 구성 변경

- Main 화면에 Loop Engineering에 대한 고찰 및 설명 추가
- Loop Enginnering에 대한 내용이 주를 이루고 이로서 Game을 하루만에 만들었다는것도 표현

## Game
 - 추가한 테트리스의 키보드 맵핑도 필요

## Execution Result

- Change Item: screen composition and Tetris keyboard mapping
- Status: PASSED
- Changed files: `index.html`, `games/index.html`, `styles.css`, `tests/site-shell.test.mjs`, `tests/game-page.test.mjs`
- Verifier: `npm test`, `npm run build`, `git diff --check`
- Test result: 15 tests passed; static build passed
- Completion note: added Loop Engineering explanation, documented the one-day game build loop, and added visible Tetris keyboard mapping
- Human check needed: browser visual and keyboard confirmation
