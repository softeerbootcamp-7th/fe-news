/**
 * data-action 기반 클릭 이벤트를 핸들러로 매핑합니다.
 * - NewsStandApp는 오케스트레이션만 남기고, action 분기는 이 모듈로 분리합니다.
 */
import { toggleSubscriptionFromTarget } from "../features/subscriptions/index.js";

export function createNewsStandActions(app) {
  return {
    refresh: () => app.window.location.reload(),
    "toggle-sub": async (target) => {
      const changed = await toggleSubscriptionFromTarget({
        target,
        subscriptions: app.subscriptions,
        unsubscribeDialog: app.unsubscribeDialog,
      });
      if (changed) app.newsLogos.render();
    },
    view: (target) => app.setViewFromTarget(target),
    prev: () => app.newsLogos.prevPage(),
    next: () => app.newsLogos.nextPage(),
    tab: (target) => {
      const tab = target?.getAttribute?.("data-tab") || "all";
      app.newsLogos.setTab(tab);
    },
  };
}
