import { Store } from './store.js';
import gridReducer from './modules/grid.js';
import rollingReducer from './modules/rolling.js';

// Root Reducer
function rootReducer(state, actionType, payload) {
  const action = typeof actionType === 'string' 
    ? { type: actionType, payload }
    : actionType || { type: '', payload: undefined };

  const gridState = gridReducer(state?.grid, action);
  const rollingState = rollingReducer(state?.rolling, action);

  return {
    grid: gridState,
    rolling: rollingState,
  };
}

const initialState = {
  grid: gridReducer(undefined, {}),
  rolling: rollingReducer(undefined, {}),
};

export const store = new Store(initialState, rootReducer);