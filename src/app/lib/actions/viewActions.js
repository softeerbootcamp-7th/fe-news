export function getCurrentView(app) {
  return app.store?.getState?.().view ?? "grid";
}

export function setViewMode(app, view) {
  app.view.set(view);
  if (typeof app.renderNewsForView === "function") {
    app.newsView.setRenderNews(app.renderNewsForView(view));
  }
}

export function handleTabAction(app, target) {
  const tab = target?.getAttribute?.("data-tab") || "all";
  const nextView = tab === "subscribed" ? "list" : "grid";
  setViewMode(app, nextView);
  app.newsView.setTab(tab);
}
