// 앱 전체에서 쓰는 상태 저장
const state = {
  viewMode: "grid", // 그리드 보기 or 리스트 보기  "grid" | "list"
  selectedTabId: "all-press-tab", // 전체 언론사보기 탭 or 구독중인 언론사 보기 탭 선택 요소의 id
  //  "all-press-tab" | "subscribed-press-tab"
  currentPageIdx: 0, // 그리드보기에서 현재 보고 있는 페이지 idx
  lastPageIdx: 0, // 그리드 보기에서 마지막 페이지 idx
  pages: [], // 그리드 보기에서 그리드 화면 구성에 사용되는 페이지 들
  subscribedList: [], // 구독중인 언론사 리스트(언론사 이미지 파일명이 들어감)
};

// 뷰(그리드, 리스트) 모드 set하는 함수
export function setViewMode(mode) {
  state.viewMode = mode;
}

export const getState = () => state;

export function setSubscribedList(list) {
  state.subscribedList = Array.isArray(list) ? list : [];
}

export function removeSubscribed(id) {
  state.subscribedList = state.subscribedList.filter((x) => x !== id);
}

export function addSubscribed(id) {
  if (!state.subscribedList.includes(id)) state.subscribedList.push(id);
}

export function setPages({ pages, lastPageIdx }) {
  state.pages = pages;
  state.lastPageIdx = lastPageIdx;
  state.currentPageIdx = 0;
}

export function setCurrentPageIdx(idx) {
  state.currentPageIdx = idx;
}

export function setSelectedTabId(id) {
  state.selectedTabId = id;
}
