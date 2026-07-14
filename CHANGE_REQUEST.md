# Change Request

## Change Items

### CR-001: 화면 구성 변경

- Main 화면에 Loop Engineering에 대한 고찰 및 설명 추가
- Loop Engineering 내용이 주를 이루고, 이를 통해 게임을 하루 만에 만들었다는 점 표현
- 상태: PASSED

### CR-002: Tetris 키보드 매핑

- 추가한 테트리스의 키보드 매핑 표시 필요
- 상태: PASSED

### CR-003: Games 내부 탭

- Snake와 Tetris가 한 페이지에서 동시에 시작하지 않도록 내부 탭으로 분리
- 상태: PASSED

## Implementation Result

- Main 화면: Loop Engineering 전용 섹션, Act/Observe/Reason/Repeat 설명, 하루 만에 게임을 만든 실행 사례 반영
- Tetris: 방향키와 WASD, 회전, 소프트 드롭, 하드 드롭 키를 화면에 명시
- Games: 접근 가능한 Snake/Tetris 탭, 선택된 게임 패널만 표시, 탭 전환 시 이전 게임 자동 일시정지
- Input guard: 활성 게임만 키보드 및 터치 입력을 수신하도록 보호

## Changed Files

- `index.html`
- `games/index.html`
- `games/game.js`
- `games/tetris.js`
- `games/tabs.js`
- `styles.css`
- `tests/game-page.test.mjs`
- `tests/site-shell.test.mjs`
- `AORR.md`
- `MEMORY.md`

## Verification

- `npm run check`: 15 tests passed
- `node --check games/game.js`: passed
- `node --check games/tetris.js`: passed
- `node --check games/tabs.js`: passed
- `git diff --check`: passed

## Human Check Needed

- 실제 브라우저에서 탭 전환, 포커스 이동, 모바일 터치 조작 확인
