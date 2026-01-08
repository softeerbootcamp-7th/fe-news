export function setViewFromTarget(app, target) {
  const view = target?.getAttribute?.("data-view");
  app.router?.pushRoute?.({ view });
}
