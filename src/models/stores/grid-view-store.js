import { Subject } from '@/libs';

const GRID_VIEW_INITIAL_STATE = {
  totalGridViewPageIndex: 0,
  subscribedGridViewPageIndex: 0,
};

class GridViewStore extends Subject {
  constructor(initialState = GRID_VIEW_INITIAL_STATE) {
    super(initialState);
  }

  /**
   * @typedef {Object} GridViewPageIndex
   * @property {number?} totalGridViewPageIndex
   * @property {number?} subscribedGridViewPageIndex
   *
   * @param {GridViewPageIndex} pageIndex
   */
  setPageIndex(pageIndex) {
    this.setState({
      ...this.getState(),
      ...pageIndex,
    });
  }

  getTotalGridViewPageIndex() {
    return this.getState().totalGridViewPageIndex;
  }

  getSubscribedGridViewPageIndex() {
    return this.getState().subscribedGridViewPageIndex;
  }
}

export const gridViewStore = new GridViewStore();
