import { createEl } from "../../lib/dom";
import { groupPressByCategory, PRESS_CATEGORIES } from "../../lib/pressData";
import { createIconButton, PLUS_ICON } from "../buttons";

/**
 * 리스트 컴포넌트 생성
 */
export const createList = () => {
  const categoryIdx = 0;
  let pressIdx = 0;
  const nsList = createEl("section", "ns-press-list border-default", "");
  nsList.classList.add("ns-press-list");
  nsList.setAttribute("aria-label", "언론사 목록");

  nsList.append(createListNav(PRESS_CATEGORIES));

  const listContentContainer = createEl(
    "div",
    "ns-press-list__content-container",
    "로딩중..."
  );
  nsList.append(listContentContainer);

  loadAndRenderPressList(listContentContainer, categoryIdx, pressIdx);

  return nsList;
};

const createListNav = (categories) => {
  const nav = createEl(
    "nav",
    "ns-press-list__nav",
    `<ul class="ns-press-list__nav-list surface-alt"></ul>`
  );
  const navList = nav.querySelector(".ns-press-list__nav-list");
  categories.forEach((category) => {
    navList.append(createNavItem(category));
  });

  return nav;
};

const createNavItem = (category) => {
  const navItem = createEl(
    "li",
    "ns-press-list__nav-item typo-available-medium14",
    category
  );
  return navItem;
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

const fetchPressData = (pressDataUrl) => {
  return fetch(pressDataUrl).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch press data");
    }
    return res.json();
  });
};

const loadAndRenderPressList = (container, categoryIdx, pressIdx) => {
  const category = PRESS_CATEGORIES[categoryIdx];
  return fetchPressData("/pressMockData.json")
    .then((data) => groupPressByCategory(data))
    .then((groupedData) => {
      container.replaceChildren(
        createListContent(groupedData[category].presses[pressIdx])
      );
    });
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
        <img src="https://www.moananursery.com/wp-content/uploads/2023/08/1920-x-1280-2.jpg" alt="메인뉴스이미지" class="ns-press-list__main-news-image" />
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
