import { createEl, render } from "../lib/dom";
import { store } from "../state/store";
import { createControls } from "./createControls";
import { createGrid } from "./Grid/createGrid";
import { createList } from "./List/createList";

export const createNewsContents = () => {
  const contentWrapper = createEl("div", "", "");
  contentWrapper.id = "content-wrapper";
  const state = store.getState();

  // 현재 뷰 컴포넌트 변수
  let currentViewComponent = null;

  const renderContents = (newState) => {
    if (currentViewComponent && currentViewComponent._cleanup) {
      currentViewComponent._cleanup();
    }

    const viewComponent =
      newState.view === "grid" ? createGrid() : createList();
    currentViewComponent = viewComponent;

    const frag = document.createDocumentFragment();
    frag.append(createControls(), viewComponent);
    return frag;
  };

  render(contentWrapper, () => renderContents(state));

  const unsubscribe = store.subscribe(() => {
    const newState = store.getState();
    render(contentWrapper, () => renderContents(newState));
  });

  contentWrapper._cleanup = () => {
    if (currentViewComponent && currentViewComponent._cleanup) {
      currentViewComponent._cleanup();
    }
    unsubscribe();
  };

  return contentWrapper;
};
