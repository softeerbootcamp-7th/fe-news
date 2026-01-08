export function getCurrentView(app) {
  return app.store?.getState?.().view ?? "grid";
}

export function handleTabAction(app, target) {
  const tab = target?.getAttribute?.("data-tab") || "all";
  app.router?.pushRoute?.({ tab });
}
