import { SELECTORS } from "../shared/const/index.js";

export function createAppContext({
  documentRef = document,
  windowRef = window,
  selectors = SELECTORS,
} = {}) {
  return {
    document: documentRef,
    window: windowRef,
    selectors,
  };
}
