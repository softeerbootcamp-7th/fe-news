import { Subject } from '@/libs';

const INITIAL_SUBSCRIBED_NEWSPAPER_STATE = {
  newspaperMap: new Map(),
};

/**
 * @typedef {import('../../types').Newspaper} Newspaper
 */
class SubscribedNewspaperStore extends Subject {
  constructor(initialState = INITIAL_SUBSCRIBED_NEWSPAPER_STATE) {
    super(initialState);
  }

  /**
   * @param {Newspaper} newspaper
   */
  subscribeNewspaper(newspaper) {
    const newNewspaperMap = new Map(this.getState().newspaperMap);
    newNewspaperMap.set(newspaper.press, newspaper);
    this.setState({
      ...this.getState(),
      newspaperMap: newNewspaperMap,
    });
  }

  /**
   * @param {Newspaper['press']} newspaperPress
   */
  unsubscribeNewspaper(newspaperPress) {
    const newNewspaperMap = new Map(this.getState().newspaperMap);
    newNewspaperMap.delete(newspaperPress);
    this.setState({
      ...this.getState(),
      newspaperMap: newNewspaperMap,
    });
  }

  /**
   * @param {Newspaper['press']} newspaperPress
   */
  isSubscribed(newspaperPress) {
    return this.getState().newspaperMap.has(newspaperPress);
  }

  /**
   * @returns {number}
   */
  getSubscribedNewsNumber() {
    return this.getState().newspaperMap.size;
  }

  /**
   *
   * @returns {Newspaper[]}
   */
  getSubscribedNewspaperList() {
    return Array.from(this.getState().newspaperMap.values());
  }
}

export const subscribedNewspaperStore = new SubscribedNewspaperStore();
