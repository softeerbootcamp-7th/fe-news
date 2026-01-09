import "./MainContent.css";
import { store } from "../../store";
import { makeNode } from "../../utils/utils";

import { MainSectionHeader } from "./MainSectionHeader";
import { Alert } from "../Shared/Alert";
import { Prev } from "../icons/Previous";
import { Next } from "../icons/Next";
import { GridSection } from "./Grid/GridSection";
import { ListSection } from "./List/ListSection";
import { cleanupEventListenerMap } from "../../infrastructure/domObserver";

export function MainContents() {
  const $el = makeNode(`
        <main class="main-section">
        </main>
    `);

  const $contentWrapper = makeNode(`
    <div class="main-contents">
        </div>`);
  const $pagePrev = makeNode(`
            <button class="nav-button prev">
            ${Prev()}
            </button>`);
  const $pageNext = makeNode(`
            <button class="nav-button next">
            ${Next()}
            </button>`);

  $pagePrev.onclick = () => {
    const { viewGrid } = store.state;
    if (viewGrid) store.setPage(-1);
    else {
      store.setListViewPage(-1);
    }
  };
  $pageNext.onclick = () => {
    const { viewGrid } = store.state;
    if (viewGrid) store.setPage(1);
    else {
      store.setListViewPage(1);
    }
  };

  $contentWrapper.append(Alert(), $pagePrev, GridSection(), $pageNext);

  const freePageLock = () => {
    $pagePrev.classList.remove("disabled");
    $pageNext.classList.remove("disabled");
  };
  const render = () => {
    const { viewGrid, currentPage, maxPage } = store.state;
    const $newContent = viewGrid ? GridSection() : ListSection();
    const $oldContent =
      $contentWrapper.querySelector(".grid-section, .list-section") ||
      GridSection();

    if (viewGrid) {
      if (currentPage === 0) $pagePrev.classList.add("disabled");
      else $pagePrev.classList.remove("disabled");
      if (currentPage === maxPage) $pageNext.classList.add("disabled");
      else $pageNext.classList.remove("disabled");
    } else {
      freePageLock();
    }

    $contentWrapper.replaceChild($newContent, $oldContent);
  };

  $el.appendChild(MainSectionHeader());
  $el.appendChild($contentWrapper);

  window.addEventListener("pageChange", render);
  window.addEventListener("viewGridChange", render);
  window.addEventListener("viewOnlySubsChange", render);

  cleanupEventListenerMap.set($el, () => {
    window.removeEventListener("pageChange", render);
    window.removeEventListener("viewGridChange", render);
    window.removeEventListener("viewOnlySubsChange", render);
  });

  render();
  return $el;
}
