import "./GridSection.css";
import { PressLogo } from "./PressLogo";
import { store } from "../../../store/index";
import { makeNode } from "../../../utils/utils";

export function GridSection() {
  const $el = makeNode(`<div class="grid-section"></div>`);

  const reRender = () => {
    const { viewOnlySubs, subscribedIds, currentPage, shuffledPressList } =
      store.state;

    const finalPressList = viewOnlySubs
      ? [...shuffledPressList].filter((p) => subscribedIds.has(p.id))
      : [...shuffledPressList];
    const maxPage = parseInt(finalPressList.length / 24);
    const blankCount = 24 - (finalPressList.length % 24);

    $el.innerHTML = ""; //기존 요소 모두 삭제

    finalPressList
      .slice(currentPage * 24, (currentPage + 1) * 24)
      .forEach((press) => $el.appendChild(PressLogo(press)));

    if (currentPage == maxPage)
      Array.from({
        length: blankCount,
      }).forEach(() => $el.appendChild(PressLogo())); // placeholder
  };
  window.addEventListener("viewOnlySubsChange", reRender);
  window.addEventListener("pageChange", reRender);
  window.addEventListener("subsListChange", reRender);

  reRender();
  return $el;
}
