import { createEl } from "../../lib/dom";
import { getGridData } from "../../lib/pressData";
import { actions, store } from "../../state/store";

const PRESS_PER_PAGE = 24;

export const paginateGrid = () => {
  const state = store.getState();
  const gridList =
    state.tab === "all" ? getGridData() : state.subscribedPresses;

  const totalPages = Math.max(
    1,
    Math.min(4, Math.ceil(gridList.length / PRESS_PER_PAGE))
  );
  const currentPage = Math.min(Math.max(state.page || 1, 1), totalPages);
  const start = (currentPage - 1) * PRESS_PER_PAGE;
  const end = start + PRESS_PER_PAGE;

  return {
    paginatedGridList: gridList.slice(start, end),
    gridNav: createGridNav(currentPage, totalPages),
  };
};

const createGridNav = (page, totalPages) => {
  const nav = createEl(
    "nav",
    "ns-grid-nav",

    `${
      page !== 1
        ? `<button class="ns-grid-nav__btn grid__left" data-nav="prev" aria-label="이전 페이지">
        <svg width="26" height="41" viewBox="0 0 26 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24.781 0.384155L0.781006 20.3842L24.781 40.3842" stroke="#6E8091"/>
        </svg>
      </button>`
        : ""
    }
     ${
       page !== totalPages
         ? `<button class="ns-grid-nav__btn grid__right" data-nav="next" aria-label="다음 페이지">
        <svg width="26" height="41" viewBox="0 0 26 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.320068 40.3842L24.3201 20.3842L0.320068 0.384155" stroke="#6E8091"/>
        </svg>
      </button>`
         : ""
     }`
  );
  nav.setAttribute("aria-label", "그리드뷰 네비게이션");

  nav.addEventListener("click", (e) => {
    const navBtn = e.target.closest("button[data-nav]");
    if (navBtn) {
      const dir = navBtn.dataset.nav;
      actions.setPage(dir === "prev" ? page - 1 : page + 1, totalPages);
    }
  });

  return nav;
};
