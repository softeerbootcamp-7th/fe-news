import { getState, setCurrentPageIdx, setLastPageIdx } from "../store/appState";
import {
  addPressDataToPressDataByCtg,
  getCategoryList,
  getListModeState,
  getPressCntByCtg,
  selectPressByCategoryAndIndex,
  setSelectedCtg,
} from "../store/listModeState";
import { escapeAttr, escapeHtml } from "../utils/escapeAttr";
import { handleRightArrowClick, renderArrowEls } from "./main-view";

export function initListModeState() {
  return fetch("/data/news-detail.mok.json")
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
    });
}

export function initListView() {
  initListModeState().then(() => {
    renderListView();
    bindListViewEvents();
  });
}

// 리스트 뷰 내 요소들에 리스너 붙이는 작업
function bindListViewEvents() {
  const listViewEl = document.querySelector("#list-view");
  // 바뀌지 않는 요소(list-view 요소)에 리스너 단다. 그 요소 내부에 있는 것들은 innerHtml바뀌면서 돔에서 사라졌다가 생겼다 하지만 그 상위 list-view 요소는 그대로 남아 있음
  listViewEl.addEventListener("click", onClickCategoryBtn);
  listViewEl.addEventListener("animationend", onProgressBoxAnimationEnd);
}
// 리스트 뷰 내 카테고리 버튼 내 차오르는 애니메이션 용도인 box에 에니메이션 끝났을 때
function onProgressBoxAnimationEnd(e) {
  const { selectedCtg } = getListModeState();
  const {
    viewMode,
    selectedTabId,
    currentPageIdx,
    lastPageIdx,
    pages,
    subscribedList,
  } = getState();
  const progressBoxEl = e.target.closest("#progress-box");
  if (!progressBoxEl) return; // 클릭된게 카테고리 버튼이 아니면 리스너 그냥 종료

  // 만약 해당 카테고리의 마지막 페이지여서 다음 카테고리로 넘어가야 한다면
  if (currentPageIdx === lastPageIdx) {
    const categoryList = getCategoryList();
    // 현재 보고있는 카테고리의 idx
    const currentCtgIdx = categoryList.indexOf(selectedCtg);
    // 현재 보고있는 카테고리가 마지막 카테고리라면 다시 처음 카테고리로 돌아가야함
    if (currentCtgIdx >= categoryList.length - 1) {
      setListModeStateToNextCtg(categoryList, -1);
    } else {
      // 다음 카테고리 관련 값으로 state 세팅
      setListModeStateToNextCtg(categoryList, currentCtgIdx);
    }
  } else {
    console.log("currentPageIdx !== lastPageIdx");
    // 카테고리 내 다음 페이지로 이동
    const nextPageIdx = currentPageIdx + 1;
    setCurrentPageIdx(nextPageIdx);
  }

  // 새로 세팅된 state 값 기준으로 다시 화면 렌더
  if (viewMode == "grid") renderGrid(nextPageIdx);
  else if (viewMode == "list") renderListView();
  renderArrowEls();
}

function setListModeStateToNextCtg(categoryList, currentCtgIdx) {
  const nextCtg = categoryList[currentCtgIdx + 1];
  setSelectedCtg(nextCtg);
  setLastPageIdx(getPressCntByCtg(nextCtg));
  setCurrentPageIdx(0);
}

function onClickCategoryBtn(e) {
  const { selectedCtg } = getListModeState();
  const categoryBtn = e.target.closest(".category-btn");
  if (!categoryBtn) return; // 클릭된게 카테고리 버튼이 아니면 리스너 그냥 종료
  // 선택된 카테고리 버튼 내용으로 현재 선택된 카테고리 state정보 변경
  const newSelectedCtg = categoryBtn.dataset.category;
  // 선택되어 있는 카테고리랑 새로 누릉 카테고리가 같은거라면 굳이 재랜더링 할 필요 없음
  if (selectedCtg == newSelectedCtg) return;
  setSelectedCtg(newSelectedCtg);
  // 현재 보고 있는 페이지 번호 0으로 설정
  setCurrentPageIdx(0);
  // 가장 마지막 페이지 idx는 현재 카테고리의 언론사 개수-1
  setLastPageIdx(getPressCntByCtg(newSelectedCtg) - 1);
  renderListView();
  renderArrowEls();
}

export function renderListView() {
  const listViewEl = document.querySelector("#list-view");
  const { pressDataByCtg, selectedCtg } = getListModeState();
  // 상단바에 뜰 카테고리 종류 리스트
  const categoryList = getCategoryList();

  const { currentPageIdx } = getState();

  // 현재 리스트뷰 영역내에 메인으로 보여져야할 언론사 정보 가져오기
  const showingPressData = selectPressByCategoryAndIndex(
    selectedCtg,
    currentPageIdx
  );

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
              c === selectedCtg ? "is-active" : ""
            }"
            data-action="change-category"
            data-category="${escapeAttr(c)}"
            aria-pressed="${c === selectedCtg}"
          >
          
          ${
            c === selectedCtg // 선택된 카테고리의 경우
              ? `
              <div id = 'progress-box'></div>
              <div id='category-info-wrap'>
              <span >
              ${escapeHtml(c)}
              </span >
              <div>
            ${
              currentPageIdx + 1
            } / <span id='press-total-cnt'>${getPressCntByCtg(c)}</span>
            </div>
            </div>
            `
              : escapeHtml(c)
          }</button>
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
          <a target='_blank' href=${escapeAttr(
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
                <a target='_blank' href=${escapeAttr(subArticle.link)}>
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
