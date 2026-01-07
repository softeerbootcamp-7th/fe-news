import { subscribedNewspaperStore } from '@/stores';
import {
  unsubscribeButtonTemplate,
  subscribeButtonTemplate,
  logoImageTemplate,
} from '@/templates';
import { createGridCardListHTML } from '../create-grid-card-list-html';
import { insertArrowButtons } from '../insert-arrow-buttons';
import { getArrowButtonPosition } from '../get-arrow-buttons-position';
import { GRID_VIEW } from '@/constants';

/**
 * @typedef {import('../../types').Newspaper} Newspaper
 *
 * @typedef {Object} GridViewEventHandlerParams
 * @property {Newspaper[]} newspaperList
 * @property {number} initialPage
 *
 * @param {GridViewEventHandlerParams} gridViewEventHandlerParams
 * @returns
 */
export const gridViewEventHandler = ({ newspaperList, initialPage }) => {
  const { PAGE_SIZE, LEFT_BUTTON_CLASS_NAME, RIGHT_BUTTON_CLASS_NAME } =
    GRID_VIEW;

  const totalPage = Math.ceil(newspaperList.length / PAGE_SIZE) - 1;
  let currentPage = initialPage;
  const $gridView = document.querySelector('.news-grid-view');

  const handleMouseOver = (event) => {
    const $card = event.target.closest('.news-grid-view__card');
    if (
      !$card ||
      $card.contains(event.relatedTarget) ||
      event.relatedTarget.closest('.unsubscribe-button') ||
      event.relatedTarget.closest('.subscribe-button')
    ) {
      return;
    }

    const isSubscribed = subscribedNewspaperStore.isSubscribed(
      newspaperList[$card.getAttribute('data-index')].press,
    );

    $card.innerHTML = isSubscribed
      ? unsubscribeButtonTemplate()
      : subscribeButtonTemplate();
  };

  const handleMouseOut = (event) => {
    const $card = event.target.closest('.news-grid-view__card');
    if (
      !$card ||
      $card.contains(event.relatedTarget) ||
      event.target.closest('.unsubscribe-button') ||
      event.target.closest('.subscribe-button')
    ) {
      return;
    }
    const index = $card.getAttribute('data-index');
    $card.innerHTML = logoImageTemplate({
      logoUrl: newspaperList[index].logo,
      className: 'news-grid-view__card--image',
    });
  };

  const handleClick = (event) => {
    if (event.target.closest(`.${RIGHT_BUTTON_CLASS_NAME}`)) {
      currentPage++;
      const gridCardListHTML = createGridCardListHTML({
        newspaperList,
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
    } else if (event.target.closest(`.${LEFT_BUTTON_CLASS_NAME}`)) {
      currentPage--;
      const gridCardListHTML = createGridCardListHTML({
        newspaperList,
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
    } else if (event.target.closest('.subscribe-button')) {
      const $card = event.target.closest('.news-grid-view__card');
      const newspaperIndex = $card.getAttribute('data-index');
      subscribedNewspaperStore.subscribeNewspaper(
        newspaperList[newspaperIndex],
      );
      $card.innerHTML = unsubscribeButtonTemplate();
    } else if (event.target.closest('.unsubscribe-button')) {
      const $card = event.target.closest('.news-grid-view__card');
      const newspaperIndex = $card.getAttribute('data-index');
      subscribedNewspaperStore.unsubscribeNewspaper(
        newspaperList[newspaperIndex].press,
      );
      $card.innerHTML = subscribeButtonTemplate();
    }
  };

  return {
    handleMouseOver,
    handleMouseOut,
    handleClick,
  };
};
