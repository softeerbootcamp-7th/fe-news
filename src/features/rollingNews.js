import { $ } from "../utils/dom.js";

export async function loadNewsData(url = "/mockData/news.json") {
  const res = await fetch(url, { cache: "no-store" });
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

export function createRollingLane(
  $el,
  items,
  { intervalMs = 5000, initialDelayMs = 0 } = {}
) {
  let idx = 0;
  let timer = null;
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

export async function initRollingNews({ shuffle, maxItems = 120 } = {}) {
  const all = await loadNewsData();
  const items = shuffle(all).slice(0, maxItems);

  const left = $("#rolling-left");
  const right = $("#rolling-right");
  if (!left || !right) return;

  const mid = Math.floor(items.length / 2) || 1;
  const laneL = createRollingLane(left, items.slice(0, mid), {
    intervalMs: 5000,
    initialDelayMs: 0,
  });
  const laneR = createRollingLane(right, items.slice(mid), {
    intervalMs: 5000,
    initialDelayMs: 1000,
  });

  laneL.start();
  laneR.start();
}
