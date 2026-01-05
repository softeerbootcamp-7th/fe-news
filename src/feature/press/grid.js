import { articlesData } from "@/dummy/articlesData";
import {
  getPressGridItemTemplate,
  getEmptyGridItemTemplate,
  getSubscribeButtonTemplate,
  getCancelButtonTemplate,
} from "@/template/GridItem";
import { shuffleArray } from "@/utils/shuffle";
import { parsePressData } from "@/utils/parse";
import {
  isSubscribed,
  toggleSubscription,
  observeSubscriptionStore,
} from "@/store/subscription";
import { getLoadingIndicatorTemplate } from "@/template/Loading";

const NUM_GRID_ROW = 4;
const NUM_GRID_COL = 6;
const NUM_GRID_CELL = NUM_GRID_COL * NUM_GRID_ROW;

const gridContainer = document.querySelector(".press-grid__list");
const prevButton = document.querySelector(".press-list__control--prev");
const nextButton = document.querySelector(".press-list__control--next");

let currentPage = 0;
let pressData = [];

export function initGridView() {
  // dummy 데이터 파싱 {id, logo, name}
  pressData = shuffleArray(parsePressData(articlesData));

  // 첫 grid 레이아웃 그리기
  renderCurrentPage();

  // 구독하기 버튼
  gridContainer.addEventListener("click", (e) => {
    const pressId = e.target.closest("li").dataset.label;
    toggleSubscription(pressId);
    e.target.closest("button").innerHTML = getLoadingIndicatorTemplate();
  });
  // 구독 상태 observer 등록
  observeSubscriptionStore((pressId) => {
    updateGridItem(pressId);
  });

  // 양옆 화살표 버튼
  prevButton.addEventListener("click", () => {
    currentPage--;
    updateArrowVisibility();
    renderCurrentPage();
  });
  nextButton.addEventListener("click", () => {
    currentPage++;
    updateArrowVisibility();
    renderCurrentPage();
  });
}

function getPageCount(pressData) {
  return Math.ceil(pressData.length / NUM_GRID_CELL);
}

function getPaginationData(pageNum, pressData) {
  return pressData.slice(
    NUM_GRID_CELL * pageNum,
    NUM_GRID_CELL * (pageNum + 1)
  );
}

function updateArrowVisibility() {
  const pageCount = getPageCount(pressData);
  prevButton.classList.toggle("hidden", currentPage === 0);
  nextButton.classList.toggle("hidden", currentPage === pageCount - 1);
}

function renderCurrentPage() {
  const paginatedData = getPaginationData(currentPage, pressData);
  renderGridItems(paginatedData);
}

function renderGridItems(paginatedData) {
  let gridContentHTML = "";

  // TODO 다크모드 버튼 클릭 시 observe
  const currentTheme = document.documentElement.getAttribute("data-theme");

  paginatedData.forEach((item) => {
    // grid item template
    gridContentHTML += getPressGridItemTemplate({
      pressId: item.id,
      pressName: item.name,
      logoSrc: item.logo.replace("light", currentTheme),
      isSubscribed: isSubscribed(item.id),
    });
  });

  // 남은 셀
  if (paginatedData.length < NUM_GRID_CELL)
    for (let i = paginatedData.length; i < NUM_GRID_CELL; i++)
      gridContentHTML += getEmptyGridItemTemplate();

  gridContainer.innerHTML = gridContentHTML;
}

function updateGridItem(pressId) {
  const li = gridContainer.querySelector(`li[data-label="${pressId}"]`);
  if (!li) return;
  const button = li.querySelector("button");
  // 버튼 상태만 갱신
  button.outerHTML = isSubscribed(pressId)
    ? getCancelButtonTemplate()
    : getSubscribeButtonTemplate();
}
