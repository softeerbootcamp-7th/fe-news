# 뉴스 스탠드 기능 체크리스트

## 1. 개발 환경 세팅

- [x] Vite 프로젝트 생성
- [x] `npm install` 의존성 설치
  - [x] node_modules 폴더 생성
  - [x] package-lock.json 생성
- [x] Git 초기화
  - [x] gitignore 파일 확인

## 2. 기능 구현

- [x] 가로 930px, 가운데 수직 정렬
- [x] color, typography 등 global css 분리하기

### 1. header

- [x] 제목 : 뉴스 스탠드
- [x] 날짜 : 현재 날짜 받아와서 적용하기

### 2. latestNewsCard

- [x] json 파일 fetch 하여 데이터 불러오기
- [x] 컴포넌트 UI CSS
- [x] 렌더링 시 FOUC 최적화

#### 2.1 animation

- [ ] 5초 보여주고, 1초 후 롤링하기
- [ ] hover 후 롤링 초기화
- [ ] 롤링 시 위아래로 애니메이션 적용

### 3. news-section-header

- [x] HTML 틀 잡기
- [x] CSS 적용
- [ ] 클릭 시 탭 이동
- [x] 뷰잉 옵션 이미지 hover CSS
- [ ] 뷰잉 옵션 이미지 탭 전환

### 4. news-grid

- [x] 언론사 정중앙 배치
- [x] pagination
  - [x] 좌우 버튼 누르면 그 다음 언론사 페이지 보이기
  - [x] 최대 4페이지 제한
  - [x] classList.toggle로 이전/이후 페이지 유무에 따른 버튼 활성화/비활성화

### 5. 구독 / 해제

- [x] 구독 해제 버튼 component
- [x] 구독 상태 관리 Store
  - [ ] 구독 상태 관리 Redux 패턴 적용
- [x] 구독한 언론사 개수 UI 업데이트
- [ ] 내가 구독한 탭에 언론사 반영

## 3. 리팩토링

- [x] feature-based 기준, 도메인 별로 파일 분리
