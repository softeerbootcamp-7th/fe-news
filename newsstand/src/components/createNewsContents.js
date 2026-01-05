import { createEl, render } from "../lib/dom";
import { store } from "../state/store";
import { createControls } from "./createControls";
import { createGrid } from "./createGrid";

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
  frag.append(createControls(), createGrid(state));
  return frag;
};
