import { PRESS_CATEGORIES } from "./pressData";

export const getDate = () => {
  const weekdays = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const today = new Date();
  const formatted = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return `${formatted} ${weekdays[today.getDay()]}`;
};

// 구독한 언론사에 따라 필터링된 언론사 목록을 반환하는 함수
export const getVisiblePresses = (state, PRESS_LIST) => {
  const list =
    state.tab === "subscribed"
      ? PRESS_LIST.filter((press) => state.subscribedPresses.includes(press.id))
      : PRESS_LIST;
  return list;
};

export const loadJson = (url) => {
  return fetch(url).then((response) => response.json());
};

export const getNextIdx = (
  currentCategoryIdx,
  currentPressIdx,
  totalLength
) => {
  if (currentPressIdx + 1 < totalLength) {
    return { categoryIdx: currentCategoryIdx, pressIdx: currentPressIdx + 1 };
  } else {
    const nextCategoryIdx = (currentCategoryIdx + 1) % PRESS_CATEGORIES.length;
    return { categoryIdx: nextCategoryIdx, pressIdx: 0 };
  }
};

export const getPrevIdx = (currentCategoryIdx, currentPressIdx, listPressData) => {
  if (currentPressIdx - 1 >= 0) {
    return { categoryIdx: currentCategoryIdx, pressIdx: currentPressIdx - 1 };
  } else {
    const prevCategoryIdx =
      (currentCategoryIdx - 1 + PRESS_CATEGORIES.length) %
      PRESS_CATEGORIES.length;
    const prevCategoryPressesLength =
      listPressData[PRESS_CATEGORIES[prevCategoryIdx]].presses.length;
    return {
      categoryIdx: prevCategoryIdx,
      pressIdx: prevCategoryPressesLength - 1,
    };
  }
};
