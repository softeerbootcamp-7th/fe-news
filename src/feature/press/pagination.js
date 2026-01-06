import { VIEW_TAB } from "@/types/constant";

const NUM_GRID_ROW = 4;
const NUM_GRID_COL = 6;
const GRID_SIZE = NUM_GRID_ROW * NUM_GRID_COL;

export function createPaginationController() {
  let currentPage = 0;
  let strategy = createGridPaginationStrategy();

  return {
    setStrategy(viewTab) {
      // "grid" || "list"
      strategy =
        viewTab === VIEW_TAB.GRID
          ? createGridPaginationStrategy()
          : createListPaginationStrategy();
      currentPage = 0;
    },

    reset() {
      currentPage = 0;
    },

    next(data) {
      currentPage++;
    },

    prev() {
      currentPage--;
    },

    getCurrentPage() {
      return currentPage;
    },

    getPageData(data) {
      if (!strategy) return [];
      return strategy.getPageSlice(data, currentPage);
    },

    getPageSize() {
      if (!strategy) return -1;
      return strategy.getPageSize();
    },

    getArrowState(data) {
      if (!strategy) return { showPrev: false, showNext: false };

      const totalPages = strategy.getTotalPages(data);
      return {
        showPrev: currentPage > 0,
        showNext: currentPage < totalPages - 1,
      };
    },
  };
}

function createGridPaginationStrategy() {
  return {
    getTotalPages(data) {
      return Math.ceil(data.length / GRID_SIZE) || 1;
    },

    getPageSlice(data, page) {
      const start = page * GRID_SIZE;
      let slicedData = data.slice(start, start + GRID_SIZE);
      for (let i = slicedData.length; i < GRID_SIZE; i++) slicedData.push(null);
      return slicedData;
    },

    getPageSize() {
      return GRID_SIZE;
    },
  };
}

function createListPaginationStrategy() {
  return {
    getTotalPages(data) {
      return 1;
    },

    getPageSlice(data, page) {
      return data;
    },

    getPageSize() {
      return 1;
    },
  };
}
