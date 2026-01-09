import { createGridViewActions } from "./actions/newsGridViewActions.js";
import { createNewsListActions } from "./actions/newsListViewActions.js";
import {
  handleListSubscribe,
  handleToggleSubscription,
} from "./actions/subscriptionActions.js";
import { getCurrentView, handleTabAction } from "./actions/viewActions.js";
import { createNavigationActions } from "./actions/navigationActions.js";

export function createNewsStandActions(app) {
  const gridViewActions = createGridViewActions(app);
  const listViewActions = createNewsListActions();
  const getView = () => getCurrentView(app);
  const navigationActions = createNavigationActions({
    gridViewActions,
    listViewActions,
    getView,
  });
  return {
    refresh: () => app.window.location.reload(),
    view: (target) => app.setViewFromTarget(target),
    prev: () => navigationActions.prev(),
    next: () => navigationActions.next(),
    tab: (target) => handleTabAction(app, target),
    "toggle-sub": async (target) => handleToggleSubscription(app, target),
    "newslist-tab": (target) => listViewActions.selectTab(target),
    "newslist-subscribe": async (target) => handleListSubscribe(app, target),
  };
}
