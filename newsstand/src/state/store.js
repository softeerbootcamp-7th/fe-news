import { createStore } from "./createStore";

const initialState = {
  tab: "all", // "all" | "subscriptions"
  view: "list", // "grid" | "list"
  subscribedPresses: [],
  page: 1,
  listCategoryIdx: 0,
  listPressIdx: 0,
  isLoading: false,
  listPressData: null,
};

export const store = createStore(initialState);

export const actions = {
  setTab(nextTab) {
    store.setState((prev) =>
      prev.tab === nextTab ? prev : { ...prev, tab: nextTab, page: 1 }
    );
  },

  setView(nextView) {
    store.setState((prev) =>
      prev.view === nextView ? prev : { ...prev, view: nextView }
    );
  },

  setPage(nextPage, totalPages) {
    store.setState((prev) => {
      const page = Math.min(Math.max(1, nextPage), totalPages);
      return prev.page === page ? prev : { ...prev, page };
    });
  },

  setListIdx({ categoryIdx, pressIdx }) {
    store.setState((prev) =>
      prev.listCategoryIdx === categoryIdx && prev.listPressIdx === pressIdx
        ? prev
        : { ...prev, listCategoryIdx: categoryIdx, listPressIdx: pressIdx }
    );
  },

  setSubscribe(press) {
    store.setState((prev) => {
      const nextIds = [...prev.subscribedPresses, press];
      return { ...prev, subscribedPresses: nextIds };
    });
  },

  setUnsubscribe(press) {
    store.setState((prev) => {
      const nextIds = prev.subscribedPresses.filter(
        (item) => item.pressName !== press.pressName
      );
      return { ...prev, subscribedPresses: nextIds };
    });
  },

  setLoading(l) {
    store.setState((prev) =>
      prev.isLoading === l ? prev : { ...prev, isLoading: l }
    );
  },

  setListPressData(data) {
    store.setState((prev) =>
      prev.listPressData === data ? prev : { ...prev, listPressData: data }
    );
  },
};
