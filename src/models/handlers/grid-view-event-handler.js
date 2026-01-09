import { GRID_VIEW, NEWS_SECTION_STATE } from '@/constants';
import {
  gridViewStore,
  newsSectionStore,
  subscribedNewspaperStore,
} from '@/models';
import {
  logoImageTemplate,
  subscribeButtonTemplate,
  unsubscribeButtonTemplate,
} from '@/templates';

import { createGridCardListHTML } from '../create-grid-card-list-html';
import { getArrowButtonPosition } from '../get-arrow-buttons-position';
import { insertArrowButtons } from '../insert-arrow-buttons';

/**
 * @typedef {import('../../types').Newspaper} Newspaper
 *
 * @typedef {Object} GridViewEventHandlerParams
 * @property {Newspaper[]} newspaperList
 * @property {number} initialPage
 * @property {boolean} isSubscribed
 *
 * @param {GridViewEventHandlerParams} gridViewEventHandlerParams
 * @returns
 */
export const gridViewEventHandler = ({
  newspaperList,
  initialPage,
  isSubscribed = false,
}) => {
  const { PAGE_SIZE, LEFT_BUTTON_CLASS_NAME, RIGHT_BUTTON_CLASS_NAME } =
    GRID_VIEW;

  const getCurrentNewspaperList = () => {
    return isSubscribed
      ? subscribedNewspaperStore.getSubscribedNewspaperList()
      : newspaperList;
  };

  const totalPage = Math.ceil(getCurrentNewspaperList().length / PAGE_SIZE) - 1;
  let currentPage = initialPage;
  const $gridView = document.querySelector('.news-grid-view');

  const handleMouseOver = (event) => {
    const $card = event.target.closest('.news-grid-view__card');
    const currentNewspaperList = getCurrentNewspaperList();
    if (
      !$card ||
      $card.contains(event.relatedTarget) ||
      event.relatedTarget?.closest('.subscribe-button') ||
      event.relatedTarget?.closest('.unsubscribe-button') ||
      !currentNewspaperList[$card.getAttribute('data-index')]
    ) {
      return;
    }

    const isSubscribed = subscribedNewspaperStore.isSubscribed(
      currentNewspaperList[$card.getAttribute('data-index')].press,
    );

    $card.innerHTML = isSubscribed
      ? unsubscribeButtonTemplate()
      : subscribeButtonTemplate();
  };

  const handleMouseOut = (event) => {
    const $card = event.target.closest('.news-grid-view__card');
    const currentNewspaperList = getCurrentNewspaperList();
    if (
      !$card ||
      $card.contains(event.relatedTarget) ||
      event.relatedTarget?.closest('.subscribe-button') ||
      event.relatedTarget?.closest('.unsubscribe-button')
    ) {
      return;
    }

    const newspaperIndex = $card.getAttribute('data-index');
    if (!currentNewspaperList[newspaperIndex]) {
      return;
    }
    $card.innerHTML = logoImageTemplate({
      logoUrl: currentNewspaperList[newspaperIndex]?.logo,
      className: 'news-grid-view__card--image',
    });
  };

  const updateGrid = (currentPage) => {
    const currentNewspaperList = getCurrentNewspaperList();
    const gridCardListHTML = createGridCardListHTML({
      newspaperList: currentNewspaperList,
      currentPage,
      pageSize: PAGE_SIZE,
    });
    $gridView.innerHTML = gridCardListHTML;

    insertArrowButtons({
      parentElement: $gridView,
      position: getArrowButtonPosition(currentPage, totalPage),
      leftButtonClassName: LEFT_BUTTON_CLASS_NAME,
      rightButtonClassName: RIGHT_BUTTON_CLASS_NAME,
    });
  };

  const updatePageIndex = (currentPage) => {
    const { type } = newsSectionStore.getState();

    if (type === NEWS_SECTION_STATE.TYPE.TOTAL) {
      gridViewStore.setPageIndex({ totalGridViewPageIndex: currentPage });
    } else {
      gridViewStore.setPageIndex({ subscribedGridViewPageIndex: currentPage });
    }

    updateGrid(currentPage);
  };

  const handleClick = (event) => {
    if (event.target.closest(`.${RIGHT_BUTTON_CLASS_NAME}`)) {
      currentPage++;
      updatePageIndex(currentPage);
    } else if (event.target.closest(`.${LEFT_BUTTON_CLASS_NAME}`)) {
      currentPage--;
      updatePageIndex(currentPage);
    }
  };

  return {
    handleMouseOver,
    handleMouseOut,
    handleClick,
  };
};
