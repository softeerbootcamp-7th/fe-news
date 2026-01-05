import { createStore } from "./createStore";

const initialState = {
  tab: "all", // "all" | "subscriptions"
  view: "grid", // "grid" | "list"
  subscribedPresses: [],
  page: 1,
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
};
