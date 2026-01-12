import { LIST_VIEW_INITIAL_STATE } from '@/constants';
import { Subject } from '@/libs';

class ListViewStore extends Subject {
  constructor(initialState = LIST_VIEW_INITIAL_STATE) {
    super(initialState);
  }

  setCategory(category) {
    this.setState({
      ...this.getState(),
      category,
    });
  }

  setPageIndex(pageIndex) {
    this.setState({
      ...this.getState(),
      pageIndex,
    });
  }

  setTotalPage(totalPage) {
    this.setState({
      ...this.getState(),
      totalPage,
    });
  }

  setPageIndexAndTotalPage(pageIndex, totalPage) {
    this.setState({
      ...this.getState(),
      pageIndex,
      totalPage,
    });
  }
}

export const listViewStore = new ListViewStore();
