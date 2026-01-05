import { $ } from "../../utils/dom.js";
import { loadNewsData, RollingLane } from "../../features/rollingNews.js";

export class NewsRollingController {
  constructor({
    context,
    shuffle,
    leftSelector,
    rightSelector,
    // backward compatible
    documentRef,
  } = {}) {
    const ctx = context ?? {};
    const selectors = ctx.selectors ?? {};
    this.shuffle = shuffle;
    this.document = ctx.document ?? documentRef ?? document;
    this.leftSelector = leftSelector ?? selectors.rollingLeft ?? "#rolling-left";
    this.rightSelector =
      rightSelector ?? selectors.rollingRight ?? "#rolling-right";
    this._lanes = [];
  }

  async start({ maxItems = 120 } = {}) {
    const all = await loadNewsData();
    const items = this.shuffle(all).slice(0, maxItems);

    const left = $(this.leftSelector, this.document);
    const right = $(this.rightSelector, this.document);
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
