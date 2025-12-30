import { parseDateString } from "@/utils/parse";

export function createHeader() {
  // 로고 클릭 시 새로고침
  document.querySelector(".main-logo").addEventListener("click", () => {
    location.reload();
  });

  // 날짜 설정
  document.querySelector(".today").innerText = parseDateString(new Date());
}
