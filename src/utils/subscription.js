const SUBSCRIPTION_KEY = 'subscribed_news'

let subscriptionCache = null

function loadSubscriptions() {
  const data = localStorage.getItem(SUBSCRIPTION_KEY)
  return new Set(data ? JSON.parse(data) : [])
}

function saveSubscriptions(subscriptionSet) {
  localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify([...subscriptionSet]))
}

export function getSubscriptions() {
  if (!subscriptionCache) {
    subscriptionCache = loadSubscriptions()
  }
  return subscriptionCache
}

export function toggleSubscription(newsId) {
  const subscriptions = getSubscriptions()
  
  if (subscriptions.has(newsId)) {
    subscriptions.delete(newsId)
  } else {
    subscriptions.add(newsId)
  }
  
  saveSubscriptions(subscriptions)
  return subscriptions
}

export function isSubscribed(newsId) {
  return getSubscriptions().has(newsId)
}

export function clearSubscriptions() {
  localStorage.removeItem(SUBSCRIPTION_KEY)
  subscriptionCache = null
}
