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

  toggle(newsId) {
    const subscriptions = this.get()
    
    if (subscriptions.has(newsId)) {
      subscriptions.delete(newsId)
    } else {
      subscriptions.add(newsId)
    }
    
    this.save(subscriptions)
    return subscriptions
  },

  isSubscribed(newsId) {
    return this.get().has(newsId)
  },

  clear() {
    localStorage.removeItem(SUBSCRIPTION_KEY)
    this.cache = null
  }
}
