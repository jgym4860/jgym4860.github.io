# AORR 상태 머신 설계서

이 문서는 GitHub Pages에서 동작하는 정적 개인 프로페셔널 웹사이트와 지렁이 게임을 작은 개발 루프로 안전하게 완성하기 위한 실행 가능한 AORR 설계다.

현재 저장소는 루트에 `index.html`, `styles.css`, `script.js`, `games/`, `assets/`가 존재하는 초기 골격 상태를 기준으로 한다.

## 1. Target

### 1-1. 프로페셔널 웹사이트 개발 목표

- 개인 브랜딩이 드러나는 프로페셔널 웹사이트를 만든다.
- 핵심 소개, 작업, 연락처를 한눈에 볼 수 있게 한다.
- 정적 사이트로 유지하고, 별도 백엔드 없이 동작하게 한다.
- 모바일과 데스크톱 모두에서 읽기 쉽고 조작하기 쉬워야 한다.

### 1-2. GitHub Pages 배포 목표

- GitHub Pages에서 직접 열 수 있는 정적 사이트로 완성한다.
- 상대경로만 사용하고, 서버 전용 기능에 의존하지 않는다.
- 루트 `index.html`이 진입점이 되어야 한다.

### 1-3. 입력 자료

- 현재 저장소 구조
- 홈 페이지와 게임 페이지의 HTML/CSS/JS
- 개인 소개, 경력, 프로젝트, 연락처
  - 이름: [사람 확인 필요]
  - 소개: [사람 확인 필요]
  - 경력: [사람 확인 필요]
  - 프로젝트 설명: [사람 확인 필요]
  - 연락처: [사람 확인 필요]
- 게임 추가 기능 요구사항
  - 상단 `Games` 탭
  - 지렁이 게임
  - 키보드 조작
  - 모바일 터치 조작
  - 점수/최고점
  - 시작, 일시정지, 재시작

### 1-4. 필수 페이지와 섹션

- Home
  - Hero / intro
  - About 또는 professional summary
  - Projects / selected work
  - Skills 또는 principles
  - Contact
- Games
  - 게임 소개
  - 점수와 최고점
  - 시작/재시작 버튼
  - 게임 보드
  - 모바일 터치 컨트롤
  - 상태 메시지

### 1-5. Games 탭 및 지렁이 게임 요구사항

- 홈 상단 내비게이션에 `Games` 탭을 둔다.
- `Games` 페이지는 홈과 서로 왕복 이동 가능해야 한다.
- 지렁이 게임은 다음을 지원해야 한다.
  - 키보드 방향키
  - WASD
  - 모바일 스와이프
  - 모바일 방향 버튼
- 게임 상태는 최소 다음을 가져야 한다.
  - `idle`
  - `running`
  - `paused`
  - `over`
- 최소 규칙
  - 한 tick마다 한 칸 이동
  - 즉시 반대 방향 전환 금지
  - 먹이 섭취 시 성장
  - 벽 충돌 시 게임 오버
  - 자기 몸 충돌 시 게임 오버
  - 점수 증가 및 최고점 기록

### 1-6. 데스크톱 및 모바일 완료 기준

- 데스크톱
  - 1280px 이상에서 레이아웃이 보기 좋다.
  - 네비게이션, Hero, 섹션, 게임 화면이 과밀하지 않다.
  - 키보드 포커스가 명확하다.
- 모바일
  - 320px 폭에서 가로 스크롤이 없어야 한다.
  - 헤더와 본문이 잘리지 않아야 한다.
  - 게임 보드와 조작 버튼이 손가락으로 사용 가능해야 한다.
  - 스와이프 입력이 안정적으로 동작해야 한다.

## 2. Act

### 2-1. 한 번의 개발 루프에서 수행할 최소 작업

1. 실패 원인 하나만 고른다.
2. 그 원인과 직접 연결된 최소 파일만 수정한다.
3. 동일 원인을 검증하는 최소 Verifier를 실행한다.
4. 관측 결과를 기록한다.
5. 통과하지 못하면 같은 원인만 다시 수정한다.

### 2-2. 수정 가능한 파일 범위

- `index.html`
- `styles.css`
- `script.js`
- `games/index.html`
- `games/game.js`
- `games/input.js`
- `assets/snake-core.js`
- 필요한 경우의 다른 게임 전용 JavaScript 파일

### 2-3. 생성할 수 있는 파일

- 루트 정적 파일
  - `index.html`
  - `styles.css`
  - `script.js`
- 게임 관련 파일
  - `games/index.html`
  - `games/game.js`
  - `games/input.js`
  - `assets/snake-core.js`
- 검증 보조 파일
  - 테스트 파일
  - 문서 파일

### 2-4. 실행 가능한 로컬 검증 명령어

- 현재 환경에서 확인된 정적 서버
  - `python3 -m http.server`
- 현재 저장소에서 정의되어 있다면 사용할 수 있는 명령
  - `npm test`
  - `npm run build`
  - `npm run check`
- 실제 실행 가능 여부는 환경에 따라 다시 확인한다.

## 3. Observe

### 3-1. 관측 대상

- 파일 생성 여부
- HTML 오류
- CSS 반응형 오류
- JavaScript 오류
- 로컬 웹서버 응답
- 브라우저 콘솔 오류
- 데스크톱 화면
- 모바일 화면
- 키보드 조작
- 터치 조작
- GitHub Pages 호환성

### 3-2. 관측 방법

- 파일 시스템으로 루트 파일 존재를 확인한다.
- HTML/CSS/JS는 문법과 렌더링 결과를 함께 본다.
- 로컬 서버는 Home과 Games 경로가 응답하는지 확인한다.
- 브라우저는 모바일, 태블릿, 데스크톱 폭에서 확인한다.
- 게임은 시작, 일시정지, 재시작, 입력, 점수, 충돌을 확인한다.
- Pages 호환성은 정적 파일과 상대경로 중심으로 본다.

## 4. Reason

실패 원인은 아래 중 하나로만 분류한다.

- `HTML_STRUCTURE`
- `CSS_RESPONSIVE`
- `JAVASCRIPT`
- `GAME_LOGIC`
- `GAME_CONTROL`
- `CONTENT`
- `TEST`
- `ENVIRONMENT`
- `GITHUB_PERMISSION`
- `DEPLOYMENT`
- `UNKNOWN`

### 4-1. 분류 기준

- 구조, 누락 태그, 링크 오류면 `HTML_STRUCTURE`
- 레이아웃, 오버플로우, 모바일 깨짐이면 `CSS_RESPONSIVE`
- 문법, 로드 오류, 런타임 오류면 `JAVASCRIPT`
- 게임 규칙 자체가 틀리면 `GAME_LOGIC`
- 입력은 되지만 조작이 안 되면 `GAME_CONTROL`
- 이름, 소개, 프로젝트 내용이 불명확하면 `CONTENT`
- 검증이 실패하면 `TEST`
- 실행 환경 문제면 `ENVIRONMENT`
- 인증/권한 문제면 `GITHUB_PERMISSION`
- 배포 반영 문제면 `DEPLOYMENT`
- 원인이 분명하지 않으면 `UNKNOWN`

## 5. Repeat

- 한 번에 하나의 실패 원인만 수정한다.
- 관련된 최소 파일만 변경한다.
- 수정 후 동일 Verifier를 다시 실행한다.
- 이미 통과한 기능에 대한 회귀 검증을 함께 실행한다.
- 동일 오류 fingerprint가 2회 반복되면 중지한다.

## 6. Stop

아래 조건 중 하나면 중단한다.

- 전체 테스트가 통과한 경우
- 최대 Retry에 도달한 경우
- 동일한 오류 fingerprint가 2회 반복된 경우
- 개인정보나 콘텐츠 확인이 필요한 경우
- GitHub 인증 또는 배포 권한 문제가 발생한 경우

## 7. Human-in-the-loop

아래 경우는 사람 확인이 필요하다.

- 이름, 소개, 경력, 프로젝트 등 개인 콘텐츠가 불명확한 경우
- 기존 콘텐츠 삭제가 필요한 경우
- 외부 분석 도구나 외부 서비스를 추가해야 하는 경우
- GitHub 저장소 설정을 변경해야 하는 경우
- 요구사항이 충돌하는 경우

## 8. 상태 정의

| 상태 | 의미 |
|---|---|
| `READY` | 다음 작업을 시작할 수 있는 초기 상태 |
| `ACTING` | 최소 작업을 수행 중인 상태 |
| `VERIFYING` | 변경 후 관측과 검증을 수행하는 상태 |
| `RETRYING` | 같은 실패 원인에 대해 최소 수정 후 다시 시도하는 상태 |
| `PASSED` | 해당 루프의 목표가 통과한 상태 |
| `DEPLOY_READY` | 배포 전 검증이 끝난 상태 |
| `DEPLOYING` | 배포를 수행 중인 상태 |
| `DEPLOYED` | 배포가 완료된 상태 |
| `BLOCKED` | 환경/권한/도구 문제로 더 진행할 수 없는 상태 |
| `HITL_REQUIRED` | 사람 확인 없이는 진행하면 안 되는 상태 |

## 9. 전체 개발 루프 상태 머신

### 9-1. 상태 전이 규칙

- `READY -> ACTING`
  - 루프 입력이 충분하고 사람 확인이 불필요할 때
- `ACTING -> VERIFYING`
  - 최소 작업을 끝냈을 때
- `VERIFYING -> PASSED`
  - 관측 결과가 기대치를 만족할 때
- `VERIFYING -> RETRYING`
  - 하나의 실패 원인이 확인되고 최소 수정이 가능할 때
- `RETRYING -> ACTING`
  - 같은 실패 원인에 대한 최소 수정이 준비되었을 때
- `VERIFYING -> HITL_REQUIRED`
  - 콘텐츠, 권한, 요구 충돌 등 사람이 결정해야 할 때
- `VERIFYING -> BLOCKED`
  - 환경/권한/도구 문제로 더 진행할 수 없을 때
- `PASSED -> DEPLOY_READY`
  - 배포 전 검증을 마쳤을 때
- `DEPLOY_READY -> DEPLOYING`
  - 배포 실행 조건이 충족되었을 때
- `DEPLOYING -> DEPLOYED`
  - GitHub Pages 반영이 확인되었을 때

## 10. 루프별 설계 표

| 단계 | 시작 상태 | 입력 | Act | Observe | 출력 | 테스트 기준 | 다음 상태 | 첫 루프 적합 |
|---|---|---|---|---|---|---|---|---|
| 저장소 및 기존 파일 확인 | `READY` | 저장소 구조, 현재 파일 목록, 루트 진입점 | 루트 구조와 핵심 파일을 확인한다 | 루트 파일, 게임 폴더, 경로, 누락 파일 | 현재 기준선 | 현재 상태를 정확히 설명할 수 있어야 함 | `PASSED` 또는 `HITL_REQUIRED` | 예 |
| 정적 사이트 기본 구조 | `READY` | 목표, 루트 파일 요구사항, 정적 호스팅 규칙 | `index.html`, `styles.css`, `script.js` 기본 구조를 만든다 | 문서 구조, 정적 자산 경로, 상대경로 | 최소 홈 페이지 골격 | 단독 로드가 가능해야 함 | `PASSED` | 예 |
| 프로페셔널 콘텐츠 영역 | `READY` | 이름, 소개, 경력, 프로젝트, 연락처 [사람 확인 필요] | Hero/About/Projects/Contact를 배치한다 | 브랜드 톤, 사실성, 누락 정보 | 콘텐츠 초안 | 개인 정보가 불명확하면 진행 금지 | `HITL_REQUIRED` 또는 `PASSED` | 아니오 |
| 반응형 내비게이션 | `READY` | 헤더 구조, 320px 폭, 탭 우선순위 | 헤더와 내비를 모바일 친화적으로 설계한다 | 줄바꿈, 포커스, 탭 크기, 가로 스크롤 | 반응형 헤더 | 모바일에서 잘리지 않아야 함 | `PASSED` | 예 |
| Games 탭 | `READY` | 홈 내비게이션, 게임 페이지 경로 | `Games` 링크와 왕복 경로를 연결한다 | 링크 이동, 현재 페이지 표시, 상대경로 | 게임 진입점 | 홈과 Games 상호 이동 가능 | `PASSED` | 예 |
| 지렁이 게임 핵심 로직 | `READY` | 게임 규칙, 보드 크기, 난수, 점수 | snake core를 순수 로직으로 분리한다 | 이동, 성장, 충돌, 먹이 생성, 상태 전환 | 게임 엔진 | 단위 규칙이 결정적으로 검증되어야 함 | `PASSED` | 아니오 |
| 키보드 조작 | `READY` | 방향키, WASD, 시작/일시정지 규칙 | keydown 처리와 상태 전환을 연결한다 | 스크롤 방지, 포커스, 입력 반응 | 키보드 입력 어댑터 | 키 입력이 게임 상태를 정확히 바꿔야 함 | `PASSED` | 아니오 |
| 모바일 터치 조작 | `READY` | 스와이프, 방향 버튼, 터치 최소 크기 | pointer 이벤트와 버튼 입력을 연결한다 | threshold, 오입력, 버튼 크기, 조작성 | 터치 입력 어댑터 | 스와이프/버튼 둘 다 동작해야 함 | `PASSED` | 아니오 |
| 게임 UI 및 점수 | `READY` | 점수, 최고점, 시작/재시작 버튼, 상태 메시지 | 캔버스와 HUD를 배치한다 | 가독성, 상태 문구, 재시작 흐름 | 게임 화면 | score/best/status/start가 보여야 함 | `PASSED` | 아니오 |
| 접근성과 반응형 검증 | `READY` | viewport, aria, 포커스, reduced motion | 접근성과 레이아웃을 점검한다 | 320px, 768px, 1440px 화면과 콘솔 | 접근성/반응형 결론 | 키보드 탐색과 모바일 UI가 가능해야 함 | `PASSED` | 아니오 |
| GitHub Pages 호환성 검증 | `READY` | 상대경로, 정적 산출물, Pages 규칙 | Pages 환경을 가정해 검증한다 | 루트 `index.html`, 서버 전용 기능, 백엔드 의존성 | Pages 호환성 결론 | 정적 파일만으로 동작해야 함 | `DEPLOY_READY` 또는 `BLOCKED` | 아니오 |
| 배포 | `DEPLOY_READY` | GitHub 인증, push 대상, Pages 설정 | push 후 Pages 반영을 기다린다 | 배포 반영, live URL 응답, 자산 로드 | 배포 완료 | Home/Games가 live에서 열려야 함 | `DEPLOYED` | 아니오 |

## 11. Step 1의 게임 추가 기능 반영

Step 1에 포함된 게임 요구사항은 아래처럼 루프에 반영한다.

- 상단 `Games` 탭 추가
- 지렁이 게임 구현
- 키보드 조작 지원
- 모바일 터치 조작 지원
- 게임 상태 메시지 제공
- 점수와 최고점 표시
- 게임 시작/재시작 흐름 제공

즉, 게임 관련 루프는 단순 링크 추가가 아니라 입력 처리, 게임 규칙, 모바일 UX, UI 상태를 함께 검증하는 루프로 구성해야 한다.

## 12. 추천 실행 순서

가장 안전한 순서는 아래와 같다.

1. 저장소 및 기존 파일 확인
2. 정적 사이트 기본 구조
3. 반응형 내비게이션
4. Games 탭
5. 지렁이 게임 핵심 로직
6. 키보드 조작
7. 모바일 터치 조작
8. 게임 UI 및 점수
9. 접근성과 반응형 검증
10. GitHub Pages 호환성 검증
11. 배포

## 13. 실패 fingerprint 예시

- `HTML_STRUCTURE`
  - 잘못된 중첩 태그
  - 누락된 `main`, `nav`, `canvas`, `button`
  - 상대경로 오타
- `CSS_RESPONSIVE`
  - 320px에서 가로 스크롤 발생
  - 게임 보드가 화면 밖으로 잘림
  - 포커스 표시가 보이지 않음
- `JAVASCRIPT`
  - module import 실패
  - `canvas.getContext` 실패
  - 상태 메시지 업데이트 실패
- `GAME_LOGIC`
  - 반대 방향 금지 실패
  - 먹이 섭취 후 성장 실패
  - 벽 충돌 처리 실패
- `GAME_CONTROL`
  - 키보드 입력 무시
  - 스와이프 방향 오류
  - 버튼 클릭 무반응
- `CONTENT`
  - 이름/소개 미확정
  - 프로젝트 설명 과장
  - 연락처 검증 불가
- `TEST`
  - 단위 테스트 실패
  - 페이지 검증 실패
- `ENVIRONMENT`
  - WSL 경로 문제
  - 로컬 서버 미기동
  - 인코딩 문제
- `GITHUB_PERMISSION`
  - push 인증 실패
  - token 접근 문제
- `DEPLOYMENT`
  - Pages 반영 지연
  - live asset 404
- `UNKNOWN`
  - 재현 불가
  - 원인 미분리

## 14. 최종 종료 조건

아래가 모두 만족되면 종료한다.

- 루트 정적 파일이 존재한다.
- Home과 Games가 모두 동작한다.
- 지렁이 게임이 키보드와 모바일 터치로 조작된다.
- 모바일과 데스크톱 레이아웃이 완료 기준을 만족한다.
- GitHub Pages에서 200 응답으로 열리고 자산이 로드된다.
- 개인 콘텐츠 확인이 필요한 사항이 없다.


## Self-Correcting TDD Loop

### 1. Verified tool inventory

이 프로젝트에서 사용할 수 있는 Verifier는 실제로 존재하거나 현재 환경에서 실행 가능한 도구만 포함한다. 임의의 npm 명령어나 테스트 명령은 적지 않는다.

| 도구 / 명령 | 상태 | 근거 | 사용 방식 |
|---|---|---|---|
| `python3` | 사용 가능 | `Get-Command python3` 결과 확인됨 | 로컬 정적 서버: `python3 -m http.server` |
| `node` | 확인되지 않음 | `Get-Command node` 결과 없음 | npm 기반 검증은 현재 전제하지 않음 |
| `npm` | 확인되지 않음 | `Get-Command npm` 결과 없음 | `package.json`이 있을 때만 재확인 |
| `claude` CLI | 확인되지 않음 | `Get-Command claude` 결과 없음 | 독립 Verifier로 현재 사용 불가 |
| `package.json` 기반 scripts | 없음 | 현재 저장소 루트에 `package.json`이 없음 | `npm test`, `npm run build` 같은 명령은 현재 문서에 포함하지 않음 |

현재 검증 가능성이 확인된 핵심 도구는 `python3`뿐이다. 따라서 이 TDD 루프는 정적 파일 검사와 로컬 HTTP 서버, 브라우저 확인 중심으로 설계한다.

### 2. TDD loop objective

목표는 GitHub Pages에서 동작하는 정적 HTML, CSS, JavaScript 웹사이트를 실패 원인별로 작은 단위로 고치면서, 매 번 Verifier가 통과 여부를 판정하게 하는 것이다.

### 3. Self-correcting loop state machine

| 상태 | 의미 | 대표 행동 |
|---|---|---|
| `READY` | 다음 검증 대상이 정해지지 않음 | 저장소와 환경을 확인하고 첫 Verifier를 고른다 |
| `ACTING` | 최소 수정 또는 준비 단계 | 관련 파일만 수정하거나 수정 계획을 확정한다 |
| `VERIFYING` | Verifier 실행 중 | 정적 검사, 서버 응답, 브라우저 확인, 게임 검증을 수행한다 |
| `RETRYING` | 동일 원인에 대한 최소 수정 재시도 | 하나의 실패 원인만 수정한다 |
| `PASSED` | 해당 루프 통과 | 결과를 기록하고 다음 루프로 넘어간다 |
| `BLOCKED` | 환경/권한/도구 부재로 진행 불가 | 코드로 해결하지 않고 중단한다 |
| `HITL_REQUIRED` | 사람 확인이 필요한 상태 | 개인 콘텐츠, GitHub 설정, 요구 충돌을 확인한다 |
| `DEPLOY_READY` | 배포 직전 통과 | Pages 호환성과 산출물을 확인한다 |
| `DEPLOYING` | 배포 중 | push 또는 Pages 반영 대기 |
| `DEPLOYED` | 배포 완료 | live smoke test를 기록한다 |

### 4. Verifier-first loop order

각 루프는 항상 아래 순서로 돌린다.

1. 실패 원인 분류
2. 가장 작은 Verifier 선택
3. 최소 수정 가설 수립
4. 단일 원인만 수정
5. 동일 Verifier 재실행
6. 통과하면 회귀 Verifier 실행
7. 실패 fingerprint가 반복되면 중지

### 5. Failure classification

실패 원인은 반드시 다음 중 하나로 분류한다.

- `HTML_STRUCTURE`
- `CSS_RESPONSIVE`
- `JAVASCRIPT`
- `GAME_LOGIC`
- `GAME_CONTROL`
- `CONTENT`
- `TEST`
- `ENVIRONMENT`
- `GITHUB_PERMISSION`
- `DEPLOYMENT`
- `UNKNOWN`

### 6. Minimal Verifier map

아래 Verifier는 실제로 존재하거나 현재 환경에서 실행 가능한 것만 포함한다.

| 검증 범주 | 우선 Verifier | 보조 Verifier | 비고 |
|---|---|---|---|
| 파일 존재 확인 | 파일 시스템 확인 | `Get-ChildItem -Force`, `Get-ChildItem -Recurse -File` | 루트 `index.html`, `styles.css`, `script.js` 유무 확인 |
| HTML 구조 | 정적 파일 검사 | 브라우저 렌더 확인 | title, meta viewport, semantic tag, nav, Games 영역, alt, 내부 링크 |
| CSS 반응형 | 브라우저 viewport 확인 | 수동 스크롤 검사 | 375px / 768px / 1440px |
| JavaScript 문법/런타임 | 브라우저 콘솔 | DOM 로드 후 수동 확인 | DOM null, import 오류, 로드 오류 |
| 게임 규칙 | 게임 단위 테스트 | 브라우저 플레이 테스트 | 이동, 성장, 충돌, 반대 방향 금지 |
| 입력 조작 | 브라우저에서 키보드/터치 테스트 | 상태 메시지/캔버스 확인 | WASD, 방향키, swipe, 버튼 |
| 로컬 서버 | `python3 -m http.server` | 브라우저 `http://127.0.0.1:8000/` 확인 | 현재 환경에서 실제 사용 가능한 서버 도구 |
| GitHub Pages 호환성 | 상대경로 점검 | 정적 파일만으로 열리는지 확인 | 서버 전용 기능 미사용 |
| 독립 Verifier | `claude` CLI | 없음 | 현재 환경에서는 사용 불가, Sonnet 모델명도 기록하지 않음 |

### 7. Self-correcting retry policy

- 한 Retry에서는 하나의 원인만 수정한다.
- 관련 파일만 수정한다.
- 기존 테스트 삭제, 완화, 우회는 금지한다.
- 이미 통과한 영역을 깨는 변경은 즉시 중단하고 원인을 재분류한다.
- 동일 오류 fingerprint가 2회 반복되면 멈춘다.
- 하나의 오류는 최대 3회까지만 재시도한다.

### 8. Required failure log fields

각 실패 로그에는 다음을 반드시 남긴다.

- 실행 명령어
- exit code
- 실패한 검증 항목
- 핵심 오류 메시지
- 관련 파일과 라인
- 브라우저 콘솔 메시지
- 오류 fingerprint
- 실패 원인 분류
- 가설
- 변경 파일
- 재실행한 Verifier

### 9. Loop templates by area

#### 9-1. Basic file verification loop

- 입력: 루트 파일 목록, `index.html`, `styles.css`, `script.js`
- Act: 파일 존재와 연결 경로를 확인한다
- Observe: 경로 오타, 대소문자 불일치, 절대 로컬 경로 사용 여부
- Output: 기본 파일 검증 결과
- Test criteria: 루트 파일 존재, 정적 경로만 사용, GitHub Pages에서 깨지지 않음
- Next state: `PASSED` 또는 `RETRYING`

#### 9-2. HTML verification loop

- 입력: HTML 문서, 내비게이션, Games 영역, 이미지 요소
- Act: 구조를 검토하고 내부 링크를 확인한다
- Observe: title, meta viewport, semantic tag, broken link, alt 누락
- Output: HTML 구조 통과 여부
- Test criteria: 기본 문서 구조와 링크가 유효함
- Next state: `PASSED` 또는 `RETRYING`

#### 9-3. CSS verification loop

- 입력: 스타일시트, viewport 기준, 레이아웃 목표
- Act: 반응형 레이아웃을 점검한다
- Observe: 375px / 768px / 1440px에서 오버플로우, 내비게이션 표시, Games UI
- Output: CSS 반응형 통과 여부
- Test criteria: 가로 스크롤 없음, 내비게이션과 게임 UI 유지
- Next state: `PASSED` 또는 `RETRYING`

#### 9-4. JavaScript verification loop

- 입력: `script.js`, 게임 모듈, DOM 연결
- Act: 문법과 초기 렌더 오류를 확인한다
- Observe: 콘솔 에러, null 참조, 중복 이벤트, load-time failure
- Output: JS 안정성 결과
- Test criteria: 콘솔 에러 없음, DOM 연결 유효
- Next state: `PASSED` 또는 `RETRYING`

#### 9-5. Snake game verification loop

- 입력: 게임 핵심 로직, 입력 어댑터, 게임 UI
- Act: 시작, 일시정지, 재시작, 점수, 충돌, 입력을 검증한다
- Observe: 게임 상태 전환, 음식 생성, 반대 방향 금지, 중복 실행 여부
- Output: 게임 루프 통과 여부
- Test criteria: 키보드/터치 조작이 일관되고 게임 규칙이 맞음
- Next state: `PASSED` 또는 `RETRYING`

#### 9-6. Local execution loop

- 입력: 로컬 정적 서버 가능 여부
- Act: `python3 -m http.server`를 실행한다
- Observe: HTTP 응답, `index.html` 로드, CSS/JS 응답
- Output: 로컬 실행 확인 결과
- Test criteria: Home과 Games가 응답하고 정적 자산이 로드됨
- Next state: `PASSED` 또는 `BLOCKED`

#### 9-7. Browser verification loop

- 입력: 브라우저, viewport 크기, 페이지 URL
- Act: 모바일/태블릿/데스크톱을 확인한다
- Observe: 레이아웃, 상호작용, 콘솔 오류
- Output: 화면 및 상호작용 확인 결과
- Test criteria: 약 375px, 768px, 1440px 모두 정상
- Next state: `PASSED` 또는 `RETRYING`

#### 9-8. GitHub Pages compatibility loop

- 입력: 정적 산출물, 상대경로, GitHub Pages 규칙
- Act: 페이지 호환성을 점검한다
- Observe: 루트 `index.html`, 서버 전용 기능, 로컬 파일 시스템 의존성, 백엔드 의존성
- Output: Pages 호환성 결과
- Test criteria: 정적 파일만으로 동작
- Next state: `DEPLOY_READY` 또는 `BLOCKED`

### 10. Stop conditions for the TDD loop

- 해당 루프의 테스트가 모두 통과한 경우
- 최대 Retry에 도달한 경우
- 동일 오류 fingerprint가 2회 반복된 경우
- 개인정보나 콘텐츠 확인이 필요한 경우
- GitHub 인증 또는 배포 권한 문제가 발생한 경우
- 현재 환경에서 필요한 Verifier가 존재하지 않는 경우

### 11. Human-in-the-loop boundaries

아래 경우는 자동 수정 대신 사람 확인을 요청한다.

- 이름, 소개, 경력, 프로젝트 정보가 불명확함
- 기존 콘텐츠 삭제가 필요함
- 외부 서비스나 분석 도구 추가가 필요함
- GitHub 저장소 설정을 바꿔야 함
- 요구사항이 충돌함
- 독립 Verifier 도구의 사용 가능 여부가 불명확함

### 12. Recommended next execution order

1. 파일 존재 및 경로 검증
2. HTML 구조 검증
3. CSS 반응형 검증
4. JavaScript 검증
5. 지렁이 게임 검증
6. 로컬 실행 검증
7. 브라우저 검증
8. GitHub Pages 호환성 검증
9. 배포

### 13. Recorded tool availability for this project

- `python3`는 WSL에서 확인됨
- `node`는 WSL에서 확인됨
- `npm`은 WSL에서 확인됨
- `claude` CLI는 WSL에서 확인됨
- `package.json`은 현재 저장소 루트에 없음

따라서 이 프로젝트의 Self-Correcting TDD 루프는 현재 기준으로 `python3 -m http.server`와 브라우저 확인을 기본으로 사용하고, `node`/`npm` 기반 검증은 `package.json`이 존재하는 경우에만 Verifier로 사용한다.
