// src/components/pressGrid.js
import { createEl } from "../lib/dom";
import { getGridData } from "../lib/pressData";
import { createGridCard } from "./createGridCard";

export const createGrid = () => {
  const gridList = getGridData();
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

  gridList.slice(0, 24).forEach((press) => {
    const item = createGridCard(press);
    list.appendChild(item);
  });

  nsGrid.appendChild(list);
  return nsGrid;
};
