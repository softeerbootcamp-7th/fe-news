import {
  DARK_ONLY_FILES,
  dayNames,
  LIGHT_ONLY_FILES,
  LOGO_FILES,
  STORAGE_KEYS,
} from "../data/constants.js";
import { shuffle } from "../utils/array.js";
import { createAppContext } from "./AppContext.js";
import { createNewsStandActions } from "./actions/newsStandActions.js";
import { initNewsStandApp } from "./bootstrap/initNewsStand.js";
import { DateController } from "./controllers/DateController.js";
import { ThemeController } from "./controllers/ThemeController.js";
import { createNewsStandModules } from "./modules/createNewsStandModules.js";

export class NewsStandApp {
  constructor({
    documentRef = document,
    windowRef = window,
    localStorageRef = window?.localStorage,
  } = {}) {
    this.context = createAppContext({
      documentRef,
      windowRef,
      storageRef: localStorageRef,
    });
    this.document = this.context.document;
    this.window = this.context.window;
    this.localStorage = this.context.storage;

    this.state = {
      page: 0,
      perPage: 24, // 6*4 cells
      theme: "light",
      view: "grid",
      tab: "all", // "all" | "subscribed"
      shuffledByTheme: {
        light: null,
        dark: null,
      },
    };

    this.date = new DateController({ context: this.context, dayNames });

    // Modules (domain-level) + wiring
    this.modules = createNewsStandModules({
      context: this.context,
      state: this.state,
      shuffle,
      logosConfig: {
        LOGO_FILES,
        LIGHT_ONLY_FILES,
        DARK_ONLY_FILES,
      },
    });

    this.theme = new ThemeController({
      context: this.context,
      onChange: (theme) => {
        this.setThemeInState(theme);
        this.modules.newsLogos.render();
      },
    });

    this.actions = createNewsStandActions(this);

    this._onDocumentClick = (e) => this.handleClick(e);
  }

  setThemeInState(theme) {
    this.state.theme = theme;
  }

  async handleClick(e) {
    const target =
      e.target instanceof this.window.Element
        ? e.target.closest("[data-action]")
        : null;
    if (!target) return;

    const action = target.getAttribute("data-action");
    const handler = this.actions?.[action];
    if (typeof handler !== "function") return;
    await handler(target);
  }

  bindEvents() {
    this.document.addEventListener("click", this._onDocumentClick);
  }

  async init() {
    this.bindEvents();
    await initNewsStandApp(this);
  }
}
