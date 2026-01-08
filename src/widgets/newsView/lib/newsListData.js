import { shuffle } from "../../../shared/lib/index.js";
import { NEWSLIST_CATEGORIES } from "../../../shared/const/index.js";

const runtime = {
  dataPromise: null,
  byCategory: new Map(),
  byPress: new Map(),
  allItems: [],
  categoryOrder: [],
};

function buildCategoryOrder(byCategory) {
  return [
    ...NEWSLIST_CATEGORIES.filter((name) => byCategory.has(name)),
    ...[...byCategory.keys()].filter(
      (name) => !NEWSLIST_CATEGORIES.includes(name)
    ),
  ];
}

export function ensureNewsData({ fetchFn = fetch } = {}) {
  if (runtime.dataPromise) return runtime.dataPromise;
  runtime.dataPromise = fetchFn("./mockData/news.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to load news.json: ${res.status}`);
      }
      return res.json();
    })
    .then((rows) => {
      const byCategory = new Map();
      const byPress = new Map();
      for (const item of rows) {
        const category = String(item.category || "").trim();
        if (!byCategory.has(category)) byCategory.set(category, []);
        byCategory.get(category).push(item);
        const press = String(item.press || "").trim();
        if (press) byPress.set(press, item);
      }

      for (const [category, items] of byCategory) {
        byCategory.set(category, shuffle(items));
      }

      runtime.byCategory = byCategory;
      runtime.byPress = byPress;
      runtime.allItems = rows;
      runtime.categoryOrder = buildCategoryOrder(byCategory);
      return {
        byCategory,
        byPress,
        allItems: rows,
        categoryOrder: runtime.categoryOrder,
      };
    })
    .catch((error) => {
      console.error(error);
      runtime.byCategory = new Map();
      runtime.byPress = new Map();
      runtime.allItems = [];
      runtime.categoryOrder = [];
      return {
        byCategory: runtime.byCategory,
        byPress: runtime.byPress,
        allItems: runtime.allItems,
        categoryOrder: runtime.categoryOrder,
      };
    });
  return runtime.dataPromise;
}

export function getCategoryOrder() {
  return runtime.categoryOrder ?? [];
}

export function getCategoryMeta(category) {
  const items = runtime.byCategory.get(category) ?? [];
  return { items, total: items.length };
}

export function getPressItem(press) {
  return runtime.byPress.get(press);
}

export function getAllItems() {
  return runtime.allItems ?? [];
}
