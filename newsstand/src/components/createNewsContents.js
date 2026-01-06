import { createEl, render } from "../lib/dom";
import { store } from "../state/store";
import { createControls } from "./createControls";
import { createGrid } from "./Grid/createGrid";
import { createList } from "./List/createList";

export const createNewsContents = () => {
  const contentWrapper = createEl("div", "", "");
  contentWrapper.id = "content-wrapper";
  const state = store.getState();
  render(contentWrapper, () => createContents(state));

  store.subscribe(() => {
    const newState = store.getState();
    render(contentWrapper, () => createContents(newState));
  });

  return contentWrapper;
};

const createContents = (state) => {
  const frag = document.createDocumentFragment();
  frag.append(
    createControls(),
    state.view === "grid" ? createGrid(state) : createList()
  );
  return frag;
};
