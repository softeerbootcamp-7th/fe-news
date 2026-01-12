const SUBSCRIPTION_KEY = 'subscribed_news'

export const subscription = {
  cache: null,

  load() {
    const data = localStorage.getItem(SUBSCRIPTION_KEY)
    return new Set(data ? JSON.parse(data) : [])
  },

  save(subscriptionSet) {
    localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify([...subscriptionSet]))
  },

  get() {
    if (!this.cache) {
      this.cache = this.load()
    }
    return this.cache
  },

  toggle(pressId) {
    const subscriptions = this.get()
    
    if (subscriptions.has(pressId)) {
      subscriptions.delete(pressId)
    } else {
      subscriptions.add(pressId)
    }
    
    this.save(subscriptions)
    return subscriptions
  },

  isSubscribed(pressId) {
    return this.get().has(pressId)
  },

  clear() {
    localStorage.removeItem(SUBSCRIPTION_KEY)
    this.cache = null
  }
}
