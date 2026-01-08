import {
  addPressDataToPressDataByCtg,
  getCategoryList,
  getListModeState,
  getShowingPressData,
  setSelectedCtg,
} from "../store/listModeState";
import { escapeAttr, escapeHtml } from "../utils/escapeAttr";

export function initListModeState() {
  fetch("/data/news-detail.mok.json")
    .then((res) => res.json())
    .then((data) =>
      data.forEach((pressData) => {
        addPressDataToPressDataByCtg(pressData);
      })
    )
    .then(() => {
      // 상단바에 뜰 카테고리 종류 리스트
      const categoryList = getCategoryList();
      // 선택되어 있는 카테고리 정보는 카테고리 리스트의 맨 첫번째 거
      setSelectedCtg(categoryList[0]);
      renderListView();
    });
}

export function initListView() {
  initListModeState();
  bindListViewEvents();
}

// 리스트 뷰 내 요소들에 리스너 붙이는 작업
function bindListViewEvents() {
  const listViewEl = document.querySelector("#list-view");
  // 바뀌지 않는 요소(list-view 요소)에 리스너 단다. 그 요소 내부에 있는 것들은 innerHtml바뀌면서 돔에서 사라졌다가 생겼다 하지만 그 상위 list-view 요소는 그대로 남아 있음
  listViewEl.addEventListener("click", (e) => {
    console.log(bindListViewEvents);
    const categoryBtn = e.target.closest(".category-btn");
    if (!categoryBtn) return; // 클릭된게 카테고리 버튼이 아니면 리스너 그냥 종료
    // 선택된 카테고리 버튼 내용으로 현재 선택된 카테고리 state정보 변경
    setSelectedCtg(categoryBtn.textContent);
    renderListView();
  });
}

function renderListView() {
  console.log("hi");
  const listViewEl = document.querySelector("#list-view");
  const listModeState = getListModeState();
  // 상단바에 뜰 카테고리 종류 리스트
  const categoryList = getCategoryList();

  // 현재 리스트뷰 영역내에 메인으로 보여져야할 언론사 정보 가져오기
  const showingPressData = getShowingPressData();

  // 미구독 중이면 구독하기 버튼 나와야 하고
  // 구독중이면 해지하는 x버튼 나와야 함
  const subscribeBtn = ``;

  listViewEl.innerHTML = `
    <div id="field-tab">
      ${categoryList
        .map(
          (c) => `
          <button
            class="category-btn available-medium14 clean-button ${
              c === listModeState.selectedCtg ? "is-active" : ""
            }"
            data-action="change-category"
            data-category="${escapeAttr(c)}"
            aria-pressed="${c === listModeState.selectedCtg}"
          >${escapeHtml(c)}</button>
        `
        )
        .join("")}
    </div>

    <div id="press-news">
      <div id="press-info">
        <img src="${escapeAttr(
          showingPressData.logo
        )}" alt="" id="press-mark" />
        <span class="display-medium12" id="edit-date">${escapeHtml(
          showingPressData.time
        )}</span>
        <button
                class="subscribe-btn"
                type="button"
                id="${showingPressData.press}"
                data-press-id="${showingPressData.press}"
                data-action="toggle-subscribe"
            >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">\
<path d="M9.5 6.49899H6.5V9.49899H5.5V6.49899H2.5V5.49899H5.5V2.49899H6.5V5.49899H9.5V6.49899Z" fill="#4B5966"/>\
</svg>
                <span class="subscribe-info-txt">
                구독하기
                </span>
        </button>
        
      </div>

      <div id="news">
        <article id="main-article" data-action="open-main">
          <img src="${escapeAttr(
            showingPressData.mainImg
          )}" alt="" id="main-news-thumbnail" />
          <a href=${escapeAttr(
            showingPressData.mainLink
          )} class="available-medium16" id="main-news-title">${escapeHtml(
    showingPressData.mainTitle
  )}</a>
        </article>

        <div id="sub-article">
          <ul id="sub-news-list">
            ${showingPressData.relatedArticles
              .map(
                (subArticle, idx) => `
                <a href=${escapeAttr(subArticle.link)}>
                <li class="available-medium16" data-index="${idx}">
                  ${escapeHtml(subArticle.title)}
                </li>
              </a>`
              )
              .join("")}
          </ul>

          <p class="caption display-medium14">
            언론사에서 직접 편집한 뉴스입니다
          </p>
        </div>
      </div>
    </div>
  `;
}
