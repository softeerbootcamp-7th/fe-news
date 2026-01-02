import newsFilter from "./newsFilter.js";
import gridNews from "./gridNews.js";
import listNews from "./listNews.js";
import setupFilter, { updateFilterUI } from "../setup/setupFilter.js";
import setupViewToggle, { updateViewUI } from "../setup/setupViewToggle.js";
import setupPagination, {
  updatePaginationUI,
} from "../setup/setupPagination.js";
import setupSubscribe, {
  loadSubscribedNews,
  saveSubscribedNews,
} from "../setup/setupSubscribe.js";
import { loadNewsData, paginateNews } from "../utils/newsDataManager.js";

let allNewsData = [];
let paginatedData = [];
let currentFilter = "all";
let currentView = "grid";
let subscribedNews = new Set();
let currentPage = 0;

export default function newsFeed() {
  return /* html */ `
    <div class="news-feed-container">
      ${newsFilter("all", "grid", 0)}
      <div id="grid-container">
        ${gridNews([], subscribedNews, currentFilter)}
      </div>
    </div>
  `;
}

export async function initNewsFeed(container) {
  await loadInitialData();
  subscribedNews = loadSubscribedNews();

  renderCurrentPage(container);
  setupAllEventListeners(container);
  updateAllUI(container);
}

async function loadInitialData() {
  allNewsData = await loadNewsData("/pressData.json");
  paginatedData = paginateNews(allNewsData, 24);
}

function setupAllEventListeners(container) {
  const filterContainer = container.querySelector(".news-filter-container");

  setupFilter(filterContainer, handleFilterChange.bind(null, container));
  setupViewToggle(filterContainer, handleViewChange.bind(null, container));
  setupPagination(container, handlePageChange.bind(null, container));
  setupSubscribe(container, handleSubscribeChange.bind(null, container));
}

function handleFilterChange(container, newFilter) {
  currentFilter = newFilter;
  currentPage = 0;

  const filteredData = getFilteredData(currentFilter);
  paginatedData = paginateNews(filteredData, 24);

  renderCurrentPage(container);
  updateAllUI(container);
}

function handleViewChange(container, newView) {
  currentView = newView;

  renderCurrentPage(container);
  updateViewUI(container.querySelector(".news-filter-container"), currentView);
  updatePaginationArrowsVisibility(container);
}

function handlePageChange(container, direction) {
  const newPage = direction === "prev" ? currentPage - 1 : currentPage + 1;

  if (newPage >= 0 && newPage < paginatedData.length) {
    currentPage = newPage;
    renderCurrentPage(container);
    updatePaginationUI(container, currentPage, paginatedData.length);
  }
}

function handleSubscribeChange(container, press, filter) {
  if (subscribedNews.has(press)) {
    subscribedNews.delete(press);
  } else {
    subscribedNews.add(press);
  }

  saveSubscribedNews(subscribedNews);

  if (filter === "favorite") {
    repaginateForFavorites();
  }

  renderCurrentPage(container);
  updateAllUI(container);
}

function renderCurrentPage(container) {
  const gridContainer = container.querySelector("#grid-container");
  const pageData = paginatedData[currentPage] || [];
  const validNewsData = Array.isArray(pageData) ? pageData : [];

  gridContainer.innerHTML =
    currentView === "grid"
      ? gridNews(validNewsData, subscribedNews, currentFilter)
      : listNews(validNewsData, subscribedNews, currentFilter);
}

function updateAllUI(container) {
  updateFilterBar(container);
  updatePaginationUI(container, currentPage, paginatedData.length);
  updatePaginationArrowsVisibility(container);
}

function updateFilterBar(container) {
  const filterContainer = container.querySelector(".news-filter-container");
  if (!filterContainer) return;

  const newFilterBar = newsFilter(
    currentFilter,
    currentView,
    subscribedNews.size
  );
  filterContainer.outerHTML = newFilterBar;

  const newFilterContainer = container.querySelector(".news-filter-container");

  setupFilter(newFilterContainer, handleFilterChange.bind(null, container));
  setupViewToggle(newFilterContainer, handleViewChange.bind(null, container));

  updateFilterUI(newFilterContainer, currentFilter);
  updateViewUI(newFilterContainer, currentView);
}

function updatePaginationArrowsVisibility(container) {
  const paginationArrows = container.querySelectorAll(".pagination-arrow");
  const displayValue = currentView === "grid" ? "flex" : "none";

  paginationArrows.forEach((arrow) => {
    arrow.style.display = displayValue;
  });
}

function repaginateForFavorites() {
  const allItems = paginatedData.flat();
  const filteredItems = allItems.filter(
    (item) => item && subscribedNews.has(item.press)
  );

  const pageSize = 24;
  paginatedData = Array.from(
    { length: Math.ceil(filteredItems.length / pageSize) },
    (_, i) => filteredItems.slice(i * pageSize, (i + 1) * pageSize)
  );

  if (currentPage >= paginatedData.length && paginatedData.length > 0) {
    currentPage = paginatedData.length - 1;
  }
}

function getFilteredData(filter) {
  return filter === "favorite"
    ? allNewsData.filter((item) => subscribedNews.has(item.press))
    : allNewsData;
}
