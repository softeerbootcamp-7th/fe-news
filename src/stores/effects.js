import { ACTION } from '../constants/constants.js'

const SUBSCRIPTION_KEY = 'subscribed_news'

function loadSubscriptionsFromStorage() {
  const data = localStorage.getItem(SUBSCRIPTION_KEY)
  return new Set(data ? JSON.parse(data) : [])
}

function syncSubscriptionsToStorage(state) {
  const ids = Array.from(state.user.subscribedIds || new Set())
  localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(ids))
}

export function setupSubscriptionSync(store) {
  // 초기 로드
  const savedSubscriptions = loadSubscriptionsFromStorage()
  store.dispatch({
    type: ACTION.SET_SUBSCRIPTIONS,
    payload: savedSubscriptions,
  })

  // 변경 감시 및 동기화
  store.subscribe((state, action) => {
    if (
      action.type === ACTION.TOGGLE_SUBSCRIPTION ||
      action.type === ACTION.SET_SUBSCRIPTIONS
    ) {
      syncSubscriptionsToStorage(state)
    }
  })
}
