import { formatDate } from "@/utils/parse";
import { setViewTab, getViewTab } from "@/store/viewTabStore";
import { VIEW_TAB } from "@/types/constant";

export function initHeader() {
  // 로고 클릭 시 새로고침
  document
    .querySelector(".newsstand-header__left")
    .addEventListener("click", () => {
      setViewTab(getViewTab()); // 리렌더링 트리거
    });

  // 날짜 설정
  document.querySelector(".newsstand-header__date").innerText = formatDate(
    new Date()
  );
}
