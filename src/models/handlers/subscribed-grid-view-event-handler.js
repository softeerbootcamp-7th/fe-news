import { subscribedNewspaperStore } from '@/models';

/**
 * @returns {{handleClick: (event: Event) => void}}
 */
export const subscribedGridViewEventHandler = () => {
  const handleClick = (event) => {
    const currentNewspaperList =
      subscribedNewspaperStore.getSubscribedNewspaperList();
    if (event.target.closest('.unsubscribe-button')) {
      const $card = event.target.closest('.news-grid-view__card');
      const newspaperIndex = $card?.getAttribute('data-index');
      if (!currentNewspaperList[newspaperIndex]) {
        return;
      }
      subscribedNewspaperStore.unsubscribeNewspaper(
        currentNewspaperList[newspaperIndex].press,
      );
      $card.innerHTML = '';
    }
  };
  return {
    handleClick,
  };
};
