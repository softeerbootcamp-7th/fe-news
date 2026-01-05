// 구독중인 언론사(png 명 저장) 리스트를 로컬 스토리지의 subscribed-press-list에 저장해 두고 가져온다
//localStorage.setItem("subscribed-press-list", ["hi", "hello "]);

let subscribedPressList = [];
let subscribedPressData = localStorage.getItem("subscribed-press-list");

console.log(subscribedPressData);
subscribedPressList =
  subscribedPressData === null || subscribedPressData === ""
    ? []
    : subscribedPressData.split(",");

console.log(subscribedPressList);

// 구독중인 언론사 개수 표시하는 배지
const badge = document.querySelector("#badge");
badge.addEventListener("click", () => {
  console.log(subscribedPressList);
});
badge.textContent = subscribedPressList.length;

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

// 로고 이미지명들은 아래와 같은 규칙 가지고 있음
// asset ${n} 1.png -> (n은 1부터 90까지)
// 따라서 이런 문자열 만들고 최종 이미지 경로 텍스트 리스트를 반환하는 함수 만듦
function buildLogoImgPaths() {
  return Array.from({ length: TOTAL_LOGOS }, (x, i) => {
    const n = i + 1;
    return `${BASE_PATH}asset ${n} 1.png`;
  });
}

// 그리드 영역 요소 잡기
const gridEl = document.getElementById("grid-view");

// 현재 몇번째 페이지 보고 있는지
let currentPage = 0;
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

function initPages() {
  const logoImgPathList = buildLogoImgPaths();

  // 최대 4페이지(=96개)까지만 사용
  const limit = Math.min(logoImgPathList.length, PAGE_SIZE * MAX_PAGES);

  pages = cutLstToMtrx(logoImgPathList, 24);

  currentPage = 0;
}

//화면에 그리기
function renderGrid(pageIndex) {
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
      subscribeBtn.id = `${src.split("/").at(-1)}_btn`;
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

  updateArrows();
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

export default function initGridView() {
  initPages();
  renderGrid(currentPage);
}
