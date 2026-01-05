// 구독중인 언론사(png 명 저장) 리스트를 로컬 스토리지의 subscribed-press-list에 저장해 두고 가져온다
//localStorage.setItem("subscribed-press-list", ["hi", "hello "]);

let subscribedPressList = localStorage.getItem("subscribed-press-list");

console.log(subscribedPressList);
subscribedPressList =
  subscribedPressList !== null ? subscribedPressList.split(",") : [];

// 구독중인 언론사 개수 표시하는 배지
const badge = document.querySelector("#badge");
badge.textContent = subscribedPressList.length;

// 최대 4페이지까지만 가능
const MAX_PAGES = 4;
const TOTAL_LOGOS = 90;
const PAGE_SIZE = 24;

// 로고 이미지들 저장되어 있는 기본 위치 경로
const BASE_PATH = "/images/logos/light-mode/";

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
      subscribeBtn.textContent = "구독하기";
      cell.appendChild(img);
      cell.appendChild(subscribeBtn);
    } else {
      // 더이상 언론사 없으면 그냥 빈 칸 만들어 지도록
    }

    gridEl.appendChild(cell);
  }

  updateArrows();
}

export default function initGridView() {
  initPages();
  renderGrid(currentPage);
}
