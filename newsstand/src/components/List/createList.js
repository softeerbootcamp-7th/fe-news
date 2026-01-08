import { createEl } from "../../lib/dom";
import { ensureListPressData } from "../../lib/pressData";
import { store } from "../../state/store";
import { createIconButton, PLUS_ICON } from "../buttons";
import { paginateList } from "./paginateList";
// 처음 렌더링 되었을때 애니메이션 20초동안 넣어주면 된다
// 20초 후에 인덱스를 바꿔주는 함수 필요
/**
 * 리스트 컴포넌트 생성
 */
export const createList = () => {
  // 데이터를 아직 불러오지 않았다면 불러오기
  ensureListPressData();

  const nsList = createEl("section", "ns-press-list border-default", "");
  nsList.classList.add("ns-press-list");
  nsList.setAttribute("aria-label", "언론사 목록");

  const { isLoading } = store.getState();

  if (isLoading) {
    nsList.innerHTML = `<div class="loading-spinner">로딩중...</div>`;
    return nsList;
  }

  const { listNav, nowPress } = paginateList();
  nsList.append(listNav, createListContent(nowPress));

  return nsList;
};

const createListContent = (nowPress) => {
  const listContentWrapper = createEl(
    "div",
    "ns-press-list__content-wrapper",
    ""
  );

  listContentWrapper.innerHTML = createListContentMarkup(nowPress);

  return listContentWrapper;
};

const createListContentMarkup = (nowPress) => `
    <div class="ns-press-list__content-header">
      <img src="${
        nowPress.logo
      }" alt="뉴스아이콘" class="ns-press-list__content-header-icon" />
      <span class="typo-display-medium12 text-default">${new Date().getFullYear()}년 ${
  nowPress.time
}</span>
      ${createIconButton(
        PLUS_ICON,
        "ns-press-list__subscribe-button",
        "subscribe",
        "구독하기"
      )}
    </div>
    <div class="ns-press-list__content">
      <div class="ns-press-list__main-news">
        <img src="${
          nowPress.mainImg
        }" alt="메인뉴스이미지" class="ns-press-list__main-news-image" />
        <span class="ns-press-list__main-news-title text-strong typo-available-medium16">${
          nowPress.mainTitle
        }</span>
      </div>
      <ul class="ns-press-list__sub-news">
        ${nowPress.relatedArticles
          .map(
            (article) => `
          <li class="ns-press-list__sub-news-title typo-available-medium16 text-bold">
            <a href="${article.link}" class="article-link">${article.title}</a>
          </li>
        `
          )
          .join("")}
        <li class="ns-press-list__sub-news-edited typo-display-medium14">
          ${nowPress.press}에서 직접 편집한 뉴스입니다.
        </li>
      </ul>
    </div>
`;
