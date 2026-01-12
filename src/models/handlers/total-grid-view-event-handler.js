import { subscribedNewspaperStore, unsubscriptionModalStore } from '@/models';
import { unsubscribeButtonTemplate } from '@/templates';

/**
 * @typedef {import('../../types').Newspaper} Newspaper
 *
 * @typedef {Object} TotalGridViewEventHandlerParams
 * @property {Newspaper[]} newspaperList
 *
 * @param {TotalGridViewEventHandlerParams} totalGridViewEventHandlerParams
 * @returns {{handleClick: (event: Event) => void}}
 */
export const totalGridViewEventHandler = ({ newspaperList }) => {
  const handleClick = (event) => {
    const $card = event.target.closest('.news-grid-view__card');
    const newspaperIndex = $card?.getAttribute('data-index');

    if (!$card || !newspaperIndex) {
      return;
    }
    if (event.target.closest('.subscribe-button')) {
      subscribedNewspaperStore.subscribeNewspaper(
        newspaperList[newspaperIndex],
      );
      $card.innerHTML = unsubscribeButtonTemplate();
    } else if (event.target.closest('.unsubscribe-button')) {
      unsubscriptionModalStore.setModalState({
        isOpen: true,
        pressName: newspaperList[newspaperIndex].press,
      });
    }
  };

  return {
    handleClick,
  };
};
