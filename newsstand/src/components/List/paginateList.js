import { store, actions } from "../../state/store";
import { PRESS_CATEGORIES } from "../../lib/pressData";
import { createEl } from "../../lib/dom.js";
import { createAutoPager } from "./createAutoPager.js";
import { animateProgressBar } from "../../lib/animation.js";

const LIST_DELAY_MS = 20000;

export const paginateList = () => {
  const state = store.getState();
  const { listCategoryIdx, listPressIdx, listPressData } = state;
  const nowPress =
    listPressData[PRESS_CATEGORIES[listCategoryIdx]].presses[listPressIdx];
  const currentCategory = PRESS_CATEGORIES[listCategoryIdx];
  const totalPresses = listPressData[currentCategory].presses.length;

  const autoPager = createAutoPager({ actions, intervalMs: LIST_DELAY_MS });
  autoPager.start();

  return {
    listNav: createListNav(currentCategory, totalPresses, autoPager),
    nowPress,
    autoPager,
  };
};

const createListNav = (currentCategory, totalPresses, autoPager) => {
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
      createNavItem(idx, category === currentCategory, totalPresses, autoPager)
    );
  });

  const btnPrev = nav.querySelector('button[data-nav="prev"]');
  const btnNext = nav.querySelector('button[data-nav="next"]');

  btnPrev.addEventListener("click", () => {
    autoPager.stop();
    actions.setPrev();
  });

  btnNext.addEventListener("click", () => {
    autoPager.stop();
    actions.setNext();
  });

  return nav;
};

const createNavItem = (categoryIdx, isActive, totalPresses, autoPager) => {
  const category = PRESS_CATEGORIES[categoryIdx];
  const navItem = createEl(
    "li",
    `ns-press-list__nav-item typo-available-medium14 ${
      isActive && "surface-brand-alt"
    }`,
    `<span>${category}</span>`
  );

  if (isActive) {
    navItem.innerHTML = activeNavItemMarkup(
      category,
      store.getState().listPressIdx,
      totalPresses
    );
    navItem.classList.add("ns-press-list__nav-item--active");
    animateProgressBar({
      el: navItem.querySelector(".ns-press-list__nav-item--active-bar"),
      duration: LIST_DELAY_MS,
    });
  }

  navItem.addEventListener("click", () => {
    autoPager.stop();
    actions.setCategory(categoryIdx);
  });
  return navItem;
};

const activeNavItemMarkup = (category, listPressIdx, totalPresses) => `
  <span class="ns-press-list__nav-item--active-bar surface-brand-default" aria-hidden="true"></span>
  <span class="text-white-default position-relative typo-selected-bold14">${category}</span>
  <span class="ns-press-list__nav-item--active-indicator position-relative typo-display-bold12">
    <p class="text-white-default">${listPressIdx + 1}</p>
    <p class="text-white-weak">/</p>
    <p class="text-white-weak">${totalPresses}</p>
  </span>
`;
