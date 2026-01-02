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

export class RollingLane {
  constructor($el, items, { intervalMs = 5000, initialDelayMs = 0 } = {}) {
    this.$el = $el;
    this.items = Array.isArray(items) ? items : [];
    this.intervalMs = intervalMs;
    this.initialDelayMs = initialDelayMs;

    this.idx = 0;
    this.timer = null;
    this.nextAt = 0;
    this.running = false;

    this._onMouseEnter = () => this.pause();
    this._onMouseLeave = () => this.resume();

    this.$el.addEventListener("mouseenter", this._onMouseEnter);
    this.$el.addEventListener("mouseleave", this._onMouseLeave);
  }

  render(isSwitching) {
    if (!this.items.length) return;
    const item = this.items[this.idx % this.items.length];
    this.idx += 1;

    const $source = this.$el.querySelector(".newsbar__source");
    const $title = this.$el.querySelector(".newsbar__title");
    if ($source) $source.textContent = item.press || "-";
    if ($title) $title.textContent = item.title;
    this.$el.href = item.link || "#";

    if (isSwitching) {
      this.$el.classList.remove("is-switching");
      // reflow to restart animation
      void this.$el.offsetHeight; // eslint-disable-line no-unused-expressions
      this.$el.classList.add("is-switching");
    }
  }

  scheduleNext(delay) {
    this.running = true;
    this.nextAt = Date.now() + delay;
    this.timer = window.setTimeout(() => {
      this.render(true);
      this.scheduleNext(this.intervalMs);
    }, delay);
  }

  start() {
    if (this.running) return;
    this.render(false);
    this.scheduleNext(this.initialDelayMs || this.intervalMs);
  }

  pause() {
    if (!this.running) return;
    this.running = false;
    this.$el.classList.add("is-paused");
    if (this.timer) window.clearTimeout(this.timer);
    this.timer = null;
  }

  resume() {
    if (this.running) return;
    this.$el.classList.remove("is-paused");
    const remaining = Math.max(0, this.nextAt - Date.now());
    this.scheduleNext(remaining || this.intervalMs);
  }

  destroy() {
    if (this.timer) window.clearTimeout(this.timer);
    this.timer = null;
    this.running = false;
    this.$el.removeEventListener("mouseenter", this._onMouseEnter);
    this.$el.removeEventListener("mouseleave", this._onMouseLeave);
  }
}

// DOM 선택/시작은 Controller가 담당합니다.
