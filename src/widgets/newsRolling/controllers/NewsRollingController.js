import { $, extractHeadlinesFromNewsJson } from "../../../shared/lib/index.js";
import { RollingLane } from "../components/RollingLane.js";

export class NewsRollingController {
  constructor({
    context,
    shuffle,
    leftSelector,
    rightSelector,
    documentRef,
    windowRef,
  } = {}) {
    const ctx = context ?? {};
    const selectors = ctx.selectors ?? {};
    this.shuffle = shuffle;
    this.document = ctx.document ?? documentRef ?? document;
    this.window = ctx.window ?? windowRef ?? window;

    this.leftSelector =
      leftSelector ?? selectors.rollingLeft ?? "#rolling-left";
    this.rightSelector =
      rightSelector ?? selectors.rollingRight ?? "#rolling-right";
    this._lanes = [];
  }

  async start({ maxItems = 120 } = {}) {
    const res = await fetch("/mockData/news.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load news.json: ${res.status}`);
    const json = await res.json();
    const all = extractHeadlinesFromNewsJson(json);
    const items = this.shuffle(all).slice(0, maxItems);

    const left = $(this.leftSelector, this.document);
    const right = $(this.rightSelector, this.document);
    if (!left || !right) return;

    const mid = Math.floor(items.length / 2) || 1;

    const laneL = new RollingLane(left, items.slice(0, mid), {
      intervalMs: 5000,
      initialDelayMs: 0,
      windowRef: this.window,
    });
    const laneR = new RollingLane(right, items.slice(mid), {
      intervalMs: 5000,
      initialDelayMs: 1000,
      windowRef: this.window,
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
