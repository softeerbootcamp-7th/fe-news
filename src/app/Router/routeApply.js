export function applyRoute(app, route) {
  app.store?.setState?.({
    view: route.view,
    tab: route.tab,
    page: route.page,
  });
  app.view?.apply?.(route.view);
  if (typeof app.renderNewsForView === "function") {
    app.newsView?.setRenderNews?.(app.renderNewsForView(route.view));
  }
  app.newsView?.applyActiveTabUI?.();
  app.newsView?.render?.();
}
