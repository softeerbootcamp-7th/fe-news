import { $, $$, encodePathSegment } from "../../utils/dom.js";
import {
  buildShuffledLogoLists,
  getLogoFilesForTheme,
  getThemeFolder,
} from "../../features/newsLogos.js";

export class NewsLogosController {
  constructor({
    state,
    shuffle,
    LOGO_FILES,
    LIGHT_ONLY_FILES,
    DARK_ONLY_FILES,
    subscribedStorageKey,
    subscriptions,
    documentRef = document,
    logosSelector = "#logos",
    tabButtonsSelector = '[data-action="tab"]',
    leftSelector = '[data-action="prev"]',
    rightSelector = '[data-action="next"]',
  } = {}) {
    this.state = state;
    this.shuffle = shuffle;
    this.LOGO_FILES = LOGO_FILES;
    this.LIGHT_ONLY_FILES = LIGHT_ONLY_FILES;
    this.DARK_ONLY_FILES = DARK_ONLY_FILES;
    this.subscribedStorageKey = subscribedStorageKey;
    this.subscriptions = subscriptions;
    this.document = documentRef;
    this.logosSelector = logosSelector;
    this.tabButtonsSelector = tabButtonsSelector;
    this.leftSelector = leftSelector;
    this.rightSelector = rightSelector;
  }

  initShuffle() {
    buildShuffledLogoLists({
      state: this.state,
      shuffle: this.shuffle,
      LOGO_FILES: this.LOGO_FILES,
      LIGHT_ONLY_FILES: this.LIGHT_ONLY_FILES,
      DARK_ONLY_FILES: this.DARK_ONLY_FILES,
    });
  }

  updateNavButtons({ page, totalPages } = {}) {
    const $left = $(this.leftSelector, this.document);
    const $right = $(this.rightSelector, this.document);
    if (!$left || !$right) return;
    $left.hidden = page <= 0;
    $right.hidden = page >= totalPages - 1;
  }

  applyActiveTabUI() {
    for (const $btn of $$(this.tabButtonsSelector, this.document)) {
      $btn.classList.toggle(
        "is-active",
        $btn.getAttribute("data-tab") === this.state.tab
      );
    }
  }

  setTab(tab) {
    this.state.tab = tab === "subscribed" ? "subscribed" : "all";
    this.applyActiveTabUI();
    this.render();
  }

  getCurrentLogoList() {
    const theme = this.state.theme === "dark" ? "dark" : "light";
    const base =
      this.state.shuffledByTheme?.[theme] ??
      getLogoFilesForTheme({
        theme,
        LOGO_FILES: this.LOGO_FILES,
        LIGHT_ONLY_FILES: this.LIGHT_ONLY_FILES,
        DARK_ONLY_FILES: this.DARK_ONLY_FILES,
      });

    const subscribed = this.subscriptions?.getSet?.() ?? new Set();
    if (this.state.tab === "subscribed")
      return base.filter((f) => subscribed.has(f));
    return base;
  }

  render() {
    const $logos = $(this.logosSelector, this.document);
    if (!$logos) return;

    const files = this.getCurrentLogoList();
    const subscribed = this.subscriptions?.getSet?.() ?? new Set();

    const logosPerPage = Math.max(1, this.state.perPage);
    const totalPages = Math.max(
      1,
      Math.min(4, Math.ceil(files.length / logosPerPage))
    );
    this.state.page = Math.max(0, Math.min(this.state.page, totalPages - 1));

    const start = this.state.page * logosPerPage;
    const end = start + logosPerPage;
    const items = files.slice(start, end);

    const folder = getThemeFolder(this.state.theme);
    const shouldPadEmptyCells =
      this.state.tab === "subscribed" && this.state.view === "grid";
    const cells = shouldPadEmptyCells
      ? Array.from({ length: logosPerPage }, (_, i) => items[i] ?? null)
      : items;

    $logos.innerHTML = cells
      .map((filename) => {
        if (!filename)
          return `<li class="logo-card is-empty" aria-hidden="true"></li>`;

        const src = `/images/${folder}/${encodePathSegment(filename)}`;
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

    this.updateNavButtons({ page: this.state.page, totalPages });
  }

  prevPage() {
    this.state.page -= 1;
    this.render();
  }

  nextPage() {
    this.state.page += 1;
    this.render();
  }
}
