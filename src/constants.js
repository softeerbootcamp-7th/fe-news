export const STORE_KEY = Object.freeze({
  PRESS_MODE: "press-mode",
  VIEW_MODE: "view-mode",
});

export const TAB_VALUE = Object.freeze({
  ALL: "all",
  SUBSCRIBED: "subscribed",
  LIST: "list",
  GRID: "grid",
});

export const TAB_TYPE = Object.freeze({
  TEXT: "text",
  ICON: "icon",
});

export const PRESS_MODE_TABS = [TAB_VALUE.ALL, TAB_VALUE.SUBSCRIBED];
export const VIEW_MODE_TABS = [TAB_VALUE.LIST, TAB_VALUE.GRID];
export const VIEW_MODE_ICONS = ["list-view", "grid-view"];
