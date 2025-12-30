// src/components/pressGrid.js
import { GRID_LIST } from "../lib/gridList";
import { gridCard } from "./gridCard";

export const pressGrid = () => {
  const nsSection = document.createElement("nsSection");
  nsSection.classList.add("ns-press-grid");
  nsSection.setAttribute("aria-label", "언론사 목록");

  const list = document.createElement("ul");
  list.classList.add("ns-press-grid__list");

  GRID_LIST.forEach((press) => {
    const { item } = gridCard(press);
    list.appendChild(item);
  });

  nsSection.appendChild(list);
  return { nsSection };
};
