export const TAB_GROUP = Object.freeze({
  PRESS_MODE: "pressMode",
  VIEW_MODE: "viewMode",
});

export const TAB_VALUE = Object.freeze({
  ALL: "all",
  SUBSCRIBED: "subscribed",
  LIST: "list",
  GRID: "grid",
});

export const TAB_LABELS = Object.freeze({
  [TAB_VALUE.ALL]: "전체 언론사",
  [TAB_VALUE.SUBSCRIBED]: "내가 구독한 언론사",
  [TAB_VALUE.LIST]: "리스트",
  [TAB_VALUE.GRID]: "그리드",
});

export const TAB_TYPE = Object.freeze({
  TEXT: "text",
  ICON: "icon",
});

export const ICON_TYPE = Object.freeze({
  PLUS: "plus",
  CLOSED: "closed",
});

export const PRESS_MODE_TABS = [TAB_VALUE.ALL, TAB_VALUE.SUBSCRIBED];
export const VIEW_MODE_TABS = [TAB_VALUE.LIST, TAB_VALUE.GRID];
export const VIEW_MODE_ICONS = ["list-view", "grid-view"];
export const BUTTON_ICONS = [ICON_TYPE.PLUS, ICON_TYPE.CLOSED];
