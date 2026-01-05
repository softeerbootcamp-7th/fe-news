/**
 * data-action 기반 클릭 이벤트를 핸들러로 매핑합니다.
 * - NewsStandApp는 오케스트레이션만 남기고, action 분기는 이 모듈로 분리합니다.
 */
export function createNewsStandActions(app) {
  return {
    refresh: () => app.window.location.reload(),
    "toggle-sub": async (target) =>
      app.modules.subscriptions.toggleFromTarget(target),
    view: (target) => app.modules.view.setFromTarget(target),
    prev: () => app.modules.newsLogos.prev(),
    next: () => app.modules.newsLogos.next(),
    tab: (target) => app.modules.newsLogos.setTabFromTarget(target),
  };
}
