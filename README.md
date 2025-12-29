## 진행한 작업 
### 2025/12/29
  - NPM 환경 구성
    - npm init
  - Module System 변경 (CommonJS -> ESM)
    - package.json에서 `"type": "commonjs"` -> `"type": "module"`
  - .gitignore 세팅
    - node_modules
  - Live Server 세팅
    - npm install -D live-server
    - package.json에서 `"scripts" : {"start": "live-server"}`로 설정
  - HTML 뼈대 잡기
    - Semantic Elements 사용
      - section
      - header
      - time 
    - WAI-ARIA 적용
      - aria-hidden
      - aria-label
      - role

## 진행해야 할 작업
- #press-content 아래에 동적 HTML 삽입
  - 유지보수성 고려해서 어떻게 나눌지 고민 
- 공통된 부분들 컴포넌트화
- CSS 다크 모드 적용 
  - [data-theme="dark"]
- Mock Data 세팅 
- Dialog 구현 (구독)