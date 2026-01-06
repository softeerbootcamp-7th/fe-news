export function setViewFromTarget(app, target) {
  const view = target?.getAttribute?.("data-view");
  app.view.set(view);
  if (typeof app.renderNewsForView === "function") {
    app.newsView.setRenderNews(app.renderNewsForView(view));
  }
  app.newsView.render();
}
