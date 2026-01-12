// 구독중인 언론사(png 명 저장) 리스트를 로컬 스토리지의 subscribed-press-list에 저장해 두고 가져온다
//localStorage.setItem("subscribed-press-list", ["hi", "hello "]);

import {
  addSubscribed,
  getCurrentPageIdx,
  getState,
  removeSubscribed,
  setCurrentPageIdx,
  setLastPageIdx,
  setPages,
  setSelectedTabId,
  setSubscribedList,
  setViewMode,
} from "../store/appState";
import { getCategoryList, getPressCntByCtg } from "../store/listModeState";
import shuffleArray from "../utils/shuffleArray";
import { renderListView } from "./list-view";

function loadSubscribedFromStorage() {
  const raw = localStorage.getItem("subscribed-press-list");
  if (!raw) return [];
  return raw.split(",").filter(Boolean);
}

function saveSubscribedToStorage(list) {
  localStorage.setItem("subscribed-press-list", list.join(","));
}

// 로컬스토리지에서 구독중인 언론사 정보 가져와 state 에 저장
setSubscribedList(loadSubscribedFromStorage());

// 구독중인 언론사 개수 표시하는 배지
const badge = document.querySelector("#badge");

function renderBadge() {
  const state = getState();
  badge.textContent = state.subscribedList.length;
}

const viewerButtonBar = document.querySelector("#viewer-button");
// 뷰 모드(그리드, 리스트) 선택 아이콘 클릭 시 이벤트 리스너
viewerButtonBar.addEventListener("click", (e) => {
  handleChangeViewMode(e);
});

function renderMainView() {
  const { viewMode } = getState();
  console.log("renderMainView viewMode =", viewMode);
  if (viewMode == "grid") showGridView();
  else if (viewMode == "list") showListView();
  const state = getState();
  renderArrowEls();
}

// 뷰 보기 모드(그리드 <-> 리스트) 변환 시 호출되는 함수
function handleChangeViewMode(e) {
  const { viewMode, currentPageIdx, lastPageIdx, pages } = getState();

  const el = e.target.closest("svg");
  if (!el) return;

  // 만약 현재 보기 모드랑 새로 누른 보기 모드랑 같으면 변화 필요 없기 때문에 함수 종료
  if (viewMode === el.dataset.viewMode) return;

  const newViewMode = el.dataset.viewMode;

  // 바뀐 뷰모드 state에 저장
  setViewMode(newViewMode);

  // 가장 처음 페이지 보일 수 있도록
  setCurrentPageIdx(0);

  if (newViewMode == "list") {
    setLastPageIdx(getPressCntByCtg(getCategoryList()[0]) - 1);
    renderListView();
    showListView();
  } else if (newViewMode == "grid") {
    setLastPageIdx(pages.length - 1);
    renderGrid(getCurrentPageIdx());
    showGridView();
  }

  // 양쪽 화살표 보여질지 결정
  renderArrowEls();

  // 아래는 아이콘 css 변경
  const iconBtns = viewerButtonBar.querySelectorAll(".view-type-icon");

  iconBtns.forEach((btn) => {
    btn.classList.remove("is-active-icon");
  });
  el.classList.add("is-active-icon");
}

function showGridView() {
  console.log("showGridView");
  const gridModeView = document.querySelector("#grid-view-wrapper");
  gridModeView.hidden = false;
  const listModeView = document.querySelector("#list-view");
  listModeView.hidden = true;
}
function showListView() {
  console.log("showListView");
  const gridModeView = document.querySelector("#grid-view-wrapper");
  gridModeView.hidden = true;
  const listModeView = document.querySelector("#list-view");
  listModeView.hidden = false;
}

// 언론사 선택 탭 바 영역
const tabButtonbar = document.querySelector("#tab-button-bar");
// 탭 바 영역에 이벤트 헨들러 달고 이벤트 전이 이용
tabButtonbar.addEventListener("click", (e) => {
  // 버튼 요소를 눌렀을 때만 이벤트 실행되도록 제어
  if (e.target.className.includes("tab-button")) {
    const state = getState();
    // 사용자가 누른게 '구독한 언론사' 탭이고, 현재 보여지고 있던게 '전체 언론사 탭'이었다면
    if (
      e.target.id === SUBSCRIBED_PRESS_TAB_ID &&
      state.selectedTabId === ALL_PRESS_TAB_ID
    ) {
      console.log("to subscrived press tab");
      // 구독한 언론사만 그리드에 보여지는 로직 실행
      makePageMtrx(true);
      setSelectedTabId(SUBSCRIBED_PRESS_TAB_ID);
    } else if (
      // 사용자가 누른게 전체 언론사 탭'이고, 현재 보여지고 있던게 '구독한 언론사' 탭이었다면
      e.target.id === ALL_PRESS_TAB_ID &&
      state.selectedTabId === SUBSCRIBED_PRESS_TAB_ID
    ) {
      console.log("to app press tab");
      // 전체 언론사 그리드에 보여지는 로직 실행
      makePageMtrx(false);
      setSelectedTabId(ALL_PRESS_TAB_ID);
    }

    const tabs = tabButtonbar.querySelectorAll(".tab-button");

    tabs.forEach((tab) => {
      tab.classList.remove("selected-bold16");
      tab.classList.add("available-medium16");
      tab.classList.remove("is-active-text");
    });
    e.target.classList.add("selected-bold16");
    e.target.classList.remove("available-medium16");
    e.target.classList.add("is-active-text");

    renderGrid(0);
    renderBadge();
    renderArrowEls();
  }
});

// 전체언론사 선택 탭 요소 id
const ALL_PRESS_TAB_ID = "all-press-tab";
const SUBSCRIBED_PRESS_TAB_ID = "subscribed-press-tab";
const allPressTab = document.querySelector(`#${ALL_PRESS_TAB_ID}`);
// 내가 구독한 언론사 선택 탭 요소
const subscribedPressTab = document.querySelector(
  `#${SUBSCRIBED_PRESS_TAB_ID}`
);

const unsubscribeAlertEl = document.querySelector("#unsubscribe-alert");
const alertPositiveBtn = document.querySelector("#unsubscribe-btn");
const alertNegativeBtn = document.querySelector("#close-btn");

function handleAlertPosiBtn() {
  const pressId = unsubscribeAlertEl.dataset.pressId;

  removeSubscribed(pressId);

  const state = getState();
  const { currentPageIdx, selectedTabId } = state;
  saveSubscribedToStorage(state.subscribedList);

  renderBadge();

  const clickedBtnEl = document.querySelector(
    `.subscribe-btn[data-press-id="${unsubscribeAlertEl.dataset.pressId}"]`
  );

  const infoTxt = clickedBtnEl.querySelector(".subscribe-info-txt");
  infoTxt.textContent = SUBSCRIBE;
  const icon = clickedBtnEl.querySelector(".subscribe-btn-icon");
  icon.innerHTML = PLUS_ICON_SVG;

  // 만약 현재 보고 있는 탭이 내가 구독한 언론사라면 구독 해제 하면 화면에 보여지는 구독 언론사 목록 그리드 내 요소들 바뀌어야 함
  console.log(selectedTabId);
  if (selectedTabId == SUBSCRIBED_PRESS_TAB_ID) {
    // 새로 업데이트된 구독 중 언론사 리스트 바탕으로 다시 페이지 구성
    makePageMtrx(true);
    console.log(state.pages);
    // 페이지 다시 구성했을 때 현재 보고 있던 페이지가 없어지고 그 이전 페이지로 넘어가야 한다면
    if (state.pages.length - 1 < currentPageIdx) currentPageIdx -= 1;
    renderGrid(currentPageIdx);
  }

  // 구독 해지 모달창 닫기
  closeAlert(unsubscribeAlertEl);
}
function handleAlertNegaBtn() {
  console.log("handleAlertNegaBtn");
  // 구독 해지 모달창 닫기
  closeAlert(unsubscribeAlertEl);
}
alertPositiveBtn.addEventListener("click", handleAlertPosiBtn);
alertNegativeBtn.addEventListener("click", handleAlertNegaBtn);

// showUnsubscribeAlrert : 구독해지 알림창 띄우는 함수
function showUnsubscribeAlert(unsubscribeAlertEl, pressName) {
  unsubscribeAlertEl.querySelector("span").textContent = pressName;
  showAlert(unsubscribeAlertEl);
}

// 알림창 띄우는 함수(=visibility : visible 로 만들어줌)
function showAlert(alertEl) {
  alertEl.style.visibility = "visible";
}

// 알림창 띄우는 함수(=visibility : visible 로 만들어줌)
function closeAlert(alertEl) {
  alertEl.style.visibility = "hidden";
}

// 최대 4페이지까지만 가능
const MAX_PAGES = 4;
const TOTAL_LOGOS = 90;
const PAGE_SIZE = 24;

// 로고 이미지들 저장되어 있는 기본 위치 경로
const BASE_PATH = "/images/logos/light-mode/";

// 버튼에 보여질 문구
const SUBSCRIBE = "구독하기";
const UNSUBSCRIBE = "해지하기";

// 구독/해제 버튼에 보여질 아이콘
const PLUS_ICON_SVG =
  '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">\
<path d="M9.5 6.49899H6.5V9.49899H5.5V6.49899H2.5V5.49899H5.5V2.49899H6.5V5.49899H9.5V6.49899Z" fill="#4B5966"/>\
</svg>';

const CROSS_ICON_SVG =
  '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">\
<path d="M3.6 9L3 8.4L5.4 6L3 3.6L3.6 3L6 5.4L8.4 3L9 3.6L6.6 6L9 8.4L8.4 9L6 6.6L3.6 9Z" fill="#4B5966"/>\
</svg>';

// 그리드 왼쪽, 오른쪽 화살표
let rightArrowEl = document.querySelector("#chevron-right");
let leftArrowEl = document.querySelector("#chevron-left");

// 로고 이미지명들은 아래와 같은 규칙 가지고 있음
// asset ${n} 1.png -> (n은 1부터 90까지)
// 따라서 이런 문자열 만들고 최종 이미지 경로 텍스트 리스트를 반환하는 함수 만듦
function buildLogoImgPaths() {
  let result = Array.from({ length: TOTAL_LOGOS }, (x, i) => {
    const n = i + 1;
    return `${BASE_PATH}asset ${n} 1.png`;
  });
  return shuffleArray(result);
}

// 구독중인 언론사 로고를 구독 순서대로 이미지 경로 텍스트 리스트 반환하는 함수
function buildSubscribedLogoImgPaths(subscribedPressList) {
  return Array.from(subscribedPressList, (x) => {
    return `${BASE_PATH}${x}`;
  });
}

// 그리드 영역 요소 잡기
const gridEl = document.getElementById("grid-view");

// arr 내부를 size 크기 만큼 잘라서 2차원 배열로 반환하는 함수
function cutLstToMtrx(arr, size) {
  const mtrx = [];
  for (let i = 0; i < arr.length; i += size) {
    mtrx.push(arr.slice(i, i + size));
  }
  return mtrx;
}

// 그리드 화면에 보여줄 언론사 로고 이미지들의 위치 정보 담는 리스트 불러와 24개씩 나눈 2차원 배열인 page에 저장하기
function makePageMtrx(onlySubscribedPress = false) {
  const state = getState();

  let logoImgPathList = onlySubscribedPress
    ? buildSubscribedLogoImgPaths(state.subscribedList)
    : buildLogoImgPaths();
  // 최대 4페이지(24*4=96요소) 까지만 가능. 그 이상 요소들은 자른다
  if (logoImgPathList.length > MAX_PAGES * PAGE_SIZE) {
    logoImgPathList = logoImgPathList.slice(0, MAX_PAGES * PAGE_SIZE);
  }

  const pages = cutLstToMtrx(logoImgPathList, PAGE_SIZE);
  setPages({ pages, lastPageIdx: pages.length - 1 });
}

//화면에 그리기

function renderGrid(pageIndex) {
  const state = getState();
  // 현재 보고 있는 페이지 정보는 화면에 그려진 페이지 정보
  setCurrentPageIdx(pageIndex);

  const items = state.pages[pageIndex] ?? [];
  gridEl.innerHTML = "";

  for (let i = 0; i < PAGE_SIZE; i++) {
    const cell = document.createElement("div");
    cell.className = "press-logo";

    const src = items[i];
    if (src) {
      const id = src.split("/").at(-1);

      const img = document.createElement("img");
      img.id = id;
      img.src = src;
      img.alt = "언론사 로고";

      const subscribeBtn = document.createElement("button");
      subscribeBtn.className = "subscribe-btn";
      subscribeBtn.type = "button";
      subscribeBtn.id = id;
      subscribeBtn.dataset.pressId = id;

      const isSubscribed = state.subscribedList.includes(id);

      const plusIcon = document.createElement("svg");
      plusIcon.classList.add("subscribe-btn-icon");
      plusIcon.innerHTML = isSubscribed ? CROSS_ICON_SVG : PLUS_ICON_SVG;

      const subscribeInfoTxt = document.createElement("span");
      subscribeInfoTxt.classList.add("subscribe-info-txt");
      subscribeInfoTxt.textContent = isSubscribed ? UNSUBSCRIBE : SUBSCRIBE;

      subscribeBtn.appendChild(plusIcon);
      subscribeBtn.appendChild(subscribeInfoTxt);

      cell.appendChild(img);
      cell.appendChild(subscribeBtn);
    }
    // 더이상 언론사 없으면 그냥 빈 칸 만들어 지도록
    gridEl.appendChild(cell);
  }
}

function handleUnSubscribeBtn(clickedBtnEl) {
  // 해지하고자 하는 언론사 정보(=언론사 이미지 파일명)를 alert창의 요소의 dataset에 저장해줘야함
  unsubscribeAlertEl.dataset.pressId = clickedBtnEl.id;
  // 구독 해지할거냐고 묻는 알림창 보이게
  showUnsubscribeAlert(unsubscribeAlertEl);
}
function handleSubscribeBtn(clickedBtnEl) {
  const id = clickedBtnEl.id;

  addSubscribed(id);

  const state = getState();
  saveSubscribedToStorage(state.subscribedList);

  renderBadge();

  // UI 즉시 반영(버튼 텍스트/아이콘)
  clickedBtnEl.querySelector(".subscribe-info-txt").textContent = UNSUBSCRIBE;
  clickedBtnEl.querySelector(".subscribe-btn-icon").innerHTML = CROSS_ICON_SVG;
}

// 이벤트 버블링 활용해 그리드 영역 내 언론사 구독 버튼에 '구독','해지' 함수 적용시키기
gridEl.addEventListener("click", (e) => {
  const clickedBtnEl = e.target.closest(".subscribe-btn");
  if (!clickedBtnEl) return;
  // 버튼의 상태 판단은 버튼 하위 자식인 .subscribe-info-txt" 태그 기준으로
  const label = clickedBtnEl.querySelector(".subscribe-info-txt")?.textContent;

  if (label === SUBSCRIBE) handleSubscribeBtn(clickedBtnEl);
  else if (label === UNSUBSCRIBE) handleUnSubscribeBtn(clickedBtnEl);
});

// 요소 보이게/안보이게 하는 함수
// 요소 el, ture/false : 보이게 안보이게
function handleElShow({ el, toggle }) {
  if (toggle) {
    el.style.visibility = "visible";
  } else {
    el.style.visibility = "hidden";
  }
}

// 왼쪽 화살표 보이게/안보이게 하는 함수
function handleLeftArrowShow({ leftArrowEl, toggle }) {
  if (toggle) {
    handleElShow({ el: leftArrowEl, toggle: true });
  } else {
    handleElShow({ el: leftArrowEl, toggle: false });
  }
}
// 오른쪽 화살표 보이게/안보이게 하는 함수
function handleRightArrowShow({ rightArrowEl, toggle }) {
  if (toggle) {
    handleElShow({ el: rightArrowEl, toggle: true });
  } else {
    handleElShow({ el: rightArrowEl, toggle: false });
  }
}

// 현재 페이지 넘버에 따라 왼쪽, 오른쪽 화살표 보여지게/안보여지게 컨트롤 하는 함수
// currentPageIdx: 현재 페이지 idx, lastPageIdx: 마지막 페이지 idx
export function renderArrowEls() {
  const state = getState();
  const { currentPageIdx, lastPageIdx } = state;

  handleLeftArrowShow({ leftArrowEl, toggle: currentPageIdx > 0 });
  handleRightArrowShow({
    rightArrowEl,
    toggle: lastPageIdx - currentPageIdx > 0,
  });
}

// 그리드 옆 왼쪽 화살표 눌렀을 때 불려지는 함수
export function handleLeftArrowClick() {
  const state = getState();
  const { currentPageIdx, viewMode } = state;
  const nextPageIdx = currentPageIdx - 1;
  setCurrentPageIdx(nextPageIdx);
  if (viewMode == "grid") renderGrid(nextPageIdx);
  else if (viewMode == "list") renderListView();
  renderArrowEls();
}

// 그리드 옆 오른쪽 화살표 눌렀을 때 불려지는 함수
export function handleRightArrowClick() {
  const state = getState();
  const { currentPageIdx, viewMode } = state;

  const nextPageIdx = currentPageIdx + 1;
  setCurrentPageIdx(nextPageIdx);
  if (viewMode == "grid") renderGrid(nextPageIdx);
  else if (viewMode == "list") renderListView();
  renderArrowEls();
}

leftArrowEl.addEventListener("click", handleLeftArrowClick);
rightArrowEl.addEventListener("click", handleRightArrowClick);

export default function initGridView() {
  // 로컬 스토리지에서 데이터 가져와 state에 저장
  setSubscribedList(loadSubscribedFromStorage());
  makePageMtrx();
  renderGrid(0);
  renderMainView();
  renderBadge();
  renderArrowEls();
}
