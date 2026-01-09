import { SELECTORS } from "../../../shared/const/index.js";
import { $ } from "../../../shared/lib/index.js";
import { RollingLane } from "../components/RollingLane.js";
import { ensurePressData } from "../../../shared/lib/index.js";
import { extractHeadlinesFromPressData } from "../lib/extractHeadlinesFromPressData.js";

export class NewsRollingController {
  constructor({
    context,
    shuffle,
    leftSelector = SELECTORS.rollingLeft,
    rightSelector = SELECTORS.rollingRight,
  } = {}) {
    const ctx = context ?? {};
    this.shuffle = shuffle;
    this.document = ctx.document ?? document;
    this.window = ctx.window ?? window;

    this.leftSelector = leftSelector;
    this.rightSelector = rightSelector;
    this._lanes = [];
  }

  async start({ maxItems = 120 } = {}) {
    const data = await ensurePressData();
    const all = extractHeadlinesFromPressData(data?.items ?? []);
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
