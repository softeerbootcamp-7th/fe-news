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
- [ ] CSS 적용
- [ ] 클릭 시 탭 이동
- [ ] 뷰잉 옵션 이미지 hover CSS
- [ ] 뷰잉 옵션 이미지 탭 전환

## 3. 리팩토링

- [x] feature-based 기준, 도메인 별로 파일 분리
