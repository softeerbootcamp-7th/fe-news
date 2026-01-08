export function createGridViewActions(app) {
  return {
    prev: () => {
      const state = app.store?.getState?.() ?? {};
      const nextPage = (state.page ?? 0) - 1;
      app.router?.pushRoute?.({ page: nextPage });
    },
    next: () => {
      const state = app.store?.getState?.() ?? {};
      const nextPage = (state.page ?? 0) + 1;
      app.router?.pushRoute?.({ page: nextPage });
    },
    tab: (target) => {
      const tab = target?.getAttribute?.("data-tab") || "all";
      app.router?.pushRoute?.({ tab });
    },
  };
}
