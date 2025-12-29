import {
  DARK_ONLY_FILES,
  LIGHT_ONLY_FILES,
  LOGO_FILES,
  STORAGE_KEYS,
} from "./constants.js";

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

function $(selector) {
  return document.querySelector(selector);
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function ensureThemeToggleButton() {
  let $btn = document.querySelector('[data-action="toggle-theme"]');
  if ($btn) return $btn;

  const $right = document.querySelector(".header__right");
  if (!$right) return null;

  $btn = document.createElement("button");
  $btn.className = "icon-btn";
  $btn.type = "button";
  $btn.setAttribute("data-action", "toggle-theme");
  $btn.setAttribute("aria-label", "다크 모드 전환");
  $btn.title = "다크 모드 전환";

  const $img = document.createElement("img");
  $img.src = "./public/icons/Symbol.png";
  $img.alt = "";
  $btn.appendChild($img);

  $right.appendChild($btn);
  return $btn;
}

function encodePathSegment(filename) {
  // keep slashes as-is (there shouldn't be any), but encode spaces etc.
  return encodeURIComponent(filename).replaceAll("%2F", "/");
}

function getThemeFolder(theme) {
  return theme === "dark" ? "darkmodelogos" : "lightmodelogos";
}

function setTheme(theme, { persist = true } = {}) {
  state.theme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  if (persist) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }

  const $btn = ensureThemeToggleButton();
  if ($btn) {
    $btn.setAttribute(
      "aria-label",
      theme === "dark" ? "라이트 모드 전환" : "다크 모드 전환"
    );
    $btn.title = theme === "dark" ? "라이트 모드 전환" : "다크 모드 전환";
  }
}

function getSubscribedSet() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SUBSCRIBED_PRESS);
    const parsed = raw ? JSON.parse(raw) : [];
    const arr = Array.isArray(parsed) ? parsed : [];
    return new Set(arr.filter((x) => typeof x === "string"));
  } catch {
    return new Set();
  }
}

function setSubscribedSet(set) {
  localStorage.setItem(STORAGE_KEYS.SUBSCRIBED_PRESS, JSON.stringify([...set]));
}

function updateSubscribedCount() {
  const $badge = $("#sub-count");
  if (!$badge) return;
  const count = getSubscribedSet().size;
  $badge.textContent = String(count);
  $badge.setAttribute("aria-label", `구독 수 ${count}`);
}

function getLogoFilesForTheme(theme) {
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

function setView(view) {
  state.view = view;
  localStorage.setItem(STORAGE_KEYS.VIEW, view);

  const $logos = $("#logos");
  if ($logos) {
    $logos.classList.toggle("is-list", view === "list");
  }

  for (const $btn of document.querySelectorAll('[data-action="view"]')) {
    $btn.classList.toggle("is-active", $btn.getAttribute("data-view") === view);
  }
}

function setDate() {
  const $date = $("#date");
  if (!$date) return;

  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const dayNames = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const day = dayNames[now.getDay()];

  const text = `${yyyy}. ${mm}. ${dd}. ${day}`;
  $date.textContent = text;
  $date.setAttribute("datetime", `${yyyy}-${mm}-${dd}`);
}

function updateNavButtons(totalPages) {
  const $left = document.querySelector('[data-action="prev"]');
  const $right = document.querySelector('[data-action="next"]');
  if (!$left || !$right) return;

  const atStart = state.page <= 0;
  const atEnd = state.page >= totalPages - 1;
  $left.hidden = atStart;
  $right.hidden = atEnd;
}

function buildShuffledLogoLists() {
  const light = shuffle(getLogoFilesForTheme("light"));
  const dark = shuffle(getLogoFilesForTheme("dark"));
  state.shuffledByTheme.light = light;
  state.shuffledByTheme.dark = dark;
}

function getCurrentLogoList() {
  const theme = state.theme === "dark" ? "dark" : "light";
  const base = state.shuffledByTheme[theme] ?? getLogoFilesForTheme(theme);

  const subscribed = getSubscribedSet();
  if (state.tab === "subscribed") {
    return base.filter((f) => subscribed.has(f));
  }
  return base;
}

function renderSubscribeCell() {
  return `
    <li class="logo-card subscribe-cell">
      <div class="subscribe-cell__inner">
        <img src="./public/icons/plus.png" alt="" />
        <span>구독</span>
      </div>
    </li>
  `;
}

function renderLogos() {
  const $logos = $("#logos");
  if (!$logos) return;

  const files = getCurrentLogoList();
  const subscribed = getSubscribedSet();

  // per page: 24 cells, first is "subscribe" cell, rest 23 logos
  const logosPerPage = Math.max(1, state.perPage - 1);
  const totalPages = Math.max(
    1,
    Math.min(4, Math.ceil(files.length / logosPerPage))
  );
  state.page = Math.max(0, Math.min(state.page, totalPages - 1));

  const start = state.page * logosPerPage;
  const end = start + logosPerPage;
  const items = files.slice(start, end);

  const folder = getThemeFolder(state.theme);
  $logos.innerHTML =
    renderSubscribeCell() +
    items
      .map((filename) => {
        const src = `./public/${folder}/${encodePathSegment(filename)}`;
        const isSub = subscribed.has(filename);
        const btnText = isSub ? "구독중" : "구독";
        return `
          <li class="logo-card" data-logo="${encodePathSegment(filename)}">
            <img src="${src}" alt="언론사 로고" loading="lazy" decoding="async" />
            <button class="sub-btn ${
              isSub ? "is-subscribed" : ""
            }" type="button" data-action="toggle-sub" data-logo="${encodePathSegment(
          filename
        )}">
              ${btnText}
            </button>
          </li>
        `;
      })
      .join("");

  updateNavButtons(totalPages);
}

function setTab(tab) {
  state.tab = tab === "subscribed" ? "subscribed" : "all";
  for (const $btn of document.querySelectorAll('[data-action="tab"]')) {
    $btn.classList.toggle(
      "is-active",
      $btn.getAttribute("data-tab") === state.tab
    );
  }
}

async function loadNewsData() {
  const res = await fetch("./news.json", { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load news.json: ${res.status}`);
  const json = await res.json();
  if (!Array.isArray(json)) return [];

  const headlines = [];
  for (const item of json) {
    if (item && typeof item === "object") {
      if (
        typeof item.mainTitle === "string" &&
        typeof item.mainLink === "string"
      ) {
        headlines.push({
          press: String(item.press ?? ""),
          title: item.mainTitle,
          link: item.mainLink,
        });
      }
      if (Array.isArray(item.relatedArticles)) {
        for (const ra of item.relatedArticles) {
          if (
            ra &&
            typeof ra === "object" &&
            typeof ra.title === "string" &&
            typeof ra.link === "string"
          ) {
            headlines.push({
              press: String(item.press ?? ""),
              title: ra.title,
              link: ra.link,
            });
          }
        }
      }
    }
  }
  return headlines.filter((h) => h.title && h.link);
}

function createRollingLane(
  $el,
  items,
  { intervalMs = 5000, initialDelayMs = 0 } = {}
) {
  let idx = 0;
  let timer = null; // timeout or interval id
  let nextAt = 0;
  let running = false;

  function render(isSwitching) {
    if (!items.length) return;
    const item = items[idx % items.length];
    idx += 1;

    const $source = $el.querySelector(".newsbar__source");
    const $title = $el.querySelector(".newsbar__title");
    if ($source) $source.textContent = item.press || "-";
    if ($title) $title.textContent = item.title;
    $el.href = item.link || "#";

    if (isSwitching) {
      $el.classList.remove("is-switching");
      // reflow to restart animation
      void $el.offsetHeight; // eslint-disable-line no-unused-expressions
      $el.classList.add("is-switching");
    }
  }

  function scheduleNext(delay) {
    running = true;
    nextAt = Date.now() + delay;
    timer = window.setTimeout(() => {
      render(true);
      scheduleNext(intervalMs);
    }, delay);
  }

  function start() {
    if (running) return;
    render(false);
    scheduleNext(initialDelayMs || intervalMs);
  }

  function pause() {
    if (!running) return;
    running = false;
    $el.classList.add("is-paused");
    if (timer) window.clearTimeout(timer);
    timer = null;
  }

  function resume() {
    if (running) return;
    $el.classList.remove("is-paused");
    const remaining = Math.max(0, nextAt - Date.now());
    scheduleNext(remaining || intervalMs);
  }

  $el.addEventListener("mouseenter", pause);
  $el.addEventListener("mouseleave", resume);

  return { start };
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
    if (action === "toggle-theme") {
      setTheme(state.theme === "dark" ? "light" : "dark", {
        persist: true,
      });
      renderLogos();
      return;
    }

    if (action === "toggle-sub") {
      const encoded = target.getAttribute("data-logo") || "";
      const filename = decodeURIComponent(encoded);
      const set = getSubscribedSet();
      if (set.has(filename)) set.delete(filename);
      else set.add(filename);
      setSubscribedSet(set);
      updateSubscribedCount();
      renderLogos();
      return;
    }

    if (action === "view") {
      const view = target.getAttribute("data-view");
      if (view === "grid" || view === "list") setView(view);
      return;
    }

    if (action === "prev") {
      state.page -= 1;
      renderLogos();
      return;
    }

    if (action === "next") {
      state.page += 1;
      renderLogos();
      return;
    }

    if (action === "tab") {
      const tab = target.getAttribute("data-tab") || "all";
      setTab(tab);
      renderLogos();
      return;
    }
  });
}

async function init() {
  setDate();
  ensureThemeToggleButton();
  buildShuffledLogoLists();

  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
  const prefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)"
  )?.matches;

  if (savedTheme === "dark" || savedTheme === "light") {
    setTheme(savedTheme, { persist: true });
  } else {
    setTheme(prefersDark ? "dark" : "light", { persist: false });
  }

  const savedView = localStorage.getItem(STORAGE_KEYS.VIEW);
  setView(savedView === "list" || savedView === "grid" ? savedView : "grid");

  setTab("all");
  renderLogos();
  bindEvents();

  updateSubscribedCount();

  try {
    const all = await loadNewsData();
    state.news = shuffle(all).slice(0, 120);

    const left = $("#rolling-left");
    const right = $("#rolling-right");
    if (left && right) {
      const mid = Math.floor(state.news.length / 2) || 1;
      const laneL = createRollingLane(left, state.news.slice(0, mid), {
        intervalMs: 5000,
        initialDelayMs: 0,
      });
      const laneR = createRollingLane(right, state.news.slice(mid), {
        intervalMs: 5000,
        initialDelayMs: 1000,
      });
      laneL.start();
      laneR.start();
    }
  } catch {
    // ignore - keep placeholders
  }
}

init();
