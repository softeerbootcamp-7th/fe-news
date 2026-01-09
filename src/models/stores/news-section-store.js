import { NEWS_SECTION_STATE } from '@/constants';
import { Subject } from '@/libs';
/**
 * @typedef {import('../types').NewsSectionState} NewsSectionState
 * @type {NewsSectionState}
 */
const INITIAL_NEWS_SECTION_STATE = {
  type: NEWS_SECTION_STATE.TYPE.TOTAL,
  view: NEWS_SECTION_STATE.VIEW.GRID,
};
class NewsSectionStore extends Subject {
  constructor(initialState = INITIAL_NEWS_SECTION_STATE) {
    super(initialState);
  }

  /**
   * @param {NewsSectionState['type']} type
   */
  setType(type) {
    this.setState({
      ...this.getState(),
      type,
    });
  }

  /**
   *
   * @param {NewsSectionState['view']} view
   */
  setView(view) {
    this.setState({
      ...this.getState(),
      view,
    });
  }
}

export const newsSectionStore = new NewsSectionStore();
