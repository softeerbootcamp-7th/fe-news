import {
  getPressGridContainerTemplate,
  getPressGridItemTemplate,
  getEmptyGridItemTemplate,
  getSubscribeButtonTemplate,
  getCancelButtonTemplate,
} from "@/template/GridView";
import {
  isSubscribed,
  toggleSubscription,
  observeSubscriptionStore,
} from "@/store/subscriptionStore";
import { getLoadingIndicatorTemplate } from "@/template/Loading";

export function initGridView(paginatedPressData) {
  // 첫 grid 레이아웃 그리기
  renderGridContainer();
  renderGridItems(paginatedPressData);

  // 구독하기 버튼 이벤트 등록
  addClickEvents();

  // 구독 상태 observer 등록
  observeSubscriptionStore((pressId) => {
    updateGridItem(pressId);
  });
}

function renderGridItems(paginatedData) {
  let gridContentHTML = "";

  // TODO 다크모드 버튼 클릭 시 observe
  const currentTheme = document.documentElement.getAttribute("data-theme");

  paginatedData.forEach((item) => {
    // grid item template
    if (item)
      gridContentHTML += getPressGridItemTemplate({
        pressId: item.id,
        pressName: item.name,
        logoSrc: item.logo.replace("light", currentTheme),
        isSubscribed: isSubscribed(item.id),
      });
    // empty cell
    else gridContentHTML += getEmptyGridItemTemplate();
  });

  document.querySelector(".press-grid__list").innerHTML = gridContentHTML;
}

function addClickEvents() {
  // 구독하기 버튼
  const gridContainer = document.querySelector(".press-grid__list");
  gridContainer.addEventListener("click", (e) => {
    console.log("click");
    const pressId = e.target.closest("li").dataset.label;
    if (!pressId) return;
    const button = e.target.closest("button");
    if (!button) return;
    button.innerHTML = getLoadingIndicatorTemplate();
    toggleSubscription(pressId);
  });
}

function updateGridItem(pressId) {
  const li = document.querySelector(`li[data-label="${pressId}"]`);
  if (!li) return;
  const button = li.querySelector("button");
  // 버튼 상태만 갱신
  button.outerHTML = isSubscribed(pressId)
    ? getCancelButtonTemplate()
    : getSubscribeButtonTemplate();
}

function renderGridContainer() {
  document.querySelector(".press-section").innerHTML =
    getPressGridContainerTemplate();
}
