import { createEl } from "../lib/dom";
import { createHeader } from "./createHeader";
import { createNewsContents } from "./createNewsContents";
import { createRolling } from "./createRolling";

export const createPage = () => {
  const main = createEl("div", "ns-main-container");
  main.append(createHeader(), createRolling(), createNewsContents());
  return main;
};
