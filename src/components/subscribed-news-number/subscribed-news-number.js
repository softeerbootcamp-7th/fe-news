import { Observer } from '@/libs';
import { subscribedNewspaperStore } from '@/stores';

export const SubscribedNewsNumber = () => {
  const updateSubscribedNewsNumber = () => {
    const $subscribedNewsNumber = document.querySelector(
      '[data-type="subscribed"] > div',
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
