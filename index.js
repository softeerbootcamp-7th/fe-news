import {
  DARK_ONLY_FILES,
  dayNames,
  LIGHT_ONLY_FILES,
  LOGO_FILES,
  STORAGE_KEYS,
} from "./src/data/constants.js";
import { initSystemTheme } from "./src/utils/theme.js";
import { shuffle } from "./src/utils/array.js";
import { setDate } from "./src/features/date.js";
import {
  getSubscribedSet,
  setSubscribedSet,
  updateSubscribedCount,
} from "./src/features/subscriptions.js";
import { setView } from "./src/features/view.js";
import {
  buildShuffledLogoLists,
  renderLogos,
  setTab,
} from "./src/features/logos.js";
import { initRollingNews } from "./src/features/rollingNews.js";

const state = {
  page: 0,
  perPage: 24, // 6*4 cells
  theme: "light",
  view: "grid",
  tab: "all", // "all" | "subscribed"
  news: [],
  shuffledByTheme: {
    light: null,
    dark: null,
  },
};

function setThemeInState(theme) {
  state.theme = theme;
}

function rerenderLogos() {
  renderLogos({
    state,
    LOGO_FILES,
    LIGHT_ONLY_FILES,
    DARK_ONLY_FILES,
    getSubscribedSet,
    subscribedStorageKey: STORAGE_KEYS.SUBSCRIBED_PRESS,
  });
}

function bindEvents() {
  document.addEventListener("click", (e) => {
    const target =
      e.target instanceof Element ? e.target.closest("[data-action]") : null;
    if (!target) return;

    const action = target.getAttribute("data-action");
    if (action === "refresh") {
      window.location.reload();
      return;
    }

    if (action === "toggle-sub") {
      const encoded = target.getAttribute("data-logo") || "";
      const filename = decodeURIComponent(encoded);
      const set = getSubscribedSet(STORAGE_KEYS.SUBSCRIBED_PRESS);
      if (set.has(filename)) set.delete(filename);
      else set.add(filename);
      setSubscribedSet(STORAGE_KEYS.SUBSCRIBED_PRESS, set);
      updateSubscribedCount({ storageKey: STORAGE_KEYS.SUBSCRIBED_PRESS });
      rerenderLogos();
      return;
    }

    if (action === "view") {
      const view = target.getAttribute("data-view");
      if (view === "grid" || view === "list") {
        state.view = view;
        setView({ view, storageKey: STORAGE_KEYS.VIEW });
      }
      return;
    }

    if (action === "prev") {
      state.page -= 1;
      rerenderLogos();
      return;
    }

    if (action === "next") {
      state.page += 1;
      rerenderLogos();
      return;
    }

    if (action === "tab") {
      const tab = target.getAttribute("data-tab") || "all";
      setTab({ state, tab });
      rerenderLogos();
      return;
    }
  });
}

async function init() {
  setDate({ dayNames });
  buildShuffledLogoLists({
    state,
    shuffle,
    LOGO_FILES,
    LIGHT_ONLY_FILES,
    DARK_ONLY_FILES,
  });

  initSystemTheme({
    onChange: (theme) => {
      setThemeInState(theme);
      // 테마 변경 시 로고(라이트/다크 폴더)도 즉시 반영
      rerenderLogos();
    },
  });

  const savedView = localStorage.getItem(STORAGE_KEYS.VIEW);
  const initialView =
    savedView === "list" || savedView === "grid" ? savedView : "grid";
  state.view = initialView;
  setView({ view: initialView, storageKey: STORAGE_KEYS.VIEW });

  setTab({ state, tab: "all" });
  rerenderLogos();
  bindEvents();

  updateSubscribedCount({ storageKey: STORAGE_KEYS.SUBSCRIBED_PRESS });

  try {
    await initRollingNews({ shuffle });
  } catch {
    // ignore - keep placeholders
  }
}

init();
