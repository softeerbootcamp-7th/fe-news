import {
  getPressGridContainerTemplate,
  getPressGridItemTemplate,
  getEmptyGridItemTemplate,
} from "@/template/GridView";
import { isSubscribed } from "@/store/subscriptionStore";
import { observeTheme } from "@/feature/header/theme";

export function initGridView(paginatedPressData) {
  // 첫 grid 레이아웃 그리기
  renderGridContainer();
  renderGridItems(paginatedPressData);

  observeTheme(() => {
    renderGridItems(paginatedPressData); // 다크모드 로고
  });
}

function renderGridItems(paginatedData) {
  let gridContentHTML = "";

  const currentTheme = document.documentElement.getAttribute("data-theme");

  paginatedData.forEach((item) => {
    // grid item template
    if (item)
      gridContentHTML += getPressGridItemTemplate({
        pressId: item.id,
        pressName: item.name,
        logoSrc: currentTheme === "light" ? item.logo : item.darkLogo,
        isSubscribed: isSubscribed(item.name),
      });
    // empty cell
    else gridContentHTML += getEmptyGridItemTemplate();
  });
  document.querySelector(".press-grid__list").innerHTML = gridContentHTML;
}

// function updateGridItem(pressName) {
//   const li = document.querySelector(`li[data-label="${pressName}"]`);
//   if (!li) return;
//   const button = li.querySelector("button");
//   // 버튼 상태만 갱신
//   button.outerHTML = isSubscribed(pressName)
//     ? getCancelButtonTemplate()
//     : getSubscribeButtonTemplate();
// }

function renderGridContainer() {
  document.querySelector(".press-section").innerHTML =
    getPressGridContainerTemplate();
}
