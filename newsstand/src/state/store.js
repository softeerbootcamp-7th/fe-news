import { createStore } from "./createStore";

const initialState = {
  tab: "all",
  view: "grid",
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

  toggleSubscribe(pressId) {
    store.setState((prev) => {
      const has = prev.subscribedPresses.includes(pressId);
      const nextIds = has
        ? prev.subscribedPresses.filter((id) => id !== pressId)
        : [...prev.subscribedPresses, pressId];
      return { ...prev, subscribedPresses: nextIds };
    });
  },
};
