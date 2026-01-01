import { parseDateString } from "@/utils/parse";

export function createHeader() {
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

  // 다크모드
  document.querySelector(".theme-toggle-button").onclick = () => {
    const root = document.documentElement;

    const currentTheme = root.getAttribute("data-theme");
    const nextTheme = currentTheme === "light" ? "dark" : "light";

    const svg = document.querySelector(
      ".theme-toggle-button"
    ).firstElementChild;
    svg.src =
      nextTheme === "light"
        ? "public/assets/svg/dark_mode.svg"
        : "public/assets/svg/light_mode.svg";

    root.setAttribute("data-theme", nextTheme);
  };
}
