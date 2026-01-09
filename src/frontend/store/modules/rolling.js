import { parseRollingDataFromEagerData } from '../../utils/eagerDataParser.js';

// Prefix (lowercase)
const PREFIX = 'rolling';

// Action Types
const SET_NEWS_LIST = `${PREFIX}/SET_NEWS_LIST`;
const UPDATE_NEWS_LIST = `${PREFIX}/UPDATE_NEWS_LIST`;

// Action Creators
export const setNewsList = (newsList) => ({ type: SET_NEWS_LIST, payload: newsList });
export const updateNewsList = (newsList) => ({ type: UPDATE_NEWS_LIST, payload: newsList });

// Initial State
const getInitialState = () => {
  try {
    const newsList = parseRollingDataFromEagerData();
    return {
      newsList,
      isLoading: false,
    };
  } catch (error) {
    console.error(`Error parsing window["EAGER-DATA"] in ${PREFIX} reducer:`, error);
    return {
      newsList: [],
      isLoading: false,
    };
  }
};

const initialState = getInitialState();

// Selectors
export const selectors = {
  getNewsList: (state) => state.newsList || [],
  getNewsCount: (state) => (state.newsList || []).length,
  isLoading: (state) => state.isLoading || false,
};

// Reducer
export default function rollingReducer(state = initialState, action) {
  if (!action || !action.type) {
    return state;
  }

  const { type, payload } = action;

  switch (type) {
    case SET_NEWS_LIST:
      return { ...state, newsList: payload || [] };
    case UPDATE_NEWS_LIST:
      return { ...state, newsList: payload || [] };
    default:
      return state;
  }
}

