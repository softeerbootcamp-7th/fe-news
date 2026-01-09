import { bindEvents } from "./appEvents.js";

export function setThemeInState(app, theme) {
  app.store.setState({ theme });
}

export async function initNewsStandApp(app) {
  app.date.render();
  await app.newsView.initShuffle();
  app.router?.init?.();
  app.theme.init();
  app.subscriptions.updateCount();

  try {
    await app.newsRolling.start();
  } catch (error) {
    // ignore - keep placeholders
    console.error("Failed to start rolling news.", error);
  }
}

export async function initApp(app) {
  bindEvents(app);
  await initNewsStandApp(app);
}
