export function createNavigationActions({
  gridViewActions,
  listViewActions,
  getView,
} = {}) {
  const prev = () => {
    if (getView() === "list") {
      listViewActions.prev();
    } else {
      gridViewActions.prev();
    }
  };

  const next = () => {
    if (getView() === "list") {
      listViewActions.next();
    } else {
      gridViewActions.next();
    }
  };

  return { prev, next };
}
