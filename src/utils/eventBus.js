class EventBus {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);

    return () => {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    };
  }

  publish(event, data) {
    if (!this.events[event]) {
      return;
    }

    this.events[event].forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error(`[EventBus] Error in ${event} handler:`, error);
      }
    });
  }

  once(event, callback) {
    const unsubscribe = this.subscribe(event, (data) => {
      callback(data);
      unsubscribe();
    });
    return unsubscribe;
  }

  clear() {
    this.events = {};
  }

  clearEvent(event) {
    if (this.events[event]) {
      delete this.events[event];
    }
  }
}

export const eventBus = new EventBus();

export const EVENTS = {
  FILTER_CHANGED: "filter:changed",

  VIEW_CHANGED: "view:changed",

  PAGE_CHANGED: "page:changed",

  SUBSCRIBE_ADDED: "subscribe:added",
  SUBSCRIBE_REMOVED: "subscribe:removed",

  CATEGORY_CHANGED: "category:changed",

  STATE_UPDATED: "state:updated",

  RENDER_REQUESTED: "render:requested",

  AUTO_PAGE_START: "autoPage:start",
  AUTO_PAGE_STOP: "autoPage:stop",
  AUTO_PAGE_RESTART: "autoPage:restart",
};
