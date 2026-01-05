/**
 * 앱 초기화 순서를 분리합니다(부트스트랩).
 * NewsStandApp는 이벤트 라우팅/오케스트레이션에 집중하고,
 * 초기화 시퀀스는 여기서 관리합니다.
 */
export async function initNewsStandApp(app) {
  app.date.render();
  app.modules.newsLogos.init();
  app.theme.init();
  app.modules.view.init();
  app.modules.subscriptions.init();

  try {
    await app.modules.newsRolling.start();
  } catch {
    // ignore - keep placeholders
  }
}


