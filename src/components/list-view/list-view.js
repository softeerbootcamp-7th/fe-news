import { Observer } from '@/libs';
import {
  createListViewFactory,
  listViewEventHandler,
  listViewStore,
  subscribedNewspaperStore,
} from '@/models';
import { subscribeButtonTemplate } from '@/templates';
/**
 * @typedef {import('../../types').Newspaper} Newspaper
 *
 * @typedef {Object} ListViewParams
 * @property {Map<Newspaper['category'], Newspaper[]>} categoryNewspaperMap
 */
export const ListView = ({ categoryNewspaperMap }) => {
  const { createListView, initializeListView } = createListViewFactory();
  let cleanup = null;

  const { handleClick } = listViewEventHandler({ categoryNewspaperMap });

  const $listView = createListView();
  $listView.addEventListener('click', handleClick);
  const { category, pageIndex } = listViewStore.getState();
  const newspaperList = categoryNewspaperMap.get(category);
  const totalPage = newspaperList.length - 1;
  listViewStore.setTotalPage(totalPage);

  initializeListView({
    $listView,
    category,
    pageIndex,
    totalPage,
    newspaperList,
  });

  const updateListView = async () => {
    const { category, pageIndex, totalPage } = listViewStore.getState();
    const newspaperList = categoryNewspaperMap.get(category);

    $listView.innerHTML = '';
    initializeListView({
      $listView,
      category,
      pageIndex,
      totalPage,
      newspaperList,
    });
  };

  const updateListViewBySubscription = () => {
    const $unsubscribeButton = document.querySelector('.unsubscribe-button');
    if (!$unsubscribeButton) {
      return;
    }
    $unsubscribeButton.remove();
    const $listViewHeader = document.querySelector(
      '.news-list-view__newspaper-section__header',
    );
    $listViewHeader.insertAdjacentHTML('beforeend', subscribeButtonTemplate());
  };

  const observer = new Observer(updateListView);
  const subscribedNewspaperObserver = new Observer(
    updateListViewBySubscription,
  );
  listViewStore.subscribe(observer);
  subscribedNewspaperStore.subscribe(subscribedNewspaperObserver);

  cleanup = () => {
    $listView.removeEventListener('click', handleClick);
    listViewStore.unsubscribe(observer);
  };

  return {
    cleanup,
  };
};
