export function createGridViewActions(app) {
  return {
    prev: () => app.newsView.prevPage(),
    next: () => app.newsView.nextPage(),
    tab: (target) => {
      const tab = target?.getAttribute?.("data-tab") || "all";
      app.newsView.setTab(tab);
    },
    render: () => app.newsView.render(),
  };
}
