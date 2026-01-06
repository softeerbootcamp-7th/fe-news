import { renderRollingItem, setRollingPaused } from "../ui/rollingLaneUI.js";

export class RollingLane {
  constructor(
    $el,
    items,
    { intervalMs = 5000, initialDelayMs = 0, windowRef = window } = {}
  ) {
    this.$el = $el;
    this.items = Array.isArray(items) ? items : [];
    this.intervalMs = intervalMs;
    this.initialDelayMs = initialDelayMs;
    this.window = windowRef;

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
    renderRollingItem(this.$el, item, { isSwitching });
  }

  scheduleNext(delay) {
    this.running = true;
    this.nextAt = Date.now() + delay;
    this.timer = this.window.setTimeout(() => {
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
    setRollingPaused(this.$el, true);
    if (this.timer) this.window.clearTimeout(this.timer);
    this.timer = null;
  }

  resume() {
    if (this.running) return;
    setRollingPaused(this.$el, false);
    const remaining = Math.max(0, this.nextAt - Date.now());
    this.scheduleNext(remaining || this.intervalMs);
  }

  destroy() {
    if (this.timer) this.window.clearTimeout(this.timer);
    this.timer = null;
    this.running = false;
    this.$el.removeEventListener("mouseenter", this._onMouseEnter);
    this.$el.removeEventListener("mouseleave", this._onMouseLeave);
  }
}
