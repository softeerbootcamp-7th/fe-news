import { store, actions } from "../../state/store";
import { PRESS_CATEGORIES } from "../../lib/pressData";
import { createEl } from "../../lib/dom.js";

let timeoutId = null;
const LIST_DELAY_MS = 2000;

export const paginateList = () => {
  const state = store.getState();
  const { listCategoryIdx, listPressIdx, listPressData } = state;
  const nowPress =
    listPressData[PRESS_CATEGORIES[listCategoryIdx]].presses[listPressIdx];
  const currentCategory = PRESS_CATEGORIES[listCategoryIdx];
  const totalPresses = listPressData[currentCategory].presses.length;
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    actions.setListIdx(getNextIdx(listCategoryIdx, listPressIdx, totalPresses));
  }, LIST_DELAY_MS);

  return { listNav: createListNav(currentCategory, totalPresses), nowPress };
};

const createListNav = (currentCategory, totalPresses) => {
  const nav = createEl(
    "nav",
    "ns-press-list__nav",
    `<ul class="ns-press-list__nav-list surface-alt"></ul>
    <button class="ns-list-nav__btn grid__left" data-nav="prev" aria-label="이전 페이지">
        <svg width="26" height="41" viewBox="0 0 26 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24.781 0.384155L0.781006 20.3842L24.781 40.3842" stroke="#6E8091"/>
        </svg>
    </button>
    <button class="ns-list-nav__btn grid__right" data-nav="next" aria-label="다음 페이지">
        <svg width="26" height="41" viewBox="0 0 26 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.320068 40.3842L24.3201 20.3842L0.320068 0.384155" stroke="#6E8091"/>
        </svg>
    </button>
    `
  );
  const navList = nav.querySelector(".ns-press-list__nav-list");
  PRESS_CATEGORIES.forEach((category, idx) => {
    navList.append(
      createNavItem(category, category === currentCategory, totalPresses, idx)
    );
  });

  const btnPrev = nav.querySelector('button[data-nav="prev"]');
  const btnNext = nav.querySelector('button[data-nav="next"]');

  btnPrev.addEventListener("click", () => {
    clearTimeout(timeoutId);
    const { listCategoryIdx, listPressIdx } = store.getState();
    const { categoryIdx, pressIdx } = getPrevIdx(listCategoryIdx, listPressIdx);
    actions.setListIdx({ categoryIdx, pressIdx });
  });

  btnNext.addEventListener("click", () => {
    clearTimeout(timeoutId);
    const { listCategoryIdx, listPressIdx, listPressData } = store.getState();
    const totalLength =
      listPressData[PRESS_CATEGORIES[listCategoryIdx]].presses.length;
    const { categoryIdx, pressIdx } = getNextIdx(
      listCategoryIdx,
      listPressIdx,
      totalLength
    );
    actions.setListIdx({ categoryIdx, pressIdx });
  });

  return nav;
};

const createNavItem = (category, isActive, totalPresses, categoryIdx) => {
  const navItem = createEl(
    "li",
    "ns-press-list__nav-item typo-available-medium14",
    `${category}${
      isActive
        ? `<span class="ns-press-list__nav-item--active-indicator">${
            store.getState().listPressIdx + 1
          }/${totalPresses}</span>`
        : ""
    }`
  );

  navItem.addEventListener("click", () => {
    clearTimeout(timeoutId);
    actions.setListIdx({ categoryIdx, pressIdx: 0 });
  });
  return navItem;
};

const getNextIdx = (currentCategoryIdx, currentPressIdx, totalLength) => {
  if (currentPressIdx + 1 < totalLength) {
    return { categoryIdx: currentCategoryIdx, pressIdx: currentPressIdx + 1 };
  } else {
    const nextCategoryIdx = (currentCategoryIdx + 1) % PRESS_CATEGORIES.length;
    return { categoryIdx: nextCategoryIdx, pressIdx: 0 };
  }
};

const getPrevIdx = (currentCategoryIdx, currentPressIdx) => {
  if (currentPressIdx - 1 >= 0) {
    return { categoryIdx: currentCategoryIdx, pressIdx: currentPressIdx - 1 };
  } else {
    const prevCategoryIdx =
      (currentCategoryIdx - 1 + PRESS_CATEGORIES.length) %
      PRESS_CATEGORIES.length;
    const prevCategoryPressesLength =
      store.getState().listPressData[PRESS_CATEGORIES[prevCategoryIdx]].presses
        .length;
    return {
      categoryIdx: prevCategoryIdx,
      pressIdx: prevCategoryPressesLength - 1,
    };
  }
};
