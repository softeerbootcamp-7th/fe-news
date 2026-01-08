import { NEWSLIST_CATEGORIES } from "../const/index.js";

const runtime = {
  dataPromise: null,
  items: [],
  byPress: new Map(),
  byCategory: new Map(),
  categoryOrder: [],
  pressList: [],
};

function buildCategoryOrder(byCategory) {
  return [
    ...NEWSLIST_CATEGORIES.filter((name) => byCategory.has(name)),
    ...[...byCategory.keys()].filter(
      (name) => !NEWSLIST_CATEGORIES.includes(name)
    ),
  ];
}

function buildPressList(byPress) {
  return [...byPress.entries()].map(([press, item]) => ({
    press,
    logo: item?.logo ?? "",
  }));
}

export function normalizePressLogo(logoUrl, theme) {
  if (!logoUrl) return "";
  if (theme === "dark") {
    return logoUrl.replace("/light/", "/dark/");
  }
  if (theme === "light") {
    return logoUrl.replace("/dark/", "/light/");
  }
  return logoUrl;
}

export function ensurePressData({
  fetchFn = fetch,
  url = "./mockData/pressData.json",
} = {}) {
  if (runtime.dataPromise) return runtime.dataPromise;
  runtime.dataPromise = fetchFn(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to load pressData.json: ${res.status}`);
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
        if (press && !byPress.has(press)) {
          byPress.set(press, item);
        }
      }

      runtime.items = rows;
      runtime.byCategory = byCategory;
      runtime.byPress = byPress;
      runtime.categoryOrder = buildCategoryOrder(byCategory);
      runtime.pressList = buildPressList(byPress);
      return {
        items: runtime.items,
        byCategory,
        byPress,
        categoryOrder: runtime.categoryOrder,
        pressList: runtime.pressList,
      };
    })
    .catch((error) => {
      console.error(error);
      runtime.items = [];
      runtime.byCategory = new Map();
      runtime.byPress = new Map();
      runtime.categoryOrder = [];
      runtime.pressList = [];
      return {
        items: runtime.items,
        byCategory: runtime.byCategory,
        byPress: runtime.byPress,
        categoryOrder: runtime.categoryOrder,
        pressList: runtime.pressList,
      };
    });
  return runtime.dataPromise;
}

export function getCategoryMeta(category) {
  const items = runtime.byCategory.get(category) ?? [];
  return { items, total: items.length };
}

export function getCategoryOrder() {
  return runtime.categoryOrder ?? [];
}

export function getPressItem(press) {
  return runtime.byPress.get(press);
}

export function getAllItems() {
  return runtime.items ?? [];
}

export function getPressList() {
  return runtime.pressList ?? [];
}
