import { NEWS_CATEGORY } from '@/constants';
import {
  listViewStore,
  subscribedNewspaperStore,
  unsubscriptionModalStore,
} from '@/models';
import { unsubscribeButtonTemplate } from '@/templates';

export const listViewEventHandler = ({ categoryNewspaperMap }) => {
  const handleClick = (event) => {
    const { target } = event;
    const { pageIndex, totalPage, category } = listViewStore.getState();
    if (target.closest('.news-list-view__left-arrow')) {
      if (pageIndex === 0) {
        let categoryIndex = Object.values(NEWS_CATEGORY).indexOf(category);
        if (categoryIndex === 0) {
          categoryIndex = Object.values(NEWS_CATEGORY).length - 1;
        } else {
          categoryIndex--;
        }
        const newCategory = Object.values(NEWS_CATEGORY)[categoryIndex];
        listViewStore.setState({
          ...listViewStore.getState(),
          category: newCategory,
          pageIndex: 0,
          totalPage: categoryNewspaperMap.get(newCategory).length - 1,
        });
        return;
      }
      listViewStore.setPageIndex(pageIndex - 1);
      return;
    }

    if (target.closest('.news-list-view__right-arrow')) {
      if (pageIndex === totalPage) {
        let categoryIndex = Object.values(NEWS_CATEGORY).indexOf(category);
        if (categoryIndex === Object.values(NEWS_CATEGORY).length - 1) {
          categoryIndex = 0;
        } else {
          categoryIndex++;
        }
        const newCategory = Object.values(NEWS_CATEGORY)[categoryIndex];
        listViewStore.setState({
          ...listViewStore.getState(),
          category: newCategory,
          pageIndex: 0,
          totalPage: categoryNewspaperMap.get(newCategory).length - 1,
        });
        return;
      }
      listViewStore.setPageIndex(pageIndex + 1);
      return;
    }

    if (target.closest('[data-category]')) {
      const category = target
        .closest('[data-category]')
        .getAttribute('data-category');
      listViewStore.setState({
        ...listViewStore.getState(),
        pageIndex: 0,
        totalPage: categoryNewspaperMap.get(category).length - 1,
        category,
      });
      return;
    }

    const $listViewHeader = document.querySelector(
      '.news-list-view__newspaper-section__header',
    );
    const newspaper = categoryNewspaperMap.get(category)[pageIndex];

    if (target.closest('.subscribe-button')) {
      subscribedNewspaperStore.subscribeNewspaper(newspaper);
      target.closest('.subscribe-button').remove();
      $listViewHeader.insertAdjacentHTML(
        'beforeend',
        unsubscribeButtonTemplate({ hasText: false }),
      );
      return;
    }

    if (target.closest('.unsubscribe-button')) {
      unsubscriptionModalStore.setModalState({
        isOpen: true,
        pressName: newspaper.press,
      });
      return;
    }
  };
  return {
    handleClick,
  };
};
