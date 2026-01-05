import { SELECTORS } from "../data/selectors.js";

export function createAppContext({
  documentRef = document,
  windowRef = window,
  storageRef = window?.localStorage,
  selectors = SELECTORS,
} = {}) {
  return {
    document: documentRef,
    window: windowRef,
    storage: storageRef,
    selectors,
  };
}


