# 1주차 직무교육 과제 - 뉴스스탠드

## 📃 목차
  - [과제 소개](#과제-소개)
  - [Task](#task)
  - [과제 실행 화면](#과제-실행-화면)
  - [Path Tree](#path-tree)
  - [시행착오](#시행착오-및-배운점)
  - [회고](#회고)
  - [커밋 컨벤션](#커밋-컨벤션)

## 과제 소개

### 기능 요구 사항
> 네이버의 뉴스스탠드를 구현한다.

---
<img width="729" height="48" alt="Image" src="https://github.com/user-attachments/assets/4a175669-21f4-4bf8-abdc-780c18e309a0" />

  - 상단 영역
    - 왼쪽 -> 뉴스스탠드 로고
    - 오른쪽 -> 시스템 날짜
    - 뉴스스탠드 로고 클릭 시 화면 새로고침
---
<img width="734" height="64" alt="Image" src="https://github.com/user-attachments/assets/d8ee5d86-4256-41e8-a528-a48d5a65698f" />

  - 자동롤링 영역
    - 왼쪽 바와 오른쪽 바 각각 다른 최신 뉴스 헤드라인 5개로 구성
    - 위로 넘어가는 에니메이션으로 5초마다 롤링
    - 양쪽 바를 1초 차이를 둬서 동시에 롤링되는 현상 방지
    - 마우스 hover 시 롤링 정지 및 헤드라인에 밑줄 표시 (hover 해제 시 롤링 재시작)
    - hover 시 커서 모양은 손 모양으로 지정

---
<img width="784" height="369" alt="Image" src="https://github.com/user-attachments/assets/9cf18d30-9a6b-487f-8c13-dd164e9b40bc" />

  - 전체 언론사 탭 (그리드 보기 -> 디폴트)
    - 전체 테이블(6 * 4): 930px * 388px
    - 각 셀에는 언론사 브랜드 마크를 중앙에 배치
    - 새로고침 시 언론사 브랜드 재배치
    - 좌우에 화살표 배치 -> 첫 페이지와 끝 페이지에 비활성화는 렌더링이 안되도록 함
    - 최대 4페이지로 제한
    - 셀에 마우스 hover 시 구독하기 버튼이 가운데 렌더링 되도록 함 (이미 구독된 언론사는 해지하기 버튼을 렌더링 함)
  ---
  - 전체 언론사 탭 (리스트 보기)
  - 내가 구독한 언론사 탭 (그리드 보기)
  - 내가 구독한 언론사 탭 (리스트 보기 -> 디폴트)

### 프로그래밍 요구 사항
  - HTML, CSS 개발
    - 어떤 태그를 사용해야 할지 설계하고 진행한다.
    - 웹접근성에 도움이 되도록 semantic tag를 적절히 사용한다.
    - 디자인 가이드에 맞게 레이아웃과 스타일 작업을 한다.
  - 개발환경
    - Vite을 기본으로 환경구성한다.
    - vanillaJS를 기본 구성으로 한다.
    - vanilla CSS를 사용한다.
  - ESM
    - ES Modules 방식으로 개발한다. (import, export)
    - index HTML페이지에서 app.js 파일을 `type=module` 속성을 사용해서 호출한다.
    - app.js안에서는 필요한 HTML을 동적으로 렌더링하도록 한다.
    - 렌더링에 필요한 다른 JavaScript 모듈을 추가로 만들어도 좋다.


### 구현할 기능 목록

### 요구 사항 분석

## Task
- [ ] README.md 파일 작성
  - [ ] 과제 기획 및 요구 사항 정리
  - [ ] 분석 내용 정리
  - [ ] 과제 실행 화면 정리
  - [ ] Path Tree 작성
  - [ ] 배운점 노션 링크 작성
  - [ ] 회고 작성


## 과제 실행 화면


## Path Tree

```


```

## 시행착오 및 배운점


## 회고


## 커밋 컨벤션
  - feat (feature) : 기능 구현
  - fix (bug fix) : 버그 수정
  - docs (documentation) : 문서 관련 사항
  - style (formatting, missing semi colons, …) : 스타일 변경 (형식, 세미콜론 누락 등)
  - refactor : 리팩토링
  - test (when adding missing tests) : 테스트
  - build : 빌드 관련 파일 수정
  - ci : CI 설정 파일 수정
  - perf : 성능 개선
  - chore (maintain) : 빌드, 패키지 관련 (업데이트 등) 혹은 그 외 자잘한 수정