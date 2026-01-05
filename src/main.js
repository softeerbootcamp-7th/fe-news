import "./style.css";
import "./styles/variables.css";
import "./styles/reset.css";
import { Header } from "./components/Header/Header.js";
import { RollingSection } from "./components/Rollable/RollingSection.js";
import { GridSection } from "./components/Main/Grid/GridSection.js";
import { pageStore, viewStore, subsStore, pressList } from "./store/index.js"; // 스토어 가져오기
import { MainContents } from "./components/Main/MainContent.js";

const app = document.querySelector("#app");

// 1. 렌더링 함수 정의
function render() {
  app.innerHTML = `
      ${Header()}
      ${RollingSection()}
      ${MainContents()}
    `;
}

// 2. 초기 실행
render();

// 3. 상태 변화 구독 (스토어가 변하면 다시 렌더링)
window.addEventListener("pageStoreChange", render);
window.addEventListener("viewStoreChange", render);
window.addEventListener("subsStoreChange", render);

app.addEventListener("click", (e) => {
  const target = e.target;

  /** 헤더 로고 클릭 → 새로고침
   * 새로고침시 css불러오기까지 지연 발생. 안이쁨 수정 고민해봐야함
   **/
  if (target.closest(".titleHeader .title")) {
    e.preventDefault();
    location.reload();
    return;
  }

  if (target.closest(".subscribe-toggle")) {
    const toggle = target.closest(".subscribe-toggle");
    const view = toggle.dataset.view;

    viewStore.setViewOnlySubs(view === "subs");
  }

  if (target.closest(".view-toggle")) {
    const toggle = target.closest(".view-toggle");
    const view = toggle.dataset.view;
    viewStore.setViewGrid(view === "grid");
  }

  // 다음 페이지 버튼 클릭
  if (target.closest(".nav-button.next")) {
    pageStore.setPage(pageStore.state.currentPage + 1);
  }

  // 이전 페이지 버튼 클릭
  if (target.closest(".nav-button.prev")) {
    pageStore.setPage(pageStore.state.currentPage - 1);
  }

  // 구독/해제 버튼 클릭
  if (target.closest(".subscribe-button")) {
    const subBtn = target.closest(".subscribe-button");
    if (!subBtn) return;
    const pressId = parseInt(subBtn.dataset.id);
    const pressName = subBtn.dataset.name;

    subsStore.setTargetPressId(pressId, pressName);
  }

  //Alert창에서 동작
  if (target.closest(".confirm-btn")) {
    subsStore.toggleSub();
  }
  if (target.closest(".cancel-btn")) {
    subsStore.setTargetPressId(null);
  }
});
