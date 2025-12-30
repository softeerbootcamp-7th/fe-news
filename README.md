# fe-news

## 📅 이번 주(25.12.29~26.01.02) 개발 기능 목록 (Todo List)

### Foundation

- [x] 1️⃣ 프로젝트 인프라 및 전역 스타일

  - [x] Vite 기반 프로젝트 초기화 및 package.json 설정
  - [x] Font, color 등 기본 css요소 개발

- [x] 2️⃣ Foundation 설정

  - [x] Typography Default Value
  - [x] Typography System
  - [x] Color Default Value
  - [x] Color System: Light Mode
  - [x] Color System: Dark Mode
  - [x] Object Styles
  - [x] Icons

- [x] 3️⃣ 기본 컴포넌트 구현
  - [x] pressLogo
  - [x] AutoRollingNews
    - [x] 언론사 이름(Press)과 기사 헤드라인(NewsTitle) 배치
    - [x] 마우스 hover시 헤드라인에 밑줄, cursor 손 모양
  - [x] Buttons
  - [x] Badge
  - [x] Alert

### UI 구현

- [x] 1️⃣ 기본 상단 영역

  - [x] 왼쪽에는 뉴스스탠드 로고를, 오른쪽에는 시스템 날짜(더미데이터)를 표시한다.

- [x] 2️⃣ 최신 뉴스 자동롤링 영역

  - [x] AutoRolling News 컴포넌트를 가로로 2개 배치

- [x] 3️⃣ 언론사별 기사들을 확인하는 영역
  - [x] 컴포넌트 헤더
    - [x] [전체 언론사] / [내가 구독한 언론사] 버튼
    - [x] [내가 구독한 언론사]탭의 타이틀 옆에는 badge 컴포넌트로 내가 구독한 언론사의 숫자를 표시
    - [x] 리스트보기 / 그리드 보기 버튼
    - [x] [전체 언론사]탭 및 [그리드 보기]를 기본 상태로 한다.
  - [x] 그리드 보기 (언론사 모아보기)
    - [x] pressLogo 컴포넌트를 6x4 그리드 배치
    - [x] page 넘기는 화살표 버튼 구현

### 인터랙션 및 추가 기능

- [ ] 1️⃣ 기본 상단 영역
  - [ ] 뉴스스탠드 로고를 클릭하면 화면을 새로고침 한다
  - [x] 더미데이터가 아닌 실제 시스템 날짜를 표시
- [ ] 2️⃣ 최신 뉴스 자동롤링 영역

  - [ ] AutoRolling News 컴포넌트가 5초마다 바뀌되, 1초의 시간차를 가지고 번갈아가며 돌아간다
  - [ ] 마우스 hover시, 롤링이 멈춘다.
  - [ ] 마우스가 해당 영역에서 벗어나면 다시 1초 간격의 차이를 두고 두 영역의 뉴스가 롤링 되도록 한다

- [ ] 3️⃣ 언론사별 기사들을 확인하는 영역

  - [ ] [내가 구독한 언론사]선택시 구독한 언론사만 보여준다
  - [ ] 내가 구독한 언론사 숫자 badge에 실제 개수 반영
  - [x] pressLogo에 마우스 hover시 구독 상태에 따라[구독하기]/[구독해제] 버튼 랜더링
  - [ ] [구독/해제] 버튼 클릭시 alert 창 랜더링
  - [ ] Alert 모달 기능(구독/해제) 구현
  - [ ] 페이지 버튼 동작 구현 및 양끝 페이지에선 숨김

- [ ] 추가 기능
  - [ ] 다크모드 적용
  - [ ] 접근성 높이기

---
