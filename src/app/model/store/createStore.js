export function createStore(initialState) {
  let state = initialState;
  const listeners = new Set();

  function getState() {
    return state;
  }

  function setState(updater) {
    const next =
      typeof updater === "function" ? updater(state) : { ...state, ...updater };
    if (!next || next === state) {
      state = next ?? state;
      return;
    }
    state = next;
    for (const listener of listeners) listener(state);
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  return { getState, setState, subscribe };
}
