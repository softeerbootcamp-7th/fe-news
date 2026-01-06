export function createAppContext({
  documentRef = document,
  windowRef = window,
} = {}) {
  return {
    document: documentRef,
    window: windowRef,
  };
}
