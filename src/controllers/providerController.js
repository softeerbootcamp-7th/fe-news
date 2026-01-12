export function initProviderController({ grid, list, navigation }) {
  let currentView = 'grid';

  function getActiveView() {
    return currentView === 'grid' ? grid : list;
  }

  function setView(view) {
    currentView = view;
    const state = getActiveView().render();
    navigation.update(state);
  }

  function goPrev() {
    const state = getActiveView().goPrev();
    if (state) navigation.update(state);
  }

  function goNext() {
    const state = getActiveView().goNext();
    if (state) navigation.update(state);
  }

  function setTab(tab) {
    const state = getActiveView().setTab(tab);
    navigation.update(state);
  }

  return {
    setView,
    goPrev,
    goNext,
    setTab,
    render() {
      navigation.update(getActiveView().render());
    },
  };
}
