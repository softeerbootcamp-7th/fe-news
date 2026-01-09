// src/components/pressGrid.js
import { createEl } from "../../lib/dom";
import { createGridCardList } from "./createGridCard";
import { paginateGrid } from "./paginateGrid";

export const createGrid = () => {
  const nsGrid = createEl(
    "section",
    "ns-press-grid border-default",
    `
      <ul class="ns-press-grid__list"></ul>
    `
  );
  nsGrid.classList.add("ns-press-grid");
  nsGrid.setAttribute("aria-label", "언론사 목록");

  const { paginatedGridList, gridNav } = paginateGrid();

  const list = nsGrid.querySelector(".ns-press-grid__list");
  list.append(...createGridCardList(paginatedGridList));

  nsGrid.append(list, gridNav);

  return nsGrid;
};
