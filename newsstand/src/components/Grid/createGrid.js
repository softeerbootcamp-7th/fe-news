// src/components/pressGrid.js
import { createEl } from "../../lib/dom";
import { getGridData } from "../../lib/pressData";
import { actions } from "../../state/store";
import { createGridCardList } from "./createGridCard";

export const createGrid = (state) => {
  const gridList =
    state.tab === "all" ? getGridData() : state.subscribedPresses;

  // Pagination logic
  const totalPages = Math.max(1, Math.min(4, Math.ceil(gridList.length / 24)));
  const currentPage = Math.min(Math.max(state.page || 1, 1), totalPages);
  const start = (currentPage - 1) * 24;
  const end = start + 24;
  const paginatedGridList = gridList.slice(start, end);

  const nsGrid = createEl(
    "section",
    "ns-press-grid border-default",
    `
      <ul class="ns-press-grid__list"></ul>
    `
  );
  nsGrid.classList.add("ns-press-grid");
  nsGrid.setAttribute("aria-label", "언론사 목록");

  const list = nsGrid.querySelector(".ns-press-grid__list");
  list.append(...createGridCardList(paginatedGridList));

  nsGrid.append(list, createGridNav(currentPage, totalPages));

  // Navigation event listener
  nsGrid.addEventListener("click", (e) => {
    const navBtn = e.target.closest("button[data-nav]");
    if (navBtn) {
      const dir = navBtn.dataset.nav;
      actions.setPage(
        dir === "prev" ? currentPage - 1 : currentPage + 1,
        totalPages
      );
    }
  });
  return nsGrid;
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

  return nav;
};
