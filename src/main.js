import "./style.css";
import "./styles/variables.css";
import "./styles/reset.css";
import { Header } from "./components/Header/Header.js";
import { RollingSection } from "./components/Rollable/RollingSection.js";
import { GridSection } from "./components/Main/Grid/GridSection.js";
import { pageStore, viewStore, subsStore } from "./store/index.js"; // 스토어 가져오기

const app = document.querySelector("#app");

// 1. 렌더링 함수 정의
function render() {
  app.innerHTML = `
      ${Header()}
      <main>
        ${RollingSection()}
        ${GridSection()}
      </main>
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

  // 다음 페이지 버튼 클릭
  if (target.closest(".nav-button.next")) {
    pageStore.setPage(pageStore.state.currentPage + 1);
  }

  // 이전 페이지 버튼 클릭
  if (target.closest(".nav-button.prev")) {
    pageStore.setPage(pageStore.state.currentPage - 1);
  }

  // 구독 버튼 클릭
  const subBtn = target.closest(".subscribe-button");
  if (subBtn) {
    const pressId = subBtn.dataset.id;
    subsStore.toggleSub(pressId);
  }
});
