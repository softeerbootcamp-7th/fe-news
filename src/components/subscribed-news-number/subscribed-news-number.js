import { Observer } from '@/libs';
import { subscribedNewspaperStore } from '@/stores';

export const SubscribedNewsNumber = () => {
  const updateSubscribedNewsNumber = () => {
    const $subscribedNewsNumber = document.querySelector(
      '.news-section__header__tabs__item--subscribed--number',
    );
    $subscribedNewsNumber.innerHTML =
      subscribedNewspaperStore.getSubscribedNewsNumber();
  };

  const observer = new Observer(updateSubscribedNewsNumber);
  subscribedNewspaperStore.subscribe(observer);

  return {
    cleanup: () => {
      subscribedNewspaperStore.unsubscribe(observer);
    },
  };
};
