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
import {
  initAutoPageModule,
  setAutoPageContext,
} from "../setup/setupAutoPage.js";
import {
  loadNewsData,
  paginateForGrid,
  shuffleArray,
} from "../utils/newsDataManager.js";
import { PAGINATION, VIEW_TYPE, SUBSCRIBE } from "../constants/constants.js";
import { eventBus, EVENTS } from "../utils/eventBus.js";

let allNewsData = [];
let currentFilter = "all";
let currentView = VIEW_TYPE.GRID;
let subscribedNews = new Set();

let gridState = {
  paginatedData: [],
  currentPage: 0,
  pageSize: PAGINATION.GRID_PAGE_SIZE,
};

let listState = {
  currentCategory: "종합/경제",
  categorizedData: {},
  currentPressIndex: 0,
  categories: [],
};

let cachedDOM = {
  container: null,
  filterContainer: null,
  contentContainer: null,
};

export default function newsFeed() {
  return /* html */ `
    <div class="news-feed-container">
      ${newsFilter("all", VIEW_TYPE.GRID, 0)}
      <div id="content-container">
        ${gridNews([], subscribedNews, currentFilter)}
      </div>
    </div>
  `;
}

export async function initNewsFeed(container) {
  await loadInitialData();
  subscribedNews = loadSubscribedNews();

  cachedDOM.container = container;
  cachedDOM.filterContainer = container.querySelector(".news-filter-container");
  cachedDOM.contentContainer = container.querySelector("#content-container");

  setupEventSubscriptions();

  initAutoPageModule();
  setAutoPageContext(cachedDOM.container, handlePageChangeInternal);

  setupAllEventListeners();

  eventBus.publish(EVENTS.STATE_UPDATED);
}

function setupEventSubscriptions() {
  eventBus.subscribe(EVENTS.FILTER_CHANGED, ({ filter }) => {
    if (currentView === VIEW_TYPE.GRID) {
      gridState.currentPage = 0;
      const filteredData = getFilteredData(filter);
      gridState.paginatedData = paginateForGrid(
        filteredData,
        gridState.pageSize
      );
    } else {
      initializeListView();
    }
  });

  eventBus.subscribe(EVENTS.VIEW_CHANGED, ({ newView, previousView }) => {
    if (newView === VIEW_TYPE.LIST && previousView === VIEW_TYPE.GRID) {
      initializeListView();
    } else if (newView === VIEW_TYPE.GRID && previousView === VIEW_TYPE.LIST) {
      resetListState();
    }
  });

  eventBus.subscribe(EVENTS.SUBSCRIBE_ADDED, () => {
    currentFilter = "favorite";
    currentView = VIEW_TYPE.LIST;

    const filteredData = getFilteredData(currentFilter);
    gridState.paginatedData = paginateForGrid(filteredData, gridState.pageSize);
    gridState.currentPage = 0;

    initializeListView();

    eventBus.publish(EVENTS.VIEW_CHANGED, {
      newView: VIEW_TYPE.LIST,
      previousView: VIEW_TYPE.GRID,
    });
  });

  eventBus.subscribe(EVENTS.SUBSCRIBE_REMOVED, ({ press, filter }) => {
    if (filter === "favorite") {
      if (currentView === VIEW_TYPE.LIST) {
        handleUnsubscribeInListView(press);
      } else {
        handleUnsubscribeInGridView();
      }
    }
  });

  eventBus.subscribe(EVENTS.PAGE_CHANGED, ({ direction }) => {
    if (currentView === VIEW_TYPE.GRID) {
      handleGridPageChange(direction);
    } else {
      handleListPageChange(direction);
    }
  });

  eventBus.subscribe(EVENTS.CATEGORY_CHANGED, ({ category }) => {
    if (listState.categorizedData[category]) {
      listState.currentCategory = category;
      listState.currentPressIndex = 0;
    }
  });

  eventBus.subscribe(EVENTS.STATE_UPDATED, () => {
    renderCurrentView();
    updateFilterBar();
    updatePaginationState();
    updatePaginationArrowsVisibility();
  });
}

async function loadInitialData() {
  allNewsData = await loadNewsData("/pressData.json");
  const filteredData = getFilteredData(currentFilter);
  gridState.paginatedData = paginateForGrid(filteredData, gridState.pageSize);
  gridState.currentPage = 0;
}

function setupAllEventListeners() {
  setupFilter(cachedDOM.filterContainer, handleFilterChange);
  setupViewToggle(cachedDOM.filterContainer, handleViewChange);
  setupPagination(cachedDOM.container, handlePageChange);
  setupSubscribe(cachedDOM.container, handleSubscribeChange);
}

function handleFilterChange(newFilter) {
  const oldFilter = currentFilter;
  currentFilter = newFilter;

  eventBus.publish(EVENTS.FILTER_CHANGED, { filter: newFilter, oldFilter });
  eventBus.publish(EVENTS.STATE_UPDATED);
}

function handleViewChange(newView) {
  const previousView = currentView;
  currentView = newView;

  eventBus.publish(EVENTS.VIEW_CHANGED, { newView, previousView });
  eventBus.publish(EVENTS.STATE_UPDATED);
}

function handlePageChange(direction) {
  eventBus.publish(EVENTS.PAGE_CHANGED, { direction, source: "user" });
}

function handlePageChangeInternal(direction, source = "user") {
  eventBus.publish(EVENTS.PAGE_CHANGED, { direction, source });
}

async function handleSubscribeChange(press, filter) {
  const button =
    cachedDOM.container.querySelector(
      `.subscribe-btn-inline[data-press="${press}"]`
    ) ||
    cachedDOM.container.querySelector(
      `.subscribe-btn[data-press="${press}"]`
    ) ||
    cachedDOM.container.querySelector(`.subscribe-icon[data-press="${press}"]`);

  if (!button) return;

  const wasSubscribed = subscribedNews.has(press);

  if (!wasSubscribed) {
    button.disabled = true;
    button.classList.add("loading");

    subscribedNews.add(press);
    saveSubscribedNews(subscribedNews);

    eventBus.publish(EVENTS.SUBSCRIBE_ADDED, { press });
    eventBus.publish(EVENTS.STATE_UPDATED);
  } else {
    subscribedNews.delete(press);
    saveSubscribedNews(subscribedNews);

    eventBus.publish(EVENTS.SUBSCRIBE_REMOVED, { press, filter });
    eventBus.publish(EVENTS.STATE_UPDATED);
  }
}

function handleGridPageChange(direction) {
  const newPage =
    direction === "prev"
      ? gridState.currentPage - 1
      : gridState.currentPage + 1;

  if (newPage >= 0 && newPage < gridState.paginatedData.length) {
    gridState.currentPage = newPage;
    renderCurrentView();
    updatePaginationUI(
      cachedDOM.container,
      gridState.currentPage,
      gridState.paginatedData.length
    );
  }
}

function handleUnsubscribeInListView(unsubscribedPress) {
  const isCurrentPress = listState.currentCategory === unsubscribedPress;

  const currentCategoryIndex = listState.categories.indexOf(
    listState.currentCategory
  );

  initializeListView();

  if (isCurrentPress) {
    if (currentCategoryIndex >= listState.categories.length) {
      listState.currentCategory =
        listState.categories[listState.categories.length - 1];
    } else {
      listState.currentCategory = listState.categories[currentCategoryIndex];
    }
    listState.currentPressIndex = 0;
  } else {
    if (!listState.categorizedData[listState.currentCategory]) {
      listState.currentCategory = listState.categories[0];
      listState.currentPressIndex = 0;
    }
  }
}

function handleUnsubscribeInGridView() {
  const allItems = gridState.paginatedData.flat();
  const filteredItems = allItems.filter(
    (item) => item && subscribedNews.has(item.press)
  );

  gridState.paginatedData = Array.from(
    { length: Math.ceil(filteredItems.length / gridState.pageSize) },
    (_, i) =>
      filteredItems.slice(i * gridState.pageSize, (i + 1) * gridState.pageSize)
  );

  if (
    gridState.currentPage >= gridState.paginatedData.length &&
    gridState.paginatedData.length > 0
  ) {
    gridState.currentPage = gridState.paginatedData.length - 1;
  }
}

function initializeListView() {
  if (currentFilter === "favorite") {
    listState.categorizedData = categorizePressDataByPress(allNewsData);
  } else {
    listState.categorizedData = categorizePressData(allNewsData);
  }

  listState.categories = Object.keys(listState.categorizedData);

  if (listState.categories.length > 0) {
    listState.currentCategory = listState.categories[0];
    listState.currentPressIndex = 0;
  }
}

function categorizePressData(newsData) {
  const categorized = {};

  newsData.forEach((press) => {
    const category = press.category || "기타";
    if (!categorized[category]) {
      categorized[category] = [];
    }
    categorized[category].push(press);
  });

  Object.keys(categorized).forEach((category) => {
    categorized[category] = shuffleArray(categorized[category]);
  });

  return categorized;
}

function categorizePressDataByPress(newsData) {
  const categorized = {};

  const subscribedPressData = newsData.filter((press) =>
    subscribedNews.has(press.press)
  );

  const savedSubscriptions = localStorage.getItem("subscribedNews");
  const subscriptionOrder = savedSubscriptions
    ? JSON.parse(savedSubscriptions)
    : [];

  subscribedPressData.sort((a, b) => {
    const indexA = subscriptionOrder.indexOf(a.press);
    const indexB = subscriptionOrder.indexOf(b.press);
    return indexA - indexB;
  });

  subscribedPressData.forEach((press) => {
    categorized[press.press] = [press];
  });

  return categorized;
}

function getCurrentPress() {
  const categoryData =
    listState.categorizedData[listState.currentCategory] || [];
  return categoryData[listState.currentPressIndex] || null;
}

function getTotalPressInCategory() {
  const categoryData =
    listState.categorizedData[listState.currentCategory] || [];
  return categoryData.length;
}

function handleListPageChange(direction) {
  const categoryData =
    listState.categorizedData[listState.currentCategory] || [];
  const totalInCategory = categoryData.length;

  if (direction === "next") {
    if (listState.currentPressIndex < totalInCategory - 1) {
      listState.currentPressIndex++;
    } else {
      const currentCategoryIdx = listState.categories.indexOf(
        listState.currentCategory
      );
      if (currentCategoryIdx < listState.categories.length - 1) {
        listState.currentCategory =
          listState.categories[currentCategoryIdx + 1];
        listState.currentPressIndex = 0;
      } else {
        listState.currentCategory = listState.categories[0];
        listState.currentPressIndex = 0;
      }
    }
  } else {
    if (listState.currentPressIndex > 0) {
      listState.currentPressIndex--;
    } else {
      const currentCategoryIdx = listState.categories.indexOf(
        listState.currentCategory
      );
      if (currentCategoryIdx > 0) {
        listState.currentCategory =
          listState.categories[currentCategoryIdx - 1];
        const prevCategoryData =
          listState.categorizedData[listState.currentCategory] || [];
        listState.currentPressIndex = prevCategoryData.length - 1;
      } else {
        listState.currentCategory =
          listState.categories[listState.categories.length - 1];
        const lastCategoryData =
          listState.categorizedData[listState.currentCategory] || [];
        listState.currentPressIndex = lastCategoryData.length - 1;
      }
    }
  }

  renderCurrentView();
  updatePaginationState();
}

function resetListState() {
  listState.currentCategory = "";
  listState.categorizedData = {};
  listState.currentPressIndex = 0;
  listState.categories = [];
}

function renderCurrentView() {
  if (currentView === VIEW_TYPE.GRID) {
    renderGridView();
  } else {
    renderListView();
  }
}

function renderGridView() {
  const pageData = gridState.paginatedData[gridState.currentPage] || [];
  const validNewsData = Array.isArray(pageData) ? pageData : [];

  cachedDOM.contentContainer.innerHTML = gridNews(
    validNewsData,
    subscribedNews,
    currentFilter
  );
}

function renderListView() {
  const currentPress = getCurrentPress();
  const totalInCategory = getTotalPressInCategory();
  const currentPosition = listState.currentPressIndex + 1;

  cachedDOM.contentContainer.innerHTML = listNews(
    currentPress,
    listState.currentCategory,
    listState.categories,
    currentPosition,
    totalInCategory,
    subscribedNews,
    currentFilter
  );

  setupCategoryChange();

  setTimeout(() => {
    const prevArrow = cachedDOM.container.querySelector(
      ".pagination-arrow.prev"
    );
    const nextArrow = cachedDOM.container.querySelector(
      ".pagination-arrow.next"
    );

    if (prevArrow && nextArrow) {
      const isFirstCategoryFirstPress =
        listState.categories.indexOf(listState.currentCategory) === 0 &&
        listState.currentPressIndex === 0;

      if (isFirstCategoryFirstPress) {
        prevArrow.classList.add("hidden");
        prevArrow.disabled = true;
        prevArrow.style.visibility = "hidden";
      } else {
        prevArrow.classList.remove("hidden");
        prevArrow.disabled = false;
        prevArrow.style.visibility = "visible";
      }

      nextArrow.classList.remove("hidden");
      nextArrow.disabled = false;
      nextArrow.style.visibility = "visible";
    }

    eventBus.publish(EVENTS.AUTO_PAGE_START);
  }, 0);
}

function updateFilterBar() {
  if (!cachedDOM.filterContainer) return;

  const newFilterBar = newsFilter(
    currentFilter,
    currentView,
    subscribedNews.size
  );
  cachedDOM.filterContainer.outerHTML = newFilterBar;

  cachedDOM.filterContainer = cachedDOM.container.querySelector(
    ".news-filter-container"
  );

  setupFilter(cachedDOM.filterContainer, handleFilterChange);
  setupViewToggle(cachedDOM.filterContainer, handleViewChange);

  updateFilterUI(cachedDOM.filterContainer, currentFilter);
  updateViewUI(cachedDOM.filterContainer, currentView);
}

function updatePaginationState() {
  if (currentView === VIEW_TYPE.GRID) {
    const currentPage = gridState.currentPage;
    const totalPages = gridState.paginatedData.length;
    updatePaginationUI(cachedDOM.container, currentPage, totalPages);
  } else {
    const currentPage = listState.currentPressIndex;
    const totalPages = getTotalPressInCategory();

    updatePaginationUI(cachedDOM.container, currentPage, totalPages);

    const prevArrow = cachedDOM.container.querySelector(
      ".pagination-arrow.prev"
    );
    const nextArrow = cachedDOM.container.querySelector(
      ".pagination-arrow.next"
    );

    if (prevArrow && nextArrow) {
      const isFirstCategoryFirstPress =
        listState.categories.indexOf(listState.currentCategory) === 0 &&
        listState.currentPressIndex === 0;

      if (isFirstCategoryFirstPress) {
        prevArrow.classList.add("hidden");
        prevArrow.disabled = true;
        prevArrow.style.visibility = "hidden";
      } else {
        prevArrow.classList.remove("hidden");
        prevArrow.disabled = false;
        prevArrow.style.visibility = "visible";
      }

      nextArrow.classList.remove("hidden");
      nextArrow.disabled = false;
      nextArrow.style.visibility = "visible";
    }
  }
}

function updatePaginationArrowsVisibility() {
  const paginationArrows =
    cachedDOM.container.querySelectorAll(".pagination-arrow");

  paginationArrows.forEach((arrow) => {
    arrow.style.display = "flex";
  });
}

function setupCategoryChange() {
  const categoryButtons =
    cachedDOM.contentContainer.querySelectorAll(".category-tab");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const category = e.target.dataset.category;
      if (category) {
        eventBus.publish(EVENTS.CATEGORY_CHANGED, { category });
        eventBus.publish(EVENTS.STATE_UPDATED);
      }
    });
  });
}

function getFilteredData(filter) {
  return filter === "favorite"
    ? allNewsData.filter((item) => subscribedNews.has(item.press))
    : allNewsData;
}
