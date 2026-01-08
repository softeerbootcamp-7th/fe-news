import { parseDateString } from "@/utils/parse";

export function initHeader() {
  // 로고 클릭 시 새로고침
  document
    .querySelector(".newsstand-header__logo")
    .addEventListener("click", () => {
      location.reload();
    });

  // 날짜 설정
  document.querySelector(".newsstand-header__date").innerText = parseDateString(
    new Date()
  );
}
