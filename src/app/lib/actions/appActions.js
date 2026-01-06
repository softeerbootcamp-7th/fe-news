import { toggleSubscriptionFromTarget } from "../../../features/subscriptions/index.js";
import { createGridViewActions } from "./newsViewActions.js";

export function createNewsStandActions(app) {
  const gridViewActions = createGridViewActions(app);
  return {
    refresh: () => app.window.location.reload(),
    "toggle-sub": async (target) => {
      const changed = await toggleSubscriptionFromTarget({
        target,
        subscriptions: app.subscriptions,
        unsubscribeDialog: app.unsubscribeDialog,
      });
      if (changed) gridViewActions.render();
    },
    view: (target) => app.setViewFromTarget(target),
    prev: () => gridViewActions.prev(),
    next: () => gridViewActions.next(),
    tab: (target) => gridViewActions.tab(target),
  };
}
