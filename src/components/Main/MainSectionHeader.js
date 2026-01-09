import "./MainSectionHeader.css";
import { ListViewIcon } from "../icons/ListViewIcon";
import { GridViewIcon } from "../icons/GridViewIcon";
import { store } from "../../store";
import { makeNode } from "../../utils/utils";
import { cleanupEventListenerMap } from "../../infrastructure/domObserver";

export function MainSectionHeader() {
  const $el = makeNode(`
    <header class="grid-section-header"></header>
          `);
  const $subscribeBtns = makeNode(
    `<div class="subscribe-toggle-buttons"></div>`
  );
  const $viewBtns = makeNode(`<div class="view-toggle-buttons"></div>`);

  const $viewAllBtn = makeNode(`<a class="subscribe-toggle">전체 언론사</a>`);
  const $viewOnlySubBtn = makeNode(`<div class="subscribe-toggle-wrapper">
                <a class="subscribe-toggle">내가 구독한 언론사</a>
              </div>`);
  const $subsNumBadge = makeNode(`<span class="badge">0</span>`);
  $viewOnlySubBtn.appendChild($subsNumBadge);
  const $viewListBtn = makeNode(
    `<a class="view-toggle" data-view=list>${ListViewIcon()}</a>`
  );
  const $viewGridBtn = makeNode(
    `<a class="view-toggle" data-view=grid>${GridViewIcon()}</a>`
  );

  $viewAllBtn.onclick = () => store.setViewOnlySubs(false);
  $viewOnlySubBtn.onclick = () => store.setViewOnlySubs(true);
  $viewListBtn.onclick = () => store.setViewGrid(false);
  $viewGridBtn.onclick = () => store.setViewGrid(true);

  $subscribeBtns.append($viewAllBtn, $viewOnlySubBtn);
  $viewBtns.append($viewListBtn, $viewGridBtn);
  $el.append($subscribeBtns, $viewBtns);

  const updateSubsToggle = () => {
    const { viewOnlySubs } = store.state;
    $viewAllBtn.classList.toggle("is-active", !viewOnlySubs);
    const $targetA = $viewOnlySubBtn.querySelector("a");
    if ($targetA) {
      $targetA.classList.toggle("is-active", viewOnlySubs);
    }
    $subsNumBadge.classList.toggle("is-active", viewOnlySubs);
  };

  const updateViewToggle = () => {
    const { viewGrid } = store.state;

    $viewListBtn.classList.toggle("is-active", !viewGrid);
    $viewGridBtn.classList.toggle("is-active", viewGrid);
  };

  const updateBadgeNum = () => {
    const { subscribedIds } = store.state;
    $subsNumBadge.textContent = Array.from(subscribedIds).length;
  };

  window.addEventListener("viewOnlySubsChange", updateSubsToggle);
  window.addEventListener("viewGridChange", updateViewToggle);
  window.addEventListener("subsListChange", updateBadgeNum);

  cleanupEventListenerMap.set($el, () => {
    window.removeEventListener("viewOnlySubsChange", updateSubsToggle);
    window.removeEventListener("viewGridChange", updateViewToggle);
    window.removeEventListener("subsListChange", updateBadgeNum);
  });

  updateSubsToggle();
  updateViewToggle();
  updateBadgeNum();
  return $el;
}
