import { $, $$, encodePathSegment } from "../utils/dom.js";

export function getThemeFolder(theme) {
  return theme === "dark" ? "darkmodelogos" : "lightmodelogos";
}

export function getLogoFilesForTheme({
  theme,
  LOGO_FILES,
  LIGHT_ONLY_FILES,
  DARK_ONLY_FILES,
}) {
  if (theme === "dark") {
    return LOGO_FILES.filter((f) => !LIGHT_ONLY_FILES.includes(f))
      .concat(DARK_ONLY_FILES)
      .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  }
  // light
  return LOGO_FILES.filter((f) => !DARK_ONLY_FILES.includes(f)).sort((a, b) =>
    a.localeCompare(b, "en", { numeric: true })
  );
}

export function buildShuffledLogoLists({
  state,
  shuffle,
  LOGO_FILES,
  LIGHT_ONLY_FILES,
  DARK_ONLY_FILES,
}) {
  state.shuffledByTheme.light = shuffle(
    getLogoFilesForTheme({
      theme: "light",
      LOGO_FILES,
      LIGHT_ONLY_FILES,
      DARK_ONLY_FILES,
    })
  );
  state.shuffledByTheme.dark = shuffle(
    getLogoFilesForTheme({
      theme: "dark",
      LOGO_FILES,
      LIGHT_ONLY_FILES,
      DARK_ONLY_FILES,
    })
  );
}

export function getCurrentLogoList({
  state,
  LOGO_FILES,
  LIGHT_ONLY_FILES,
  DARK_ONLY_FILES,
  getSubscribedSet,
  subscribedStorageKey,
}) {
  const theme = state.theme === "dark" ? "dark" : "light";
  const base =
    state.shuffledByTheme[theme] ??
    getLogoFilesForTheme({
      theme,
      LOGO_FILES,
      LIGHT_ONLY_FILES,
      DARK_ONLY_FILES,
    });

  const subscribed = getSubscribedSet(subscribedStorageKey);
  if (state.tab === "subscribed") return base.filter((f) => subscribed.has(f));
  return base;
}

export function setTab({
  state,
  tab,
  tabButtonsSelector = '[data-action="tab"]',
} = {}) {
  state.tab = tab === "subscribed" ? "subscribed" : "all";
  for (const $btn of $$(tabButtonsSelector)) {
    $btn.classList.toggle(
      "is-active",
      $btn.getAttribute("data-tab") === state.tab
    );
  }
}

export function updateNavButtons({
  page,
  totalPages,
  leftSelector = '[data-action="prev"]',
  rightSelector = '[data-action="next"]',
} = {}) {
  const $left = $(leftSelector);
  const $right = $(rightSelector);
  if (!$left || !$right) return;
  $left.hidden = page <= 0;
  $right.hidden = page >= totalPages - 1;
}

export function renderLogos({
  state,
  LOGO_FILES,
  LIGHT_ONLY_FILES,
  DARK_ONLY_FILES,
  getSubscribedSet,
  subscribedStorageKey,
  logosSelector = "#logos",
} = {}) {
  const $logos = $(logosSelector);
  if (!$logos) return;

  const files = getCurrentLogoList({
    state,
    LOGO_FILES,
    LIGHT_ONLY_FILES,
    DARK_ONLY_FILES,
    getSubscribedSet,
    subscribedStorageKey,
  });

  const subscribed = getSubscribedSet(subscribedStorageKey);

  const logosPerPage = Math.max(1, state.perPage);
  const totalPages = Math.max(
    1,
    Math.min(4, Math.ceil(files.length / logosPerPage))
  );
  state.page = Math.max(0, Math.min(state.page, totalPages - 1));

  const start = state.page * logosPerPage;
  const end = start + logosPerPage;
  const items = files.slice(start, end);

  const folder = getThemeFolder(state.theme);
  $logos.innerHTML = items
    .map((filename) => {
      const src = `/${folder}/${encodePathSegment(filename)}`;
      const isSub = subscribed.has(filename);
      const btnText = isSub ? "해지하기" : "구독하기";
      const btnIcon = isSub ? "×" : "+";
      return `
        <li class="logo-card" data-logo="${encodePathSegment(filename)}">
          <img src="${src}" alt="언론사 로고" loading="lazy" decoding="async" />
          <button class="sub-pill ${
            isSub ? "is-subscribed" : ""
          }" type="button" data-action="toggle-sub" data-logo="${encodePathSegment(
        filename
      )}" aria-label="${btnText}">
            <span class="sub-pill__icon">${btnIcon}</span>
            <span class="sub-pill__text">${btnText}</span>
          </button>
        </li>
      `;
    })
    .join("");

  updateNavButtons({ page: state.page, totalPages });
}
