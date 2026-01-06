import {
  initActions,
  initContext,
  initControllers,
} from "./lib/appBindings.js";
import { initApp } from "./lib/runtimes/appRuntime.js";

export class NewsStandApp {
  constructor({ documentRef = document, windowRef = window } = {}) {
    initContext(this, { documentRef, windowRef });
    initControllers(this);
    initActions(this);
  }

  async init() {
    await initApp(this);
  }
}
