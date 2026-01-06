import { getViewTab } from "@/store/viewTab";
import { VIEW_TAB } from "@/types/constant";
import { initGridView } from "./grid";
import { initListView } from "./list";
import { observeViewTabStore, setViewTab } from "../../store/viewTab";

export function initPressView() {
  // 그리드/리스트 뷰 조정
  const [listViewButton, gridViewButton] =
    document.querySelectorAll(".view-toggle");

  gridViewButton.addEventListener("click", () => {
    gridViewButton.classList.add("selected");
    listViewButton.classList.remove("selected");
    setViewTab(VIEW_TAB.GRID);
  });
  listViewButton.addEventListener("click", () => {
    listViewButton.classList.add("selected");
    gridViewButton.classList.remove("selected");
    setViewTab(VIEW_TAB.LIST);
  });

  // 그리드/리스트 뷰에 따라 업데이트
  updateViewTab();
  observeViewTabStore(() => {
    updateViewTab();
  });
}

function updateViewTab() {
  const viewTab = getViewTab();
  switch (viewTab) {
    case VIEW_TAB.GRID:
      initGridView();
      break;
    case VIEW_TAB.LIST:
      initListView();
      break;
  }
}
