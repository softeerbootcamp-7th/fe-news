import { createEl } from "../lib/dom";
import { createControls } from "./createControls";
import { createGrid } from "./createGrid";

export const createNewsContents = () => {
  const contentWrapper = createEl("div", "", "");
  contentWrapper.id = "content-wrapper";

  contentWrapper.append(createControls(), createGrid());

  return contentWrapper;
};
