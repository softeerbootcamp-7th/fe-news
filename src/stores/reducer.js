import { ACTION, TAB, VIEW_MODE } from '../constants/constants.js'

export const initialState = {
  ui: {
    tab: TAB.ALL,
    view: VIEW_MODE.GRID,
    page: 1,
    gridPageLimit: 4,
    latestSize: 10,
  },

  user: {
    subscribedIds: new Set(),
  },

  data: {
    presses: [],
  },
}

export function reducer(state, action) {
  switch (action.type) {
    case ACTION.SET_VIEW: {
      const view = action.payload
      return {
        ...state,
        ui: { ...state.ui, view, page: 1 },
      }
    }

    case ACTION.SET_TAB: {
      const tab = action.payload
      return {
        ...state,
        ui: { ...state.ui, tab, page: 1 },
      }
    }

    case ACTION.SET_PAGE: {
      const page = action.payload
      return {
        ...state,
        ui: { ...state.ui, page },
      }
    }

    case ACTION.FETCH_PRESSES: {
      const presses = action.payload ?? []
      return {
        ...state,
        data: { ...state.data, presses },
      }
    }

    case ACTION.SET_SUBSCRIPTIONS: {
      const set =
        action.payload instanceof Set
          ? action.payload
          : new Set(action.payload ?? [])
      return {
        ...state,
        user: { ...state.user, subscribedIds: set },
      }
    }

    case ACTION.TOGGLE_SUBSCRIPTION: {
      const pressId = action.payload
      const next = new Set(state.user.subscribedIds)
      if (next.has(pressId)) next.delete(pressId)
      else next.add(pressId)

      return {
        ...state,
        user: { ...state.user, subscribedIds: next },
      }
    }

    default:
      return state
  }
}
