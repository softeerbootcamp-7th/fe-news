// 구독중인 언론사(png 명 저장) 리스트를 로컬 스토리지의 subscribed-press-list에 저장해 두고 가져온다
//localStorage.setItem("subscribed-press-list", ["hi", "hello "]);

let subscribedPressList = [];
let subscribedPressData = localStorage.getItem("subscribed-press-list");

subscribedPressList =
  subscribedPressData === null || subscribedPressData === ""
    ? []
    : subscribedPressData.split(",");

// 구독중인 언론사 개수 표시하는 배지
const badge = document.querySelector("#badge");
badge.addEventListener("click", () => {
  console.log(subscribedPressList);
});
// 구독중인 언론사 수
badge.textContent = subscribedPressList.length;

// 언론사 선택 탭 바 영역
const tabButtonbar = document.querySelector("#tab-button-bar");
// 탭 바 영역에 이벤트 헨들러 달고 이벤트 전이 이용
tabButtonbar.addEventListener("click", (e) => {
  // 버튼 요소를 눌렀을 때만 이벤트 실행되도록 제어
  if (e.target.className.includes("tab-button")) {
    console.log("include tab bottu");
    // 사용자가 누른게 '구독한 언론사' 탭이고, 현재 보여지고 있던게 '전체 언론사 탭'이었다면
    if (
      e.target.id === SUBSCRIBED_PRESS_TAB_ID &&
      selectedTabElId === ALL_PRESS_TAB_ID
    ) {
      console.log("to subscrived press tab");
      // 구독한 언론사만 그리드에 보여지는 로직 실행
      makePageMtrx(true);
      selectedTabElId = SUBSCRIBED_PRESS_TAB_ID;
    } else if (
      // 사용자가 누른게 전체 언론사 탭'이고, 현재 보여지고 있던게 '구독한 언론사' 탭이었다면
      e.target.id === ALL_PRESS_TAB_ID &&
      selectedTabElId === SUBSCRIBED_PRESS_TAB_ID
    ) {
      console.log("to app press tab");
      // 전체 언론사 그리드에 보여지는 로직 실행
      makePageMtrx(false);
      selectedTabElId = ALL_PRESS_TAB_ID;
    }

    renderGrid(pages, 0);
  }
});

// 전체언론사 선택 탭 요소
const ALL_PRESS_TAB_ID = "all-press-tab";
const SUBSCRIBED_PRESS_TAB_ID = "subscribed-press-tab";
const allPressTab = document.querySelector(`#${ALL_PRESS_TAB_ID}`);
// 내가 구독한 언론사 선택 탭 요소
const subscribedPressTab = document.querySelector(
  `#${SUBSCRIBED_PRESS_TAB_ID}`
);

// 현재 선택된 탭 요소 정보(탭 요소의 id)
// -> default는 전체 언론사 보기
let selectedTabElId = ALL_PRESS_TAB_ID;

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
const rightArrowEl = document.querySelector("#chevron-right");
const leftArrowEl = document.querySelector("#chevron-left");

// 로고 이미지명들은 아래와 같은 규칙 가지고 있음
// asset ${n} 1.png -> (n은 1부터 90까지)
// 따라서 이런 문자열 만들고 최종 이미지 경로 텍스트 리스트를 반환하는 함수 만듦
function buildLogoImgPaths() {
  return Array.from({ length: TOTAL_LOGOS }, (x, i) => {
    const n = i + 1;
    return `${BASE_PATH}asset ${n} 1.png`;
  });
}

// 구독중인 언론사 로고를 구독 순서대로 이미지 경로 텍스트 리스트 반환하는 함수
function buildSubscribedLogoImgPaths(subscribedPressList) {
  return Array.from(subscribedPressList, (x) => {
    return `${BASE_PATH}${x}`;
  });
}

// 그리드 영역 요소 잡기
const gridEl = document.getElementById("grid-view");

// 현재 몇번째 페이지 보고 있는지
let currentPageIdx = 0;

// 마지막 페이지의 idx
let lastPageIdx = 0;
// 2차원 배열  pages. 한 row 당 24개의 언론사(이미지 path) 가 들어간다
// n번째 row는 n 번째 페이지에 해당하는 언론사 로고 이미지 path 목록
let pages = [];

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
  let logoImgPathList = [];
  // 구독중인 애들만 보고 싶다면
  if (onlySubscribedPress) {
    logoImgPathList = buildSubscribedLogoImgPaths(subscribedPressList);
  } else {
    logoImgPathList = buildLogoImgPaths();
  }

  // 최대 4페이지(=96개)까지만 사용
  const limit = Math.min(logoImgPathList.length, PAGE_SIZE * MAX_PAGES);
  pages = cutLstToMtrx(logoImgPathList, 24);

  // 마지막 페이지 idx 를 계산해 저장
  lastPageIdx = pages.length - 1;

  currentPageIdx = 0;
}

//화면에 그리기
function renderGrid(pages, pageIndex) {
  // 현재 보고 있는 페이지 정보는 화면에 그려진 페이지 정보
  currentPageIdx = pageIndex;
  const items = pages[pageIndex] ?? [];
  gridEl.innerHTML = "";

  // 한 페이지는 항상 24칸
  for (let i = 0; i < PAGE_SIZE; i++) {
    const cell = document.createElement("div");
    cell.className = "press-logo";

    const src = items[i];
    if (src) {
      const img = document.createElement("img");
      img.id = src.split("/").at(-1);
      img.src = src;
      img.alt = "언론사 로고";
      const subscribeBtn = document.createElement("button");
      subscribeBtn.className = "subscribe-btn";
      subscribeBtn.type = "button";
      subscribeBtn.id = `${src.split("/").at(-1)}`;
      const plusIcon = document.createElement("svg");
      plusIcon.classList.add("subscribe-btn-icon");

      plusIcon.innerHTML = subscribedPressList.includes(subscribeBtn.id)
        ? CROSS_ICON_SVG
        : PLUS_ICON_SVG;

      const subscribeInfoTxt = document.createElement("span");
      subscribeInfoTxt.classList.add("subscribe-info-txt");
      subscribeInfoTxt.textContent = subscribedPressList.includes(
        subscribeBtn.id
      )
        ? UNSUBSCRIBE
        : SUBSCRIBE;

      subscribeBtn.appendChild(plusIcon);
      subscribeBtn.appendChild(subscribeInfoTxt);

      cell.appendChild(img);
      cell.appendChild(subscribeBtn);
    } else {
      // 더이상 언론사 없으면 그냥 빈 칸 만들어 지도록
    }

    gridEl.appendChild(cell);
  }

  checkArrowShow({ currentPageIdx: currentPageIdx, lastPageIdx: lastPageIdx });
}

function handleUnSubscribeBtn(clickedBtnEl) {
  // 구독목록에 있을 때만 구독 목록에서 빼기
  let idx = subscribedPressList.indexOf(clickedBtnEl.id);

  if (idx > -1) {
    subscribedPressList.splice(idx, 1);
    badge.textContent = subscribedPressList.length;
    localStorage.setItem("subscribed-press-list", subscribedPressList);
    const infoTxt = clickedBtnEl.querySelector(".subscribe-info-txt");
    infoTxt.textContent = SUBSCRIBE;
    const icon = clickedBtnEl.querySelector(".subscribe-btn-icon");
    icon.innerHTML = PLUS_ICON_SVG;
  }
}
function handleSubscribeBtn(clickedBtnEl) {
  // 구독목록에 없을 때만 구독 목록에 추가
  if (!subscribedPressList.includes(clickedBtnEl.id)) {
    subscribedPressList.push(clickedBtnEl.id);
    badge.textContent = subscribedPressList.length;
    localStorage.setItem("subscribed-press-list", subscribedPressList);
    const infoTxt = clickedBtnEl.querySelector(".subscribe-info-txt");
    infoTxt.textContent = UNSUBSCRIBE;
    const icon = clickedBtnEl.querySelector(".subscribe-btn-icon");
    icon.innerHTML = CROSS_ICON_SVG;
  } else {
    console.log("handleSubscribeBtn error");
  }
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
function checkArrowShow({ currentPageIdx, lastPageIdx }) {
  let leftFlag = 0;
  let rightFlag = 0;
  if (currentPageIdx > 0) {
    // 이전 페이지로 넘어갈 수 있다면
    leftFlag = 1;
  }
  if (lastPageIdx - currentPageIdx > 0) {
    // 다음 페이지로 넘어갈 수 있다면
    rightFlag = 1;
  } else {
  }
  if (leftFlag) {
    handleLeftArrowShow({ leftArrowEl: leftArrowEl, toggle: true });
  } else {
    handleLeftArrowShow({ leftArrowEl: leftArrowEl, toggle: false });
  }
  if (rightFlag) {
    handleRightArrowShow({ rightArrowEl: rightArrowEl, toggle: true });
  } else {
    handleRightArrowShow({ rightArrowEl: rightArrowEl, toggle: false });
  }
}

// 그리드 옆 왼쪽 화살표 눌렀을 때 불려지는 함수
function handleLeftArrowClick() {
  currentPageIdx -= 1;
  renderGrid(pages, currentPageIdx);
}

// 그리드 옆 오른쪽 화살표 눌렀을 때 불려지는 함수
function handleRightArrowClick() {
  console.log("handlerigt");
  currentPageIdx += 1;
  renderGrid(pages, currentPageIdx);
}

leftArrowEl.addEventListener("click", handleLeftArrowClick);
rightArrowEl.addEventListener("click", handleRightArrowClick);

export default function initGridView() {
  makePageMtrx();
  renderGrid(pages, currentPageIdx);
  checkArrowShow({ currentPageIdx: currentPageIdx, lastPageIdx: lastPageIdx });
}
