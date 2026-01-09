import { reducer, initialState } from './reducer'

export const store = createStore({ reducer, preloadedState: initialState })

function createStore({ reducer, preloadedState }) {
  let state = preloadedState
  const listeners = new Set()

  function getState() {
    return state
  }

  function subscribe(listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  function dispatch(action) {
    const nextState = reducer(state, action)
    // 상태가 업데이트 되지 않은 경우
    if (Object.is(nextState, state)) return
    state = nextState
    listeners.forEach((l) => l(state, action))
  }

  return { getState, subscribe, dispatch }
}
