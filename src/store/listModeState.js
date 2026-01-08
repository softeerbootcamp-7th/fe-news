// 리스트뷰 보기에서 화면에서 필요한 정보들 담아둔 state
const listModeState = {
  // 카테고리 별로 언론사 데이터 리스트 분리해둔 맵객체
  pressDataByCtg: {},
  selectedCtg: "매거진/전문지", // 현재 선택중인 카테고리 분야
  showingPressIdx: 0, // 카테고리 내에서 보고있는 언론사의 idx
};

export function getListModeState() {
  return listModeState;
}

// 현재 보여져야 할 신문데이터 정보 반환하는 함수
export function getShowingPressData() {
  const { pressDataByCtg, selectedCtg, showingPressIdx } = listModeState;
  return pressDataByCtg[selectedCtg]?.[showingPressIdx] ?? null;
}

// 해당 카테고리의 전체 신문사 갯수 반환하는 함수
export function getPressCntByCtg(category) {
  return listModeState.pressDataByCtg[category].length;
}

// 전체 카테고리 종류 리스트 반환하는 함수(이름순서대로 정렬해서)
export function getCategoryList() {
  return Object.keys(listModeState.pressDataByCtg).sort();
}
export function setPressDataByCtg(pressDataByCtg) {
  listModeState.pressDataByCtg = pressDataByCtg;
}

export function addPressDataToPressDataByCtg(pressData) {
  const temp = listModeState.pressDataByCtg[pressData.category] ?? [];
  temp.push(pressData);
  listModeState.pressDataByCtg[pressData.category] = temp;
}
export function setSelectedCtg(selectedCtg) {
  listModeState.selectedCtg = selectedCtg;
}
export function setShowingPressIdx(showingPressIdx) {
  listModeState.showingPressIdx = showingPressIdx;
}
