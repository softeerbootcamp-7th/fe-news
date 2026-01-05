export function createStore(initialState) {
  let state = initialState;
  const listeners = new Set();

  const getState = () => state;

  const setState = (updater) => {
    const prev = state;
    const next =
      typeof updater === "function" ? updater(prev) : { ...prev, ...updater };

    if (Object.is(prev, next)) return;
    state = next;
    listeners.forEach((fn) => fn(state, prev));
  };

  const subscribe = (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  };

  return {
    getState,
    setState,
    subscribe,
  };
}
