import { $ } from "../../utils/dom.js";
import { loadNewsData, RollingLane } from "../../features/rollingNews.js";

export class NewsRollingController {
  constructor({ shuffle, documentRef = document } = {}) {
    this.shuffle = shuffle;
    this.document = documentRef;
    this._lanes = [];
  }

  async start({ maxItems = 120 } = {}) {
    const all = await loadNewsData();
    const items = this.shuffle(all).slice(0, maxItems);

    const left = $("#rolling-left", this.document);
    const right = $("#rolling-right", this.document);
    if (!left || !right) return;

    const mid = Math.floor(items.length / 2) || 1;
    const laneL = new RollingLane(left, items.slice(0, mid), {
      intervalMs: 5000,
      initialDelayMs: 0,
    });
    const laneR = new RollingLane(right, items.slice(mid), {
      intervalMs: 5000,
      initialDelayMs: 1000,
    });

    this._lanes = [laneL, laneR];
    laneL.start();
    laneR.start();
  }

  destroy() {
    for (const lane of this._lanes) lane?.destroy?.();
    this._lanes = [];
  }
}
